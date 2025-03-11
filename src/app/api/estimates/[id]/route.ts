import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Types } from 'mongoose';
import dbConnect from '@/lib/mongodb';
import EstimateModel from '@/models/estimate';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();
    
    const id = params.id;
    let estimate = null;
    
    // Verifica se o ID parece ser um ObjectId válido do MongoDB
    const isValidObjectId = Types.ObjectId.isValid(id) && 
                           (new Types.ObjectId(id)).toString() === id;
    
    if (isValidObjectId) {
      // Tenta buscar por ID do MongoDB
      estimate = await EstimateModel.findById(id).lean();
    }
    
    // Se não é um ObjectId válido ou não encontrou, tenta buscar por token
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

export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const id = params.id;
    const data = await req.json();
    
    // Validação básica
    if (!data.clientName || !data.clientPhone || !data.title) {
      return NextResponse.json(
        { error: 'Dados incompletos: cliente, telefone e título são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verifica se o ID é um ObjectId válido
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
      data: updatedEstimate
    });
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar orçamento' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const id = params.id;
    
    // Verifica se o ID é um ObjectId válido
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
      message: 'Orçamento excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir orçamento' },
      { status: 500 }
    );
  }
}