import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { randomBytes } from 'crypto';
import dbConnect from '@/lib/mongodb';
import EstimateModel from '@/models/estimate';

// Função para gerar um token único
const generateUniqueToken = async (): Promise<string> => {
  const maxAttempts = 5;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const token = randomBytes(16).toString('hex');
    const existing = await EstimateModel.findOne({ token });
    if (!existing) return token;
    attempts++;
  }
  throw new Error('Não foi possível gerar um token único após várias tentativas');
};

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const estimates = await EstimateModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(estimates);
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar orçamentos' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const data = await req.json();
    
    // Validação básica
    if (!data.clientName || !data.clientPhone || !data.title) {
      return NextResponse.json(
        { error: 'Dados incompletos: cliente, telefone e título são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Gerar token único para o orçamento
    const token = await generateUniqueToken();
    
    const newEstimate = await EstimateModel.create({
      ...data,
      token,
      createdBy: session.user.id,
      status: 'draft'
    });
    
    // Construir o link para o orçamento
    const estimateLink = `${process.env.NEXTAUTH_URL}/orcamento/${token}`;
    
    return NextResponse.json(
      { 
        message: 'Orçamento criado com sucesso', 
        data: newEstimate,
        estimateLink
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao criar orçamento' },
      { status: 500 }
    );
  }
}