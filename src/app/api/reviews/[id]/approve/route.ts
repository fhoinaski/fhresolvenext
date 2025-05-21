import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

export async function POST(request: NextRequest, context: any) {
  try {
    await dbConnect();
    const id = context.params.id;

    console.log('Aprovando review com _id:', id);

    const review = await ReviewModel.findById(id);
    if (!review) {
      return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 });
    }

    review.isApproved = true;
    await review.save();

    return NextResponse.json({ message: 'Avaliação aprovada com sucesso' }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao aprovar avaliação:', error);
    return NextResponse.json(
      { error: 'Erro ao aprovar avaliação', details: error.message },
      { status: 500 }
    );
  }
}