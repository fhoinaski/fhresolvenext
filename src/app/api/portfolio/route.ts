import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import PortfolioModel from '@/models/portfolio';

export async function GET() {
  try {
    await dbConnect();
    
    const portfolioItems = await PortfolioModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(portfolioItems);
  } catch (error) {
    console.error('Erro ao buscar itens do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar itens do portfólio' },
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
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    const newPortfolioItem = await PortfolioModel.create({
      ...data,
      createdBy: session.user.id,
    });
    
    return NextResponse.json(
      { message: 'Item criado com sucesso', data: newPortfolioItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao criar item do portfólio' },
      { status: 500 }
    );
  }
}