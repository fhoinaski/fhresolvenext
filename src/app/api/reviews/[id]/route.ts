import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

// Função GET
export async function GET(request: NextRequest, context: any) {
  console.log('=== Iniciando GET /api/reviews/[id] ===');
  try {
    console.log('Conectando ao MongoDB...');
    await dbConnect();
    console.log('Conexão com MongoDB estabelecida com sucesso');

    const id = context.params.id; // Acessando id diretamente sem Promise
    console.log('Token recebido (como id):', id);

    console.log('Buscando review no banco de dados...');
    const review = await ReviewModel.findOne({ token: id });
    console.log('Resultado da busca:', review);

    if (!review) {
      console.log('Nenhum review encontrado para o token:', id);
      return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 });
    }

    console.log('Review encontrado:', review);
    return NextResponse.json(
      {
        name: review.name,
        location: review.location,
        isTokenUsed: review.isTokenUsed,
        isApproved: review.isApproved,
        rating: review.rating,
        text: review.text,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao buscar avaliação:', {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: 'Erro ao buscar avaliação', details: error.message },
      { status: 500 }
    );
  }
}

// Função PUT
export async function PUT(request: NextRequest, context: any) {
  console.log('=== Iniciando PUT /api/reviews/[id] ===');
  try {
    await dbConnect();
    const id = context.params.id; // Acessando id diretamente sem Promise
    const { rating, text, isTokenUsed } = await request.json();

    console.log('Dados recebidos para atualização:', { token: id, rating, text, isTokenUsed });

    const review = await ReviewModel.findOne({ token: id });
    if (!review) {
      console.log('Token não encontrado:', id);
      return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 });
    }

    // Permitir edição apenas se NÃO estiver aprovado
    if (review.isApproved) {
      console.log('Token já aprovado, edição não permitida:', id);
      return NextResponse.json(
        { error: 'Esta avaliação já foi aprovada e não pode ser editada' },
        { status: 400 }
      );
    }

    // Atualizar os campos
    review.rating = rating;
    review.text = text;
    review.isTokenUsed = isTokenUsed;
    await review.save();

    console.log('Review atualizado com sucesso:', review);
    return NextResponse.json({ message: 'Avaliação atualizada com sucesso' }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao atualizar avaliação:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));
      return NextResponse.json(
        { error: 'Erro de validação', details: errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Erro ao atualizar avaliação', details: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}