// src/app/api/site-config/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import SettingsModel from '@/models/settings';

export async function GET() {
  try {
    await dbConnect();
    
    // Buscar as configurações existentes ou retornar um objeto padrão
    const siteConfig = await SettingsModel.findOne({}).lean() || {
      siteName: 'FH Resolve',
      siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
      contactInfo: {
        email: 'contato@fhresolve.com.br',
        phone: '48991919791',
        address: 'Ratones, Florianópolis - SC'
      },
      socialMedia: {
        instagram: '',
        facebook: '',
        whatsapp: '48991919791'
      },
      themes: {
        light: {
          primary: '#252525',
          accent: '#2B8D9A',
          secondary: '#8D9192',
          neutral: '#EDEDED',
          text: '#252525',
          textLight: '#FFFFFF',
          dark: '#252525',
          light: '#FFFFFF',
          gray: '#EDEDED',
          cardBg: '#FFFFFF',
          cardText: '#252525',
          paralel: '#F5F5F5',
          accentDark: '#247885'
        },
        dark: {
          primary: '#252525',
          accent: '#2B8D9A',
          secondary: '#8D9192',
          neutral: '#8D9192',
          text: '#FFFFFF',
          textLight: '#FFFFFF',
          dark: '#252525',
          light: '#333333',
          gray: '#3A3A3A',
          cardBg: '#333333',
          cardText: '#FFFFFF',
          paralel: '#EDEDED',
          accentDark: '#247885'
        }
      },
      activeTemplate: 'default',
      activeTheme: 'light',
      defaultTheme: 'light',
      maintenanceMode: false,
      logoUrl: '/logo.svg',
      faviconUrl: '/favicon.ico'
    };
    
    return NextResponse.json(siteConfig);
  } catch (error) {
    console.error('Erro ao buscar configurações do site:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar configurações do site' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Verificar se é um administrador
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const data = await req.json();
    
    // Validar campos obrigatórios
    if (!data.siteName || !data.siteDescription) {
      return NextResponse.json(
        { error: 'Nome do site e descrição são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Atualizar ou criar configurações
    const updatedConfig = await SettingsModel.findOneAndUpdate(
      {}, // Filtro vazio para encontrar qualquer documento (haverá apenas um)
      { 
        ...data,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({
      message: 'Configurações salvas com sucesso',
      data: updatedConfig
    });
  } catch (error) {
    console.error('Erro ao salvar configurações do site:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar configurações do site' },
      { status: 500 }
    );
  }
}