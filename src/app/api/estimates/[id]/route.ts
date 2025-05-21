import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { Types } from 'mongoose';
import dbConnect from '@/lib/mongodb';
import EstimateModel from '@/models/estimate';
import { authOptions } from '@/lib/auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Definindo a interface para os parâmetros da rota
type RouteParams = {
  params: Promise<{
    id: string
  }>
}

// Função GET
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; // Aguardando a resolução dos parâmetros
    let estimate = null;
    console.log('id:', id);

    const isValidObjectId =
      Types.ObjectId.isValid(id) && new Types.ObjectId(id).toString() === id;

    if (isValidObjectId) {
      estimate = await EstimateModel.findById(id).lean();
    }

    if (!estimate) {
      estimate = await EstimateModel.findOne({ token: id }).lean();
    }

    if (!estimate) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(estimate);
  } catch (error) {
    console.error('Erro ao buscar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar orçamento' },
      { status: 500 }
    );
  }
}

// Função PUT
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {



    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await context.params; // Aguardando a resolução dos parâmetros
    const data = await request.json();

    if (!data.clientName || !data.clientPhone || !data.title) {
      return NextResponse.json(
        { error: 'Dados incompletos: cliente, telefone e título são obrigatórios' },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    const updatedEstimate = await EstimateModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedEstimate) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Orçamento atualizado com sucesso',
      data: updatedEstimate,
    });
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar orçamento' },
      { status: 500 }
    );
  }
}

// Função DELETE
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await context.params; // Aguardando a resolução dos parâmetros

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    const deletedEstimate = await EstimateModel.findByIdAndDelete(id);

    if (!deletedEstimate) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Orçamento excluído com sucesso',
    });
  } catch (error) {
    console.error('Erro ao excluir orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir orçamento' },
      { status: 500 }
    );
  }
}