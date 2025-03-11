import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { randomBytes } from 'crypto';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

// Função para gerar um token único com retry em caso de duplicação
const generateUniqueToken = async (): Promise<string> => {
  const maxAttempts = 5;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const token = randomBytes(32).toString('hex');
    const existing = await ReviewModel.findOne({ token });
    if (!existing) return token;
    attempts++;
  }
  throw new Error('Não foi possível gerar um token único após várias tentativas');
};

export async function POST(req: Request) {
  try {
    // Verificar sessão
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Conectar ao MongoDB
    await dbConnect();

    // Validar corpo da requisição
    const { name, location } = await req.json();
    if (!name?.trim() || !location?.trim()) {
      return NextResponse.json(
        { error: 'Nome e localização são obrigatórios e não podem estar vazios' },
        { status: 400 }
      );
    }

    // Validar variável de ambiente
    if (!process.env.NEXTAUTH_URL) {
      throw new Error('NEXTAUTH_URL não configurado');
    }

    // Gerar token único
    const token = await generateUniqueToken();

    // Criar novo registro de avaliação
    const newReview = await ReviewModel.create({
      name: name.trim(),
      location: location.trim(),
      token,
      isTokenUsed: false,
      isApproved: false,
    });

    // Construir o link de avaliação
    const reviewLink = `${process.env.NEXTAUTH_URL}/avaliar/${token}`;

    return NextResponse.json(
      {
        message: 'Token gerado com sucesso',
        reviewLink,
        reviewId: newReview._id.toString(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao gerar token de avaliação:', error);

    // Tratar erros de validação do Mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));
      return NextResponse.json(
        {
          error: 'Erro de validação ao gerar token',
          details: errors,
        },
        { status: 400 }
      );
    }

    // Outros erros
    return NextResponse.json(
      {
        error: 'Erro ao gerar token de avaliação',
        details: error.message || 'Erro interno do servidor',
      },
      { status: 500 }
    );
  }
}