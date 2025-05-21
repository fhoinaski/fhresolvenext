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
    const existing = await EstimateModel.findOne({ token }).lean();
    if (!existing) return token;
    attempts++;
  }
  throw new Error('Não foi possível gerar um token único após várias tentativas');
};

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const estimates = await EstimateModel.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(estimates);
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar orçamentos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    console.log('Dados recebidos em POST /api/estimates:', data); // Depuração

    // Validação básica
    if (!data.clientName || !data.clientPhone || !data.title) {
      return NextResponse.json(
        { error: 'Dados incompletos: cliente, telefone e título são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação específica por tipo de orçamento
    if (data.estimateType === 'detailed' && (!data.items || data.items.length === 0)) {
      return NextResponse.json(
        { error: 'Orçamento detalhado requer pelo menos um item' },
        { status: 400 }
      );
    }
    if (data.estimateType === 'materials' && 
        ((!data.materials || data.materials.length === 0) || (!data.services || data.services.length === 0))) {
      return NextResponse.json(
        { error: 'Orçamento de materiais requer pelo menos um material e um serviço' },
        { status: 400 }
      );
    }
    if (data.estimateType === 'simple' && (!data.services || data.services.length === 0)) {
      return NextResponse.json(
        { error: 'Orçamento simplificado requer pelo menos um serviço' },
        { status: 400 }
      );
    }

    const token = await generateUniqueToken();
    const newEstimate = await EstimateModel.create({
      ...data,
      token,
      createdBy: session.user.id,
      status: 'draft',
    });

    const estimateLink = `${process.env.NEXTAUTH_URL}/orcamento/${token}`;
    return NextResponse.json(
      { 
        message: 'Orçamento criado com sucesso', 
        data: newEstimate,
        estimateLink 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao criar orçamento:', error.message, error.stack);
    const errorMsg = error.message.includes('token') 
      ? 'Erro ao gerar token único' 
      : 'Erro interno ao criar orçamento';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}