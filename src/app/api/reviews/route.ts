import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

export async function GET() {
  try {
    await dbConnect();
    
    const reviews = await ReviewModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar avaliações' },
      { status: 500 }
    );
  }
}