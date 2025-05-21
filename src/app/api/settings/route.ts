// src/app/api/settings/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Importar de lib/auth.ts
import dbConnect from '@/lib/mongodb';
import SettingsModel from '@/models/settings';

export async function GET() {
  try {
    await dbConnect();
    const settings = await SettingsModel.findOne({}) || { defaultTheme: 'light' };
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar configurações' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const data = await req.json();
    
    // Atualiza ou cria configurações
    const settings = await SettingsModel.findOneAndUpdate(
      {}, // Filtro vazio para encontrar o primeiro documento
      { 
        ...data,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({
      message: 'Configurações salvas com sucesso',
      data: settings
    });
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar configurações' },
      { status: 500 }
    );
  }
}