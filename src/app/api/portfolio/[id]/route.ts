import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import PortfolioModel from '@/models/portfolio';

export async function GET(request: NextRequest, context: any) {
  try {
    await dbConnect();
    
    const id = context.params.id;
    const portfolioItem = await PortfolioModel.findById(id);
    
    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolioItem);
  } catch (error) {
    console.error('Erro ao buscar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar item do portfólio' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: any) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const id = context.params.id;
    const data = await request.json();
    
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    const updatedPortfolioItem = await PortfolioModel.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );
    
    if (!updatedPortfolioItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Item atualizado com sucesso', data: updatedPortfolioItem }
    );
  } catch (error) {
    console.error('Erro ao atualizar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar item do portfólio' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: any) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const id = context.params.id;
    const deletedPortfolioItem = await PortfolioModel.findByIdAndDelete(id);
    
    if (!deletedPortfolioItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Item excluído com sucesso' }
    );
  } catch (error) {
    console.error('Erro ao excluir item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir item do portfólio' },
      { status: 500 }
    );
  }
}