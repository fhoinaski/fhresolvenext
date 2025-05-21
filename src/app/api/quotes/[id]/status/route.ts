import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import QuoteModel from '@/models/quote';

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
    const { status, notes } = await request.json();

    if (!status || !['novo', 'em_contato', 'convertido', 'encerrado'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    const updatedQuote = await QuoteModel.findByIdAndUpdate(
      id,
      {
        status,
        notes,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedQuote) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Status atualizado com sucesso',
      data: updatedQuote,
    });
  } catch (error) {
    console.error('Erro ao atualizar status do orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar status do orçamento' },
      { status: 500 }
    );
  }
}