import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    console.log('=== DEBUG EMAIL SYSTEM ===');
    console.log('Dados recebidos:', { name, phone, message });
    console.log('Variáveis de ambiente:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***configurada***' : 'não configurada');
    console.log('EMAIL_TO:', process.env.EMAIL_TO);

    // Validação dos dados
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    console.log('Criando transportador SMTP...');
    
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
      },
      debug: true, // Ativar debug
      logger: true // Ativar logs
    });

    console.log('Verificando conexão SMTP...');
    
    // Verificar conexão
    await transporter.verify();
    console.log('✅ Conexão SMTP verificada com sucesso!');

    // Configuração do email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // email de destino
      subject: `[DEBUG] Novo contato do site - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">🧪 TESTE - FH Resolve</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-bottom: 20px;">Detalhes do Contato (Modo Debug):</h2>
            
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
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #2e7d32; margin-top: 0;">✅ Sistema Funcionando!</h3>
              <p style="color: #2e7d32; margin-bottom: 0;">Este email confirma que o sistema de contato está operacional.</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>Email de teste enviado automaticamente pelo sistema FH Resolve</p>
            <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      `,
      text: `
        [TESTE] Novo contato do site FH Resolve
        
        Nome: ${name}
        Telefone: ${phone}
        Mensagem: ${message}
        
        Data: ${new Date().toLocaleString('pt-BR')}
        
        ✅ Sistema funcionando corretamente!
      `,
    };

    console.log('Enviando email...');
    console.log('Para:', mailOptions.to);
    console.log('Assunto:', mailOptions.subject);

    // Enviar o email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado com sucesso!');
    console.log('Message ID:', info.messageId);
    console.log('Info completa:', info);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email enviado com sucesso!',
        messageId: info.messageId,
        debug: {
          from: mailOptions.from,
          to: mailOptions.to,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor. Tente novamente mais tarde.',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
