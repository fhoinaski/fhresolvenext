// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/user';

const UserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome não pode exceder 100 caracteres'),
  email: z.string().email('Formato de email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['admin', 'editor', 'viewer'], { message: 'Função inválida' }),
});

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const users = await UserModel.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(50) // Limite para performance
      .lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar usuários' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // Validação com Zod
    const parsedData = UserSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsedData.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password, role } = parsedData.data;

    // Verifica email duplicado
    const existingUser = await UserModel.findOne({ email }).lean();
    if (existingUser) {
      return NextResponse.json({ error: 'Email já está em uso' }, { status: 400 });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    // Remove senha da resposta
    const user = newUser.toObject();
    delete user.password;

    return NextResponse.json(
      { message: 'Usuário criado com sucesso', data: user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ error: 'Erro interno ao criar usuário' }, { status: 500 });
  }
}