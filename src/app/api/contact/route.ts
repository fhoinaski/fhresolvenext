import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

// Schema de validação com Zod
const ContactSchema = z.object({
  name: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  phone: z.string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato de telefone inválido. Use (XX) XXXXX-XXXX"),
  message: z.string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(500, "Mensagem deve ter no máximo 500 caracteres")
});

export async function POST(request: NextRequest) {
  // Rate Limiting - máximo 3 tentativas por minuto por IP
  const rateLimitResult = rateLimit(request, {
    interval: 60 * 1000, // 1 minuto
    uniqueTokenPerInterval: 3, // Máximo de 3 envios por minuto por IP
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        error: 'Muitas tentativas de envio. Tente novamente em alguns minutos.',
        type: 'rate_limit'
      }, 
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    
    // Validação com Zod
    const validation = ContactSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        { 
          error: "Dados inválidos", 
          details: errors,
          type: 'validation_error'
        }, 
        { status: 400 }
      );
    }

    const { name, phone, message } = validation.data;

    // Configuração do transportador de email para Hostinger
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // true para 465, false para outras portas
      auth: {
        user: process.env.EMAIL_USER, // contato@fhresolve.com.br
        pass: process.env.EMAIL_PASS, // M@ri@17072020
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Configuração do email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // email de destino
      subject: `Novo contato do site - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">Novo Contato - FH Resolve</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-bottom: 20px;">Detalhes do Contato:</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 0; color: #666; font-size: 14px;">Nome:</p>
              <p style="margin: 5px 0 0 0; color: #333; font-size: 16px; font-weight: bold;">${name}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 0; color: #666; font-size: 14px;">Telefone:</p>
              <p style="margin: 5px 0 0 0; color: #333; font-size: 16px; font-weight: bold;">
                <a href="tel:${phone.replace(/\D/g, '')}" style="color: #667eea; text-decoration: none;">${phone}</a>
              </p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 0; color: #666; font-size: 14px;">Mensagem:</p>
              <p style="margin: 10px 0 0 0; color: #333; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://wa.me/55${phone.replace(/\D/g, '')}" 
                 style="background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                Responder via WhatsApp
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>Email enviado automaticamente pelo site FH Resolve</p>
            <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      `,
      text: `
        Novo contato do site FH Resolve
        
        Nome: ${name}
        Telefone: ${phone}
        Mensagem: ${message}
        
        Data: ${new Date().toLocaleString('pt-BR')}
      `,
    };

    // Enviar o email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email enviado com sucesso!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    
    // Log detalhado do erro para debug
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor. Tente novamente mais tarde.',
        type: 'server_error'
      },
      { status: 500 }
    );
  }
}
