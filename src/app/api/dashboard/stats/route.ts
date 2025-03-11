// Adicionar ao arquivo existente src/app/api/dashboard/stats/route.ts (ou criar se não existir)

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import QuoteModel from '@/models/quote';
import ReviewModel from '@/models/review';
import EstimateModel from '@/models/estimate';

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
    
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    // Consultas para estatísticas
    const pendingQuotes = await QuoteModel.countDocuments({ status: 'novo' });
    const recentReviews = await ReviewModel.countDocuments({ createdAt: { $gte: lastMonth } });
    const totalEstimates = await EstimateModel.countDocuments({});
    const acceptedEstimates = await EstimateModel.countDocuments({ status: 'accepted' });
    
    // Dados recentes para o dashboard
    const recentEstimates = await EstimateModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
      
    return NextResponse.json({
      stats: {
        pendingQuotes,
        recentReviews,
        totalEstimates,
        acceptedEstimates,
      },
      recentData: {
        estimates: recentEstimates,
        // Outros dados recentes
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}