# Estrutura do Projeto - Parte FULL
  
  **Gerado em:** 10/03/2025, 22:42:39  
  **Node Version:** v18.20.4  
  **Diretório Raiz:** `E:\Projetos\fhresolve\fhresolve`
  
  ## Estrutura de Pastas
  ```
  📁 public/
  📄 logo.svg
  📄 robots.txt
📁 src/
  📁 app/
    📁 api/
      📁 auth/
        📁 [...nextauth]/
          📄 route.ts
      📁 dashboard/
        📁 stats/
          📄 route.ts
      📁 estimates/
        📁 [id]/
          📁 status/
            📄 route.ts
          📄 route.ts
        📄 route.ts
      📁 portfolio/
        📁 [id]/
          📄 route.ts
        📄 route.ts
      📁 quotes/
        📁 [id]/
          📁 status/
            📄 route.ts
        📄 route.ts
      📁 reviews/
        📁 [id]/
          📁 approve/
            📄 route.ts
          📄 route.ts
        📁 generate-token/
          📄 route.ts
        📄 route.ts
      📁 settings/
        📄 route.ts
      📁 site-config/
        📄 route.ts
      📁 users/
        📄 route.ts
    📁 avaliar/
      📁 [token]/
        📄 page.tsx
        📄 ReviewPage.tsx
    📁 dashboard/
      📁 appearance/
        📄 page.tsx
      📁 blog/
        📁 new/
          📄 page.tsx
        📄 page.tsx
      📁 estimates/
        📁 new/
          📄 page.tsx
        📄 page.tsx
      📁 portfolio/
        📁 new/
          📄 page.tsx
        📄 page.tsx
      📁 quotes/
        📄 page.tsx
      📁 reviews/
        📄 page.tsx
      📁 settings/
        📄 page.tsx
      📁 users/
        📄 page.tsx
      📁 videos/
        📁 new/
          📄 page.tsx
        📄 page.tsx
      📄 layout.tsx
      📄 page.tsx
    📁 login/
      📄 page.tsx
    📁 orcamento/
      📁 [token]/
        📄 page.tsx
    📄 globals.css
    📄 layout.tsx
    📄 page.tsx
    📄 providers.tsx
    📄 sitemap.xml
  📁 components/
    📁 dashboard/
      📄 Sidebar.tsx
      📄 Stats.tsx
      📄 ThemeEditor.tsx
      📄 Topbar.tsx
    📁 ui/
      📄 Card.tsx
      📄 Heading.tsx
      📄 LoadingSpinner.tsx
    📄 About.tsx
    📄 Benefits.tsx
    📄 Blog.tsx
    📄 Contact.tsx
    📄 FeedbackToast.tsx
    📄 Footer.tsx
    📄 Header.tsx
    📄 Hero.tsx
    📄 LoadingScreen.tsx
    📄 MapContent.tsx
    📄 Portfolio.tsx
    📄 Projects.tsx
    📄 Reviews.tsx
    📄 RoleGuard.tsx
    📄 ServiceMap.tsx
    📄 Testimonials.tsx
  📁 context/
    📄 FeedbackContext.tsx
    📄 SiteConfigContext.tsx
    📄 ThemeContext.tsx
  📁 lib/
    📄 axios.ts
    📄 drive-service.ts
    📄 mongodb.ts
  📁 models/
    📄 blog.ts
    📄 estimate.ts
    📄 portfolio.ts
    📄 quote.ts
    📄 review.ts
    📄 settings.ts
    📄 user.ts
    📄 video.ts
  📁 scripts/
    📄 create-admin.ts
  📁 types/
    📄 next-auth.d.ts
  📄 middleware.ts
📄 eslint.config.mjs
📄 next-env.d.ts
📄 next.config.ts
📄 package.json
📄 postcss.config.mjs
📄 README.md
📄 tailwind.config.mjs
📄 tsconfig.json
📄 tsconfig.tsnode.json

  ```
  
  ## Conteúdo Detalhado
  - 📁 public/
  - 📄 logo.svg
    [Arquivo binário]

  - 📄 robots.txt
    [Arquivo binário]

- 📁 src/
  - 📁 app/
    - 📁 api/
      - 📁 auth/
        - 📁 [...nextauth]/
          - 📄 route.ts
          
```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/user';

// Exportar as opções para uso em getServerSession
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios');
        }

        await dbConnect();
        const user = await UserModel.findOne({ email: credentials.email }).lean();
        
        if (!user) {
          throw new Error('Usuário não encontrado');
        }
        
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Senha inválida');
        }
        
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

      - 📁 dashboard/
        - 📁 stats/
          - 📄 route.ts
          
```typescript
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
```

      - 📁 estimates/
        - 📁 [id]/
          - 📁 status/
            - 📄 route.ts
            
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import EstimateModel from '@/models/estimate';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await getServerSession();
    
    // Verifica se é um admin ou se é o próprio cliente (através do token)
    let isAuthorized = false;
    
    if (session) {
      isAuthorized = true;
    } else {
      const { token } = await req.json();
      if (token) {
        const estimate = await EstimateModel.findOne({ token }).lean();
        isAuthorized = estimate && estimate.token === token;
      }
    }
    
    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const { status } = await req.json();
    
    if (!status || !['draft', 'sent', 'accepted', 'rejected', 'expired'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }
    
    const updatedEstimate = await EstimateModel.findByIdAndUpdate(
      params.id,
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
```

          - 📄 route.ts
          
```typescript
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
```

        - 📄 route.ts
        
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { randomBytes } from 'crypto';
import dbConnect from '@/lib/mongodb';
import EstimateModel from '@/models/estimate';

// Função para gerar um token único
const generateUniqueToken = async (): Promise<string> => {
  const maxAttempts = 5;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const token = randomBytes(16).toString('hex');
    const existing = await EstimateModel.findOne({ token });
    if (!existing) return token;
    attempts++;
  }
  throw new Error('Não foi possível gerar um token único após várias tentativas');
};

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
    
    const estimates = await EstimateModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(estimates);
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar orçamentos' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const data = await req.json();
    
    // Validação básica
    if (!data.clientName || !data.clientPhone || !data.title) {
      return NextResponse.json(
        { error: 'Dados incompletos: cliente, telefone e título são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Gerar token único para o orçamento
    const token = await generateUniqueToken();
    
    const newEstimate = await EstimateModel.create({
      ...data,
      token,
      createdBy: session.user.id,
      status: 'draft'
    });
    
    // Construir o link para o orçamento
    const estimateLink = `${process.env.NEXTAUTH_URL}/orcamento/${token}`;
    
    return NextResponse.json(
      { 
        message: 'Orçamento criado com sucesso', 
        data: newEstimate,
        estimateLink
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao criar orçamento' },
      { status: 500 }
    );
  }
}
```

      - 📁 portfolio/
        - 📁 [id]/
          - 📄 route.ts
          
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import PortfolioModel from '@/models/portfolio';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();
    
    const portfolioItem = await PortfolioModel.findById(params.id);
    
    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolioItem);
  } catch (error) {
    console.error('Erro ao buscar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar item do portfólio' },
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
    
    const data = await req.json();
    
    // Validação básica
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    const updatedPortfolioItem = await PortfolioModel.findByIdAndUpdate(
      params.id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );
    
    if (!updatedPortfolioItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Item atualizado com sucesso', data: updatedPortfolioItem }
    );
  } catch (error) {
    console.error('Erro ao atualizar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar item do portfólio' },
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
    
    const deletedPortfolioItem = await PortfolioModel.findByIdAndDelete(params.id);
    
    if (!deletedPortfolioItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Item excluído com sucesso' }
    );
  } catch (error) {
    console.error('Erro ao excluir item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir item do portfólio' },
      { status: 500 }
    );
  }
}
```

        - 📄 route.ts
        
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import PortfolioModel from '@/models/portfolio';

export async function GET() {
  try {
    await dbConnect();
    
    const portfolioItems = await PortfolioModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(portfolioItems);
  } catch (error) {
    console.error('Erro ao buscar itens do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar itens do portfólio' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const data = await req.json();
    
    // Validação básica
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    const newPortfolioItem = await PortfolioModel.create({
      ...data,
      createdBy: session.user.id,
    });
    
    return NextResponse.json(
      { message: 'Item criado com sucesso', data: newPortfolioItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao criar item do portfólio' },
      { status: 500 }
    );
  }
}
```

      - 📁 quotes/
        - 📁 [id]/
          - 📁 status/
            - 📄 route.ts
            
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import QuoteModel from '@/models/quote';

interface Params {
  params: {
    id: string;
  };
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
    
    const { status, notes } = await req.json();
    
    if (!status || !['novo', 'em_contato', 'convertido', 'encerrado'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }
    
    const updatedQuote = await QuoteModel.findByIdAndUpdate(
      params.id,
      {
        status,
        notes,
        updatedAt: new Date(),
      },
      { new: true }
    );
    
    if (!updatedQuote) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Status atualizado com sucesso',
      data: updatedQuote,
    });
  } catch (error) {
    console.error('Erro ao atualizar status do orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar status do orçamento' },
      { status: 500 }
    );
  }
}
```

        - 📄 route.ts
        
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import QuoteModel from '@/models/quote';

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
    
    const quotes = await QuoteModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar orçamentos' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const data = await req.json();
    
    // Validação básica
    if (!data.name || !data.phone || !data.message) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    const newQuote = await QuoteModel.create({
      ...data,
      status: 'novo',
    });
    
    return NextResponse.json(
      { message: 'Orçamento solicitado com sucesso', data: newQuote },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao criar orçamento' },
      { status: 500 }
    );
  }
}
```

      - 📁 reviews/
        - 📁 [id]/
          - 📁 approve/
            - 📄 route.ts
            
```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('Aprovando review com _id:', id);

    const review = await ReviewModel.findById(id); // Usa _id em vez de token
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
```

          - 📄 route.ts
          
```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  console.log('=== Iniciando GET /api/reviews/[id] ===');
  try {
    console.log('Conectando ao MongoDB...');
    await dbConnect();
    console.log('Conexão com MongoDB estabelecida com sucesso');

    const params = await context.params;
    const { id } = params;
    console.log('Token recebido (como id):', id);

    console.log('Buscando review no banco de dados...');
    const review = await ReviewModel.findOne({ token: id });
    console.log('Resultado da busca:', review);

    if (!review) {
      console.log('Nenhum review encontrado para o token:', id);
      return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 });
    }

    console.log('Review encontrado:', review);
    return NextResponse.json({
      name: review.name,
      location: review.location,
      isTokenUsed: review.isTokenUsed,
      isApproved: review.isApproved,
      rating: review.rating,
      text: review.text,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar avaliação:', {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: 'Erro ao buscar avaliação', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  console.log('=== Iniciando PUT /api/reviews/[id] ===');
  try {
    await dbConnect();
    const params = await context.params; // Garantir que params seja resolvido
    const { id } = params; // Extrair id após await
    const { rating, text, isTokenUsed } = await req.json();

    console.log('Dados recebidos para atualização:', { token: id, rating, text, isTokenUsed });

    const review = await ReviewModel.findOne({ token: id });
    if (!review) {
      console.log('Token não encontrado:', id);
      return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 });
    }

    // Permitir edição apenas se NÃO estiver aprovado
    if (review.isApproved) {
      console.log('Token já aprovado, edição não permitida:', id);
      return NextResponse.json(
        { error: 'Esta avaliação já foi aprovada e não pode ser editada' },
        { status: 400 }
      );
    }

    // Atualizar os campos
    review.rating = rating;
    review.text = text;
    review.isTokenUsed = isTokenUsed;
    await review.save();

    console.log('Review atualizado com sucesso:', review);
    return NextResponse.json({ message: 'Avaliação atualizada com sucesso' }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao atualizar avaliação:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));
      return NextResponse.json(
        { error: 'Erro de validação', details: errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Erro ao atualizar avaliação', details: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

        - 📁 generate-token/
          - 📄 route.ts
          
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { randomBytes } from 'crypto';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

// Função para gerar um token único com retry em caso de duplicação
const generateUniqueToken = async (): Promise<string> => {
  const maxAttempts = 5;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const token = randomBytes(32).toString('hex');
    const existing = await ReviewModel.findOne({ token });
    if (!existing) return token;
    attempts++;
  }
  throw new Error('Não foi possível gerar um token único após várias tentativas');
};

export async function POST(req: Request) {
  try {
    // Verificar sessão
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Conectar ao MongoDB
    await dbConnect();

    // Validar corpo da requisição
    const { name, location } = await req.json();
    if (!name?.trim() || !location?.trim()) {
      return NextResponse.json(
        { error: 'Nome e localização são obrigatórios e não podem estar vazios' },
        { status: 400 }
      );
    }

    // Validar variável de ambiente
    if (!process.env.NEXTAUTH_URL) {
      throw new Error('NEXTAUTH_URL não configurado');
    }

    // Gerar token único
    const token = await generateUniqueToken();

    // Criar novo registro de avaliação
    const newReview = await ReviewModel.create({
      name: name.trim(),
      location: location.trim(),
      token,
      isTokenUsed: false,
      isApproved: false,
    });

    // Construir o link de avaliação
    const reviewLink = `${process.env.NEXTAUTH_URL}/avaliar/${token}`;

    return NextResponse.json(
      {
        message: 'Token gerado com sucesso',
        reviewLink,
        reviewId: newReview._id.toString(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao gerar token de avaliação:', error);

    // Tratar erros de validação do Mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));
      return NextResponse.json(
        {
          error: 'Erro de validação ao gerar token',
          details: errors,
        },
        { status: 400 }
      );
    }

    // Outros erros
    return NextResponse.json(
      {
        error: 'Erro ao gerar token de avaliação',
        details: error.message || 'Erro interno do servidor',
      },
      { status: 500 }
    );
  }
}
```

        - 📄 route.ts
        
```typescript
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
```

      - 📁 settings/
        - 📄 route.ts
        
```typescript
// src/app/api/settings/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
```

      - 📁 site-config/
        - 📄 route.ts
        
```typescript
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
```

      - 📁 users/
        - 📄 route.ts
        
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/user';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const users = await UserModel.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const { name, email, password, role } = await req.json();
    
    // Validação básica
    if (!name?.trim() || !email?.trim() || !password || !role) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    // Verifica se o email já está em uso
    const existingUser = await UserModel.findOne({ email }).lean();
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 400 }
      );
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }
    
    // Validar força da senha
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }
    
    // Validar papel do usuário
    if (!['admin', 'editor', 'viewer'].includes(role)) {
      return NextResponse.json(
        { error: 'Função inválida' },
        { status: 400 }
      );
    }
    
    // Cria a senha com hash
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await UserModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role,
    });
    
    // Remove a senha antes de retornar
    const user = newUser.toObject();
    delete user.password;
    
    return NextResponse.json(
      { message: 'Usuário criado com sucesso', data: user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    );
  }
}
```

    - 📁 avaliar/
      - 📁 [token]/
        - 📄 page.tsx
        
```tsx
import dynamic from 'next/dynamic';

const ReviewPage = dynamic(() => import('./ReviewPage'), { ssr: false });

export default ReviewPage;
```

        - 📄 ReviewPage.tsx
        
```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';

export default function ReviewPage() {
  const router = useRouter();
  const { token } = useParams();
  const [review, setReview] = useState<{
    name: string;
    location: string;
    isTokenUsed: boolean;
    isApproved: boolean;
    rating?: number;
    text?: string;
  } | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      fetchReview();
    }
  }, [token]);

  useEffect(() => {
    if (review && review.isTokenUsed && !review.isApproved) {
      setRating(review.rating || 0);
      setText(review.text || '');
    }
  }, [review]);

  const fetchReview = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/reviews/${token}`);
      setReview(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Link inválido ou expirado.');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error('Por favor, selecione uma avaliação entre 1 e 5 estrelas.');
      return;
    }
    if (!text.trim()) {
      toast.error('Por favor, escreva um comentário.');
      return;
    }

    setSubmitting(true);
    try {
      await axios.put(`/api/reviews/${token}`, { rating, text, isTokenUsed: true });
      setReview({ ...review!, rating, text, isTokenUsed: true });
      setSubmitted(true);
      toast.success(review?.isTokenUsed ? 'Avaliação atualizada com sucesso!' : 'Avaliação enviada com sucesso! Obrigado.');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao processar avaliação. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (currentRating: number = rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <motion.button
          key={index}
          type="button"
          onClick={review?.isApproved || submitted ? undefined : () => setRating(index + 1)}
          className={`focus:outline-none ${review?.isApproved || submitted ? 'cursor-default' : ''}`}
          whileHover={review?.isApproved || submitted ? {} : { scale: 1.2, rotate: 10 }}
          whileTap={review?.isApproved || submitted ? {} : { scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Star
            size={32}
            className={`transition-all duration-300 ${
              index < currentRating
                ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-accent-dark)]'
            }`}
          />
        </motion.button>
      ));
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-[var(--color-gray)] dark:bg-[var(--color-dark)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    );
  }

  if (!review) return null;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[var(--color-gray)] dark:bg-[var(--color-dark)] p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(var(--color-accent-rgb), 0.1) 0%, transparent 70%)',
          maskImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.8) 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.8) 30%, transparent 70%)',
        }}
      />
      <Card className="relative z-10 w-full max-w-md mx-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <AnimatePresence mode="wait">
          {submitted && !review.isApproved ? (
            <motion.div
              key="submitted"
              className="text-center space-y-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-lg font-medium text-[var(--color-dark)] dark:text-[var(--color-text-light)]">
                Avaliação Enviada
              </h1>
              <p className="text-sm text-[var(--color-text)]/70 dark:text-[var(--color-text-light)]/70">
                Obrigado, {review.name}, por sua avaliação! Ela será revisada em breve.
              </p>
              <motion.button
                onClick={() => setSubmitted(false)}
                className="btn btn-primary px-4 py-2 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Editar Avaliação
              </motion.button>
            </motion.div>
          ) : review.isApproved ? (
            <motion.div
              key="approved"
              className="text-center space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-lg font-medium text-[var(--color-dark)] dark:text-[var(--color-text-light)]">
                Avaliação Aprovada
              </h1>
              <p className="text-sm text-[var(--color-text)]/70 dark:text-[var(--color-text-light)]/70">
                Obrigado, {review.name}, por avaliar sua experiência em {review.location}!
              </p>
              <div className="flex justify-center gap-4">
                {renderStars(review.rating)}
              </div>
              <p className="text-base italic text-[var(--color-dark)] dark:text-[var(--color-text)]">
                "{review.text}"
              </p>
              <motion.a
                href={typeof window !== 'undefined' ? window.location.origin : '/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full mt-6 inline-block text-center"
                whileHover={{ scale: 1.05, backgroundColor: 'var(--color-accent-dark)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Visitar o Site
              </motion.a>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-lg font-medium text-center text-[var(--color-dark)] dark:text-[var(--color-text-light)]">
                {review.isTokenUsed ? 'Editar Avaliação' : 'Deixe sua Avaliação'}
              </h1>
              <p className="text-sm text-center text-[var(--color-text)]/70 dark:text-[var(--color-text-light)]/70 mt-2">
                {review.isTokenUsed
                  ? `Olá, ${review.name}! Você pode editar sua avaliação de ${review.location} antes da aprovação.`
                  : `Olá, ${review.name}! Por favor, avalie sua experiência em ${review.location}.`}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <motion.div
                  className="flex justify-center gap-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {renderStars()}
                </motion.div>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-[var(--color-dark)] dark:text-[var(--color-text-light)] mb-1"
                  >
                    Comentário
                  </label>
                  <motion.textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-[var(--color-dark)] text-[var(--color-dark)] dark:text-[var(--color-text-light)] border-[var(--color-neutral)]/30 dark:border-[var(--color-gray)]/30 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/50"
                    rows={4}
                    placeholder="Escreva seu comentário aqui..."
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <AnimatePresence mode="wait">
                    {submitting ? (
                      <motion.div
                        key="spinner"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Enviando...
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {review.isTokenUsed ? 'Salvar Alterações' : 'Enviar Avaliação'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
```

    - 📁 dashboard/
      - 📁 appearance/
        - 📄 page.tsx
        
```tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, Heading } from '@/components/ui/Card';
import { Settings, Palette, Template, Globe, Save, Loader2, Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeEditor from '@/components/dashboard/ThemeEditor';
import { RoleGuard } from '@/components/RoleGuard';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { useFeedback } from '@/context/FeedbackContext';

export default function AppearancePage() {
  const { config, updateConfig, loading } = useSiteConfig();
  const { showToast } = useFeedback();
  
  const [activeTab, setActiveTab] = useState<'theme' | 'template' | 'general'>('theme');
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark' | 'system'>(
    (config.defaultTheme as 'light' | 'dark' | 'system') || 'light'
  );
  const [templateSelection, setTemplateSelection] = useState(config.activeTemplate || 'default');
  const [siteName, setSiteName] = useState(config.siteName || 'FH Resolve');
  const [siteDescription, setSiteDescription] = useState(
    config.siteDescription || 'Serviços profissionais de manutenção residencial em Florianópolis'
  );
  const [saving, setSaving] = useState(false);

  // Atualizar estados quando as configurações carregarem
  useEffect(() => {
    if (!loading) {
      setDefaultTheme((config.defaultTheme as 'light' | 'dark' | 'system') || 'light');
      setTemplateSelection(config.activeTemplate || 'default');
      setSiteName(config.siteName || 'FH Resolve');
      setSiteDescription(config.siteDescription || 'Serviços profissionais de manutenção residencial em Florianópolis');
    }
  }, [config, loading]);

  // Salvar configurações gerais
  const saveGeneralSettings = async () => {
    setSaving(true);
    try {
      await updateConfig({
        defaultTheme,
        activeTemplate: templateSelection,
        siteName,
        siteDescription
      });
      showToast('Configurações de aparência salvas com sucesso', 'success');
    } catch (error) {
      console.error('Erro ao salvar configurações de aparência:', error);
      showToast('Erro ao salvar configurações', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Templates disponíveis
  const templates = [
    {
      id: 'default',
      name: 'Padrão',
      description: 'Layout padrão com header, seções principais e footer'
    },
    {
      id: 'minimal',
      name: 'Minimalista',
      description: 'Design minimalista com foco em conteúdo'
    },
    {
      id: 'corporate',
      name: 'Corporativo',
      description: 'Design profissional para empresas'
    },
  ];

  // Verificar se ainda está carregando
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Heading
            title="Aparência"
            description="Personalize a aparência e o tema do seu site"
          />
          
          <motion.button
            onClick={saveGeneralSettings}
            disabled={saving}
            className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md flex items-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Salvar Alterações</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar de navegação */}
          <div className="col-span-12 lg:col-span-3">
            <Card>
              <div className="p-2">
                <button
                  onClick={() => setActiveTab('theme')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'theme'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Palette size={16} className="inline-block mr-2" />
                  Editor de Tema
                </button>

                <button
                  onClick={() => setActiveTab('template')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'template'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Template size={16} className="inline-block mr-2" />
                  Templates
                </button>

                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'general'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Settings size={16} className="inline-block mr-2" />
                  Configurações Gerais
                </button>
              </div>
            </Card>
          </div>

          {/* Painéis de configuração */}
          <div className="col-span-12 lg:col-span-9">
            {activeTab === 'theme' && (
              <ThemeEditor />
            )}
            
            {activeTab === 'template' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Seleção de Template
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`border p-4 rounded-lg cursor-pointer ${
                          templateSelection === template.id
                            ? 'border-2 border-accent bg-accent/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-accent hover:bg-accent/5'
                        }`}
                        onClick={() => setTemplateSelection(template.id)}
                      >
                        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md mb-3 flex items-center justify-center">
                          <Template size={32} className="text-gray-400" />
                        </div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {template.description}
                        </p>
                        {templateSelection === template.id && (
                          <div className="mt-2 text-xs bg-accent text-white py-1 px-2 rounded inline-block">
                            Selecionado
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border-l-4 border-blue-500">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      O template selecionado define o layout e a estrutura geral do seu site.
                      Alterações nesta configuração afetam diretamente a aparência do site para todos os visitantes.
                    </p>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'general' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Configurações Gerais
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome do Site
                      </label>
                      <input
                        id="siteName"
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição do Site
                      </label>
                      <textarea
                        id="siteDescription"
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Esta descrição é usada para SEO e pode aparecer nos resultados de busca.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="defaultTheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tema Padrão do Site
                      </label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        <div
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer border ${
                            defaultTheme === 'light'
                              ? 'border-accent bg-accent/5'
                              : 'border-gray-200 dark:border-gray-700 hover:border-accent hover:bg-accent/5'
                          }`}
                          onClick={() => setDefaultTheme('light')}
                        >
                          <Sun size={24} className="text-orange-400" />
                          <span className="text-sm font-medium">Claro</span>
                        </div>
                        
                        <div
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer border ${
                            defaultTheme === 'dark'
                              ? 'border-accent bg-accent/5'
                              : 'border-gray-200 dark:border-gray-700 hover:border-accent hover:bg-accent/5'
                          }`}
                          onClick={() => setDefaultTheme('dark')}
                        >
                          <Moon size={24} className="text-indigo-400" />
                          <span className="text-sm font-medium">Escuro</span>
                        </div>
                        
                        <div
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer border ${
                            defaultTheme === 'system'
                              ? 'border-accent bg-accent/5'
                              : 'border-gray-200 dark:border-gray-700 hover:border-accent hover:bg-accent/5'
                          }`}
                          onClick={() => setDefaultTheme('system')}
                        >
                          <Monitor size={24} className="text-gray-400" />
                          <span className="text-sm font-medium">Sistema</span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Define o tema padrão para novos visitantes. Os usuários ainda poderão alternar entre temas.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
```

      - 📁 blog/
        - 📁 new/
          - 📄 page.tsx
          
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

import { Card, Heading } from '@/components/ui/Card';
import { Loader2, ArrowLeft, Upload, X, Calendar, Tag, Eye } from 'lucide-react';

const blogSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  excerpt: z.string().min(1, 'Resumo é obrigatório').max(300, 'Resumo deve ter no máximo 300 caracteres'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  tags: z.string().transform(val => val ? val.split(',').map(tag => tag.trim()) : []),
  isPublished: z.boolean().default(false),
  publishDate: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<{ url: string; driveId: string; } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      isPublished: false,
      publishDate: new Date().toISOString().split('T')[0],
    },
  });

  const watchedContent = watch('content');
  const watchedTitle = watch('title');
  const watchedExcerpt = watch('excerpt');

  const onSubmit = async (data: BlogFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/blog', {
        ...data,
        coverImage,
      });
      
      toast.success('Post criado com sucesso');
      router.push('/dashboard/blog');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast.error('Erro ao criar post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para gerar o slug automaticamente a partir do título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-'); // Remove hífens consecutivos
  };

  // Função simulada para upload de imagens para o Google Drive
  const handleImageUpload = () => {
    // Simulando uma imagem do Google Drive
    const newImage = {
      url: 'https://via.placeholder.com/800x400',
      driveId: `mockid-${Date.now()}`,
    };
    setCoverImage(newImage);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
          <Heading title="Novo Post" description="Adicione um novo post ao blog" />
        </div>
        
        <button
          type="button"
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Eye size={16} />
          {previewMode ? 'Editar' : 'Visualizar'}
        </button>
      </div>

      {previewMode ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {coverImage && (
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700">
              <img
                src={coverImage.url}
                alt={watchedTitle}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{watchedTitle || 'Título do Post'}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {watch('category') && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs">
                  {watch('category')}
                </span>
              )}
              
              {watch('tags') && watch('tags').toString().split(',').map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
                  {tag.trim()}
                </span>
              ))}
            </div>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              {watchedExcerpt || 'Resumo do post...'}
            </p>
            <div className="prose dark:prose-invert max-w-none">
              {watchedContent ? (
                <div dangerouslySetInnerHTML={{ __html: watchedContent.replace(/\n/g, '<br />') }} />
              ) : (
                <p>Conteúdo do post...</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="space-y-4 p-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Título
                    </label>
                    <input
                      id="title"
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Digite o título do post"
                      {...register('title', {
                        onChange: (e) => {
                          const currentSlug = watch('slug');
                          if (!currentSlug) {
                            // Se o slug estiver vazio, gera automaticamente
                            const newSlug = generateSlug(e.target.value);
                            // @ts-ignore - setValue não está no tipo, mas funciona
                            setValue('slug', newSlug);
                          }
                        }
                      })}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Slug
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                        /blog/
                      </span>
                      <input
                        id="slug"
                        type="text"
                        className={`flex-1 min-w-0 block w-full px-3 py-2 border rounded-none rounded-r-md dark:bg-gray-700 dark:text-white ${
                          errors.slug ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="titulo-do-post"
                        {...register('slug')}
                      />
                    </div>
                    {errors.slug && (
                      <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      URL amigável para o post. Use apenas letras minúsculas, números e hífens.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Resumo
                    </label>
                    <textarea
                      id="excerpt"
                      rows={2}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.excerpt ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Digite um breve resumo"
                      {...register('excerpt')}
                    />
                    {errors.excerpt && (
                      <p className="mt-1 text-sm text-red-500">{errors.excerpt.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Máximo de 300 caracteres. Esse texto aparecerá nos previews e compartilhamentos.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Conteúdo
                    </label>
                    <textarea
                      id="content"
                      rows={15}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white font-mono ${
                        errors.content ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Conteúdo do post em markdown ou HTML"
                      {...register('content')}
                    />
                    {errors.content && (
                      <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
                    )}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Imagem de Capa</h3>
                  <div className="space-y-4">
                    {coverImage ? (
                      <div className="relative rounded-md overflow-hidden">
                        <img
                          src={coverImage.url}
                          alt="Imagem de capa"
                          className="w-full h-48 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setCoverImage(null)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="w-full h-48 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-sm text-gray-500">Upload de Imagem de Capa</span>
                      </button>
                    )}
                    
                    <p className="text-sm text-gray-500">
                      Tamanho recomendado: 1200 x 630 pixels. Formatos suportados: JPG, PNG.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Publicação</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="isPublished"
                        type="checkbox"
                        className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                        {...register('isPublished')}
                      />
                      <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Publicar post
                      </label>
                    </div>
                    
                    <div>
                      <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Data de Publicação
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={16} className="text-gray-400" />
                        </div>
                        <input
                          id="publishDate"
                          type="date"
                          className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                          {...register('publishDate')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Categorização</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Categoria
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Tag size={16} className="text-gray-400" />
                        </div>
                        <input
                          id="category"
                          type="text"
                          className={`pl-10 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                            errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="Ex: Dicas, Tutoriais, etc."
                          {...register('category')}
                        />
                      </div>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tags (separadas por vírgula)
                      </label>
                      <input
                        id="tags"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        placeholder="Ex: reforma, dicas, residencial"
                        {...register('tags')}
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Separe múltiplas tags com vírgulas
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Salvando...
                    </div>
                  ) : (
                    'Salvar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
```

        - 📄 page.tsx
        
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { Plus, Pencil, Trash2, Eye, EyeOff, Calendar, Tag, AlertTriangle, Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: {
    url: string;
    driveId: string;
  };
  isPublished: boolean;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<BlogPost[]>('/api/blog');
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar posts do blog:', error);
      toast.error('Erro ao carregar posts do blog');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/blog/${id}`, {
        isPublished: !currentStatus
      });
      toast.success(currentStatus ? 'Post ocultado' : 'Post publicado');
      fetchPosts();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const confirmDelete = (post: BlogPost) => {
    setSelectedPost(post);
    setShowDeleteConfirm(true);
  };

  const deletePost = async () => {
    if (!selectedPost) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/blog/${selectedPost._id}`);
      toast.success('Post excluído com sucesso');
      setShowDeleteConfirm(false);
      fetchPosts();
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      toast.error('Erro ao excluir post');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não publicado';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Blog" description="Gerencie os posts do blog" />
        <button
          onClick={() => router.push('/dashboard/blog/new')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhum post do blog ainda</p>
            <button
              onClick={() => router.push('/dashboard/blog/new')}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Criar Primeiro Post
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Card key={post._id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 aspect-video md:aspect-square bg-gray-200 dark:bg-gray-700 relative">
                  {post.coverImage?.url ? (
                    <img
                      src={post.coverImage.url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Sem imagem
                    </div>
                  )}
                  {!post.isPublished && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                      Rascunho
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">
                      <Tag size={12} className="mr-1" />
                      {post.category}
                    </span>
                    {post.publishDate && (
                      <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(post.publishDate)}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Atualizado em {formatDate(post.updatedAt)}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/blog/${post._id}`)}
                        className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(post)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => togglePublishStatus(post._id, post.isPublished)}
                        className={`p-2 rounded-md ${
                          post.isPublished
                            ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        title={post.isPublished ? 'Publicado' : 'Rascunho'}
                      >
                        {post.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-xl font-medium">Confirmar Exclusão</h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Tem certeza que deseja excluir o post <strong>{selectedPost.title}</strong>? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={deletePost}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

      - 📁 estimates/
        - 📁 new/
          - 📄 page.tsx
          
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

import { Card, Heading } from '@/components/ui/Card';
import { Loader2, ArrowLeft, Plus, Trash2, Calculator, Calendar, Save, CreditCard, CheckCircle } from 'lucide-react';

// Schema para validação
const estimateItemSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  quantity: z.number().positive('Quantidade deve ser maior que zero'),
  unit: z.string().default('un'),
  unitPrice: z.number().min(0, 'Preço não pode ser negativo'),
});

const estimateSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  clientEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  clientPhone: z.string().min(1, 'Telefone do cliente é obrigatório'),
  address: z.string().optional().or(z.literal('')),
  title: z.string().min(1, 'Título do orçamento é obrigatório'),
  description: z.string().optional().or(z.literal('')),
  items: z.array(estimateItemSchema).min(1, 'Adicione pelo menos um item'),
  subtotal: z.number().optional(),
  discount: z.number().min(0, 'Desconto não pode ser negativo').optional(),
  tax: z.number().min(0, 'Taxas não podem ser negativas').optional(),
  total: z.number().optional(),
  notes: z.string().optional().or(z.literal('')),
  paymentTerms: z.string().optional().or(z.literal('')),
  validUntil: z.string().optional().or(z.literal('')),
});

type EstimateFormValues = z.infer<typeof estimateSchema>;

export default function NewEstimatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      address: '',
      title: '',
      description: '',
      items: [{ description: '', quantity: 1, unit: 'un', unitPrice: 0 }],
      discount: 0,
      tax: 0,
      notes: '',
      paymentTerms: 'Pagamento em até 12x no cartão ou via PIX/transferência bancária.',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 dias a partir de hoje
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  
  // Observar os itens para calcular o subtotal
  const items = watch('items');
  const discount = watch('discount') || 0;
  const tax = watch('tax') || 0;
  
  // Calcular subtotal sempre que os itens mudarem
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      return sum + (item.quantity || 0) * (item.unitPrice || 0);
    }, 0);
  };
  
  // Calcular o total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    let total = subtotal;
    
    if (discount) {
      total -= discount;
    }
    
    if (tax) {
      total += tax;
    }
    
    return total;
  };
  
  const onSubmit = async (data: EstimateFormValues) => {
    // Adicionar os totais calculados
    data.subtotal = calculateSubtotal();
    data.total = calculateTotal();
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/estimates', data);
      
      toast.success('Orçamento criado com sucesso');
      setGeneratedLink(response.data.estimateLink);
      setShowLinkModal(true);
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
      toast.error('Erro ao criar orçamento');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const addItem = () => {
    append({ description: '', quantity: 1, unit: 'un', unitPrice: 0 });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência');
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  useEffect(() => {
    // Verificar se há um parâmetro 'from_quote' na URL
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get('from_quote');
    
    if (quoteId) {
      // Buscar os dados do pedido
      const fetchQuote = async () => {
        try {
          const response = await axios.get(`/api/quotes/${quoteId}`);
          const quote = response.data;
          
          // Preencher o formulário com os dados do pedido
          setValue('clientName', quote.name);
          setValue('clientPhone', quote.phone);
          setValue('title', `Orçamento para ${quote.name}`);
          setValue('description', quote.message);
          
          toast.success('Dados do pedido carregados');
        } catch (error) {
          console.error('Erro ao carregar dados do pedido:', error);
          toast.error('Erro ao carregar dados do pedido');
        }
      };
      
      fetchQuote();
    }
  }, [setValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
        <Heading title="Novo Orçamento" description="Crie um orçamento detalhado para seu cliente" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados do Cliente */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Dados do Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome do Cliente
                    </label>
                    <input
                      id="clientName"
                      {...register('clientName')}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.clientName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.clientName && (
                      <p className="mt-1 text-sm text-red-500">{errors.clientName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Telefone
                    </label>
                    <input
                      id="clientPhone"
                      {...register('clientPhone')}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.clientPhone ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.clientPhone && (
                      <p className="mt-1 text-sm text-red-500">{errors.clientPhone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email (opcional)
                    </label>
                    <input
                      id="clientEmail"
                      type="email"
                      {...register('clientEmail')}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.clientEmail ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.clientEmail && (
                      <p className="mt-1 text-sm text-red-500">{errors.clientEmail.message}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Endereço (opcional)
                    </label>
                    <input
                      id="address"
                      {...register('address')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Detalhes do Orçamento */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Detalhes do Orçamento</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Título do Orçamento
                    </label>
                    <input
                      id="title"
                      {...register('title')}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Ex: Reforma do Banheiro"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descrição (opcional)
                    </label>
                    <textarea
                      id="description"
                      {...register('description')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Descrição detalhada do serviço a ser realizado"
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Itens do Orçamento */}
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Itens do Orçamento</h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="px-3 py-1 bg-accent hover:bg-accent/90 text-white rounded flex items-center gap-1 text-sm"
                  >
                    <Plus size={16} />
                    Adicionar Item
                  </button>
                </div>
                
                {errors.items?.message && (
                  <p className="mb-4 text-sm text-red-500">{errors.items.message}</p>
                )}
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                          Qtd
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                          Un
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                          Preço Un
                        </th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                          Total
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                          <span className="sr-only">Ações</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {fields.map((field, index) => (
                        <tr key={field.id}>
                          <td className="px-3 py-2">
                            <input
                              {...register(`items.${index}.description` as const)}
                              className={`w-full px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-white text-sm ${
                                errors.items?.[index]?.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              placeholder="Descrição do item"
                            />
                            {errors.items?.[index]?.description && (
                              <p className="mt-1 text-xs text-red-500">{errors.items?.[index]?.description?.message}</p>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                              className={`w-full px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-white text-sm ${
                                errors.items?.[index]?.quantity ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              min="0.01"
                              step="0.01"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              {...register(`items.${index}.unit` as const)}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                              placeholder="un"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })}
                              className={`w-full px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-white text-sm ${
                                errors.items?.[index]?.unitPrice ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="px-3 py-2 text-right text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {formatCurrency((items[index]?.quantity || 0) * (items[index]?.unitPrice || 0))}
                          </td>
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 focus:outline-none"
                              disabled={fields.length === 1}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={4} className="px-3 py-2 text-right font-medium">
                          Subtotal:
                        </td>
                        <td className="px-3 py-2 text-right font-medium">
                          {formatCurrency(calculateSubtotal())}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-3 py-2 text-right font-medium">
                          Desconto:
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            {...register('discount', { valueAsNumber: true })}
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2 text-right text-sm text-gray-700 dark:text-gray-300">
                          -{formatCurrency(discount)}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-3 py-2 text-right font-medium">
                          Taxas/Adicionais:
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            {...register('tax', { valueAsNumber: true })}
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2 text-right text-sm text-gray-700 dark:text-gray-300">
                          +{formatCurrency(tax)}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="px-3 py-3 text-right font-bold text-base">
                          Total:
                        </td>
                        <td className="px-3 py-3 text-right font-bold text-base text-accent">
                          {formatCurrency(calculateTotal())}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar com informações adicionais */}
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Informações Adicionais</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Válido até
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="validUntil"
                        type="date"
                        {...register('validUntil')}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Condições de Pagamento
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard size={16} className="text-gray-400" />
                      </div>
                      <textarea
                        id="paymentTerms"
                        {...register('paymentTerms')}
                        rows={3}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Observações
                    </label>
                    <textarea
                      id="notes"
                      {...register('notes')}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Informações adicionais sobre o orçamento"
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Salvar
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Calculator className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Os subtotais e o total são calculados automaticamente com base nos itens e valores inseridos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      
      {/* Modal de orçamento criado com link */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Orçamento Criado com Sucesso
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                O orçamento foi criado e está pronto para ser compartilhado com o cliente.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link do orçamento:
                </p>
                <div className="flex">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-white text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-2 bg-accent hover:bg-accent/90 text-white rounded-r-md flex items-center gap-1"
                    title="Copiar link"
                  >
                    {linkCopied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => router.push('/dashboard/estimates')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Ver Lista
                </button>
                <button
                  onClick={() => router.push(`/orcamento/${generatedLink.split('/').pop()}`)}
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md"
                >
                  Visualizar Orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

        - 📄 page.tsx
        
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { Plus, Copy, CheckCircle, FileText, Edit, Trash2, Send, Eye, AlertTriangle, Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface Estimate {
  _id: string;
  clientName: string;
  clientPhone: string;
  title: string;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  token: string;
  createdAt: string;
  updatedAt: string;
}

export default function EstimatesPage() {
  const router = useRouter();
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchEstimates();
  }, []);

  const fetchEstimates = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Estimate[]>('/api/estimates');
      setEstimates(response.data);
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
      toast.error('Erro ao carregar orçamentos');
    } finally {
      setLoading(false);
    }
  };

  const deleteEstimate = async () => {
    if (!selectedEstimate) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/estimates/${selectedEstimate._id}`);
      toast.success('Orçamento excluído com sucesso');
      setShowDeleteConfirm(false);
      fetchEstimates();
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      toast.error('Erro ao excluir orçamento');
    } finally {
      setDeleting(false);
    }
  };

  const updateStatus = async (id: string, status: Estimate['status']) => {
    try {
      await axios.put(`/api/estimates/${id}/status`, { status });
      toast.success('Status atualizado com sucesso');
      fetchEstimates();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  const shareEstimate = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
    setShowShareModal(true);
    setLinkCopied(false);
  };

  const copyToClipboard = () => {
    if (!selectedEstimate) return;
    
    const link = `${window.location.origin}/orcamento/${selectedEstimate.token}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência');
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const sendEstimateEmail = async () => {
    if (!selectedEstimate) return;
    
    setSendingEmail(true);
    try {
      // Esta API ainda não existe, você precisará implementá-la
      // await axios.post(`/api/estimates/${selectedEstimate._id}/send`);
      await updateStatus(selectedEstimate._id, 'sent');
      toast.success('Orçamento enviado com sucesso');
      setShowShareModal(false);
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error);
      toast.error('Erro ao enviar orçamento');
    } finally {
      setSendingEmail(false);
    }
  };

  const getStatusBadge = (status: Estimate['status']) => {
    const statusConfig = {
      draft: { label: 'Rascunho', class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
      sent: { label: 'Enviado', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      accepted: { label: 'Aceito', class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      rejected: { label: 'Recusado', class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
      expired: { label: 'Expirado', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status].class}`}>
        {statusConfig[status].label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Orçamentos" description="Crie e gerencie orçamentos para clientes" />
        <button
          onClick={() => router.push('/dashboard/estimates/new')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Orçamento
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : estimates.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhum orçamento encontrado</p>
            <button
              onClick={() => router.push('/dashboard/estimates/new')}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Criar Primeiro Orçamento
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {estimates.map((estimate) => (
                  <tr key={estimate._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {estimate.clientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {estimate.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(estimate.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(estimate.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(estimate.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/estimates/${estimate._id}`)}
                          className="text-gray-500 hover:text-accent"
                          title="Ver orçamento"
                        >
                          <Eye size={16} />
                        </button>
                        {estimate.status === 'draft' && (
                          <>
                            <button
                              onClick={() => router.push(`/dashboard/estimates/${estimate._id}/edit`)}
                              className="text-gray-500 hover:text-accent"
                              title="Editar"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEstimate(estimate);
                                setShowDeleteConfirm(true);
                              }}
                              className="text-gray-500 hover:text-red-500"
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                        {(estimate.status === 'draft' || estimate.status === 'sent') && (
                          <button
                            onClick={() => shareEstimate(estimate)}
                            className="text-gray-500 hover:text-green-500"
                            title="Compartilhar"
                          >
                            <Send size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && selectedEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-xl font-medium">Confirmar Exclusão</h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Tem certeza que deseja excluir o orçamento <strong>{selectedEstimate.title}</strong> para {selectedEstimate.clientName}? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={deleteEstimate}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de compartilhamento */}
      {showShareModal && selectedEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Compartilhar Orçamento</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Link para visualização do orçamento:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/orcamento/${selectedEstimate.token}`}
                      readOnly
                      className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-accent hover:bg-accent/10 rounded-md"
                      title="Copiar link"
                    >
                      {linkCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
                
                {selectedEstimate.status === 'draft' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          Este orçamento está em rascunho. Deseja alterá-lo para "Enviado" ao compartilhar?
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Fechar
                </button>
                {selectedEstimate.status === 'draft' && (
                  <button
                    onClick={() => updateStatus(selectedEstimate._id, 'sent')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Marcar como Enviado
                  </button>
                )}
                {selectedEstimate.clientEmail && (
                  <button
                    onClick={sendEstimateEmail}
                    disabled={sendingEmail}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {sendingEmail ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar por Email
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

      - 📁 portfolio/
        - 📁 new/
          - 📄 page.tsx
          
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';

import { Card,Heading } from '@/components/ui/Card';
import { Loader2, ArrowLeft, Upload, X } from 'lucide-react';

const portfolioSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  category: z.enum(['elétrica', 'hidráulica', 'montagem', 'pintura', 'geral']),
  location: z.string().min(1, 'Localização é obrigatória'),
  date: z.string().min(1, 'Data é obrigatória'),
  details: z.string().optional(),
  isPublished: z.boolean().default(true),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

export default function NewPortfolioPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<{ url: string; driveId: string; caption: string }[]>([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      category: 'geral',
      isPublished: true,
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: PortfolioFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/portfolio', {
        ...data,
        images,
      });
      
      toast.success('Item adicionado com sucesso');
      router.push('/dashboard/portfolio');
    } catch (error) {
      console.error('Erro ao criar item:', error);
      toast.error('Erro ao criar item');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função simulada para upload de imagens para o Google Drive
  // Na implementação real, isso envolveria uma API para fazer o upload para o Drive
  const handleImageUpload = () => {
    // Simulando uma imagem do Google Drive
    const newImage = {
      url: 'https://via.placeholder.com/800x600',
      driveId: `mockid-${Date.now()}`,
      caption: '',
    };
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
        <Heading title="Novo Item de Portfólio" description="Adicione um novo projeto ao portfólio" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Título
                  </label>
                  <input
                    id="title"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o título do projeto"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição Curta
                  </label>
                  <textarea
                    id="description"
                    rows={2}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite uma breve descrição"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Detalhes (opcional)
                  </label>
                  <textarea
                    id="details"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    placeholder="Digite detalhes adicionais sobre o projeto"
                    {...register('details')}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-medium mb-4">Imagens</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                      <img
                        src={image.url}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="aspect-video flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Upload de Imagem</span>
                  </button>
                </div>
                
                <p className="text-sm text-gray-500">
                  Adicione imagens do projeto. A primeira imagem será usada como capa.
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-medium mb-4">Informações</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Categoria
                  </label>
                  <select
                    id="category"
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    {...register('category')}
                  >
                    <option value="elétrica">Elétrica</option>
                    <option value="hidráulica">Hidráulica</option>
                    <option value="montagem">Montagem</option>
                    <option value="pintura">Pintura</option>
                    <option value="geral">Geral</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Localização
                  </label>
                  <input
                    id="location"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.location ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Ex: Jurerê, Florianópolis"
                    {...register('location')}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data
                  </label>
                  <input
                    id="date"
                    type="date"
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.date ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    {...register('date')}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="isPublished"
                    type="checkbox"
                    className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    {...register('isPublished')}
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Publicar item
                  </label>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Salvando...
                  </div>
                ) : (
                  'Salvar'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
```

        - 📄 page.tsx
        
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card,Heading} from '@/components/ui/Card';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  isPublished: boolean;
  images: { url: string; driveId: string; caption: string }[];
}

export default function PortfolioPage() {
  const router = useRouter();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/portfolio');
      setPortfolioItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens do portfólio:', error);
      toast.error('Erro ao carregar portfólio');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/portfolio/${id}`, {
        isPublished: !currentStatus
      });
      toast.success(currentStatus ? 'Item ocultado' : 'Item publicado');
      fetchPortfolioItems();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const deletePortfolioItem = async (id: string) => {
    try {
      await axios.delete(`/api/portfolio/${id}`);
      toast.success('Item excluído com sucesso');
      fetchPortfolioItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      toast.error('Erro ao excluir item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Portfólio" description="Gerencie os itens do portfólio" />
        <button
          onClick={() => router.push('/dashboard/portfolio/new')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Item
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : portfolioItems.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhum item no portfólio ainda</p>
            <button
              onClick={() => router.push('/dashboard/portfolio/new')}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Adicionar Primeiro Item
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item._id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative bg-gray-200 dark:bg-gray-700">
                {item.images?.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Sem imagem
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                    {formatCategory(item.category)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-medium line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{formatDate(item.date)}</span>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/portfolio/${item._id}`)}
                    className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deletePortfolioItem(item._id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <button
                  onClick={() => togglePublishStatus(item._id, item.isPublished)}
                  className={`p-2 rounded-md ${
                    item.isPublished
                      ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={item.isPublished ? 'Publicado' : 'Oculto'}
                >
                  {item.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Funções auxiliares
function getCategoryColor(category: string): string {
  switch (category) {
    case 'elétrica':
      return 'bg-yellow-500 text-white';
    case 'hidráulica':
      return 'bg-blue-500 text-white';
    case 'montagem':
      return 'bg-purple-500 text-white';
    case 'pintura':
      return 'bg-red-500 text-white';
    case 'geral':
    default:
      return 'bg-gray-500 text-white';
  }
}

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  } catch (error) {
    return dateString;
  }
}

```

      - 📁 quotes/
        - 📄 page.tsx
        
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { Check, Clock, Phone, MessageSquare, Loader2, Eye, Filter, Calendar, X, Calculator } from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface Quote {
  _id: string;
  name: string;
  phone: string;
  message: string;
  status: 'novo' | 'em_contato' | 'convertido' | 'encerrado';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function QuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Quote['status'] | 'todos'>('todos');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState<Quote['status']>('novo');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Quote[]>('/api/quotes');
      setQuotes(response.data);
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
      toast.error('Erro ao carregar orçamentos');
    } finally {
      setLoading(false);
    }
  };

  const filteredQuotes = filter === 'todos' 
    ? quotes 
    : quotes.filter(quote => quote.status === filter);

  const openQuoteDetails = (quote: Quote) => {
    setSelectedQuote(quote);
    setNotes(quote.notes || '');
    setNewStatus(quote.status);
    setShowDetailsModal(true);
  };

  const updateQuoteStatus = async () => {
    if (!selectedQuote) return;
    
    setUpdating(true);
    try {
      await axios.put(`/api/quotes/${selectedQuote._id}/status`, {
        status: newStatus,
        notes: notes.trim(),
      });
      
      toast.success('Status atualizado com sucesso');
      fetchQuotes();
      setShowDetailsModal(false);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    } finally {
      setUpdating(false);
    }
  };

  const generateEstimate = (quote: Quote) => {
    router.push(`/dashboard/estimates/new?from_quote=${quote._id}`);
  };

  const getStatusBadge = (status: Quote['status']) => {
    const statusConfig = {
      novo: { label: 'Novo', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      em_contato: { label: 'Em Contato', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
      convertido: { label: 'Convertido', class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      encerrado: { label: 'Encerrado', class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' }
    };
    
    return (
      <span className={`text-xs px-2.5 py-1 rounded-full ${statusConfig[status].class}`}>
        {statusConfig[status].label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatPhone = (phone: string) => {
    // Formata o telefone para o formato (XX) XXXXX-XXXX
    const cleaned = ('' + phone).replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7, 11)}`;
    }
    return phone;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Orçamentos" description="Gerencie os pedidos de orçamento" />
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Quote['status'] | 'todos')}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="todos">Todos os status</option>
              <option value="novo">Novos</option>
              <option value="em_contato">Em contato</option>
              <option value="convertido">Convertidos</option>
              <option value="encerrado">Encerrados</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {filter === 'todos' 
                ? 'Nenhum orçamento encontrado' 
                : `Nenhum orçamento com status "${filter}" encontrado`}
            </p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredQuotes.map((quote) => (
                  <tr key={quote._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {quote.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatPhone(quote.phone)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(quote.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(quote.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => openQuoteDetails(quote)}
                          className="text-accent hover:text-accent-dark"
                          title="Ver detalhes"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => generateEstimate(quote)}
                          className="text-accent hover:text-accent-dark"
                          title="Gerar orçamento"
                        >
                          <Calculator size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Modal de detalhes do orçamento */}
      {showDetailsModal && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4 flex items-center justify-between">
                Detalhes do Orçamento
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Cliente:</span>
                  <span className="font-medium">{selectedQuote.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Telefone:</span>
                  <a 
                    href={`tel:${selectedQuote.phone}`}
                    className="font-medium text-accent hover:underline flex items-center"
                  >
                    {formatPhone(selectedQuote.phone)}
                    <Phone size={16} className="ml-1" />
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">WhatsApp:</span>
                  <a 
                    href={`https://wa.me/${selectedQuote.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-green-500 hover:underline flex items-center"
                  >
                    Enviar mensagem
                    <MessageSquare size={16} className="ml-1" />
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Data:</span>
                  <span className="font-medium flex items-center">
                    {formatDate(selectedQuote.createdAt)}
                    <Calendar size={16} className="ml-1 text-gray-500" />
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Status atual:</span>
                  {getStatusBadge(selectedQuote.status)}
                </div>
                <div className="py-2">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Mensagem:</p>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedQuote.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Atualizar Status
                  </label>
                  <select
                    id="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Quote['status'])}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="novo">Novo</option>
                    <option value="em_contato">Em Contato</option>
                    <option value="convertido">Convertido</option>
                    <option value="encerrado">Encerrado</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Anotações
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    placeholder="Adicione anotações sobre este orçamento"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => generateEstimate(selectedQuote)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center gap-2"
                  >
                    <Calculator className="h-4 w-4" />
                    Gerar Orçamento Formal
                  </button>
                  <div className="flex justify-end space-x-3 sm:ml-auto">
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={updateQuoteStatus}
                      disabled={updating}
                      className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {updating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

      - 📁 reviews/
        - 📄 page.tsx
        
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { Star, ThumbsUp, ThumbsDown, Plus, Copy, CheckCircle, Link as LinkIcon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Review {
  _id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  isApproved: boolean;
  createdAt: string;
  isTokenUsed: boolean;
}

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', location: '' });
  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/reviews', { withCredentials: true });
      setReviews(response.data);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      toast.error('Erro ao carregar avaliações');
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (id: string) => {
    try {
      await axios.post(`/api/reviews/${id}/approve`, { approve: true }, { withCredentials: true });
      toast.success('Avaliação aprovada com sucesso');
      fetchReviews();
    } catch (error) {
      console.error('Erro ao aprovar avaliação:', error);
      toast.error('Erro ao aprovar avaliação');
    }
  };

  const rejectReview = async (id: string) => {
    try {
      await axios.post(`/api/reviews/${id}/approve`, { approve: false }, { withCredentials: true });
      toast.success('Avaliação rejeitada com sucesso');
      fetchReviews();
    } catch (error) {
      console.error('Erro ao rejeitar avaliação:', error);
      toast.error('Erro ao rejeitar avaliação');
    }
  };

  const generateReviewLink = async () => {
    if (!newReview.name.trim() || !newReview.location.trim()) {
      toast.error('Nome e localização não podem estar vazios');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.post(
        '/api/reviews/generate-token',
        {
          name: newReview.name.trim(),
          location: newReview.location.trim(),
        },
        { withCredentials: true } // Enviar cookies de autenticação
      );

      setGeneratedLink(response.data.reviewLink);
      toast.success('Link gerado com sucesso');
    } catch (error: any) {
      console.error('Erro ao gerar link:', error);
      const errorMessage =
        error.response?.data?.error || 'Erro ao gerar link de avaliação';
      const details = error.response?.data?.details
        ? `: ${JSON.stringify(error.response.data.details)}`
        : '';
      toast.error(`${errorMessage}${details}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência');
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Avaliações" description="Gerencie as avaliações de clientes" />
        <button
          onClick={() => setShowGenerateModal(true)}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Gerar Link
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : reviews.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhuma avaliação ainda</p>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Gerar Link para Avaliação
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review._id} className={review.isTokenUsed ? '' : 'border-dashed border-amber-500'}>
              <div className="p-4">
                {!review.isTokenUsed ? (
                  <div className="text-center py-4">
                    <p className="font-medium mb-2">Link enviado para {review.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Aguardando cliente completar a avaliação
                    </p>
                    <div className="text-amber-500 animate-pulse flex items-center justify-center gap-2">
                      <LinkIcon size={16} />
                      <span className="text-sm">Link ativo</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{review.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{review.location}</p>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          review.isApproved
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {review.isApproved ? 'Aprovada' : 'Pendente'}
                      </div>
                    </div>
                    <div className="flex my-3">{renderStars(review.rating)}</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">"{review.text}"</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    {!review.isApproved && (
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => rejectReview(review._id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                          title="Rejeitar"
                        >
                          <ThumbsDown size={16} />
                        </button>
                        <button
                          onClick={() => approveReview(review._id)}
                          className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                          title="Aprovar"
                        >
                          <ThumbsUp size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal para gerar link de avaliação */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Gerar Link para Avaliação</h2>
              {generatedLink ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Link gerado com sucesso! Compartilhe com o cliente:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={generatedLink}
                        readOnly
                        className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-accent hover:bg-accent/10 rounded-md"
                        title="Copiar link"
                      >
                        {linkCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setShowGenerateModal(false);
                        setGeneratedLink('');
                        setNewReview({ name: '', location: '' });
                        fetchReviews();
                      }}
                      className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md"
                    >
                      Concluir
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Nome do Cliente
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Digite o nome do cliente"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Localização
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Ex: Jurerê, Florianópolis"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowGenerateModal(false);
                        setNewReview({ name: '', location: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={generateReviewLink}
                      disabled={isGenerating || !newReview.name.trim() || !newReview.location.trim()}
                      className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Gerando...
                        </>
                      ) : (
                        'Gerar Link'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

      - 📁 settings/
        - 📄 page.tsx
        
```tsx
// src/app/dashboard/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, Heading } from '@/components/ui/Card';
import { Save, Loader2, CheckCircle, AlertTriangle, Lock, Globe, Moon, Sun, Monitor } from 'lucide-react';
import axios from '@/lib/axios';
import { RoleGuard } from '@/components/RoleGuard';

import { useTheme } from '@/context/ThemeContext';
import { useFeedback } from '@/context/FeedbackContext';

interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  defaultTheme: 'light' | 'dark' | 'system';
  analyticsId: string;
  maintenanceMode: boolean;
}

export default function SettingsPage() {
  const { showToast } = useFeedback();
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState<SettingsData>({
    siteName: 'FH Resolve',
    siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
    contactEmail: 'contato@fhresolve.com.br',
    contactPhone: '48991919791',
    socialMedia: {
      instagram: '',
      facebook: '',
      whatsapp: '48991919791',
    },
    defaultTheme: 'light',
    analyticsId: '',
    maintenanceMode: false,
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'contact' | 'advanced'>('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/settings');
      
      if (response.data) {
        setSettings({
          ...settings,
          ...response.data
        });
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      showToast('Erro ao carregar configurações', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await axios.post('/api/settings', settings);
      
      if (response.data) {
        showToast('Configurações salvas com sucesso', 'success');
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      showToast('Erro ao salvar configurações', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: (e.target as HTMLInputElement).type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : value
      }));
    }
  };

  const handleSiteModeChange = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      maintenanceMode: checked
    }));
  };

  // Aplica o tema do dashboard imediatamente ao mudar
  const handleDashboardThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    showToast(`Tema do dashboard alterado para ${newTheme === 'light' ? 'claro' : 'escuro'}`, 'success');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Heading title="Configurações" description="Gerencie as configurações do site" />
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Salvando...
              </>
            ) : saved ? (
              <>
                <CheckCircle size={16} />
                Salvo!
              </>
            ) : (
              <>
                <Save size={16} />
                Salvar Alterações
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar de navegação */}
          <div className="col-span-12 lg:col-span-3">
            <Card>
              <div className="p-2">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'general'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Globe size={16} className="inline-block mr-2" />
                  Geral
                </button>

                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'appearance'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Moon size={16} className="inline-block mr-2" />
                  Aparência
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'contact'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Globe size={16} className="inline-block mr-2" />
                  Contato
                </button>

                <button
                  onClick={() => setActiveTab('advanced')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'advanced'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Lock size={16} className="inline-block mr-2" />
                  Avançado
                </button>
              </div>
            </Card>
          </div>

          {/* Painéis de configuração */}
          <div className="col-span-12 lg:col-span-9">
            {activeTab === 'general' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Configurações Gerais
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome do Site
                      </label>
                      <input
                        id="siteName"
                        name="siteName"
                        type="text"
                        value={settings.siteName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição do Site
                      </label>
                      <textarea
                        id="siteDescription"
                        name="siteDescription"
                        value={settings.siteDescription}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Essa descrição é usada em meta tags para SEO.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'appearance' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Configurações de Aparência
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Tema do Dashboard */}
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="text-md font-medium mb-4">Tema do Dashboard</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                          <span className="text-sm">
                            O dashboard está usando o tema {theme === 'light' ? 'claro' : 'escuro'}
                          </span>
                        </div>
                        <button
                          onClick={handleDashboardThemeChange}
                          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Alternar para {theme === 'light' ? 'escuro' : 'claro'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Tema Padrão do Site */}
                    <div>
                      <label htmlFor="defaultTheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tema Padrão do Site
                      </label>
                      <div className="relative">
                        <select
                          id="defaultTheme"
                          name="defaultTheme"
                          value={settings.defaultTheme}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        >
                          <option value="light">Claro</option>
                          <option value="dark">Escuro</option>
                          <option value="system">Preferência do Sistema</option>
                        </select>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        {settings.defaultTheme === 'light' && <Sun size={16} className="text-yellow-500" />}
                        {settings.defaultTheme === 'dark' && <Moon size={16} className="text-blue-500" />}
                        {settings.defaultTheme === 'system' && <Monitor size={16} className="text-gray-500" />}
                        {settings.defaultTheme === 'light' && 'O site usará o tema claro por padrão para novos visitantes.'}
                        {settings.defaultTheme === 'dark' && 'O site usará o tema escuro por padrão para novos visitantes.'}
                        {settings.defaultTheme === 'system' && 'O site usará a preferência do sistema do visitante.'}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'contact' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Informações de Contato
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email de Contato
                      </label>
                      <input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={settings.contactEmail}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Telefone de Contato
                      </label>
                      <input
                        id="contactPhone"
                        name="contactPhone"
                        type="text"
                        value={settings.contactPhone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                      <legend className="text-sm font-medium px-2">Redes Sociais</legend>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="socialMedia.instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Instagram (URL)
                          </label>
                          <input
                            id="socialMedia.instagram"
                            name="socialMedia.instagram"
                            type="url"
                            value={settings.socialMedia.instagram}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            placeholder="https://instagram.com/seuusuario"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="socialMedia.facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Facebook (URL)
                          </label>
                          <input
                            id="socialMedia.facebook"
                            name="socialMedia.facebook"
                            type="url"
                            value={settings.socialMedia.facebook}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            placeholder="https://facebook.com/suapagina"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="socialMedia.whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            WhatsApp (número com DDD)
                          </label>
                          <input
                            id="socialMedia.whatsapp"
                            name="socialMedia.whatsapp"
                            type="text"
                            value={settings.socialMedia.whatsapp}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            placeholder="4899999999"
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'advanced' && (
              <Card>
                <div className="p-6 space-y-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                          Estas configurações avançadas podem afetar o funcionamento do site. Altere apenas se souber o que está fazendo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Configurações Avançadas
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="analyticsId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        ID do Google Analytics
                      </label>
                      <input
                        id="analyticsId"
                        name="analyticsId"
                        type="text"
                        value={settings.analyticsId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        placeholder="G-XXXXXXXX ou UA-XXXXXXXX-X"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Para rastrear visitantes no seu site. Deixe em branco para desativar o Analytics.
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="maintenanceMode"
                        name="maintenanceMode"
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => handleSiteModeChange(e.target.checked)}
                        className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      />
                      <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Modo de Manutenção
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Quando ativado, o site exibirá uma página de "Em Manutenção" para visitantes. Administradores ainda podem acessar o site.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
```

      - 📁 users/
        - 📄 page.tsx
        
```tsx
// src/app/dashboard/users/page.tsx
'use client';

import { useEffect, useState } from 'react';

import { Card,Heading } from '@/components/ui/Card';
import { Plus, Pencil, Trash2, User, Shield, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'viewer',
    });
    setFormErrors({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleCreateUser = async () => {
    // Validação básica
    let hasError = false;
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name) {
      errors.name = 'Nome é obrigatório';
      hasError = true;
    }

    if (!formData.email) {
      errors.email = 'Email é obrigatório';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
      hasError = true;
    }

    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
      hasError = true;
    } else if (formData.password.length < 6) {
      errors.password = 'Senha deve ter no mínimo 6 caracteres';
      hasError = true;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Senhas não coincidem';
      hasError = true;
    }

    setFormErrors(errors);

    if (hasError) return;

    setIsSubmitting(true);

    try {
      await axios.post('/api/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success('Usuário criado com sucesso');
      setShowCreateModal(false);
      resetForm();
      fetchUsers();
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Erro ao criar usuário');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsSubmitting(true);

    try {
      await axios.delete(`/api/users/${selectedUser._id}`);
      toast.success('Usuário excluído com sucesso');
      setShowDeleteConfirm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast.error('Erro ao excluir usuário');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    // Validação básica
    let hasError = false;
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name) {
      errors.name = 'Nome é obrigatório';
      hasError = true;
    }

    if (!formData.email) {
      errors.email = 'Email é obrigatório';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
      hasError = true;
    }

    // Senha é opcional na edição
    if (formData.password && formData.password.length < 6) {
      errors.password = 'Senha deve ter no mínimo 6 caracteres';
      hasError = true;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Senhas não coincidem';
      hasError = true;
    }

    setFormErrors(errors);

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      // Adiciona senha apenas se foi fornecida
      if (formData.password) {
        Object.assign(userData, { password: formData.password });
      }

      await axios.put(`/api/users/${selectedUser._id}`, userData);

      toast.success('Usuário atualizado com sucesso');
      setShowEditModal(false);
      resetForm();
      fetchUsers();
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Erro ao atualizar usuário');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'editor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'viewer':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'editor':
        return 'Editor';
      case 'viewer':
        return 'Visualizador';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Usuários" description="Gerencie os usuários do sistema" />
        <button
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Usuário
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Função
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data de Criação
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          <User size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                        {user.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                        {getRoleText(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setFormData({
                            name: user.name,
                            email: user.email,
                            password: '',
                            confirmPassword: '',
                            role: user.role,
                          });
                          setShowEditModal(true);
                        }}
                        className="text-gray-500 hover:text-accent mr-3"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteConfirm(true);
                        }}
                        className="text-gray-500 hover:text-red-500"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Modal de criação de usuário */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Criar Novo Usuário</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      formErrors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o nome do usuário"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o email do usuário"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      formErrors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite a senha"
                  />
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      formErrors.confirmPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Confirme a senha"
                  />
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Função
                  </label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'editor' | 'viewer' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="viewer">Visualizador</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateUser}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Criando...
                    </div>
                  ) : (
                    'Criar Usuário'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição de usuário */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Editar Usuário</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      formErrors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o nome do usuário"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o email do usuário"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Senha (deixe em branco para não alterar)
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      formErrors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite a nova senha ou deixe em branco"
                  />
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      formErrors.confirmPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Confirme a nova senha"
                  />
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Função
                  </label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'editor' | 'viewer' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="viewer">Visualizador</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateUser}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </div>
                  ) : (
                    'Salvar Alterações'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-xl font-medium">Confirmar Exclusão</h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Tem certeza que deseja excluir o usuário <strong>{selectedUser.name}</strong>? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Excluindo...
                    </div>
                  ) : (
                    'Excluir'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

      - 📁 videos/
        - 📁 new/
          - 📄 page.tsx
          
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

import { Card, Heading } from '@/components/ui/Card';
import { Loader2, ArrowLeft, Upload, X, Play, Tag } from 'lucide-react';

const videoSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  driveId: z.string().min(1, 'ID do Google Drive é obrigatório'),
  isBeforeAfter: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

type VideoFormValues = z.infer<typeof videoSchema>;

export default function NewVideoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState<{ url: string; driveId: string; } | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      driveId: '',
      isBeforeAfter: false,
      isPublished: true,
      order: 0,
    },
  });

  const watchDriveId = watch('driveId');

  const onSubmit = async (data: VideoFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/videos', {
        ...data,
        thumbnail,
      });
      
      toast.success('Vídeo adicionado com sucesso');
      router.push('/dashboard/videos');
    } catch (error) {
      console.error('Erro ao adicionar vídeo:', error);
      toast.error('Erro ao adicionar vídeo');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função simulada para upload de imagens para o Google Drive
  const handleThumbnailUpload = () => {
    // Simulando uma imagem do Google Drive
    const newThumbnail = {
      url: 'https://via.placeholder.com/800x450',
      driveId: `mockid-${Date.now()}`,
    };
    setThumbnail(newThumbnail);
  };

  const testDriveId = () => {
    if (watchDriveId) {
      setVideoPreview(`https://drive.google.com/file/d/${watchDriveId}/preview`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
        <Heading title="Novo Vídeo" description="Adicione um novo vídeo ao site" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="space-y-4 p-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Título
                  </label>
                  <input
                    id="title"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o título do vídeo"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite uma descrição para o vídeo"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="driveId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ID do Google Drive
                  </label>
                  <div className="flex">
                    <input
                      id="driveId"
                      type="text"
                      className={`flex-1 px-3 py-2 border rounded-l-md dark:bg-gray-700 dark:text-white ${
                        errors.driveId ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Ex: 1Abc123DefG4HIjkL5m6N"
                      {...register('driveId')}
                    />
                    <button
                      type="button"
                      onClick={testDriveId}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Testar
                    </button>
                  </div>
                  {errors.driveId && (
                    <p className="mt-1 text-sm text-red-500">{errors.driveId.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    ID do vídeo no Google Drive. Ex: Na URL https://drive.google.com/file/d/1Abc123DefG4HIjkL5m6N/view, o ID é "1Abc123DefG4HIjkL5m6N".
                  </p>
                </div>
              </div>
            </Card>

            {videoPreview && (
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Preview do Vídeo</h3>
                  <div className="relative pb-[56.25%] h-0 bg-black rounded-md overflow-hidden">
                    <iframe
                      src={videoPreview}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Thumbnail</h3>
                <div className="space-y-4">
                  {thumbnail ? (
                    <div className="relative rounded-md overflow-hidden">
                      <img
                        src={thumbnail.url}
                        alt="Thumbnail do vídeo"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setThumbnail(null)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleThumbnailUpload}
                      className="w-full h-48 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Upload size={24} className="text-gray-400" />
                      <span className="text-sm text-gray-500">Upload de Thumbnail</span>
                    </button>
                  )}
                  
                  <p className="text-sm text-gray-500">
                    Tamanho recomendado: 1280 x 720 pixels (16:9). Se não for fornecido, será gerado automaticamente.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Configurações</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Categoria
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="category"
                        type="text"
                        className={`pl-10 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                          errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Ex: Reformas, Instalações, etc."
                        {...register('category')}
                      />
                    </div>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ordem de Exibição
                    </label>
                    <input
                      id="order"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      min="0"
                      step="1"
                      {...register('order', { valueAsNumber: true })}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Os vídeos são exibidos em ordem crescente (0 aparece primeiro)
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="isBeforeAfter"
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      {...register('isBeforeAfter')}
                    />
                    <label htmlFor="isBeforeAfter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      É um vídeo "Antes/Depois"
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="isPublished"
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      {...register('isPublished')}
                    />
                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Publicar vídeo
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Salvando...
                  </div>
                ) : (
                  'Salvar'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
```

        - 📄 page.tsx
        
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { Plus, Pencil, Trash2, Eye, EyeOff, Play, Tag, AlertTriangle, Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface Video {
  _id: string;
  title: string;
  description: string;
  category: string;
  driveId: string;
  thumbnail?: {
    url: string;
    driveId: string;
  };
  isBeforeAfter: boolean;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function VideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Video[]>('/api/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
      toast.error('Erro ao carregar vídeos');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/videos/${id}`, {
        isPublished: !currentStatus
      });
      toast.success(currentStatus ? 'Vídeo ocultado' : 'Vídeo publicado');
      fetchVideos();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const confirmDelete = (video: Video) => {
    setSelectedVideo(video);
    setShowDeleteConfirm(true);
  };

  const deleteVideo = async () => {
    if (!selectedVideo) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/videos/${selectedVideo._id}`);
      toast.success('Vídeo excluído com sucesso');
      setShowDeleteConfirm(false);
      fetchVideos();
    } catch (error) {
      console.error('Erro ao excluir vídeo:', error);
      toast.error('Erro ao excluir vídeo');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Vídeos" description="Gerencie os vídeos do site" />
        <button
          onClick={() => router.push('/dashboard/videos/new')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Vídeo
        </button>
        </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : videos.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhum vídeo ainda</p>
            <button
              onClick={() => router.push('/dashboard/videos/new')}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Adicionar Primeiro Vídeo
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video._id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative bg-gray-200 dark:bg-gray-700 cursor-pointer" onClick={() => setPreviewVideo(video)}>
                {video.thumbnail?.url ? (
                  <img
                    src={video.thumbnail.url}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Sem thumbnail
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                  <Play size={48} className="text-white" />
                </div>
                {!video.isPublished && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                    Não publicado
                  </div>
                )}
                {video.isBeforeAfter && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                    Antes/Depois
                  </div>
                )}
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">
                    <Tag size={12} className="mr-1" />
                    {video.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{video.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/videos/${video._id}`)}
                      className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => confirmDelete(video)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => togglePublishStatus(video._id, video.isPublished)}
                    className={`p-2 rounded-md ${
                      video.isPublished
                        ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title={video.isPublished ? 'Publicado' : 'Não publicado'}
                  >
                    {video.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-xl font-medium">Confirmar Exclusão</h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Tem certeza que deseja excluir o vídeo <strong>{selectedVideo.title}</strong>? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={deleteVideo}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de preview do vídeo */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setPreviewVideo(null)}>
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="relative pb-[56.25%] h-0 bg-black">
              <iframe
                src={`https://drive.google.com/file/d/${previewVideo.driveId}/preview`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg">
              <h3 className="text-lg font-medium mb-2">{previewVideo.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{previewVideo.description}</p>
              <button
                onClick={() => setPreviewVideo(null)}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

      - 📄 layout.tsx
      
```tsx
// src/app/dashboard/layout.tsx
'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Garantir que o componente só renderiza completamente após a montagem no lado do cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Renderização condicional para evitar erros de hidratação
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-card-bg)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    );
  }

  return (
    <SessionProvider>
      <ThemeProvider isDashboard={true}>
        <FeedbackProvider>
          <div className="min-h-screen flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Topbar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </FeedbackProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
```

      - 📄 page.tsx
      
```tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import QuoteModel from '@/models/quote';
import ReviewModel from '@/models/review';
import EstimateModel from '@/models/estimate'; // Importando o modelo que faltava
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Stats } from '@/components/dashboard/Stats';
import Link from 'next/link';
import { ArrowRight, Calculator, Plus } from 'lucide-react';

async function fetchDashboardData() {
  try {
    await dbConnect();
    
    const pendingQuotes = await QuoteModel.countDocuments({ status: 'novo' });
    const recentReviews = await ReviewModel.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });
    
    // Tente buscar os dados de orçamentos, se o modelo estiver disponível
    let estimatesCount = 0;
    let newEstimatesCount = 0;
    let acceptedEstimatesCount = 0;
    
    if (EstimateModel) {
      estimatesCount = await EstimateModel.countDocuments({});
      newEstimatesCount = await EstimateModel.countDocuments({ status: 'draft' });
      acceptedEstimatesCount = await EstimateModel.countDocuments({ status: 'accepted' });
    }
    
    return { 
      pendingQuotes, 
      recentReviews, 
      estimatesCount, 
      newEstimatesCount, 
      acceptedEstimatesCount 
    };
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return { 
      pendingQuotes: 0, 
      recentReviews: 0, 
      estimatesCount: 0, 
      newEstimatesCount: 0, 
      acceptedEstimatesCount: 0 
    };
  }
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return <p className="text-adaptive">Acesso negado</p>;
  }

  const { pendingQuotes, recentReviews, estimatesCount, newEstimatesCount, acceptedEstimatesCount } = await fetchDashboardData();

  return (
    <div className="space-y-6">
      <Heading
        title="Dashboard"
        description="Bem-vindo ao painel administrativo do FH Resolve"
      />
      <Stats />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Orçamentos"
          description="Crie e gerencie orçamentos personalizados"
          footer={
            <p className="text-sm text-adaptive-muted">
              Total: {estimatesCount || 0} orçamentos
            </p>
          }
        >
          {estimatesCount > 0 ? (
            <div className="space-y-3 py-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-adaptive">Novos:</span>
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs font-medium">
                  {newEstimatesCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-adaptive">Aceitos:</span>
                <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full text-xs font-medium">
                  {acceptedEstimatesCount || 0}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <Link href="/dashboard/estimates/new" className="text-accent hover:underline text-sm flex items-center gap-1">
                  <Plus size={14} />
                  Novo Orçamento
                </Link>
                <Link href="/dashboard/estimates" className="text-accent hover:underline text-sm flex items-center gap-1">
                  Ver Todos
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center flex flex-col items-center">
              <Calculator className="h-10 w-10 text-adaptive-muted mb-2" />
              <p className="text-adaptive-secondary mb-3">
                Crie orçamentos detalhados para enviar aos clientes.
              </p>
              <Link href="/dashboard/estimates/new" className="btn btn-primary text-sm px-4 py-2">
                Criar Primeiro Orçamento
              </Link>
            </div>
          )}
        </Card>
        <Card
          title="Orçamentos Recentes"
          description="Veja os pedidos de orçamento mais recentes"
          footer={
            <p className="text-sm text-adaptive-muted">
              Total: {pendingQuotes} orçamentos pendentes
            </p>
          }
        >
          {pendingQuotes > 0 ? (
            <p className="py-10 text-center text-adaptive">
              Lista de orçamentos aqui
            </p>
          ) : (
            <p className="py-10 text-center text-adaptive-secondary">
              Nenhum orçamento pendente
            </p>
          )}
        </Card>
        <Card
          title="Avaliações Recentes"
          description="Veja as últimas avaliações de clientes"
          footer={
            <p className="text-sm text-adaptive-muted">
              Total: {recentReviews} avaliações novas
            </p>
          }
        >
          {recentReviews > 0 ? (
            <p className="py-10 text-center text-adaptive">
              Lista de avaliações aqui
            </p>
          ) : (
            <p className="py-10 text-center text-adaptive-secondary">
              Nenhuma avaliação recente
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
```

    - 📁 login/
      - 📄 page.tsx
      
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      
      if (result?.error) {
        toast.error(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar fazer login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FH Resolve</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Acesse o painel administrativo</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                  errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="seu@email.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                  errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="********"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-accent hover:bg-accent/90 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

```

    - 📁 orcamento/
      - 📁 [token]/
        - 📄 page.tsx
        
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Calendar, CreditCard, Clock, Download, Share2, Loader2 } from 'lucide-react';

interface EstimateItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

interface Estimate {
  _id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  address?: string;
  title: string;
  description?: string;
  items: EstimateItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  notes?: string;
  paymentTerms?: string;
  validUntil?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  token: string;
  createdAt: string;
  updatedAt: string;
}

export default function EstimateView() {
  const { token } = useParams();
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<'accepted' | 'rejected' | null>(null);
  const [updating, setUpdating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/estimates/${token}`);
        setEstimate(response.data);
      } catch (error: any) {
        console.error('Erro ao buscar orçamento:', error);
        setError(error.response?.data?.error || 'Não foi possível carregar o orçamento');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEstimate();
    }
  }, [token]);

  const updateEstimateStatus = async () => {
    if (!estimate || !statusUpdate) return;
    
    setUpdating(true);
    try {
      await axios.put(`/api/estimates/${estimate._id}/status`, {
        status: statusUpdate,
        token: estimate.token, // Para autorização
      });
      
      setEstimate({
        ...estimate,
        status: statusUpdate,
      });
      
      setShowModal(false);
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        // Aqui você poderia mostrar um toast de erro
      } finally {
        setUpdating(false);
        setStatusUpdate(null);
      }
    };
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    };
  
    const formatDate = (dateString?: string) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    };
  
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    };
  
    const getStatusBadge = () => {
      if (!estimate) return null;
      
      const statusConfig = {
        draft: { label: 'Rascunho', color: 'bg-gray-200 text-gray-800' },
        sent: { label: 'Enviado', color: 'bg-blue-100 text-blue-800' },
        accepted: { label: 'Aceito', color: 'bg-green-100 text-green-800' },
        rejected: { label: 'Recusado', color: 'bg-red-100 text-red-800' },
        expired: { label: 'Expirado', color: 'bg-yellow-100 text-yellow-800' },
      };
      
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[estimate.status].color}`}>
          {statusConfig[estimate.status].label}
        </span>
      );
    };
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500">Carregando orçamento...</p>
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Orçamento não encontrado</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Voltar para a página inicial
            </a>
          </div>
        </div>
      );
    }
  
    if (!estimate) {
      return null;
    }
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header com logo e botões de ação */}
        <header className="bg-white shadow-sm py-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                FH
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-semibold">FH Resolve</h1>
                <p className="text-sm text-gray-500">Orçamento Personalizado</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
                aria-label="Compartilhar"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
                aria-label="Imprimir/Baixar"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </header>
  
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Status e ação do orçamento */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{estimate.title}</h2>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Status:</p>
                  {getStatusBadge()}
                </div>
              </div>
              {(estimate.status === 'sent' || estimate.status === 'draft') && (
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setStatusUpdate('accepted');
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1"
                  >
                    <CheckCircle size={16} />
                    Aceitar
                  </button>
                  <button
                    onClick={() => {
                      setStatusUpdate('rejected');
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1"
                  >
                    <XCircle size={16} />
                    Recusar
                  </button>
                </div>
              )}
              {estimate.status === 'accepted' && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 w-full sm:w-auto">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        Orçamento aceito! Entraremos em contato em breve.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {estimate.status === 'rejected' && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full sm:w-auto">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        Orçamento recusado.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
  
          {/* Informações do cliente e do orçamento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Dados do Cliente</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome:</p>
                  <p className="font-medium">{estimate.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone:</p>
                  <p className="font-medium">{estimate.clientPhone}</p>
                </div>
                {estimate.clientEmail && (
                  <div>
                    <p className="text-sm text-gray-500">Email:</p>
                    <p className="font-medium">{estimate.clientEmail}</p>
                  </div>
                )}
                {estimate.address && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500">Endereço:</p>
                    <p className="font-medium">{estimate.address}</p>
                  </div>
                )}
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Detalhes</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Data do Orçamento:</p>
                    <p className="font-medium">{formatDate(estimate.createdAt)}</p>
                  </div>
                </div>
                {estimate.validUntil && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Válido até:</p>
                      <p className="font-medium">{formatDate(estimate.validUntil)}</p>
                    </div>
                  </div>
                )}
                {estimate.paymentTerms && (
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Condições de Pagamento:</p>
                      <p className="font-medium">{estimate.paymentTerms}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
  
          {/* Descrição do orçamento */}
          {estimate.description && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Descrição</h3>
              <p className="text-gray-700 whitespace-pre-line">{estimate.description}</p>
            </div>
          )}
  
          {/* Itens do orçamento */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Itens do Orçamento</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qtd
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Un
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço Unit.
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {estimate.items.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Subtotal:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(estimate.subtotal)}
                    </td>
                  </tr>
                  {estimate.discount && estimate.discount > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        Desconto:
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        -{formatCurrency(estimate.discount)}
                      </td>
                    </tr>
                  )}
                  {estimate.tax && estimate.tax > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        Taxas/Adicionais:
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        +{formatCurrency(estimate.tax)}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-blue-50">
                    <td colSpan={4} className="px-4 py-4 text-base font-bold text-gray-900 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-4 text-base font-bold text-blue-600 text-right">
                      {formatCurrency(estimate.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
  
          {/* Observações */}
          {estimate.notes && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Observações</h3>
              <p className="text-gray-700 whitespace-pre-line">{estimate.notes}</p>
            </div>
          )}
  
          {/* Contato e informações da empresa */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-blue-800">Entre em contato</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-800">Telefone:</p>
                <p className="font-medium text-blue-900">(48) 99191-9791</p>
              </div>
              <div>
                <p className="text-sm text-blue-800">Email:</p>
                <p className="font-medium text-blue-900">contato@fhresolve.com.br</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-blue-800">Endereço:</p>
                <p className="font-medium text-blue-900">Ratones, Florianópolis - SC</p>
              </div>
            </div>
          </div>
        </main>
  
        <footer className="bg-white py-6 mt-8 border-t">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} FH Resolve - Todos os direitos reservados</p>
            <p className="mt-1">CNPJ: 00.000.000/0000-00</p>
          </div>
        </footer>
  
        {/* Modal de confirmação */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              >
                <div className="text-center">
                  {statusUpdate === 'accepted' ? (
                    <>
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aceitar Orçamento</h3>
                      <p className="text-gray-500 mb-6">
                        Ao aceitar este orçamento, você concorda com os termos, valores e condições descritos. Deseja prosseguir?
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Recusar Orçamento</h3>
                      <p className="text-gray-500 mb-6">
                        Tem certeza que deseja recusar este orçamento? Esta ação não pode ser desfeita.
                      </p>
                    </>
                  )}
                  
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={updateEstimateStatus}
                      disabled={updating}
                      className={`px-4 py-2 rounded-md text-white ${
                        statusUpdate === 'accepted'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      } flex items-center gap-2`}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          {statusUpdate === 'accepted' ? 'Confirmar Aceitação' : 'Confirmar Recusa'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
  
        {/* Modal de compartilhamento */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Compartilhar Orçamento</h3>
                <p className="text-gray-500 mb-4">
                  Compartilhe este orçamento copiando o link abaixo:
                </p>
                
                <div className="flex mb-6">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md text-gray-900 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                  >
                    {linkCopied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
```

    - 📄 globals.css
    
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Paleta de cores baseada no design fornecido */
:root {
  /* Cores principais da nova paleta */
  --color-primary: #252525; /* Preto */
  --color-accent: #2B8D9A; /* Azul Turquesa */
  --color-secondary: #8D9192; /* Cinza Médio */
  --color-neutral: #EDEDED; /* Cinza Claro */
  --color-text: #252525; /* Preto para texto */
  --color-text-light: #FFFFFF; /* Branco para texto sobre fundos escuros */
  --color-dark: #252525; /* Preto para fundos escuros */
  --color-light: #FFFFFF; /* Branco para fundos claros */
  --color-gray: #EDEDED; /* Cinza Claro para backgrounds secundários */
  --color-card-bg: #FFFFFF; /* Branco para cards */
  --color-card-text: #252525; /* Preto para texto em cards */
  --color-paralel: #F5F5F5; /* Cinza muito claro para paralax */
  
  /* Adição de tom intermediário */
  --color-accent-dark: #247885; /* Versão mais escura do turquesa para hover */
  
  /* RGB para animações e opacidades */
  --color-accent-rgb: 43, 141, 154; /* Azul Turquesa em RGB */
  --color-secondary-rgb: 141, 145, 146; /* Cinza Médio em RGB */
  --color-neutral-rgb: 237, 237, 237; /* Cinza Claro em RGB */
  
  /* Sistema de espaçamento consistente */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 2.5rem;
  --space-3xl: 3rem;

  /* Elevações para sombras consistentes */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

[data-theme="dark"] {
  /* Tema Escuro com a nova paleta */
  --color-primary: #252525; /* Preto */
  --color-accent: #2B8D9A; /* Azul Turquesa */
  --color-secondary: #8D9192; /* Cinza Médio */
  --color-neutral: #8D9192; /* Cinza Médio para neutro no dark mode */
  --color-text: #FFFFFF; /* Branco para texto no dark mode */
  --color-text-light: #FFFFFF; /* Branco para texto sobre fundos escuros */
  --color-dark: #252525; /* Preto */
  --color-light: #333333; /* Uma versão um pouco mais clara do preto para o fundo */
  --color-gray: #3A3A3A; /* Cinza escuro para backgrounds secundários */
  --color-paralel: #EDEDED; /* Cinza claro */
  --color-card-bg: #333333; /* Fundo de cards no dark mode */
  --color-card-text: #FFFFFF; /* Texto branco para cards no dark mode */
  
  /* Adição de tom intermediário */
  --color-accent-dark: #247885; /* Versão mais escura do turquesa para hover */
}

/* Definindo fontes */
body {
  font-family: 'Inter', sans-serif;
  color: var(--color-text);
  background-color: var(--color-light);
  min-height: 100vh;
  margin: 0;
  overflow-y: auto;
  line-height: 1.5;
  letter-spacing: -0.01em;
}

html {
  scroll-behavior: smooth;
  height: 100%;
  overflow-y: auto;
  scroll-padding-top: 80px; 
}

html.no-scroll {
  overflow: hidden !important;
}

/* Transições suaves */
*, *::before, *::after {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Scrollbar minimalista */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: rgba(243, 244, 246, 0.2); 
}

::-webkit-scrollbar-thumb {
  background: var(--color-accent);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-secondary);
}

/* Foco */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 0.25rem;
}
@layer utilities {
  .text-adaptive {
    @apply text-[var(--color-text)];
  }
  
  .text-adaptive-secondary {
    @apply text-[var(--color-text)] opacity-80;
  }
  
  .text-adaptive-muted {
    @apply text-[var(--color-text)] opacity-60;
  }
}

/* Componentes */
@layer components {
  .container {
    @apply px-4 mx-auto max-w-6xl;
  }

  .btn {
    @apply px-6 py-3 font-medium rounded-md text-base transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply bg-[var(--color-accent)] text-[var(--color-text-light)];
  }
  .btn-primary:hover {
    background-color: var(--color-accent-dark);
  }

  .btn-secondary {
    @apply bg-[var(--color-secondary)] text-[var(--color-text-light)] hover:bg-opacity-90;
  }

  .btn-outline {
    @apply border border-[var(--color-accent)] text-[var(--color-accent)];
  }
  .btn-outline:hover {
    background-color: rgba(var(--color-accent-rgb), 0.1);
  }

  .section-title {
    @apply text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text)] tracking-tight;
  }

  .section-subtitle {
    @apply text-base md:text-lg font-normal mb-8 text-[var(--color-text)] opacity-80 leading-relaxed max-w-3xl mx-auto;
  }

  .card {
    @apply bg-[var(--color-card-bg)] p-6 rounded-lg transition-all duration-300 border border-neutral-30;
    box-shadow: var(--shadow-sm);
  }
  
  .card:hover {
    box-shadow: var(--shadow-md);
  }

  .card-text {
    @apply text-[var(--color-card-text)];
  }

  .card-text-secondary {
    @apply text-[var(--color-card-text)] opacity-80;
  }

  .input-field {
    @apply w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-all;
  }

  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }

  .badge-primary {
    @apply bg-accent-20 text-[var(--color-accent)];
  }
}

/* Estilos específicos para input-field no modo escuro */
.dark .input-field {
  background-color: rgba(var(--color-neutral-rgb), 0.1);
  border-color: rgba(var(--color-neutral-rgb), 0.2);
}

/* Utilitários de texto */
.text-contrast {
  color: var(--color-text);
}

.text-contrast-80 {
  color: var(--color-text);
  opacity: 0.8;
}

.text-contrast-60 {
  color: var(--color-text);
  opacity: 0.6;
}

/* Animações */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Responsividade */
@media (max-width: 640px) {
  .section-title {
    @apply text-xl md:text-2xl;
  }

  .section-subtitle {
    @apply text-sm;
  }

  .btn {
    @apply text-sm py-2;
  }
  .container {
    padding-left: 1.5rem;  /* sm:px-6 */
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;  /* lg:px-8 */
    padding-right: 2rem;
  }
}

/* Acessibilidade */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Ajustes para o modo escuro */
.dark .bg-white {
  background-color: var(--color-card-bg);
}

.dark .text-white {
  color: var(--color-text-light);
}

/* Classe de pulse personalizada */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Novas classes utilitárias para espaçamento consistente */
.space-xs {
  margin: var(--space-xs);
  padding: var(--space-xs);
}

.space-sm {
  margin: var(--space-sm);
  padding: var(--space-sm);
}

.space-md {
  margin: var(--space-md);
  padding: var(--space-md);
}

.space-lg {
  margin: var(--space-lg);
  padding: var(--space-lg);
}

.space-xl {
  margin: var(--space-xl);
  padding: var(--space-xl);
}

/* Classes para uso de sombras personalizadas */
.shadow-custom-sm {
  box-shadow: var(--shadow-sm);
}

.shadow-custom-md {
  box-shadow: var(--shadow-md);
}

.shadow-custom-lg {
  box-shadow: var(--shadow-lg);
}

.shadow-custom-xl {
  box-shadow: var(--shadow-xl);
}
```

    - 📄 layout.tsx
    
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/logo.svg' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
    shortcut: ['/shortcut-icon.png'],
  },
  title: 'FH Resolve - Marido de Aluguel em Florianópolis | Reparos Residenciais',
  description: 'Serviços de marido de aluguel em Florianópolis: reparos elétricos, hidráulicos e gerais em Ratones, Jurerê, Ingleses e região. Orçamento grátis via WhatsApp!',
  keywords: 'marido de aluguel Florianópolis, manutenção residencial Ratones, reparos elétricos Jurerê, serviços hidráulicos Ingleses, FH Resolve',
  openGraph: {
    title: 'FH Resolve - Manutenção Residencial em Florianópolis',
    description: 'Reparos rápidos e confiáveis em Florianópolis. Atendemos Ratones, Jurerê e mais. Contate-nos hoje!',
    url: 'https://fhresolve.com.br',
    type: 'website',
    images: [
      {
        url: 'https://fhresolve.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FH Resolve - Serviços Residenciais em Florianópolis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FH Resolve - Marido de Aluguel em Florianópolis',
    description: 'Reparos residenciais rápidos em Ratones, Jurerê e região. Solicite seu orçamento!',
    images: 'https://fhresolve.com.br/og-image.jpg',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "FH Resolve",
              "description": "FH Resolve - Especialista em Manutenção Residencial em Florianópolis",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Florianópolis",
                "addressRegion": "SC",
                "addressCountry": "BR",
                "streetAddress": "Ratones"
              },
              "telephone": "+5548991919791",
              "url": "https://fhresolve.com.br",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-27.5369",
                "longitude": "-48.5044"
              },
              "priceRange": "$$",
              "openingHours": "Mo-Sa 08:00-18:00"
            })
          }}
        />
        {/* Script para prevenir flash de tema incorreto */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Verifica se estamos no dashboard observando a URL
                  const isDashboard = window.location.pathname.startsWith('/dashboard');
                  const themeKey = isDashboard ? 'dashboard-theme' : 'site-theme';
                  
                  const savedTheme = localStorage.getItem(themeKey);
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                  
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  console.error('Error accessing localStorage', e);
                  // Em caso de erro, definir tema padrão
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

    - 📄 page.tsx
    
```tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import axios from '@/lib/axios';
import { Providers } from './providers';

import Hero from '../components/Hero';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';

// Componentes carregados dinamicamente
const About = dynamic(() => import('../components/About'), { ssr: false });
const Benefits = dynamic(() => import('../components/Benefits'), { ssr: false });
const Portfolio = dynamic(() => import('../components/Portfolio'), { ssr: false });
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
const ServiceMap = dynamic(() => import('../components/ServiceMap'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

// Componente de carregamento
const SectionLoader = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mb-4"></div>
    <p className="text-sm text-[var(--color-text)]/70">Carregando conteúdo...</p>
  </div>
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    // Buscar configurações do site
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/settings');
        if (response.data.defaultTheme) {
          setDefaultTheme(response.data.defaultTheme);
        }
        if (response.data.maintenanceMode !== undefined) {
          setMaintenanceMode(response.data.maintenanceMode);
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
      } finally {
        // Configurar timer para simulação de carregamento
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    };

    fetchSettings();
  }, []);

  // Renderiza a página de manutenção se o modo de manutenção estiver ativo
  if (maintenanceMode && !loading) {
    return (
      <Providers initialTheme={defaultTheme}>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
          <div className="text-center max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-accent)]">
              Site em Manutenção
            </h1>
            <p className="text-[var(--color-text)]/80 mb-8">
              Estamos realizando alguns ajustes para melhorar sua experiência. 
              Voltaremos em breve.
            </p>
            <div className="w-full h-2 bg-[var(--color-neutral)]/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--color-accent)]"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <p className="mt-8 text-sm text-[var(--color-text)]/60">
              Para solicitações urgentes, entre em contato pelo WhatsApp
            </p>
            <a 
              href="https://wa.me/5548991919791" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-all shadow-sm"
            >
              <MessageCircle size={18} />
              Contato via WhatsApp
            </a>
          </div>
        </div>
      </Providers>
    );
  }

  return (
    <Providers initialTheme={defaultTheme}>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen"
          >
            <Header />
            <main className="flex-grow">
              <Hero />
              <Suspense fallback={<SectionLoader />}>
                <Benefits />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Portfolio />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <ServiceMap />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={<div className="h-20" />}>
              <Footer />
            </Suspense>
            <motion.a
              href="https://wa.me/5548991919791"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 bg-[var(--color-accent)] text-white p-3 rounded-full shadow-lg z-50 flex items-center justify-center"
              whileHover={{ scale: 1.1, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              aria-label="Entre em contato via WhatsApp"
            >
              <MessageCircle size={26} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </Providers>
  );
}
```

    - 📄 providers.tsx
    
```tsx
'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import { FeedbackProvider } from '@/context/FeedbackContext';

export function Providers({
  children,
  initialTheme = 'light',
  isDashboard = false
}: {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
  isDashboard?: boolean;
}) {
  return (
    <SiteConfigProvider>
      <ThemeProvider initialTheme={initialTheme} isDashboard={isDashboard}>
        <FeedbackProvider>
          {children}
        </FeedbackProvider>
      </ThemeProvider>
    </SiteConfigProvider>
  );
}
```

    - 📄 sitemap.xml
      [Arquivo binário]

  - 📁 components/
    - 📁 dashboard/
      - 📄 Sidebar.tsx
      
```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileImage,
  Star,
  MessageSquare,
  FileText,
  Video,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  Calculator, // Ícone para orçamentos
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfólio', href: '/dashboard/portfolio', icon: FileImage },
  { name: 'Avaliações', href: '/dashboard/reviews', icon: Star },
  { name: 'Orçamentos', href: '/dashboard/estimates', icon: Calculator }, // Nova opção de orçamentos
  { name: 'Pedidos', href: '/dashboard/quotes', icon: MessageSquare },
  { name: 'Blog', href: '/dashboard/blog', icon: FileText },
  { name: 'Vídeos', href: '/dashboard/videos', icon: Video },
  { name: 'Usuários', href: '/dashboard/users', icon: Users },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // md: breakpoint
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <>
      {/* Botão de toggle para mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="fixed z-50 bottom-4 right-4 md:hidden p-2 rounded-full bg-[var(--color-accent)] text-[var(--color-text-light)] shadow-[var(--shadow-md)]"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Overlay para mobile */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--color-dark)] md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={isDesktop ? 'open' : 'closed'}
        animate={isDesktop ? 'open' : isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 z-40 h-screen w-64 bg-[var(--color-card-bg)] text-[var(--color-card-text)] border-r border-[var(--color-neutral)]/30 shadow-[var(--shadow-lg)] md:sticky md:top-0 md:left-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center h-16 border-b border-[var(--color-neutral)]/30">
            <Link href="/dashboard" className="flex items-center gap-2">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <FileImage className="h-6 w-6 text-[var(--color-accent)]" />
              </motion.div>
              <span className="text-xl font-semibold">FH Resolve</span>
            </Link>
          </div>

          {/* Navegação */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-2 text-base font-normal rounded-lg transition-all ${
                        isActive
                          ? 'bg-[var(--color-accent)] text-[var(--color-text-light)]'
                          : 'hover:bg-[var(--color-neutral)]/20'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive ? 'text-[var(--color-text-light)]' : 'text-[var(--color-accent)]'
                          }`}
                        />
                      </motion.div>
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Botão de Sair */}
          <div className="p-4 border-t border-[var(--color-neutral)]/30">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center p-2 w-full text-base font-normal rounded-lg hover:bg-[rgba(255,0,0,0.1)] text-[var(--color-accent)] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Sair</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
```

      - 📄 Stats.tsx
      
```tsx
'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, FileImage, Star, Calculator } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StatsProps {
  stats?: {
    visitors?: number;
    quotes?: number;
    projects?: number;
    reviews?: number;
    estimates?: number;
  }
}

export function Stats({ stats = {} }: StatsProps) {
  const statsData = [
    {
      icon: BarChart3,
      label: 'Visitantes',
      value: stats.visitors?.toString() || '0',
      subtext: 'Último mês',
      color: 'var(--color-accent)',
    },
    {
      icon: Users,
      label: 'Pedidos',
      value: stats.quotes?.toString() || '0',
      subtext: 'Último mês',
      color: 'var(--color-accent)',
    },
    {
      icon: Calculator,
      label: 'Orçamentos',
      value: stats.estimates?.toString() || '0',
      subtext: 'Total',
      color: 'var(--color-accent)',
    },
    {
      icon: FileImage,
      label: 'Projetos',
      value: stats.projects?.toString() || '0',
      subtext: 'Total',
      color: 'var(--color-accent)',
    },
    {
      icon: Star,
      label: 'Avaliações',
      value: stats.reviews?.toString() || '0',
      subtext: 'Média: 5/5',
      color: 'var(--color-accent)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statsData.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="bg-[var(--color-card-bg)] text-[var(--color-text)] border-[var(--color-neutral)]/30 shadow-[var(--shadow-md)]">
            <div className="flex items-center p-4">
              <div className="p-3 rounded-full bg-[var(--color-accent)]/20">
                <stat.icon size={24} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs opacity-70">{stat.subtext}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

      - 📄 ThemeEditor.tsx
      
```tsx
// src/components/dashboard/ThemeEditor.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Card } from '@/components/ui/Card';
import { Sun, Moon, Undo, Palette, Check, Save, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useFeedback } from '@/context/FeedbackContext';

interface ColorConfig {
  name: string;
  key: string;
  description: string;
}

const colorConfigs: ColorConfig[] = [
  { name: 'Cor Principal', key: 'primary', description: 'Cor base para textos principais e fundos escuros' },
  { name: 'Cor de Destaque', key: 'accent', description: 'Cor principal de destaque usado para botões e links' },
  { name: 'Cor Secundária', key: 'secondary', description: 'Cor para elementos secundários e textos menos importantes' },
  { name: 'Cor Neutra', key: 'neutral', description: 'Cor para bordas e elementos de separação' },
  { name: 'Cor de Texto', key: 'text', description: 'Cor primária para textos' },
  { name: 'Texto Claro', key: 'textLight', description: 'Cor para textos sobre fundos escuros' },
  { name: 'Fundo Escuro', key: 'dark', description: 'Cor para fundos escuros' },
  { name: 'Fundo Claro', key: 'light', description: 'Cor para fundos claros' },
  { name: 'Fundo Cinza', key: 'gray', description: 'Cor para fundos alternados ou secundários' },
  { name: 'Fundo de Card', key: 'cardBg', description: 'Cor para o fundo de cards e painéis' },
  { name: 'Texto de Card', key: 'cardText', description: 'Cor para textos dentro de cards e painéis' },
  { name: 'Destaque Hover', key: 'accentDark', description: 'Versão mais escura da cor de destaque para efeitos hover' },
];

const ThemeEditor: React.FC = () => {
  const { config, updateConfig, loading } = useSiteConfig();
  const { theme } = useTheme();
  const { showToast } = useFeedback();
  
  const [editingTheme, setEditingTheme] = useState<'light' | 'dark'>('light');
  const [themeColors, setThemeColors] = useState(config.themes[editingTheme]);
  const [originalColors, setOriginalColors] = useState(config.themes[editingTheme]);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Atualiza os estados quando o tema ativo muda
  useEffect(() => {
    setThemeColors(config.themes[editingTheme]);
    setOriginalColors(config.themes[editingTheme]);
  }, [config.themes, editingTheme]);
  
  // Função para trocar entre edição de tema claro e escuro
  const toggleEditingTheme = () => {
    // Salva as alterações atuais antes de trocar
    const newThemes = {
      ...config.themes,
      [editingTheme]: themeColors
    };
    
    // Alterna para o outro tema
    setEditingTheme(editingTheme === 'light' ? 'dark' : 'light');
  };
  
  // Função para restaurar cores originais
  const resetColors = () => {
    setThemeColors(originalColors);
    showToast('Cores restauradas para o último salvamento', 'info');
  };
  
  // Função para atualizar uma cor específica
  const updateColor = (key: string, value: string) => {
    setThemeColors(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Função para aplicar as alterações
  const applyChanges = async () => {
    setSaving(true);
    try {
      // Atualiza apenas o tema que está sendo editado
      const newThemes = {
        ...config.themes,
        [editingTheme]: themeColors
      };
      
      await updateConfig({
        themes: newThemes
      });
      
      setOriginalColors(themeColors);
      showToast(`Tema ${editingTheme === 'light' ? 'claro' : 'escuro'} atualizado com sucesso`, 'success');
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
      showToast('Erro ao salvar tema', 'error');
    } finally {
      setSaving(false);
    }
  };
  
  // Componente de seletor de cor individual
  const ColorPicker = ({ color, colorKey, name, description }: { color: string, colorKey: string, name: string, description: string }) => (
    <div className="p-4 bg-white/5 rounded-lg border border-[var(--color-neutral)]/20">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={`color-${colorKey}`} className="font-medium text-[var(--color-text)]">
          {name}
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text)]/70">{color}</span>
          <div 
            className="w-6 h-6 rounded-full border border-[var(--color-neutral)]/40"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
      <p className="text-xs text-[var(--color-text)]/60 mb-2">{description}</p>
      <input
        id={`color-${colorKey}`}
        type="color"
        value={color}
        onChange={(e) => updateColor(colorKey, e.target.value)}
        className="w-full h-8 rounded cursor-pointer"
      />
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Editor de Tema</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Personalize as cores do tema {editingTheme === 'light' ? 'claro' : 'escuro'} do site
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleEditingTheme}
            className="p-2 rounded-md bg-[var(--color-neutral)]/10 flex items-center gap-2"
          >
            {editingTheme === 'light' ? (
              <>
                <Moon size={18} className="text-[var(--color-accent)]" />
                <span>Editar Tema Escuro</span>
              </>
            ) : (
              <>
                <Sun size={18} className="text-[var(--color-accent)]" />
                <span>Editar Tema Claro</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPreviewMode(!previewMode)}
            className="p-2 rounded-md bg-[var(--color-neutral)]/10 flex items-center gap-2"
          >
            <Palette size={18} className="text-[var(--color-accent)]" />
            <span>{previewMode ? 'Voltar para Edição' : 'Visualizar'}</span>
          </motion.button>
        </div>
      </div>
      
      {previewMode ? (
        <div className="space-y-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Visualização do Tema</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-3">Elementos Básicos</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Texto Principal</label>
                      <div className="p-2 rounded" style={{ color: themeColors.text, backgroundColor: themeColors.light }}>
                        Este é um exemplo de texto principal
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Texto Secundário</label>
                      <div className="p-2 rounded" style={{ color: themeColors.secondary, backgroundColor: themeColors.light }}>
                        Este é um exemplo de texto secundário
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Botão Primário</label>
                      <button 
                        className="px-4 py-2 rounded"
                        style={{ 
                          backgroundColor: themeColors.accent, 
                          color: themeColors.textLight,
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = themeColors.accentDark }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = themeColors.accent }}
                      >
                        Botão de Destaque
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Card</h4>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: themeColors.cardBg,
                      color: themeColors.cardText,
                      border: `1px solid ${themeColors.neutral}40`
                    }}
                  >
                    <h5 className="font-medium mb-2" style={{ color: themeColors.cardText }}>
                      Título do Card
                    </h5>
                    <p style={{ color: `${themeColors.cardText}99` }}>
                      Este é um exemplo de conteúdo dentro de um card com cores personalizadas.
                    </p>
                    <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${themeColors.neutral}30` }}>
                      <button
                        className="px-3 py-1 rounded text-sm"
                        style={{ 
                          backgroundColor: themeColors.accent, 
                          color: themeColors.textLight 
                        }}
                      >
                        Botão do Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetColors}
              className="px-4 py-2 bg-[var(--color-neutral)]/10 rounded-md flex items-center gap-2"
            >
              <Undo size={18} />
              <span>Restaurar</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={applyChanges}
              disabled={saving}
              className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Salvar Tema</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {colorConfigs.map(({ key, name, description }) => (
              <ColorPicker
                key={key}
                colorKey={key}
                color={themeColors[key]}
                name={name}
                description={description}
              />
            ))}
          </div>
          
          <div className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetColors}
              className="px-4 py-2 bg-[var(--color-neutral)]/10 rounded-md flex items-center gap-2"
            >
              <Undo size={18} />
              <span>Restaurar</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={applyChanges}
              disabled={saving}
              className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Salvar Tema</span>
                </>
              )}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeEditor;
```

      - 📄 Topbar.tsx
      
```tsx
// src/components/dashboard/Topbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Bell, User, Calculator } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { useFeedback } from '../../context/FeedbackContext';

export function Topbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; message: string; read: boolean }[]>([
    { id: '1', message: 'Novo pedido de orçamento recebido', read: false },
    { id: '2', message: 'Novo comentário no portfólio', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { showToast } = useFeedback();
  
  // Só usamos o theme depois do componente montar para evitar erros de hidratação
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Usamos o hook apenas após a montagem
  useEffect(() => {
    if (mounted) {
      try {
        const { theme, toggleTheme } = useTheme();
        setCurrentTheme(theme);
      } catch (error) {
        console.error("Erro ao acessar o tema:", error);
      }
    }
  }, [mounted]);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/login' });
      showToast('Sessão encerrada com sucesso', 'success');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      showToast('Erro ao encerrar sessão', 'error');
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast('Todas as notificações marcadas como lidas', 'success');
  };
  
  // Se não estiver montado, renderize um placeholder para evitar erros de hidratação
  if (!mounted) {
    return (
      <header className="sticky top-0 z-30 bg-[var(--color-card-bg)] text-[var(--color-card-text)] border-b border-[var(--color-neutral)]/30 shadow-md py-3 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Placeholders para manter a mesma estrutura */}
            <div className="w-8 h-8"></div>
            <div className="w-8 h-8"></div>
            <div className="w-8 h-8"></div>
          </div>
        </div>
      </header>
    );
  }
  
  // Use o ThemeProvider externo de forma segura
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-[var(--color-card-bg)] text-[var(--color-card-text)] border-b border-[var(--color-neutral)]/30 shadow-md"
      style={{
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Botão de Tema */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--color-neutral)]/20 hover:bg-[var(--color-accent)]/20 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-[var(--color-accent)]" />
            ) : (
              <Moon size={20} className="text-[var(--color-accent)]" />
            )}
          </motion.button>

          {/* Notificações */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-[var(--color-neutral)]/20 hover:bg-[var(--color-accent)]/20 transition-colors relative"
              aria-label="Notificações"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} className="text-[var(--color-accent)]" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 mt-2 w-72 bg-[var(--color-card-bg)] text-[var(--color-card-text)] rounded-md shadow-lg z-10 border border-[var(--color-neutral)]/30"
                >
                  <div className="p-2 border-b border-[var(--color-neutral)]/30 flex justify-between items-center">
                    <h3 className="font-medium">Notificações</h3>
                    {notifications.some(n => !n.read) && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-[var(--color-accent)] hover:underline"
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-3 border-b border-[var(--color-neutral)]/10 hover:bg-[var(--color-neutral)]/10 ${
                              !notification.read ? 'bg-[var(--color-accent)]/5' : ''
                            }`}
                          >
                            <p className="text-sm mb-1">{notification.message}</p>
                            <p className="text-xs text-[var(--color-text)]/60">Agora mesmo</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-[var(--color-text)]/60 text-sm">
                        Nenhuma notificação
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu do Usuário */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {session?.user?.name || 'Usuário'}
              </span>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 mt-2 w-48 bg-[var(--color-card-bg)] text-[var(--color-card-text)] rounded-md shadow-lg py-1 z-10 border border-[var(--color-neutral)]/30"
                >
                  <div className="px-4 py-2 border-b border-[var(--color-neutral)]/20">
                    <p className="text-sm font-medium">{session?.user?.name}</p>
                    <p className="text-xs text-[var(--color-text)]/60">{session?.user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard/estimates/new"
                    className="block px-4 py-2 text-sm hover:bg-[var(--color-neutral)]/20 transition-colors flex items-center gap-1.5"
                  >
                    <Calculator size={14} className="text-[var(--color-accent)]" />
                    Novo Orçamento
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm hover:bg-[var(--color-neutral)]/20 transition-colors"
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm hover:bg-[var(--color-neutral)]/20 transition-colors"
                  >
                    Configurações
                  </Link>
                  <hr className="my-1 border-[var(--color-neutral)]/30" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-500/20 text-red-500 transition-colors"
                  >
                    Sair
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
```

    - 📁 ui/
      - 📄 Card.tsx
      
```tsx
import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, description, footer, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">{footer}</div>}
    </div>
  );
}

// 13. Componente de Heading (src/components/ui/Heading.tsx)
interface HeadingProps {
  title: string;
  description?: string;
}

export function Heading({ title, description }: HeadingProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {description && <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  );
}
```

      - 📄 Heading.tsx
      
```tsx
export function Heading({ title, description }: { title: string; description: string }) {
    return (
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text)]">
          {title}
        </h1>
        <p className="text-base md:text-lg text-[var(--color-text)] opacity-80">
          {description}
        </p>
      </div>
    );
  }
```

      - 📄 LoadingSpinner.tsx
      
```tsx
export function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }
  
```

    - 📄 About.tsx
    
```tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });

  const infoItems = [
    { icon: <Clock className="h-5 w-5" />, title: 'Agilidade', desc: 'Atendimento rápido' },
    { icon: <MapPin className="h-5 w-5" />, title: 'Localidade', desc: 'Florianópolis e região' },
  ];

  const benefits = [
    'Orçamento sem compromisso',
    'Materiais de qualidade',
    'Garantia nos serviços',
    'Atendimento personalizado'
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)] relative"
    >
      <div className="absolute right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-secondary)]/5 rounded-full blur-3xl translate-y-1/3"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative order-2 md:order-1"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            >
              Quem Somos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text)] tracking-tight"
            >
              Soluções de Confiança para sua Casa
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg mb-6 text-[var(--color-text)] leading-relaxed"
            >
              <span className="font-medium text-[var(--color-accent)]">FH Resolve</span> oferece serviços
              profissionais de manutenção residencial em Florianópolis. Atendemos
              Ratones, Jurerê e região com segurança e praticidade.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg mb-8 text-[var(--color-text)] leading-relaxed"
            >
              Especializado em resolver problemas do dia a dia com rapidez e eficiência para manter
              sua casa em perfeito estado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-start gap-4 mb-8 p-4 bg-[var(--color-light)] dark:bg-[var(--color-neutral)]/20 rounded-lg"
            >
              <ShieldCheck className="h-10 w-10 text-[var(--color-accent)] flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg text-[var(--color-text)]">Compromisso com Qualidade</h3>
                <p className="text-[var(--color-text)]/80">
                  Cada serviço é realizado com excelência e garantia de satisfação
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h3 className="font-medium text-lg mb-4 text-[var(--color-text)]">
                Por que nos escolher?
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={18} className="text-[var(--color-accent)]" />
                    <span className="text-[var(--color-text)]">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {infoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-lg bg-[var(--color-card-bg)] shadow-sm border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-[var(--color-accent)]/10 mb-2">
                      <div className="text-[var(--color-accent)]">{item.icon}</div>
                    </div>
                    <h3 className="font-medium text-[var(--color-card-text)]">{item.title}</h3>
                    <p className="text-sm text-[var(--color-card-text)]/80">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative order-1 md:order-2"
          >
            <div className="relative">
              <div className="aspect-video sm:aspect-square rounded-lg overflow-hidden shadow-lg border border-[var(--color-neutral)]/20 dark:border-[var(--color-neutral)]/10">
                <div className="absolute inset-0 bg-[var(--color-accent)]/5 dark:bg-[var(--color-accent)]/10 z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Serviço de manutenção residencial em Florianópolis"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700"
                  loading="lazy" // Alterado de priority para lazy, pois não é a primeira seção
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-10"
              >
                <div className="relative bg-[var(--color-accent)] text-[var(--color-text-light)] p-3 sm:p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <p className="font-bold text-lg sm:text-xl">+15</p>
                    <p className="text-xs sm:text-sm">anos de experiência</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 sm:hidden"
            >
              <a
                href="#contact"
                className="block w-full text-center py-3 px-4 bg-[var(--color-accent)] text-[var(--color-text-light)] rounded-md font-medium hover:bg-[var(--color-accent)]/90 transition-colors shadow-sm"
              >
                Solicitar orçamento
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
```

    - 📄 Benefits.tsx
    
```tsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, Zap, Droplet, Wrench, CreditCard, ArrowRight, X, ChevronRight, MapPin, Navigation, AlertTriangle } from 'lucide-react';

// Interface para os detalhes dos serviços
interface ServiceDetailsProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: {
    features: string[];
    benefits: string[];
    pricing: {
      basePrice: string;
      additionalInfo?: string;
    };
  };
}

// Coordenadas de Ratones, Florianópolis
const RATONES_COORDS = {
  lat: -27.5132, 
  lng: -48.4618
};

// Raio de cobertura sem taxa adicional (em km)
const COVERAGE_RADIUS = 20;

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedService, setSelectedService] = useState<ServiceDetailsProps | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  // Detectar dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Calcular distância entre dois pontos em km (fórmula de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distância em km
    return Math.round(distance * 10) / 10; // Arredondar para uma casa decimal
  };

  // Obter localização do usuário
  const getUserLocation = () => {
    setIsCheckingLocation(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoords);
          
          // Calcular distância até Ratones
          const dist = calculateDistance(
            userCoords.lat, userCoords.lng,
            RATONES_COORDS.lat, RATONES_COORDS.lng
          );
          
          setDistance(dist);
          setIsCheckingLocation(false);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setLocationError("Não foi possível obter sua localização. Verifique as permissões do navegador.");
          setIsCheckingLocation(false);
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocalização não é suportada pelo seu navegador.");
      setIsCheckingLocation(false);
    }
  };

  // Dados expandidos para cada serviço com valores corrigidos
  const benefitsData = [
    { 
      icon: <ShieldCheck className="h-7 w-7" />, 
      title: 'Confiabilidade', 
      description: 'Serviços com garantia.',
      details: {
        features: ['Garantia em todos os serviços executados', 'Profissionais qualificados e experientes', 'Atendimento ético e transparente'],
        benefits: ['Tranquilidade na contratação', 'Garantia de até 90 dias para serviços realizados', 'Compromisso com a qualidade'],
        pricing: {
          basePrice: 'R$ 150,00',
          additionalInfo: 'Valor mínimo para áreas até 20km de Ratones'
        }
      }
    },
    { 
      icon: <Clock className="h-7 w-7" />, 
      title: 'Rapidez', 
      description: 'Atendimento ágil.',
      details: {
        features: ['Resposta rápida em até 1 hora', 'Agendamento flexível', 'Atendimento de emergência disponível'],
        benefits: ['Solução rápida para seus problemas', 'Economia de tempo', 'Redução do tempo de espera'],
        pricing: {
          basePrice: 'R$ 150,00',
          additionalInfo: 'Taxa adicional para atendimentos emergenciais'
        }
      }
    },
    { 
      icon: <Zap className="h-7 w-7" />, 
      title: 'Serviços Elétricos', 
      description: 'Soluções completas.',
      details: {
        features: ['Instalação de tomadas e interruptores', 'Montagem de lustres e luminárias', 'Instalação de chuveiros elétricos', 'Reparos em curtos-circuitos'],
        benefits: ['Segurança para sua residência', 'Economia de energia', 'Prevenção de acidentes'],
        pricing: {
          basePrice: 'A partir de R$ 150,00',
          additionalInfo: 'Valor pode variar conforme complexidade'
        }
      }
    },
    { 
      icon: <Droplet className="h-7 w-7" />, 
      title: 'Serviços Hidráulicos', 
      description: 'Reparos e instalações.',
      details: {
        features: ['Reparo de vazamentos', 'Desentupimento de pias e ralos', 'Instalação de torneiras e chuveiros', 'Troca de registros e válvulas'],
        benefits: ['Economia na conta de água', 'Prevenção de infiltrações', 'Aumento da vida útil das instalações'],
        pricing: {
          basePrice: 'A partir de R$ 150,00',
          additionalInfo: 'Valor pode variar conforme complexidade'
        }
      }
    },
    { 
      icon: <Wrench className="h-7 w-7" />, 
      title: 'Serviços Gerais', 
      description: 'Montagem e reparos.',
      details: {
        features: ['Montagem de móveis', 'Fixação de prateleiras e quadros', 'Pequenos reparos em alvenaria', 'Instalação de persianas e cortinas'],
        benefits: ['Otimização dos espaços', 'Acabamento de qualidade', 'Praticidade no dia a dia'],
        pricing: {
          basePrice: 'A partir de R$ 150,00',
          additionalInfo: 'Valor pode variar conforme complexidade do serviço'
        }
      }
    },
    { 
      icon: <CreditCard className="h-7 w-7" />, 
      title: 'Parcelamento', 
      description: 'Até 12x sem juros.',
      details: {
        features: ['Parcelamento em até 12x sem juros', 'Aceitamos todos os cartões', 'Desconto para pagamento à vista', 'Transferência via PIX'],
        benefits: ['Flexibilidade de pagamento', 'Planejamento financeiro', 'Solução imediata sem comprometer o orçamento'],
        pricing: {
          basePrice: 'R$ 150,00',
          additionalInfo: 'Valor mínimo para parcelamento'
        }
      }
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Bloquear scroll do body quando o modal está aberto
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  // Modal de detalhes do serviço com melhor responsividade
  const ServiceDetailsModal: React.FC<{ service: ServiceDetailsProps, onClose: () => void }> = ({ service, onClose }) => (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop com efeito de blur */}
      <motion.div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Conteúdo do modal */}
      <motion.div 
        className="bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-accent) transparent'
        }}
      >
        {/* Cabeçalho estilizado */}
        <div className="sticky top-0 bg-[var(--color-card-bg)] z-10 border-b border-[var(--color-neutral)]/20">
          <div className="relative px-4 py-5 sm:p-6">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--color-accent)]/20 rounded-full" />
            
            <button 
              onClick={onClose} 
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-neutral)]/20 transition-colors z-20"
              aria-label="Fechar"
            >
              <X size={18} className="text-[var(--color-text)]" />
            </button>
            
            <div className="flex items-center gap-3 sm:gap-4 relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex-shrink-0">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold card-text">{service.title}</h3>
                <p className="text-[var(--color-card-text)]/80 text-sm sm:text-base">{service.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Corpo do modal com detalhes */}
        <div className="px-4 py-3 sm:px-6 sm:pb-6">
          {/* Recursos */}
          <div className="mb-5">
            <h4 className="text-base sm:text-lg font-medium card-text flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                <ChevronRight size={14} />
              </span>
              Recursos
            </h4>
            <ul className="space-y-2">
              {service.details.features.map((feature, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <span className="w-5 h-5 mt-0.5 rounded-full flex-shrink-0 bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="card-text-secondary text-sm sm:text-base">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Benefícios */}
          <div className="mb-5">
            <h4 className="text-base sm:text-lg font-medium card-text flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                <ChevronRight size={14} />
              </span>
              Benefícios
            </h4>
            <ul className="space-y-2">
              {service.details.benefits.map((benefit, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx + 0.2 }}
                >
                  <span className="w-5 h-5 mt-0.5 rounded-full flex-shrink-0 bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </span>
                  <span className="card-text-secondary text-sm sm:text-base">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Área de cobertura com verificação de localização */}
          <motion.div 
            className="p-3 sm:p-4 bg-[var(--color-neutral)]/10 rounded-lg mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="font-medium card-text text-sm sm:text-base">Área de Cobertura</span>
                </div>
                <button 
                  onClick={getUserLocation}
                  disabled={isCheckingLocation}
                  className="text-xs sm:text-sm px-2 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded hover:bg-[var(--color-accent)]/20 transition-colors flex items-center gap-1"
                >
                  {isCheckingLocation ? 'Verificando...' : 'Verificar distância'}
                  <Navigation className="h-3 w-3" />
                </button>
              </div>
              
              <div className="text-sm">
                <p className="card-text-secondary">Até 20km de Ratones, Florianópolis</p>
                
                {locationError && (
                  <div className="mt-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-md flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{locationError}</span>
                  </div>
                )}
                
                {distance !== null && (
                  <div className={`mt-2 p-2 rounded-md flex items-start gap-2 ${
                    distance <= COVERAGE_RADIUS 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                      : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    <span className="text-xs flex items-center gap-1">
                      <span className="font-medium">Sua localização:</span> {distance} km de Ratones
                      {distance <= COVERAGE_RADIUS 
                        ? ' (dentro da área de cobertura)'
                        : ` (${(distance - COVERAGE_RADIUS).toFixed(1)}km além da área de cobertura padrão)`
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Preços */}
          <motion.div 
            className="p-3 sm:p-4 bg-[var(--color-accent)]/5 rounded-lg mb-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <CreditCard className="h-5 w-5 text-[var(--color-accent)]" />
              <span className="font-medium card-text text-sm sm:text-base">Valor</span>
            </div>
            <div className="card-text-secondary text-sm sm:text-base text-right">
              <div className="font-medium">
                {service.details.pricing.basePrice}
                {distance !== null && distance > COVERAGE_RADIUS && (
                  <span className="text-amber-500 dark:text-amber-400">
                    {' + taxa adicional por distância'}
                  </span>
                )}
              </div>
              {service.details.pricing.additionalInfo && (
                <div className="text-xs sm:text-sm opacity-80">{service.details.pricing.additionalInfo}</div>
              )}
            </div>
          </motion.div>
          
          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href="#contact"
              className="flex-1 text-center py-3 px-4 bg-[var(--color-accent)] text-white rounded-md font-medium hover:bg-[var(--color-accent-dark)] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={onClose}
            >
              Solicitar Orçamento
            </motion.a>
            
            <motion.button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-[var(--color-neutral)]/30 rounded-md font-medium hover:bg-[var(--color-neutral)]/10 transition-colors card-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Fechar
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section 
      id="benefits" 
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-[var(--color-gray)] dark:bg-[var(--color-gray)]"
    >
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="section-title mb-4">Soluções Completas</h2>
          <p className="section-subtitle">O que podemos fazer por você</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              className="relative z-10 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="card h-full flex flex-col dark:bg-[var(--color-card-bg)] transition-all duration-500 
                            border-2 border-transparent group-hover:border-[var(--color-accent)]/20">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)]/5 rounded-bl-full -z-10 
                              group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all duration-500"></div>
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full 
                                bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-5
                                group-hover:bg-[var(--color-accent)]/20 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3 card-text">{benefit.title}</h3>
                  <p className="text-[var(--color-secondary)] mb-5">{benefit.description}</p>
                  <div className="mt-auto pt-4">
                    <motion.button
                      onClick={() => setSelectedService(benefit)}
                      className="inline-flex items-center text-[var(--color-accent)] text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Saiba mais
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-md font-medium hover:bg-[var(--color-accent)]/90 transition-all shadow-md"
          >
            Solicitar Orçamento
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Modal de detalhes */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDetailsModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Benefits;
```

    - 📄 Blog.tsx
    
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05, rotateX: 5, transition: { duration: 0.3 } },
  };

  return (
    <section id="blog" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="section-title">Blog</h2>
          <p className="section-subtitle">Em breve: Dicas de Manutenção</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              variants={cardVariants}
              whileHover="hover"
              className="relative card group overflow-hidden"
              style={{
                maskImage: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                WebkitMaskImage: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
              }}
            >
              <div className="h-48 bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-[var(--color-text)]/50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Artigo em Breve</h3>
                <p className="text-[var(--color-text)]/80 mb-4">
                  Conteúdos exclusivos sobre manutenção residencial em breve.
                </p>
                <motion.button
                  className="flex items-center gap-2 text-[var(--color-accent)]"
                  whileHover={{ gap: 8 }}
                >
                  <span>Saiba mais</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
```

    - 📄 Contact.tsx
    
```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle, X, CreditCard, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '', message: '' });
  const [formTouched, setFormTouched] = useState({ name: false, phone: false, message: false });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        return '';
      case 'phone': 
        if (!value.trim()) return 'Telefone é obrigatório';
        if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(value)) return 'Formato: (99) 99999-9999';
        return '';
      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.trim().length < 10) return 'Mensagem muito curta';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (formTouched[name as keyof typeof formTouched]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormTouched(prev => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      let formattedValue = value;
      if (value.length > 2) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 7) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      setFormData(prev => ({ ...prev, phone: formattedValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormTouched({ name: true, phone: true, message: true });
    
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message)
    };
    setErrors(newErrors);
    
    const hasErrors = Object.values(newErrors).some(error => error);
    if (!hasErrors) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', phone: '', message: '' });
        setErrors({ name: '', phone: '', message: '' });
        setFormTouched({ name: false, phone: false, message: false });
        setSubmitted(false);
      }, 3000);
    }
  };

  const contactInfo = [
    { icon: <Phone className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Telefone', value: '+55 48 99191-9791', link: 'tel:+5548991919791' },
    { icon: <MessageCircle className="h-5 w-5 text-[var(--color-accent)]" />, title: 'WhatsApp', value: '+55 48 99191-9791', link: 'https://wa.me/5548991919791' },
    { icon: <Mail className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Email', value: 'contato@fhresolve.com.br', link: 'mailto:contato@fhresolve.com.br' },
    { icon: <MapPin className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Localização', value: 'Ratones, Florianópolis - SC', link: 'https://maps.google.com/?q=Ratones,Florianópolis,SC' },
  ];

  const inputClasses = (fieldName: string) => `w-full px-4 py-3 rounded-md 
    ${
      errors[fieldName as keyof typeof errors] 
        ? 'border-red-500 focus:ring-red-500 bg-red-50/30 dark:bg-red-900/10'
        : formTouched[fieldName as keyof typeof formTouched] && !errors[fieldName as keyof typeof errors]
          ? 'border-green-500 focus:ring-green-500 bg-green-50/30 dark:bg-green-900/10' 
          : 'border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20 focus:ring-[var(--color-accent)]'
    } 
    border focus:outline-none focus:ring-2 bg-[var(--color-card-bg)] text-[var(--color-card-text)] transition-all`;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[var(--color-light)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Fale Conosco
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Entre em Contato
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Solicite um orçamento sem compromisso
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--color-card-bg)] rounded-lg p-6 shadow-sm border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20 h-full flex flex-col"
          >
            <h3 className="text-xl font-medium mb-6 text-[var(--color-card-text)]">Informações de Contato</h3>
            <div className="space-y-4 flex-grow">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, backgroundColor: 'rgba(var(--color-accent-rgb), 0.05)' }}
                  className="flex items-start gap-4 p-4 bg-[var(--color-gray)] dark:bg-[var(--color-neutral)]/10 rounded-md transition-all duration-300"
                >
                  <div className="mt-1">{info.icon}</div>
                  <div>
                    <h4 className="font-medium text-[var(--color-card-text)]">{info.title}</h4>
                    <p className="card-text-secondary">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 p-5 bg-[var(--color-accent)]/10 rounded-md"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Clock className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="font-medium text-[var(--color-card-text)]">Resposta rápida garantida</h4>
                  <p className="card-text-secondary text-sm">Retornamos todos os contatos em até 2 horas durante horário comercial</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-8 p-5 bg-[var(--color-accent)]/5 dark:bg-[var(--color-accent)]/10 rounded-md"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-medium mb-2 text-[var(--color-card-text)]">Horário de Atendimento</h4>
              <p className="mb-1 card-text-secondary">Segunda a Sexta: 8h às 18h</p>
              <p className="card-text-secondary">Sábado: 8h às 12h</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[var(--color-card-bg)] rounded-lg p-6 shadow-sm border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20">
              <h3 className="text-xl font-medium mb-6 text-[var(--color-card-text)]">Envie uma Mensagem</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-8 bg-[var(--color-accent)]/5 dark:bg-[var(--color-accent)]/10 rounded-lg"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h4 className="text-xl font-medium mb-2 text-[var(--color-card-text)]">Mensagem Enviada!</h4>
                  <p className="card-text-secondary mb-4">Retornaremos em até 24 horas.</p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-text-light)] rounded-md font-medium"
                  >
                    Enviar Outra Mensagem
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-[var(--color-card-text)]">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={inputClasses('name')}
                        placeholder="Seu nome"
                        aria-invalid={!!errors.name}
                        aria-describedby="name-error"
                      />
                      {formTouched.name && !errors.name && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X size={14} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-[var(--color-card-text)]">
                      Telefone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={formatPhone}
                        onBlur={handleBlur}
                        required
                        className={inputClasses('phone')}
                        placeholder="(99) 99999-9999"
                        aria-invalid={!!errors.phone}
                        aria-describedby="phone-error"
                      />
                      {formTouched.phone && !errors.phone && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X size={14} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-[var(--color-card-text)]">
                      Mensagem
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        rows={4}
                        className={inputClasses('message')}
                        placeholder="Descreva o serviço que você precisa..."
                        aria-invalid={!!errors.message}
                        aria-describedby="message-error"
                      />
                      {formTouched.message && !errors.message && (
                        <CheckCircle className="absolute right-3 top-6 h-5 w-5 text-green-500" />
                      )}
                    </div>
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X size={14} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-primary flex-grow sm:flex-grow-0 flex items-center justify-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      Enviar Mensagem
                    </motion.button>
                    <motion.a
                      href="https://wa.me/5548991919791"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-outline flex-grow sm:flex-grow-0 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp
                    </motion.a>
                  </div>
                  <div className="p-3 bg-[var(--color-accent)]/5 rounded-md flex items-start gap-2">
                    <CreditCard size={18} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                    <p className="text-sm card-text-secondary">
                      Aceitamos pagamento em até 12x sem juros no cartão.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

    - 📄 FeedbackToast.tsx
    
```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FeedbackToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const FeedbackToast: React.FC<FeedbackToastProps> = ({ message, type, isVisible, onClose }) => {
  const bgColor =
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-4 right-4 p-4 rounded-lg text-white ${bgColor} shadow-lg`}
      onClick={onClose}
    >
      {message}
    </motion.div>
  );
};

export default FeedbackToast; // Exportação padrão
```

    - 📄 Footer.tsx
    
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, MessageCircle, Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const currentYear = new Date().getFullYear();

  const linkVariants = {
    hover: { x: 5, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-text)] relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-[var(--color-accent)]/20 via-transparent to-transparent" />
      
      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-[var(--color-accent)]" />
              <h3 className="text-xl font-bold text-white">FH Resolve</h3>
            </div>
            <p className="text-white/70 mb-6 text-sm">
              Serviços profissionais de manutenção residencial em Florianópolis.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={18} />, href: '#' },
                { icon: <Facebook size={18} />, href: '#' },
                { icon: <Linkedin size={18} />, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:text-white transition-colors border border-white/10"
                  aria-label={`Link para ${social.icon.type.name}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-base font-medium mb-5 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: 'Início', href: '#hero' },
                { name: 'Sobre', href: '#about' },
                { name: 'Serviços', href: '#benefits' },
                { name: 'Portfólio', href: '#portfolio' },
                { name: 'Contato', href: '#contact' }
              ].map((item) => (
                <motion.li key={item.name} whileHover="hover">
                  <a 
                    href={item.href} 
                    className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <motion.span variants={linkVariants} className="flex items-center">
                      <span className="h-1 w-1 bg-[var(--color-accent)] rounded-full mr-2"></span>
                      {item.name}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-base font-medium mb-5 text-white">Serviços</h3>
            <ul className="space-y-3">
              {[
                'Reparos Elétricos',
                'Serviços Hidráulicos',
                'Montagem de Móveis',
                'Pinturas e Acabamentos',
                'Reparos Gerais'
              ].map((service) => (
                <motion.li key={service} whileHover="hover">
                  <a 
                    href="#benefits" 
                    className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <motion.span variants={linkVariants} className="flex items-center">
                      <span className="h-1 w-1 bg-[var(--color-accent)] rounded-full mr-2"></span>
                      {service}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-base font-medium mb-5 text-white">Contato</h3>
            <ul className="space-y-4">
              {[
                { icon: <Phone size={16} />, value: '+55 48 99191-9791', href: 'tel:+5548991919791' },
                { icon: <MessageCircle size={16} />, value: 'WhatsApp', href: 'https://wa.me/5548991919791' },
                { icon: <Mail size={16} />, value: 'contato@fhresolve.com.br', href: 'mailto:contato@fhresolve.com.br' },
                { icon: <MapPin size={16} />, value: 'Ratones, Florianópolis' },
              ].map((item, index) => (
                <motion.li key={index} whileHover="hover">
                  <a 
                    href={item.href} 
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <motion.span variants={linkVariants} className="flex items-center gap-3">
                      <span className="text-[var(--color-accent)]">{item.icon}</span>
                      {item.value}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">© {currentYear} FH Resolve. Todos os direitos reservados.</p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            className="h-10 w-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shadow-md"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

    - 📄 Header.tsx
    
```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Wrench, MessageCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useFeedback } from '../context/FeedbackContext';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useFeedback();

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Serviços', href: '#benefits' },
    { name: 'Sobre', href: '#about' },
    { name: 'Trabalhos', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.href.slice(1));

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleThemeChange = () => {
    toggleTheme();
    // Forçar atualização dos componentes com um pequeno atraso
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    showToast(`Tema alterado para ${theme === 'light' ? 'escuro' : 'claro'}`, 'success');
  };

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  const getHeaderBackground = () => {
    if (isOpen) {
      return theme === 'light'
        ? 'bg-white/95 backdrop-blur-md'
        : 'bg-[var(--color-primary)]/95 backdrop-blur-md';
    }

    if (scrolled) {
      return theme === 'light'
        ? 'bg-white/90 backdrop-blur-md shadow-sm'
        : 'bg-[var(--color-primary)]/90 backdrop-blur-md shadow-sm';
    }

    return theme === 'light'
      ? 'bg-white/80 backdrop-blur-sm'
      : 'bg-[var(--color-primary)]/80 backdrop-blur-sm';
  };

  const getLinkClass = (isActive: boolean) => {
    const baseClass = "relative font-medium py-2 px-1 transition-colors";
    
    if (isActive) {
      return `${baseClass} text-[var(--color-accent)]`;
    }
    
    return theme === 'light' 
      ? `${baseClass} text-[var(--color-primary)]/80 hover:text-[var(--color-accent)]` 
      : `${baseClass} text-[var(--color-text)]/80 hover:text-[var(--color-accent)]`;
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      } ${getHeaderBackground()}`}
      aria-label="Navegação principal"
    >
      <div className="container flex items-center justify-between">
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          className="flex items-center gap-2 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Wrench className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
          <span className="text-lg font-bold text-[var(--color-accent)] dark:text-[var(--color-text)]">FH Resolve</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Menu de navegação desktop">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={getLinkClass(isActive)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full"
                    layoutId="activeNavIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleThemeChange}
            className="p-2 rounded-full bg-[var(--color-neutral)]/5 hover:bg-[var(--color-accent)]/10 transition-colors z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>

          <motion.a
            href="https://wa.me/5548991919791"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-all shadow-sm z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Contato via WhatsApp"
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span className="text-sm font-medium">Orçamento Grátis</span>
          </motion.a>

          <motion.button
            className="md:hidden z-50 p-2 rounded-md bg-[var(--color-accent)] text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              ref={navRef}
              className="fixed inset-0 w-full min-h-screen md:hidden z-40 overflow-y-auto"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(17, 24, 39, 0.98)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="container pt-20 pb-8 px-4 min-h-screen flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        className={`block py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                          isActive
                            ? `bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium border-l-2 border-[var(--color-accent)]`
                            : `text-[var(--color-text)]/80 dark:text-[var(--color-text)]/80 hover:bg-[var(--color-neutral)]/10`
                        }`}
                        whileHover={{ x: 3 }}
                        whileTap={{ x: 0 }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20">
                  <a
                    href="https://wa.me/5548991919791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white py-3 px-4 rounded-lg font-medium"
                  >
                    <MessageCircle size={18} />
                    Fale pelo WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
```

    - 📄 Hero.tsx
    
```tsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MessageCircle, CreditCard, ArrowDown, Wrench, Droplet, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, index }) => (
  <motion.div
    className="service-card relative overflow-hidden p-5 rounded-lg 
               bg-white/10 dark:bg-white/5 border border-[var(--color-neutral)]/20 
               dark:border-white/10 transition-all duration-300"
    style={{
      backdropFilter: "blur(8px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, duration: 0.5 }}
    whileHover={{ 
      y: -5, 
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
      borderColor: "rgba(var(--color-accent-rgb), 0.3)"
    }}
  >
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 flex items-center justify-center rounded-lg 
                    bg-[var(--color-accent)]/10 text-[var(--color-accent)] 
                    flex-shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1 text-[var(--color-text)]">{title}</h3>
        <p className="text-sm text-[var(--color-text)]/80">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    { icon: <Wrench size={22} />, title: 'Reparos Elétricos', desc: 'Instalações e consertos profissionais com garantia.' },
    { icon: <Droplet size={22} />, title: 'Serviços Hidráulicos', desc: 'Soluções para vazamentos e instalações de qualidade.' },
    { icon: <ShieldCheck size={22} />, title: 'Qualidade Garantida', desc: 'Atendimento rápido e serviço de excelência.' },
  ];

  //força troca da cor do thema 
  

  // Verificar se é dispositivo móvel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize(); // Verificar no carregamento inicial
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    // Limpar animações anteriores antes de configurar novas
    ScrollTrigger.getAll().forEach((t) => t.kill());
    
    gsap.to('.hero-bg', {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Apenas aplicar esta animação se não estiver em modo móvel
    if (!isMobile) {
      gsap.from('.service-card', {
        y: 20,
        opacity: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]); // Adicionar isMobile como dependência

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('benefits');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-28 sm:pt-20 md:pt-0"
    >
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574873934798-d7ef3dc98c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/80 to-[var(--color-primary)]/70"></div>
      </div>

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 max-w-xl">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8 }}
              className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20"
            >
              <span className="text-sm font-medium text-[var(--color-accent)]">Serviços Profissionais</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="block">Solução Completa</span>
              <span className="text-[var(--color-accent)]">para sua Casa</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-[var(--color-text)]/80 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Reparos elétricos, hidráulicos e serviços gerais em Florianópolis com rapidez, qualidade e preço justo.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="https://wa.me/5548991919791"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--color-accent)] text-[var(--color-text-light)] rounded-md font-medium hover:bg-[var(--color-accent-dark)] transition-all shadow-md"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={18} />
                <span>Orçamento em 1 Hora</span>
              </motion.a>
              
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-[var(--color-neutral)]/20 bg-white/5 backdrop-blur-sm text-[var(--color-text)]"
                whileHover={{ 
                  backgroundColor: 'rgba(var(--color-neutral-rgb), 0.05)',
                  borderColor: 'rgba(var(--color-accent-rgb), 0.2)'
                }}
              >
                <CreditCard size={18} className="text-[var(--color-accent)]" />
                <span className="text-sm">
                  Até <strong>12x</strong> sem juros
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Contentor dos cards com maior visibilidade no mobile */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'space-y-4'}`}>
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  desc={service.desc}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Separador Visual */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-gray)] to-transparent dark:from-[var(--color-primary)] z-5" />

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label="Rolar para a seção Sobre"
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="text-[var(--color-text)]/60 text-sm mb-2">Saiba Mais</span>
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <ArrowDown className="text-[var(--color-accent)] h-5 w-5" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
```

    - 📄 LoadingScreen.tsx
    
```tsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Wrench } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Impedir scroll durante a animação
    document.documentElement.classList.add('no-scroll');
    
    // Referências aos elementos DOM
    const container = containerRef.current;
    const logo = logoRef.current;
    
    if (!container || !logo) return;
    
    // Timeline com contexto GSAP
    const ctx = gsap.context(() => {
      // Timeline principal para a animação de loading
      const tl = gsap.timeline({
        onComplete: () => {
          // Timeline para remover a tela de loading
          const exitTl = gsap.timeline({
            onComplete: () => {
              document.documentElement.classList.remove('no-scroll');
            }
          });
          
          // Anima a saída da tela de loading
          exitTl
            .to('.loading-container', { 
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut'
            })
            .to('.loading-content', {
              y: -40,
              duration: 0.6,
              ease: 'power3.in'
            }, '<');
        }
      });
      
      // Configuração inicial da animação
      gsap.set('.logo-icon', { scale: 0, opacity: 0 });
      gsap.set('.logo-text', { y: 30, opacity: 0 });
      gsap.set('.loading-bar-progress', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.loading-message', { opacity: 0, y: 20 });
      gsap.set('.loading-particles', { opacity: 0 });
      
      // Anima o logo e a barra de progresso
      tl.to('.logo-icon', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      })
      .to('.logo-text', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .to('.loading-message', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.loading-particles', {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1
      }, '-=0.3')
      .to('.loading-bar-progress', {
        scaleX: 1,
        duration: 1.8,
        ease: 'power1.inOut'
      }, '-=0.3')
      .to('.tool-icon', {
        rotation: 360,
        duration: 1.5,
        ease: 'power1.inOut'
      }, '-=1.8');
    }, container);
    
    // Cleanup
    return () => {
      ctx.revert();
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);
  
  return (
    <motion.div
      ref={containerRef}
      className="loading-container fixed inset-0 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/95 flex items-center justify-center z-50 overflow-hidden"
    >
      <div 
        ref={logoRef} 
        className="loading-content relative z-10 flex flex-col items-center"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="logo-icon relative bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-6 overflow-hidden">
            {/* Efeito de pulsação atrás do ícone */}
            <div className="absolute inset-0 bg-[var(--color-accent)]/20 rounded-xl animate-pulse"></div>
            <Wrench className="h-12 w-12 text-[var(--color-accent)] tool-icon relative z-10" />
          </div>
          
          <div className="logo-text flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              FH<span className="text-[var(--color-accent)]">Resolve</span>
            </h1>
            <p className="text-white/60 text-sm mt-1">Manutenção Residencial</p>
          </div>
        </div>
        
        <div className="loading-message text-white/80 text-sm font-medium mb-8 flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-[var(--color-accent)] rounded-full animate-pulse"></span>
          <span>Carregando soluções para sua casa...</span>
        </div>
        
        <div className="loading-bar w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="loading-bar-progress h-full bg-gradient-to-r from-[var(--color-accent)]/80 to-[var(--color-accent)]"></div>
        </div>
        
        {/* Mensagem de dica abaixo da barra de progresso */}
        <p className="text-white/40 text-xs mt-4 max-w-xs text-center">
          Oferecemos serviços profissionais de manutenção residencial em Florianópolis e região
        </p>
      </div>

      {/* Elementos decorativos - partículas flutuantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div 
            key={i}
            className={`loading-particles absolute rounded-full bg-[var(--color-accent)]/5 ${
              i % 3 === 0 ? 'animate-float' : i % 3 === 1 ? 'animate-pulse-slow' : 'animate-bounce'
            }`}
            initial={{ 
              x: Math.random() * 100 - 50, 
              y: Math.random() * 100 - 50,
              opacity: 0
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0.5
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              width: `${Math.random() * 100 + 30}px`,
              height: `${Math.random() * 100 + 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 3}s`
            }}
          />
        ))}
        
        {/* Elementos de ferramentas estilizados no fundo */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 opacity-10">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
            <path d="M35.7,3.7 C34.4,4.9 33.7,6.6 33.7,8.3 L33.7,15.5 C33.7,19.1 36.6,22 40.2,22 C43.8,22 46.7,19.1 46.7,15.5 L46.7,8.3 C46.7,6.6 46,4.9 44.7,3.7 C42.2,1.2 38.2,1.2 35.7,3.7 L35.7,3.7 Z M40.2,18 C38.8,18 37.7,16.9 37.7,15.5 L37.7,8.3 C37.7,7.8 37.9,7.3 38.3,6.9 C39.1,6.1 40.4,6.1 41.2,6.9 C41.6,7.3 41.8,7.8 41.8,8.3 L41.8,15.5 C41.7,16.9 41.1,18 40.2,18 Z" />
            <path d="M85.4,70.8 L79.3,64.7 C77,62.4 73.1,62.4 70.8,64.7 L66.1,69.4 L30.9,34.2 L35.6,29.5 C37.9,27.2 37.9,23.3 35.6,21 L29.5,14.9 C27.2,12.6 23.3,12.6 21,14.9 L2.6,33.3 C0.3,35.6 0.3,39.5 2.6,41.8 L8.7,47.9 C9.8,49 11.3,49.6 12.9,49.6 C14.5,49.6 16,49 17.1,47.9 L21.8,43.2 L57,78.4 L52.3,83.1 C50,85.4 50,89.3 52.3,91.6 L58.4,97.7 C59.5,98.8 61,99.4 62.6,99.4 C64.2,99.4 65.7,98.8 66.8,97.7 L85.2,79.3 C87.7,77.1 87.7,73.2 85.4,70.8 L85.4,70.8 Z M14.1,44.9 C13.9,45.1 13.4,45.1 13.2,44.9 L7.1,38.8 C6.9,36.6 6.9,36.1 7.1,35.9 L25.5,17.5 C25.7,17.3 26.2,17.3 26.4,17.5 L32.5,23.6 C32.7,23.8 32.7,24.3 32.5,24.5 L14.1,44.9 Z M82.4,76.3 L64,94.7 C63.8,94.9 63.3,94.9 63.1,94.7 L57,88.6 C56.8,88.4 56.8,87.9 57,87.7 L77.3,67.4 C77.5,67.2 78,67.2 78.2,67.4 L84.3,73.5 C84.5,73.7 84.5,74.2 84.3,74.4 L82.4,76.3 Z" />
          </svg>
        </div>
        
        <div className="absolute -top-10 -left-10 w-48 h-48 opacity-10 rotate-45">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
            <path d="M97.5,43.8 L92.5,43.8 L92.5,33.9 C92.5,32.3 91.2,31 89.6,31 L68.9,31 C67.3,31 66,32.3 66,33.9 L66,43.8 L61.1,43.8 L61.1,24 C61.1,22.4 59.8,21.1 58.2,21.1 L37.5,21.1 C35.9,21.1 34.6,22.4 34.6,24 L34.6,43.8 L29.6,43.8 L29.6,48.8 C29.6,50.4 30.9,51.7 32.5,51.7 L97.5,51.7 C99.1,51.7 100.4,50.4 100.4,48.8 L100.4,46.7 C100.4,45.1 99.1,43.8 97.5,43.8 Z" />
            <path d="M28.6,56.7 L28.6,76 C28.6,77.6 27.3,78.9 25.7,78.9 L5,78.9 C3.4,78.9 2.1,77.6 2.1,76 L2.1,56.7 C2.1,55.1 3.4,53.8 5,53.8 L25.7,53.8 C27.3,53.8 28.6,55.1 28.6,56.7 Z M25.7,73.9 L25.7,58.8 L5,58.8 L5,73.9 L25.7,73.9 Z" />
            <path d="M89.6,83.9 L68.9,83.9 C67.3,83.9 66,82.6 66,81 L66,61.7 C66,60.1 67.3,58.8 68.9,58.8 L89.6,58.8 C91.2,58.8 92.5,60.1 92.5,61.7 L92.5,81 C92.5,82.6 91.2,83.9 89.6,83.9 Z M68.9,63.8 L68.9,78.9 L89.6,78.9 L89.6,63.8 L68.9,63.8 Z" />
            <path d="M58.2,64.2 L37.5,64.2 C35.9,64.2 34.6,62.9 34.6,61.3 L34.6,56.3 L29.6,56.3 C28,56.3 26.7,55 26.7,53.4 C26.7,51.8 28,50.5 29.6,50.5 L34.6,50.5 L34.6,48.3 C34.6,46.7 35.9,45.4 37.5,45.4 L58.2,45.4 C59.8,45.4 61.1,46.7 61.1,48.3 L61.1,50.5 L66,50.5 C67.6,50.5 68.9,51.8 68.9,53.4 C68.9,55 67.6,56.3 66,56.3 L61.1,56.3 L61.1,61.3 C61.1,62.9 59.7,64.2 58.2,64.2 Z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
```

    - 📄 MapContent.tsx
    
```tsx
// src/components/MapContent.tsx
'use client';

import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Componente para centralizar o mapa em uma localização
function SetViewOnLocation({ location }: { location: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location, map]);
  return null;
}

// Ícones personalizados para marcadores do mapa
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const activeMarkerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  className: 'active-marker',
});

interface MapContentProps {
  currentView: [number, number];
  locations: Array<{ name: string; position: [number, number]; primary?: boolean }>;
  selectedLocation: string | null;
  isUsingGeolocation: boolean;
  setSelectedLocation: (value: string) => void;
  setIsUsingGeolocation: (value: boolean) => void;
}

const MapContent: React.FC<MapContentProps> = ({
  currentView,
  locations,
  selectedLocation,
  isUsingGeolocation,
  setSelectedLocation,
  setIsUsingGeolocation
}) => {
  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <MapContainer
      center={[-27.5132, -48.4618]}
      zoom={12}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      className="z-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetViewOnLocation location={currentView} />

      {/* Marcador de localização do usuário */}
      {isUsingGeolocation && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Marker
            position={currentView}
            icon={new Icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              className: 'user-location-marker',
            })}
          >
            <Popup className="card">Sua localização atual</Popup>
          </Marker>
          <Circle
            center={currentView}
            radius={300}
            pathOptions={{
              color: 'var(--color-accent)',
              fillColor: 'var(--color-accent)',
              fillOpacity: 0.2,
              weight: 2,
            }}
          />
        </motion.div>
      )}

      {/* Marcadores das regiões */}
      {locations.map((location) => (
        <motion.div
          key={location.name}
          variants={markerVariants}
          initial="hidden"
          animate="visible"
        >
          <Marker
            position={location.position as [number, number]}
            icon={location.name === selectedLocation ? activeMarkerIcon : markerIcon}
            eventHandlers={{
              click: () => {
                setSelectedLocation(location.name);
                setIsUsingGeolocation(false);
              },
            }}
          >
            <Popup className="card">
              <div className="text-center p-1">
                <h3 className="font-bold text-base mb-1 card-text">{location.name}</h3>
                <p className="text-sm card-text-secondary">Área atendida</p>
                {location.primary && (
                  <span className="badge badge-primary mt-1">Sede Principal</span>
                )}
              </div>
            </Popup>
          </Marker>
          <Circle
            center={location.position as [number, number]}
            radius={2000}
            pathOptions={{
              color:
                location.name === selectedLocation
                  ? 'var(--color-accent)'
                  : 'var(--color-secondary)',
              fillColor:
                location.name === selectedLocation
                  ? 'var(--color-accent)'
                  : 'var(--color-secondary)',
              fillOpacity: location.name === selectedLocation ? 0.2 : 0.1,
            }}
          />
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default MapContent;
```

    - 📄 Portfolio.tsx
    
```tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Filter, X, ChevronLeft, ChevronRight, ExternalLink, MapPin, Tag, Calendar } from 'lucide-react';
import Image from 'next/image';

// Interface para os itens do portfólio
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  date?: string;
  details?: string;
}

const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    title: 'Instalação Elétrica', 
    description: 'Tomadas e interruptores em Jurerê.', 
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'elétrica',
    location: 'Jurerê',
    date: 'Março 2025',
    details: 'Instalação completa de rede elétrica residencial, incluindo tomadas, interruptores e pontos de iluminação.'
  },
  { 
    id: 2, 
    title: 'Reparo Hidráulico', 
    description: 'Conserto de vazamento em Ratones.', 
    image: 'https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'hidráulica',
    location: 'Ratones',
    date: 'Fevereiro 2025',
    details: 'Identificação e correção de vazamento em tubulação embutida.'
  },
  // ... outros itens permanecem iguais
];

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [filter, setFilter] = useState('todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedImage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFilterOpen &&
        filterDropdownRef.current &&
        filterButtonRef.current &&
        !filterDropdownRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  const filteredItems = filter === 'todos' ? portfolioItems : portfolioItems.filter((item) => item.category === filter);
  const categories = ['todos', 'elétrica', 'hidráulica', 'montagem', 'pintura'];

  const navigateGallery = (direction: 'next' | 'prev') => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[newIndex]);
    setSelectedImage(filteredItems[newIndex].image);
  };

  const getGridCols = () => {
    if (windowWidth < 640) return 'grid-cols-1';
    if (windowWidth < 1024) return 'grid-cols-2';
    return 'grid-cols-3';
  };

  const toggleExpandItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleCategorySelect = (category: string) => {
    setFilter(category);
    setIsFilterOpen(false);
    setExpandedItem(null);
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-12">
          <motion.span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Trabalhos Realizados
          </motion.span>
          <motion.h2 className="section-title mb-4 text-[var(--color-text)]" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            Nosso Portfólio
          </motion.h2>
          <motion.p className="section-subtitle text-[var(--color-text)]/80" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            Conheça alguns dos nossos trabalhos recentes
          </motion.p>

          {/* Filtro */}
          <motion.div className="relative mb-10 z-30" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="md:hidden">
              <motion.button ref={filterButtonRef} onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center justify-center gap-2 mx-auto px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-white font-medium shadow-lg shadow-[var(--color-accent)]/20" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Filter className="h-4 w-4" />
                <span>Filtrar: {filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
              </motion.button>
              {isFilterOpen && <div className="fixed inset-0 bg-transparent z-20" onClick={() => setIsFilterOpen(false)} />}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div ref={filterDropdownRef} className="absolute z-30 mt-3 p-3 w-64 left-1/2 transform -translate-x-1/2 bg-[var(--color-card-bg)] rounded-2xl shadow-xl border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20 backdrop-blur-sm" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }}>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <motion.button key={category} onClick={() => handleCategorySelect(category)} className={`block w-full text-left px-4 py-3 rounded-xl text-sm ${filter === category ? 'bg-[var(--color-accent)] text-white font-medium shadow-md shadow-[var(--color-accent)]/20' : 'hover:bg-[var(--color-accent)]/10 card-text transition-colors'}`} whileHover={{ x: 3 }}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <motion.button key={category} onClick={() => handleCategorySelect(category)} className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all ${filter === category ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-[var(--color-card-bg)] text-[var(--color-text)] hover:bg-[var(--color-neutral)]/10 border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/10'}`} whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {filter === category && <motion.span className="absolute inset-0 rounded-full bg-[var(--color-accent)]" layoutId="activeCategory" style={{ zIndex: -1 }} />}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Grid de portfólio */}
          <LayoutGroup>
            <motion.div className={`grid ${getGridCols()} gap-6 sm:gap-8 md:gap-10`} layout>
              <AnimatePresence mode="popLayout">
                {filteredItems.length === 0 ? (
                  <motion.div className="col-span-full py-16 text-center bg-[var(--color-card-bg)] rounded-2xl shadow-lg border border-[var(--color-neutral)]/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="text-[var(--color-text)]/70">Nenhum item encontrado na categoria selecionada.</p>
                  </motion.div>
                ) : (
                  filteredItems.map((item) => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ duration: 0.4 }} className={`bg-[var(--color-card-bg)] rounded-2xl overflow-hidden shadow-lg border border-[var(--color-neutral)]/20 dark:border-[var(--color-neutral)]/10 cursor-pointer transition-all duration-500 ${expandedItem === item.id ? 'col-span-full md:col-span-2 md:row-span-2' : ''}`}>
                      <div className={`relative overflow-hidden ${expandedItem === item.id ? 'aspect-auto' : 'aspect-[4/3]'}`} onClick={() => {
                        if (!isFilterOpen) {
                          if (windowWidth < 768) {
                            setSelectedItem(item);
                            setSelectedImage(item.image);
                          } else {
                            toggleExpandItem(item.id);
                          }
                        }
                      }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/80 via-[var(--color-dark)]/20 to-transparent opacity-60 transition-opacity duration-300 z-10"></div>
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          width={800}  // Adicionado
                          height={600} // Adicionado
                          className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${expandedItem === item.id ? 'max-h-80 object-cover object-top' : ''}`}
                          loading="lazy" 
                        />
                        <div className="absolute inset-0 bg-[var(--color-accent)]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-5"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md">{item.title}</h3>
                          <p className="text-white/90 mb-3 drop-shadow-md">{item.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-accent)]/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                              <Tag size={12} /> {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                            {item.location && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm"><MapPin size={12} /> {item.location}</span>}
                            {item.date && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm"><Calendar size={12} /> {item.date}</span>}
                          </div>
                          {expandedItem === item.id ? (
                            <motion.button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[var(--color-accent)] rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-accent)]/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={(e) => { e.stopPropagation(); toggleExpandItem(item.id); }}>
                              <X size={14} /> Fechar
                            </motion.button>
                          ) : (
                            <motion.button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors" whileHover={{ scale: 1.05, x: 3 }} whileTap={{ scale: 0.95 }}>
                              Ver detalhes <ExternalLink size={14} />
                            </motion.button>
                          )}
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedItem === item.id && (
                          <motion.div className="p-6 border-t border-[var(--color-neutral)]/20" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                            <h4 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Detalhes do Projeto</h4>
                            <p className="text-[var(--color-text)]/80 mb-6">{item.details}</p>
                            <div className="flex flex-wrap gap-3">
                              <motion.a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors shadow-md" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                Solicitar orçamento similar
                              </motion.a>
                              <motion.button onClick={() => { setSelectedItem(item); setSelectedImage(item.image); }} className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-neutral)]/10 text-[var(--color-text)] rounded-full font-medium hover:bg-[var(--color-neutral)]/20 transition-colors" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                Ampliar imagem
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filteredItems.length > 0 && (
            <motion.div className="mt-16" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
              <motion.a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg shadow-[var(--color-accent)]/20" whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(var(--color-accent-rgb), 0.4)" }} whileTap={{ scale: 0.97 }}>
                Solicitar orçamento personalizado
              </motion.a>
            </motion.div>
          )}
        </div>

        {/* Modal de visualização */}
        <AnimatePresence>
          {selectedImage && selectedItem && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setSelectedImage(null); setSelectedItem(null); }}>
              <motion.button className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white backdrop-blur-md z-50 border border-white/20" whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={() => { setSelectedImage(null); setSelectedItem(null); }} aria-label="Fechar">
                <X className="h-5 w-5" />
              </motion.button>
              {filteredItems.length > 1 && (
                <>
                  <motion.button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white backdrop-blur-md z-40 hidden sm:flex border border-white/20" whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }} aria-label="Imagem anterior">
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white backdrop-blur-md z-40 hidden sm:flex border border-white/20" whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }} aria-label="Próxima imagem">
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </>
              )}
              <motion.div className="relative max-w-5xl w-full flex flex-col items-center rounded-3xl overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <Image
                  src={selectedImage}
                  alt={selectedItem.title}
                  width={1200} // Ajustado para modal
                  height={800} // Ajustado para modal
                  className="w-full max-h-[70vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <motion.div className="w-full bg-white/10 backdrop-blur-lg p-6 border-t border-white/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                  <p className="text-white/90 mb-4">{selectedItem.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent)]/80 text-white text-sm font-medium rounded-full"><Tag size={14} /> {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}</span>
                    {selectedItem.location && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full"><MapPin size={14} /> {selectedItem.location}</span>}
                    {selectedItem.date && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full"><Calendar size={14} /> {selectedItem.date}</span>}
                  </div>
                  {selectedItem.details && <p className="text-white/80 max-w-3xl">{selectedItem.details}</p>}
                  <motion.a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors" whileHover={{ scale: 1.05, x: 3 }} whileTap={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()}>
                    Solicitar orçamento similar
                  </motion.a>
                </motion.div>
                <div className="absolute inset-x-0 bottom-20 flex justify-between w-full h-24 sm:hidden">
                  <div className="w-1/3 h-full" onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }}></div>
                  <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()}></div>
                  <div className="w-1/3 h-full" onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }}></div>
                </div>
                <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex gap-3 sm:hidden">
                  {filteredItems.length > 1 && <span className="text-white/70 text-xs backdrop-blur-md bg-black/20 px-2 py-1 rounded-full">Deslize para navegar</span>}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
```

    - 📄 Projects.tsx
    
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <section id="projects" className="py-20 bg-[var(--color-light)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="section-title">Galeria de Projetos</h2>
          <p className="section-subtitle">Novos projetos em breve</p>
        </motion.div>

        <motion.div
          className="relative rounded-xl bg-[var(--color-accent)]/10 p-8 shadow-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maskImage: 'linear-gradient(45deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(45deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <FolderOpen className="h-16 w-16 text-[var(--color-accent)] mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Projetos Futuros</h3>
              <p className="text-[var(--color-text)] mb-6">
                Em breve, uma galeria com nossos principais projetos.
              </p>
              <motion.button
                className="flex items-center gap-2 text-[var(--color-accent)]"
                whileHover={{ gap: 8 }}
              >
                <span>Saiba mais</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <motion.div className="w-64 h-64 bg-[var(--color-neutral)]/10 rounded-xl flex items-center justify-center" whileHover={{ scale: 1.05 }}>
              <p className="text-lg font-semibold">Em Construção</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
```

    - 📄 Reviews.tsx
    
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, Heading } from '@/components/ui/Card';
import { Star, ThumbsUp, ThumbsDown, Plus, Copy, CheckCircle, Link as LinkIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/axios';

// Interface para tipagem da resposta da API
interface GenerateReviewResponse {
  message: string;
  reviewLink: string;
  reviewId: string;
}

interface Review {
  _id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  isApproved: boolean;
  createdAt: string;
  isTokenUsed: boolean;
}

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', location: '' });
  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      toast.error('Erro ao carregar avaliações');
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (id: string) => {
    try {
      await api.post(`/api/reviews/${id}/approve`, { approve: true });
      toast.success('Avaliação aprovada com sucesso');
      fetchReviews();
    } catch (error) {
      console.error('Erro ao aprovar avaliação:', error);
      toast.error('Erro ao aprovar avaliação');
    }
  };

  const rejectReview = async (id: string) => {
    try {
      await api.post(`/api/reviews/${id}/approve`, { approve: false });
      toast.success('Avaliação rejeitada com sucesso');
      fetchReviews();
    } catch (error) {
      console.error('Erro ao rejeitar avaliação:', error);
      toast.error('Erro ao rejeitar avaliação');
    }
  };

  const generateReviewLink = async () => {
    if (!newReview.name || !newReview.location) {
      toast.error('Nome e localização são obrigatórios');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await api.post<GenerateReviewResponse>('/api/reviews/generate-token', {
        name: newReview.name,
        location: newReview.location,
      });

      if (!response.data.reviewLink) {
        throw new Error('Link não retornado pelo servidor');
      }

      setGeneratedLink(response.data.reviewLink);
      toast.success('Link gerado com sucesso');
    } catch (error: any) {
      console.error('Erro ao gerar link:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Erro ao gerar link de avaliação');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência');
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Avaliações" description="Gerencie as avaliações de clientes" />
        <button
          onClick={() => setShowGenerateModal(true)}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Gerar Link
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : reviews.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhuma avaliação ainda</p>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Gerar Link para Avaliação
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review._id} className={review.isTokenUsed ? '' : 'border-dashed border-amber-500'}>
              <div className="p-4">
                {!review.isTokenUsed ? (
                  <div className="text-center py-4">
                    <p className="font-medium mb-2">Link enviado para {review.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Aguardando cliente completar a avaliação
                    </p>
                    <div className="text-amber-500 animate-pulse flex items-center justify-center gap-2">
                      <LinkIcon size={16} />
                      <span className="text-sm">Link ativo</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{review.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{review.location}</p>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        review.isApproved
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {review.isApproved ? 'Aprovada' : 'Pendente'}
                      </div>
                    </div>
                    <div className="flex my-3">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      "{review.text}"
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    {!review.isApproved && (
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => rejectReview(review._id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                          title="Rejeitar"
                        >
                          <ThumbsDown size={16} />
                        </button>
                        <button
                          onClick={() => approveReview(review._id)}
                          className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                          title="Aprovar"
                        >
                          <ThumbsUp size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal para gerar link de avaliação */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Gerar Link para Avaliação</h2>
              {generatedLink ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Link gerado com sucesso! Compartilhe com o cliente:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={generatedLink}
                        readOnly
                        className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-accent hover:bg-accent/10 rounded-md"
                        title="Copiar link"
                      >
                        {linkCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setShowGenerateModal(false);
                        setGeneratedLink('');
                        setNewReview({ name: '', location: '' });
                        fetchReviews();
                      }}
                      className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md"
                    >
                      Concluir
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome do Cliente
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Digite o nome do cliente"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Localização
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Ex: Jurerê, Florianópolis"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowGenerateModal(false);
                        setNewReview({ name: '', location: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={generateReviewLink}
                      disabled={isGenerating || !newReview.name || !newReview.location}
                      className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        'Gerar Link'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

    - 📄 RoleGuard.tsx
    
```tsx
// src/components/RoleGuard.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackUrl?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  fallbackUrl = '/dashboard' 
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      const hasRequiredRole = session?.user?.role && allowedRoles.includes(session.user.role);
      setIsAuthorized(hasRequiredRole);
      
      if (!hasRequiredRole) {
        router.push(fallbackUrl);
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router, allowedRoles, fallbackUrl]);

  if (status === 'loading' || isAuthorized === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-[var(--color-accent)]" />
          <p className="text-[var(--color-text)]/70 text-sm">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return null;
};
```

    - 📄 ServiceMap.tsx
    
```tsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Map as MapIcon, List, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Componente para centralizar o mapa em uma localização
function SetViewOnLocation({ location }: { location: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location, map]);
  return null;
}

// Ícones personalizados para marcadores do mapa
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const activeMarkerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  className: 'active-marker',
});

// Dados de localizações
const locations = [
  { name: 'Ratones', position: [-27.5132, -48.4618], primary: true },
  { name: 'Jurerê', position: [-27.4386, -48.4958] },
  { name: 'Canasvieiras', position: [-27.4278, -48.4778] },
  { name: 'Ingleses', position: [-27.4358, -48.3958] },
  { name: 'Santo Antônio de Lisboa', position: [-27.5075, -48.5211] },
  { name: 'Vargem Pequena', position: [-27.4664, -48.4319] },
  { name: 'Vargem Grande', position: [-27.4386, -48.4319] },
  { name: 'Daniela', position: [-27.4458, -48.5211] },
];

const ServiceMap: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [selectedLocation, setSelectedLocation] = useState<string | null>('Ratones');
  const [currentView, setCurrentView] = useState<[number, number]>([-27.5132, -48.4618]);
  const [isUsingGeolocation, setIsUsingGeolocation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Sinalizar quando o componente estiver montado
  useEffect(() => setIsMounted(true), []);

  // Atualizar a visualização do mapa quando o local selecionado mudar
  useEffect(() => {
    if (selectedLocation) {
      const location = locations.find((loc) => loc.name === selectedLocation);
      if (location) setCurrentView(location.position as [number, number]);
    }
  }, [selectedLocation]);

  // Função para selecionar uma localização
  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
    if (isMobile) setActiveTab('map');
    setIsUsingGeolocation(false);
  };

  // Função para obter a localização do usuário
  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
          setCurrentView(userLocation);
          setIsUsingGeolocation(true);
          setSelectedLocation(null);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
        }
      );
    } else {
      alert('Geolocalização não é suportada por este navegador.');
    }
  };

  // Variantes de animação para elementos
  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="map" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Localização
          </motion.span>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Áreas Atendidas
          </motion.h2>
          <motion.p
            className="section-subtitle text-contrast-80"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Atendemos Florianópolis e região
          </motion.p>
        </div>

        {/* Seletor de abas para dispositivos móveis */}
        {isMobile && (
          <div className="flex mx-auto mb-6 rounded-lg overflow-hidden shadow-custom-sm border border-[var(--color-neutral)]/30 max-w-sm">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('map')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'map'
                  ? 'bg-[var(--color-accent)] text-[var(--color-text-light)] font-medium'
                  : 'bg-[var(--color-card-bg)] text-[var(--color-card-text)] hover:bg-[var(--color-accent)]/10'
              }`}
              aria-label="Ver mapa"
            >
              <MapIcon size={18} />
              <span>Mapa</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'list'
                  ? 'bg-[var(--color-accent)] text-[var(--color-text-light)] font-medium'
                  : 'bg-[var(--color-card-bg)] text-[var(--color-card-text)] hover:bg-[var(--color-accent)]/10'
              }`}
              aria-label="Ver lista de regiões"
            >
              <List size={18} />
              <span>Regiões</span>
            </motion.button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Lista de localizações */}
          <AnimatePresence mode="wait">
            {(activeTab === 'list' || !isMobile) && (
              <motion.div
                key="region-list"
                className="md:col-span-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={isMobile ? tabVariants : {}}
              >
                <div className="card">
                  <h3 className="text-lg font-medium mb-6 flex items-center card-text">
                    <MapPin className="h-5 w-5 text-[var(--color-accent)] mr-2" />
                    Regiões Atendidas
                  </h3>
                  <ul className="space-y-2">
                    {locations.map((location) => (
                      <motion.li
                        key={location.name}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          location.name === selectedLocation
                            ? 'bg-[var(--color-accent)] text-[var(--color-text-light)]'
                            : 'bg-[var(--color-gray)] dark:bg-[var(--color-neutral)]/10 hover:bg-[var(--color-neutral)]/20'
                        }`}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLocationSelect(location.name)}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                              location.name === selectedLocation
                                ? 'bg-[var(--color-text-light)]/20'
                                : 'bg-[var(--color-accent)]/10'
                            }`}
                          >
                            <MapPin
                              className={`h-4 w-4 ${
                                location.name === selectedLocation
                                  ? 'text-[var(--color-text-light)]'
                                  : 'text-[var(--color-accent)]'
                              }`}
                            />
                          </span>
                          <span className="font-medium">{location.name}</span>
                          {location.primary && location.name === selectedLocation && (
                            <span className="text-xs ml-auto bg-[var(--color-text-light)]/20 px-2 py-0.5 rounded-full">
                              Principal
                            </span>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20">
                    <p className="text-sm card-text-secondary mb-4">
                      Atendemos estas regiões e arredores. Consulte disponibilidade.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGetUserLocation}
                      className="btn btn-outline w-full flex items-center justify-center gap-2"
                    >
                      <Navigation size={16} className="text-[var(--color-accent)]" />
                      <span>Minha localização</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Componente do mapa */}
          <AnimatePresence mode="wait">
            {(activeTab === 'map' || !isMobile) && (
              <motion.div
                key="map-container"
                className={`${isMobile ? '' : 'md:col-span-2'}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={isMobile ? tabVariants : {}}
              >
                <div className="card h-[450px] md:h-[500px] relative overflow-hidden p-2">
                  {isMounted && (
                    <MapContainer
                      center={[-27.5132, -48.4618]}
                      zoom={12}
                      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                      className="z-10"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <SetViewOnLocation location={currentView} />

                      {/* Marcador de localização do usuário */}
                      {isUsingGeolocation && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Marker
                            position={currentView}
                            icon={new Icon({
                              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                              iconSize: [25, 41],
                              iconAnchor: [12, 41],
                              className: 'user-location-marker',
                            })}
                          >
                            <Popup className="card">Sua localização atual</Popup>
                          </Marker>
                          <Circle
                            center={currentView}
                            radius={300}
                            pathOptions={{
                              color: 'var(--color-accent)',
                              fillColor: 'var(--color-accent)',
                              fillOpacity: 0.2,
                              weight: 2,
                            }}
                          />
                        </motion.div>
                      )}

                      {/* Marcadores das regiões */}
                      {locations.map((location) => (
                        <motion.div
                          key={location.name}
                          variants={markerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Marker
                            position={location.position as [number, number]}
                            icon={location.name === selectedLocation ? activeMarkerIcon : markerIcon}
                            eventHandlers={{
                              click: () => {
                                setSelectedLocation(location.name);
                                setIsUsingGeolocation(false);
                              },
                            }}
                          >
                            <Popup className="card">
                              <div className="text-center p-1">
                                <h3 className="font-bold text-base mb-1 card-text">{location.name}</h3>
                                <p className="text-sm card-text-secondary">Área atendida</p>
                                {location.primary && (
                                  <span className="badge badge-primary mt-1">Sede Principal</span>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                          <Circle
                            center={location.position as [number, number]}
                            radius={2000}
                            pathOptions={{
                              color:
                                location.name === selectedLocation
                                  ? 'var(--color-accent)'
                                  : 'var(--color-secondary)',
                              fillColor:
                                location.name === selectedLocation
                                  ? 'var(--color-accent)'
                                  : 'var(--color-secondary)',
                              fillOpacity: location.name === selectedLocation ? 0.2 : 0.1,
                            }}
                          />
                        </motion.div>
                      ))}
                    </MapContainer>
                  )}

                  {/* Botão de localização */}
                  <motion.button
                    className="absolute bottom-4 right-4 btn btn-outline p-3 rounded-full z-[1000]"
                    onClick={handleGetUserLocation}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Mostrar minha localização"
                  >
                    <Navigation size={20} />
                  </motion.button>

                  {/* Indicador de localização selecionada em dispositivos móveis */}
                  {isMobile && selectedLocation && !isUsingGeolocation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-0 right-0 mx-auto w-max card px-3 py-1.5 z-[1000] flex items-center gap-2"
                    >
                      <MapPin size={14} className="text-[var(--color-accent)]" />
                      <span className="font-medium text-sm card-text">{selectedLocation}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-contrast-60 italic">
            Verifique disponibilidade para sua região
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;
```

    - 📄 Testimonials.tsx
    
```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  { 
    id: 1, 
    name: 'Ana Silva', 
    location: 'Jurerê', 
    rating: 5, 
    text: 'Serviço rápido e confiável! O Fernando resolveu um problema elétrico que outros não conseguiram identificar. Super recomendo!', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' 
  },
  { 
    id: 2, 
    name: 'Carlos Mendes', 
    location: 'Ratones', 
    rating: 5, 
    text: 'Excelente profissional! Pontual, organizado e resolveu o vazamento no banheiro com muita eficiência. Meu contato fixo para reparos!', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' 
  },
  { 
    id: 3, 
    name: 'Mariana Costa', 
    location: 'Canasvieiras', 
    rating: 5, 
    text: 'Contratei para montar os móveis do meu apartamento novo e fiquei muito satisfeita. Trabalho impecável e preço justo!', 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' 
  },
  { 
    id: 4, 
    name: 'Roberto Almeida', 
    location: 'Ingleses', 
    rating: 5, 
    text: 'Reparo urgente na pia da cozinha resolvido em menos de uma hora. Atendimento super rápido. Recomendo!', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' 
  },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [current, autoplay]);

  return (
    <section id="testimonials" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-10">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Depoimentos
          </motion.span>
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            O Que Nossos Clientes Dizem
          </motion.h2>
          <motion.p 
            className="section-subtitle text-[var(--color-text)]/80"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A satisfação dos nossos clientes é o nosso maior orgulho
          </motion.p>
        </div>
        
        {/* Métricas de satisfação */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: '98%', label: 'Satisfação' },
            { value: '200+', label: 'Clientes' },
            { value: '500+', label: 'Projetos concluídos' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-[var(--color-neutral)]/20"
            >
              <h3 className="text-3xl font-bold text-[var(--color-accent)] mb-1">{stat.value}</h3>
              <p className="text-sm text-[var(--color-text)]/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <motion.div 
            className="overflow-hidden relative rounded-xl bg-white dark:bg-[var(--color-neutral)]/5 p-8 md:p-10 shadow-sm border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Aspas decorativas */}
            <svg 
              className="absolute top-8 left-8 w-10 h-10 text-[var(--color-accent)]/10" 
              fill="currentColor" 
              viewBox="0 0 32 32"
            >
              <path d="M9.352 27.12c-2.56 0-4.64-.832-6.24-2.496C1.52 22.967.72 20.8.72 18.137c0-2.24.544-4.48 1.632-6.72 1.088-2.24 2.4-4.16 3.936-5.76C7.824 4.065 9.584 2.72 11.568 1.632L13.872 4.8c-1.92 1.088-3.456 2.4-4.608 3.936-1.152 1.536-1.728 3.184-1.728 4.944 0 .768.16 1.376.48 1.824a39.77 39.77 0 0 0 1.44-1.44c.512-.576 1.136-1.056 1.872-1.44.736-.384 1.6-.576 2.592-.576 1.856 0 3.36.672 4.512 2.016 1.152 1.344 1.728 3.08 1.728 5.208 0 1.856-.544 3.456-1.632 4.8-1.088 1.344-2.8 2.016-5.136 2.016zm16.128 0c-2.56 0-4.64-.832-6.24-2.496-1.6-1.664-2.4-3.824-2.4-6.48 0-2.24.544-4.48 1.632-6.72 1.088-2.24 2.4-4.16 3.936-5.76 1.536-1.6 3.288-2.944 5.28-4.032L30 4.8c-1.92 1.088-3.456 2.4-4.608 3.936a10.824 10.824 0 0 0-1.728 4.944c0 .768.16 1.376.48 1.824.448-.448.896-.928 1.344-1.44.512-.576 1.136-1.056 1.872-1.44.736-.384 1.6-.576 2.592-.576 1.856 0 3.36.672 4.512 2.016 1.152 1.344 1.728 3.08 1.728 5.208 0 1.856-.544 3.456-1.632 4.8-1.088 1.344-2.8 2.016-5.136 2.016z"></path>
            </svg>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col md:flex-row items-center gap-8 relative z-10"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--color-accent)]/20 shadow-sm">
                    <Image
                      src={testimonials[current].image}
                      alt={`Cliente ${testimonials[current].name}`}
                      width={150}  // Adicionado
                      height={150} // Adicionado
                      className="w-full h-full object-cover"
                      loading="lazy" // Adicionado para desempenho
                    />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 text-[var(--color-dark)] dark:text-[var(--color-text)] leading-relaxed">"{testimonials[current].text}"</p>
                  <div>
                    <h4 className="font-medium text-xl text-[var(--color-dark)] dark:text-[var(--color-text)]">{testimonials[current].name}</h4>
                    <p className="text-[var(--color-accent)]">{testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between items-center mt-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                className="p-2 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-accent)]/10 transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-5 w-5 text-[var(--color-accent)]" />
              </motion.button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrent(index)}
                    whileHover={{ scale: 1.1 }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      current === index ? 'bg-[var(--color-accent)] w-6' : 'bg-[var(--color-accent)]/30'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                className="p-2 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-accent)]/10 transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-5 w-5 text-[var(--color-accent)]" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
```

  - 📁 context/
    - 📄 FeedbackContext.tsx
    
```tsx
'use client';

import FeedbackToast from '@/components/FeedbackToast';
import React, { createContext, useContext, useState } from 'react';


interface FeedbackContextType {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');

  const showToast = (msg: string, toastType: 'success' | 'error' | 'info') => {
    setMessage(msg);
    setType(toastType);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000); // Fecha automaticamente após 3 segundos
  };

  return (
    <FeedbackContext.Provider value={{ showToast }}>
      {children}
      <FeedbackToast
        message={message}
        type={type}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
```

    - 📄 SiteConfigContext.tsx
    
```tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';

export interface SiteThemes {
  light: ThemeColors;
  dark: ThemeColors;
}

export interface ThemeColors {
  primary: string;
  accent: string;
  secondary: string;
  neutral: string;
  text: string;
  textLight: string;
  dark: string;
  light: string;
  gray: string;
  cardBg: string;
  cardText: string;
  paralel: string;
  accentDark: string;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactInfo: { email: string; phone: string; address: string };
  socialMedia: { instagram: string; facebook: string; whatsapp: string };
  themes: SiteThemes;
  activeTemplate: string;
  activeTheme: 'light' | 'dark' | 'system';
  maintenanceMode: boolean;
  logoUrl: string;
  faviconUrl: string;
}

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const defaultThemeColors: ThemeColors = {
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
  accentDark: '#247885',
};

const defaultConfig: SiteConfig = {
  siteName: 'FH Resolve',
  siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
  contactInfo: {
    email: 'contato@fhresolve.com.br',
    phone: '48991919791',
    address: 'Ratones, Florianópolis - SC',
  },
  socialMedia: { instagram: '', facebook: '', whatsapp: '48991919791' },
  themes: {
    light: defaultThemeColors,
    dark: {
      ...defaultThemeColors,
      text: '#FFFFFF',
      dark: '#252525',
      light: '#333333',
      cardBg: '#333333',
      cardText: '#FFFFFF',
      gray: '#3A3A3A',
      neutral: '#8D9192',
    },
  },
  activeTemplate: 'default',
  activeTheme: 'light',
  maintenanceMode: false,
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/site-config');
        if (response.data) {
          setConfig((current) => ({
            ...current,
            ...response.data,
            themes: {
              light: { ...current.themes.light, ...(response.data.themes?.light || {}) },
              dark: { ...current.themes.dark, ...(response.data.themes?.dark || {}) },
            },
          }));
        }
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar configurações:', err);
        setError('Falha ao carregar configurações do site');
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (mounted && !loading) {
      const root = document.documentElement;
      const isDark = config.activeTheme === 'dark' || (config.activeTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const theme = isDark ? config.themes.dark : config.themes.light;
  
      // Aplicar todas as variáveis imediatamente
      Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
        if (key === 'accent' || key === 'secondary' || key === 'neutral') {
          const rgb = hexToRgb(value);
          if (rgb) {
            root.style.setProperty(`--color-${key}-rgb`, `${rgb.r}, ${rgb.g}, ${rgb.b}`);
          }
        }
      });
      
      // Adicionar um evento de mudança de tema para forçar repintura de elementos
      document.dispatchEvent(new CustomEvent('themechange', { 
        detail: { theme: isDark ? 'dark' : 'light' } 
      }));
    }
  }, [config, loading, mounted]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    try {
      setLoading(true);
      const updatedConfig = {
        ...config,
        ...newConfig,
        themes: newConfig.themes
          ? {
              light: { ...config.themes.light, ...(newConfig.themes.light || {}) },
              dark: { ...config.themes.dark, ...(newConfig.themes.dark || {}) },
            }
          : config.themes,
      };
      await axios.post('/api/site-config', updatedConfig);
      setConfig(updatedConfig);
      setError(null);
    } catch (err) {
      console.error('Erro ao atualizar configurações:', err);
      setError('Falha ao salvar configurações do site');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <SiteConfigContext.Provider value={{ config: defaultConfig, updateConfig, loading: true, error: null }}>
        {children}
      </SiteConfigContext.Provider>
    );
  }

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, loading, error }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
```

    - 📄 ThemeContext.tsx
    
```tsx
// src/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  isDashboard: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  isDashboard?: boolean;
  initialTheme?: 'light' | 'dark' | 'system';
}> = ({ children, isDashboard = false, initialTheme = 'system' }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(
    initialTheme === 'dark' ? 'dark' : 'light'
  );
  const [mounted, setMounted] = useState(false);

  // Função para aplicar o tema no documento
  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Forçar repintagem de todas as variáveis CSS
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      // Aplicar variáveis do tema escuro
      root.style.setProperty('--color-text', '#FFFFFF');
      root.style.setProperty('--color-dark', '#252525');
      root.style.setProperty('--color-light', '#333333');
      root.style.setProperty('--color-gray', '#3A3A3A');
      root.style.setProperty('--color-card-bg', '#333333');
      root.style.setProperty('--color-card-text', '#FFFFFF');
      root.style.setProperty('--color-neutral', '#8D9192');
    } else {
      // Aplicar variáveis do tema claro
      root.style.setProperty('--color-text', '#252525');
      root.style.setProperty('--color-dark', '#252525');
      root.style.setProperty('--color-light', '#FFFFFF');
      root.style.setProperty('--color-gray', '#EDEDED');
      root.style.setProperty('--color-card-bg', '#FFFFFF');
      root.style.setProperty('--color-card-text', '#252525');
      root.style.setProperty('--color-neutral', '#EDEDED');
    }
    
    // Outras variáveis que permanecem constantes em ambos os temas
    root.style.setProperty('--color-primary', '#252525');
    root.style.setProperty('--color-accent', '#2B8D9A');
    root.style.setProperty('--color-secondary', '#8D9192');
    root.style.setProperty('--color-text-light', '#FFFFFF');
    root.style.setProperty('--color-paralel', newTheme === 'dark' ? '#EDEDED' : '#F5F5F5');
    root.style.setProperty('--color-accent-dark', '#247885');
    
    // Definir valores RGB para cores que precisam de transparência
    const accentRgb = '43, 141, 154'; // #2B8D9A
    const secondaryRgb = '141, 145, 146'; // #8D9192
    const neutralRgb = newTheme === 'dark' ? '141, 145, 146' : '237, 237, 237'; // #8D9192 ou #EDEDED
    
    root.style.setProperty('--color-accent-rgb', accentRgb);
    root.style.setProperty('--color-secondary-rgb', secondaryRgb);
    root.style.setProperty('--color-neutral-rgb', neutralRgb);
  }

  useEffect(() => {
    setMounted(true);
    const storageKey = isDashboard ? 'dashboard-theme' : 'site-theme';
    const savedTheme = localStorage.getItem(storageKey) as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    let resolvedTheme: 'light' | 'dark';
    if (initialTheme === 'system') {
      resolvedTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    } else {
      resolvedTheme = (initialTheme as 'light' | 'dark') || (savedTheme ?? 'light');
    }
  
    setThemeState(resolvedTheme);
    // Aplicar o tema no momento do carregamento
    applyTheme(resolvedTheme);
    
    // Adicionar listener para mudanças de preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (initialTheme === 'system' && !savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isDashboard, initialTheme]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    if (typeof window !== 'undefined') {
      const storageKey = isDashboard ? 'dashboard-theme' : 'site-theme';
      localStorage.setItem(storageKey, newTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  if (!mounted) {
    // Durante SSR, retorna um tema padrão para evitar diferenças
    return (
      <ThemeContext.Provider
        value={{ theme: initialTheme === 'dark' ? 'dark' : 'light', toggleTheme, setTheme, isDashboard }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDashboard }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
```

  - 📁 lib/
    - 📄 axios.ts
    
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true, // Garante que cookies de autenticação sejam enviados
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

    - 📄 drive-service.ts
    
```typescript
import axios from 'axios';

export interface FileMetadata {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

export class GoogleDriveService {
  private apiKey: string;
  
  constructor() {
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Drive API Key não configurada');
    }
    
    this.apiKey = apiKey;
  }
  
  async getFile(fileId: string): Promise<FileMetadata> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/drive/v3/files/${fileId}`,
        {
          params: {
            key: this.apiKey,
            fields: 'id,name,mimeType,webContentLink,webViewLink,thumbnailLink',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter arquivo do Google Drive:', error);
      throw new Error('Falha ao obter arquivo do Google Drive');
    }
  }
  
  async listFiles(folderId: string): Promise<FileMetadata[]> {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/drive/v3/files',
        {
          params: {
            key: this.apiKey,
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'files(id,name,mimeType,webContentLink,webViewLink,thumbnailLink)',
          },
        }
      );
      
      return response.data.files;
    } catch (error) {
      console.error('Erro ao listar arquivos do Google Drive:', error);
      throw new Error('Falha ao listar arquivos do Google Drive');
    }
  }
  
  getContentUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  getThumbnailUrl(fileId: string): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`;
  }
  
  getEmbedUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
}

export default new GoogleDriveService();
```

    - 📄 mongodb.ts
    
```typescript
import mongoose from 'mongoose';

interface MongooseInstance {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseInstance | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor, defina a variável de ambiente MONGODB_URI');
}

const cached: MongooseInstance = global.mongoose ?? {
  conn: null,
  promise: null,
};

// Atribuir ao global apenas se não existir
if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
```

  - 📁 models/
    - 📄 blog.ts
    
```typescript
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
  },
  slug: {
    type: String,
    required: [true, 'Slug é obrigatório'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
  },
  excerpt: {
    type: String,
    required: [true, 'Resumo é obrigatório'],
  },
  coverImage: {
    url: String,
    driveId: String,
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
  },
  tags: [{
    type: String,
  }],
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const BlogModel = models.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;
```

    - 📄 estimate.ts
    
```typescript
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const estimateItemSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Descrição do item é obrigatória'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantidade é obrigatória'],
    min: [0.01, 'Quantidade deve ser maior que 0'],
  },
  unit: {
    type: String,
    default: 'un',
  },
  unitPrice: {
    type: Number,
    required: [true, 'Preço unitário é obrigatório'],
    min: [0, 'Preço unitário não pode ser negativo'],
  },
});

const estimateSchema = new Schema({
  clientName: {
    type: String,
    required: [true, 'Nome do cliente é obrigatório'],
  },
  clientEmail: {
    type: String,
  },
  clientPhone: {
    type: String,
    required: [true, 'Telefone do cliente é obrigatório'],
  },
  address: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Título do orçamento é obrigatório'],
  },
  description: {
    type: String,
  },
  items: [estimateItemSchema],
  subtotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
  },
  paymentTerms: {
    type: String,
  },
  validUntil: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'accepted', 'rejected', 'expired'],
    default: 'draft',
  },
  token: {
    type: String,
    unique: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pré-save para calcular os valores
estimateSchema.pre('save', function(next) {
  // Calcular subtotal
  this.subtotal = this.items.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice);
  }, 0);
  
  // Calcular total com desconto e taxas
  let total = this.subtotal;
  
  if (this.discount) {
    total -= this.discount;
  }
  
  if (this.tax) {
    total += this.tax;
  }
  
  this.total = total;
  
  // Atualiza a data de modificação
  this.updatedAt = new Date();
  
  next();
});

const EstimateModel = models.Estimate || mongoose.model('Estimate', estimateSchema);

export default EstimateModel;
```

    - 📄 portfolio.ts
    
```typescript
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const portfolioSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: ['elétrica', 'hidráulica', 'montagem', 'pintura', 'geral'],
  },
  location: {
    type: String,
    required: [true, 'Localização é obrigatória'],
  },
  date: {
    type: Date,
    required: [true, 'Data é obrigatória'],
  },
  details: {
    type: String,
  },
  images: [{
    url: String,
    driveId: String,
    caption: String,
  }],
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const PortfolioModel = models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

export default PortfolioModel;

```

    - 📄 quote.ts
    
```typescript
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const quoteSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  phone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
  },
  message: {
    type: String,
    required: [true, 'Mensagem é obrigatória'],
  },
  status: {
    type: String,
    enum: ['novo', 'em_contato', 'convertido', 'encerrado'],
    default: 'novo',
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const QuoteModel = models.Quote || mongoose.model('Quote', quoteSchema);

export default QuoteModel;
```

    - 📄 review.ts
    
```typescript
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const reviewSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  location: {
    type: String,
    required: [true, 'Localização é obrigatória'],
  },
  rating: {
    type: Number,
    min: [1, 'A avaliação deve ser no mínimo 1'],
    max: [5, 'A avaliação deve ser no máximo 5'],
    required: [
      function () {
        return this.isTokenUsed === true;
      },
      'Avaliação é obrigatória quando o token é usado',
    ],
  },
  text: {
    type: String,
    required: [
      function () {
        return this.isTokenUsed === true;
      },
      'Texto da avaliação é obrigatório quando o token é usado',
    ],
  },
  image: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    unique: true,
  },
  isTokenUsed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Limpar cache do modelo, caso já exista
delete mongoose.models.Review;

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;
```

    - 📄 settings.ts
    
```typescript
// src/models/settings.ts
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

// Definição para cores do tema
const themeColorsSchema = new Schema({
  primary: { type: String, default: '#252525' },
  accent: { type: String, default: '#2B8D9A' },
  secondary: { type: String, default: '#8D9192' },
  neutral: { type: String, default: '#EDEDED' },
  text: { type: String, default: '#252525' },
  textLight: { type: String, default: '#FFFFFF' },
  dark: { type: String, default: '#252525' },
  light: { type: String, default: '#FFFFFF' },
  gray: { type: String, default: '#EDEDED' },
  cardBg: { type: String, default: '#FFFFFF' },
  cardText: { type: String, default: '#252525' },
  paralel: { type: String, default: '#F5F5F5' },
  accentDark: { type: String, default: '#247885' }
}, { _id: false });

// Definição para temas (claro e escuro)
const themesSchema = new Schema({
  light: { type: themeColorsSchema, default: () => ({}) },
  dark: { type: themeColorsSchema, default: () => ({}) }
}, { _id: false });

// Definição para informações de contato
const contactInfoSchema = new Schema({
  email: { type: String, default: 'contato@fhresolve.com.br' },
  phone: { type: String, default: '48991919791' },
  address: { type: String, default: 'Ratones, Florianópolis - SC' }
}, { _id: false });

// Schema principal para as configurações do site
const settingsSchema = new Schema({
  // Informações básicas do site
  siteName: {
    type: String,
    default: 'FH Resolve',
  },
  siteDescription: {
    type: String,
    default: 'Serviços profissionais de manutenção residencial em Florianópolis',
  },
  
  // Informações de contato
  contactInfo: {
    type: contactInfoSchema,
    default: () => ({})
  },
  
  // Redes sociais
  socialMedia: {
    instagram: String,
    facebook: String,
    whatsapp: String,
  },
  
  // Configurações de tema
  themes: {
    type: themesSchema,
    default: () => ({})
  },
  
  // Configurações de template e tema ativo
  activeTemplate: {
    type: String,
    default: 'default'
  },
  
  defaultTheme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'light',
  },
  
  // Modo de manutenção
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
  
  // URLs de recursos
  logoUrl: {
    type: String,
    default: '/logo.svg'
  },
  
  faviconUrl: {
    type: String,
    default: '/favicon.ico'
  },
  
  // Metadados
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Limpar modelo anterior se existir
mongoose.models = {};

const SettingsModel = mongoose.model('Settings', settingsSchema);

export default SettingsModel;
```

    - 📄 user.ts
    
```typescript
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = models.User || mongoose.model('User', userSchema);

export default UserModel;
```

    - 📄 video.ts
    
```typescript
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const videoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
  },
  driveId: {
    type: String,
    required: [true, 'ID do Google Drive é obrigatório'],
  },
  thumbnail: {
    url: String,
    driveId: String,
  },
  isBeforeAfter: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const VideoModel = models.Video || mongoose.model('Video', videoSchema);

export default VideoModel;
```

  - 📁 scripts/
    - 📄 create-admin.ts
    
```typescript
// Este script pode ser executado uma vez para criar o usuário admin inicial
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import UserModel from '../models/user';

async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
}

async function createAdminUser() {
  try {
    await connectToDatabase();
    
    const adminEmail = 'admin@fhresolve.com';
    
    // Verifica se já existe um usuário admin
    const existingAdmin = await UserModel.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Cria a senha com hash
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Cria o usuário admin
    const adminUser = new UserModel({
      name: 'Administrador',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });
    
    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createAdminUser();
```

  - 📁 types/
    - 📄 next-auth.d.ts
    
```typescript
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
```

  - 📄 middleware.ts
  
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  
  const isAuthPage = req.nextUrl.pathname === '/login';
  const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
  
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};
```

- 📄 eslint.config.mjs
  [Arquivo binário]

- 📄 next-env.d.ts

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

- 📄 next.config.ts

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Adicione o domínio aqui
  },
};

module.exports = nextConfig;
```

- 📄 package.json

```json
{
  "name": "fhresolve-admin",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "create-admin": "node --loader @esbuild-kit/esm-loader src/scripts/create-admin.ts"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "axios": "^1.8.2",
    "bcryptjs": "^2.4.3",
    "date-fns": "^3.6.0",
    "dotenv": "^16.4.7",
    "framer-motion": "^12.4.10",
    "gsap": "^3.12.7",
    "lucide-react": "^0.479.0",
    "mongoose": "^8.2.2",
    "next": "15.2.1",
    "next-auth": "^4.24.11",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.51.1",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.0.1",
    "react-leaflet": "^5.0.0",
    "recharts": "^2.12.3",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@esbuild-kit/esm-loader": "^2.6.5",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^9",
    "eslint-config-next": "15.2.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "ts-node": "^10.9.2",
    "typescript": "^5"
  }
}

```

- 📄 postcss.config.mjs
  [Arquivo binário]

- 📄 README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

- 📄 tailwind.config.mjs
  [Arquivo binário]

- 📄 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

- 📄 tsconfig.tsnode.json

```json
{
    "ts-node": {
      "esm": true,
      "experimentalResolver": true
    },
    "compilerOptions": {
      "module": "ESNext",
      "target": "ES2017",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "strict": true
    }
  }
```
  