import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import EstimateModel from '@/models/estimate';

// Função PUT
export async function PUT(request: NextRequest, context: any) {
  try {
    const session = await getServerSession();

    // Verifica se é um admin ou se é o próprio cliente (através do token)
    let isAuthorized = false;

    if (session) {
      isAuthorized = true;
    } else {
      const { token } = await request.json();
      if (token) {
        const estimate = await EstimateModel.findOne({ token }).lean() as { token?: string } | null;
        isAuthorized = Boolean(estimate && estimate.token === token);
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();

    const id = context.params.id;
    const { status } = await request.json();

    if (!status || !['draft', 'sent', 'accepted', 'rejected', 'expired'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    const updatedEstimate = await EstimateModel.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedEstimate) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Status atualizado com sucesso',
      data: updatedEstimate,
    });
  } catch (error) {
    console.error('Erro ao atualizar status do orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar status do orçamento' },
      { status: 500 }
    );
  }
}