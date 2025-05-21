# Análise de Projeto para IA - fhresolve-admin 

**🚨 Instrução Fundamental para a IA:**
**VOCÊ DEVE USAR ESTE DOCUMENTO COMO A ÚNICA FONTE DE CONTEXTO.**
Analise o projeto, responda às perguntas e gere código/sugestões baseando-se **exclusivamente** nas informações contidas aqui (visão geral, dependências, scripts, estrutura de pastas e conteúdo dos arquivos fornecidos).
**Não invente arquivos, funções ou dependências que não estejam listados.**

---

**Gerado em:** 21/05/2025, 11:15:09
**Diretório Raiz Analisado:** `E:\Projetos\fhresolve\fhresolve`
**Node Version:** v18.20.4 | **Plataforma:** win32

## 1. Visão Geral do Projeto

**Nome:** fhresolve-admin
**Versão:** 0.1.0
**Descrição:** (não definida)
**Ponto de Entrada Principal (main):** `(não definido)`
**Ponto de Entrada Módulo (module):** `(não definido)`

**Resumo do README.md:**
```markdown
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
```

## 2. Dependências

### Dependências Principais (`dependencies`):
```json
{
  "@hookform/resolvers": "^3.3.4",
  "@tanstack/react-query-persist-client": "^5.67.3",
  "animate.css": "^4.1.1",
  "animejs": "^3.2.2",
  "axios": "^1.8.2",
  "bcryptjs": "^2.4.3",
  "date-fns": "^3.6.0",
  "dotenv": "^16.4.7",
  "framer-motion": "^12.4.10",
  "gsap": "^3.12.7",
  "leaflet": "^1.9.4",
  "lucide-react": "^0.479.0",
  "mongoose": "^8.2.2",
  "next": "15.2.1",
  "next-auth": "^4.24.11",
  "next-themes": "^0.4.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hook-form": "^7.51.1",
  "react-hot-toast": "^2.4.1",
  "react-icons": "^5.0.1",
  "react-leaflet": "^5.0.0",
  "recharts": "^2.12.3",
  "sanitize-html": "^2.14.0",
  "sonner": "^2.0.3",
  "type-fest": "^4.37.0",
  "zod": "^3.22.4"
}
```

### Dependências de Desenvolvimento (`devDependencies`):
```json
{
  "@esbuild-kit/esm-loader": "^2.6.5",
  "@types/bcryptjs": "^2.4.6",
  "@types/leaflet": "^1.9.16",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@types/sanitize-html": "^2.13.0",
  "autoprefixer": "^10.4.21",
  "eslint": "^9",
  "eslint-config-next": "15.2.1",
  "postcss": "^8.4.47",
  "tailwindcss": "^3.4.14",
  "ts-node": "^10.9.2",
  "typescript": "^5"
}
```

## 3. Scripts (`package.json`)

| Script | Comando |
|---|---|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `next lint` |
| `create-admin` | `node --loader @esbuild-kit/esm-loader src/scripts/create-admin.ts` |

## 4. Estrutura de Pastas

```
fhresolve/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   ├── 📁 auth/
│   │   │   │   └── 📁 [...nextauth]/
│   │   │   │       └── 📄 route.ts
│   │   │   ├── 📁 dashboard/
│   │   │   │   └── 📁 stats/
│   │   │   │       └── 📄 route.ts
│   │   │   ├── 📁 estimates/
│   │   │   │   ├── 📁 [id]/
│   │   │   │   │   ├── 📁 status/
│   │   │   │   │   │   └── 📄 route.ts
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 portfolio/
│   │   │   │   ├── 📁 [id]/
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 quotes/
│   │   │   │   ├── 📁 [id]/
│   │   │   │   │   └── 📁 status/
│   │   │   │   │       └── 📄 route.ts
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 reviews/
│   │   │   │   ├── 📁 [id]/
│   │   │   │   │   ├── 📁 approve/
│   │   │   │   │   │   └── 📄 route.ts
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   ├── 📁 generate-token/
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 settings/
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 site-config/
│   │   │   │   └── 📄 route.ts
│   │   │   └── 📁 users/
│   │   │       └── 📄 route.ts
│   │   ├── 📁 avaliar/
│   │   │   └── 📁 [token]/
│   │   │       ├── 📄 page.tsx
│   │   │       └── 📄 ReviewPage.tsx
│   │   ├── 📁 dashboard/
│   │   │   ├── 📁 appearance/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 blog/
│   │   │   │   ├── 📁 new/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 estimates/
│   │   │   │   ├── 📁 new/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 portfolio/
│   │   │   │   ├── 📁 new/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 quotes/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 reviews/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 settings/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 users/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 videos/
│   │   │   │   ├── 📁 new/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 orcamento/
│   │   │   └── 📁 [token]/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 portfolio/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 utils/
│   │   │   ├── 📄 formatters.ts
│   │   │   └── 📄 themeAdapter.ts
│   │   ├── 📄 globals.css
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 page.tsx
│   │   ├── 📄 providers.tsx
│   │   └── 📄 sitemap.xml
│   ├── 📁 components/
│   │   ├── 📁 dashboard/
│   │   │   ├── 📄 Sidebar.tsx
│   │   │   ├── 📄 Stats.tsx
│   │   │   └── 📄 Topbar.tsx
│   │   ├── 📁 estimate-view/
│   │   │   ├── 📄 ConfirmModal.tsx
│   │   │   ├── 📄 ContactSection.tsx
│   │   │   ├── 📄 DetailsSection.tsx
│   │   │   ├── 📄 ErrorState.tsx
│   │   │   ├── 📄 EstimateHeader.tsx
│   │   │   ├── 📄 FeedbackModal.tsx
│   │   │   ├── 📄 Footer.tsx
│   │   │   ├── 📄 Header.tsx
│   │   │   ├── 📄 HistoryPanel.tsx
│   │   │   ├── 📄 ItemsSection.tsx
│   │   │   ├── 📄 LoadingState.tsx
│   │   │   ├── 📄 NotesSection.tsx
│   │   │   ├── 📄 ShareModal.tsx
│   │   │   └── 📄 SummarySection.tsx
│   │   ├── 📁 new-estimate/
│   │   │   ├── 📄 ActionButtons.tsx
│   │   │   ├── 📄 AdditionalInfoCard.tsx
│   │   │   ├── 📄 ClientInfoCard.tsx
│   │   │   ├── 📄 DetailedItemsTable.tsx
│   │   │   ├── 📄 EstimateDetailsCard.tsx
│   │   │   ├── 📄 EstimateTypeSelector.tsx
│   │   │   ├── 📄 MaterialsTable.tsx
│   │   │   ├── 📄 PageHeader.tsx
│   │   │   ├── 📄 ServicesTable.tsx
│   │   │   ├── 📄 SuccessModal.tsx
│   │   │   └── 📄 TotalsCard.tsx
│   │   ├── 📁 settings/
│   │   │   ├── 📄 AdvancedSettings.tsx
│   │   │   ├── 📄 AppearanceSettings.tsx
│   │   │   ├── 📄 ColorPicker.tsx
│   │   │   ├── 📄 ContactSettings.tsx
│   │   │   ├── 📄 GeneralSettings.tsx
│   │   │   ├── 📄 SaveButton.tsx
│   │   │   ├── 📄 ServiceEditor.tsx
│   │   │   ├── 📄 SettingsSidebar.tsx
│   │   │   └── 📄 TemplateEditor.tsx
│   │   ├── 📁 ui/
│   │   │   ├── 📄 Button.tsx
│   │   │   ├── 📄 Card.tsx
│   │   │   ├── 📄 Heading.tsx
│   │   │   ├── 📄 Input.tsx
│   │   │   ├── 📄 LoadingSpinner.tsx
│   │   │   ├── 📄 Modal.tsx
│   │   │   └── 📄 Toaster.tsx
│   │   ├── 📄 About.tsx
│   │   ├── 📄 Benefits.tsx
│   │   ├── 📄 Blog.tsx
│   │   ├── 📄 Contact.tsx
│   │   ├── 📄 FeedbackToast.tsx
│   │   ├── 📄 Footer.tsx
│   │   ├── 📄 Header.tsx
│   │   ├── 📄 Hero.tsx
│   │   ├── 📄 LoadingScreen.tsx
│   │   ├── 📄 MapContent.tsx
│   │   ├── 📄 Portfolio.tsx
│   │   ├── 📄 ProjectCard.tsx
│   │   ├── 📄 Projects.tsx
│   │   ├── 📄 Reviews.tsx
│   │   ├── 📄 RoleGuard.tsx
│   │   ├── 📄 ServiceMap.tsx
│   │   ├── 📄 Testimonials.tsx
│   │   ├── 📄 ThemeProvider.tsx
│   │   └── 📄 Tracking.tsx
│   ├── 📁 context/
│   │   ├── 📄 AppContext.tsx
│   │   ├── 📄 FeedbackContext.tsx
│   │   └── 📄 SiteConfigContext.tsx
│   ├── 📁 data/
│   │   └── 📄 projects.ts
│   ├── 📁 hooks/
│   │   ├── 📄 useCalculations.ts
│   │   ├── 📄 useEstimateSchema.ts
│   │   ├── 📄 useReview.ts
│   │   ├── 📄 useSettingsData.ts
│   │   └── 📄 useSiteConfig.ts
│   ├── 📁 lib/
│   │   ├── 📄 auth.ts
│   │   ├── 📄 axios.ts
│   │   ├── 📄 drive-service.ts
│   │   ├── 📄 mongodb.ts
│   │   ├── 📄 motion-variants.ts
│   │   ├── 📄 projects.ts
│   │   └── 📄 utils.ts
│   ├── 📁 models/
│   │   ├── 📄 blog.ts
│   │   ├── 📄 estimate.ts
│   │   ├── 📄 portfolio.ts
│   │   ├── 📄 quote.ts
│   │   ├── 📄 review.ts
│   │   ├── 📄 settings.ts
│   │   ├── 📄 user.ts
│   │   └── 📄 video.ts
│   ├── 📁 scripts/
│   │   └── 📄 create-admin.ts
│   ├── 📁 types/
│   │   ├── 📄 estimate.ts
│   │   ├── 📄 leaflet.d.ts
│   │   ├── 📄 next-auth.d.ts
│   │   ├── 📄 project.ts
│   │   └── 📄 settings.ts
│   └── 📄 middleware.ts
├── 📄 eslint.config.mjs
├── 📄 jsconfig.json
├── 📄 next-env.d.ts
├── 📄 next.config.ts
├── 📄 postcss.config.mjs
├── 📄 README-animacoes.md
├── 📄 README.md
├── 📄 tailwind.config.mjs
├── 📄 tsconfig.json
└── 📄 tsconfig.tsnode.json
```

## 5. Conteúdo Detalhado dos Arquivos

---
### 📄 Arquivo: `src/app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```


---
### 📄 Arquivo: `src/app/api/dashboard/stats/route.ts`

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


---
### 📄 Arquivo: `src/app/api/estimates/[id]/status/route.ts`

```typescript
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
```


---
### 📄 Arquivo: `src/app/api/estimates/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Types } from 'mongoose';
import dbConnect from '@/lib/mongodb';
import EstimateModel from '@/models/estimate';

// Função GET
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const id = await params.id; // Desestruturando params diretamente
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();
    const id  = params.id; // Desestruturando params diretamente
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
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();
    const  id  = params.id; // Desestruturando params diretamente

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
```


---
### 📄 Arquivo: `src/app/api/estimates/route.ts`

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
    const existing = await EstimateModel.findOne({ token }).lean();
    if (!existing) return token;
    attempts++;
  }
  throw new Error('Não foi possível gerar um token único após várias tentativas');
};

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const estimates = await EstimateModel.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(estimates);
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar orçamentos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    console.log('Dados recebidos em POST /api/estimates:', data); // Depuração

    // Validação básica
    if (!data.clientName || !data.clientPhone || !data.title) {
      return NextResponse.json(
        { error: 'Dados incompletos: cliente, telefone e título são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação específica por tipo de orçamento
    if (data.estimateType === 'detailed' && (!data.items || data.items.length === 0)) {
      return NextResponse.json(
        { error: 'Orçamento detalhado requer pelo menos um item' },
        { status: 400 }
      );
    }
    if (data.estimateType === 'materials' && 
        ((!data.materials || data.materials.length === 0) || (!data.services || data.services.length === 0))) {
      return NextResponse.json(
        { error: 'Orçamento de materiais requer pelo menos um material e um serviço' },
        { status: 400 }
      );
    }
    if (data.estimateType === 'simple' && (!data.services || data.services.length === 0)) {
      return NextResponse.json(
        { error: 'Orçamento simplificado requer pelo menos um serviço' },
        { status: 400 }
      );
    }

    const token = await generateUniqueToken();
    const newEstimate = await EstimateModel.create({
      ...data,
      token,
      createdBy: session.user.id,
      status: 'draft',
    });

    const estimateLink = `${process.env.NEXTAUTH_URL}/orcamento/${token}`;
    return NextResponse.json(
      { 
        message: 'Orçamento criado com sucesso', 
        data: newEstimate,
        estimateLink 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao criar orçamento:', error.message, error.stack);
    const errorMsg = error.message.includes('token') 
      ? 'Erro ao gerar token único' 
      : 'Erro interno ao criar orçamento';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
```


---
### 📄 Arquivo: `src/app/api/portfolio/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import PortfolioModel from '@/models/portfolio';

export async function GET(request: NextRequest, context: any) {
  try {
    await dbConnect();
    
    const id = context.params.id;
    const portfolioItem = await PortfolioModel.findById(id);
    
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

export async function PUT(request: NextRequest, context: any) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const id = context.params.id;
    const data = await request.json();
    
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    const updatedPortfolioItem = await PortfolioModel.findByIdAndUpdate(
      id,
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

export async function DELETE(request: NextRequest, context: any) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const id = context.params.id;
    const deletedPortfolioItem = await PortfolioModel.findByIdAndDelete(id);
    
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


---
### 📄 Arquivo: `src/app/api/portfolio/route.ts`

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


---
### 📄 Arquivo: `src/app/api/quotes/[id]/status/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import QuoteModel from '@/models/quote';

export async function PUT(request: NextRequest, context: any) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();

    const id = context.params.id;
    const { status, notes } = await request.json();

    if (!status || !['novo', 'em_contato', 'convertido', 'encerrado'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    const updatedQuote = await QuoteModel.findByIdAndUpdate(
      id,
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


---
### 📄 Arquivo: `src/app/api/quotes/route.ts`

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


---
### 📄 Arquivo: `src/app/api/reviews/[id]/approve/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

export async function POST(request: NextRequest, context: any) {
  try {
    await dbConnect();
    const id = context.params.id;

    console.log('Aprovando review com _id:', id);

    const review = await ReviewModel.findById(id);
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


---
### 📄 Arquivo: `src/app/api/reviews/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/review';

// Função GET
export async function GET(request: NextRequest, context: any) {
  console.log('=== Iniciando GET /api/reviews/[id] ===');
  try {
    console.log('Conectando ao MongoDB...');
    await dbConnect();
    console.log('Conexão com MongoDB estabelecida com sucesso');

    const id = context.params.id; // Acessando id diretamente sem Promise
    console.log('Token recebido (como id):', id);

    console.log('Buscando review no banco de dados...');
    const review = await ReviewModel.findOne({ token: id });
    console.log('Resultado da busca:', review);

    if (!review) {
      console.log('Nenhum review encontrado para o token:', id);
      return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 });
    }

    console.log('Review encontrado:', review);
    return NextResponse.json(
      {
        name: review.name,
        location: review.location,
        isTokenUsed: review.isTokenUsed,
        isApproved: review.isApproved,
        rating: review.rating,
        text: review.text,
      },
      { status: 200 }
    );
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

// Função PUT
export async function PUT(request: NextRequest, context: any) {
  console.log('=== Iniciando PUT /api/reviews/[id] ===');
  try {
    await dbConnect();
    const id = context.params.id; // Acessando id diretamente sem Promise
    const { rating, text, isTokenUsed } = await request.json();

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


---
### 📄 Arquivo: `src/app/api/reviews/generate-token/route.ts`

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


---
### 📄 Arquivo: `src/app/api/reviews/route.ts`

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


---
### 📄 Arquivo: `src/app/api/settings/route.ts`

```typescript
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
```


---
### 📄 Arquivo: `src/app/api/site-config/route.ts`

```typescript
// src/app/api/site-config/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SettingsModel from '@/models/settings';
import { z } from 'zod';

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  tracking?: {
    facebookPixel?: string;
    tiktokPixel?: string;
    googleTagManager?: string;
  };
  updatedAt: Date;
}

const SiteConfigSchema = z.object({
  siteName: z.string().min(1, 'Nome do site é obrigatório'),
  siteDescription: z.string().min(1, 'Descrição é obrigatória'),
  contactInfo: z.object({
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
    address: z.string().min(5, 'Endereço muito curto'),
  }),
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    whatsapp: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos').optional(),
  }),
  tracking: z.object({
    facebookPixel: z.string().optional(),
    tiktokPixel: z.string().optional(),
    googleTagManager: z.string().optional(),
  }).optional(),
});

const defaultConfig: SiteConfig = {
  siteName: 'FH Resolve',
  siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
  contactInfo: {
    email: 'contato@fhresolve.com.br',
    phone: '48991919791',
    address: 'Ratones, Florianópolis - SC',
  },
  socialMedia: {
    instagram: '',
    facebook: '',
    whatsapp: '48991919791',
  },
  tracking: {
    facebookPixel: '',
    tiktokPixel: '',
    googleTagManager: '',
  },
  updatedAt: new Date(),
};

let cachedConfig: SiteConfig | null = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000;

async function getConfig(): Promise<SiteConfig> {
  const now = Date.now();
  if (cachedConfig && now - cacheTime < CACHE_TTL) return cachedConfig;

  await dbConnect();
  const siteConfig = await SettingsModel.findOne({}).lean();

  if (!siteConfig) {
    await SettingsModel.create(defaultConfig);
    cachedConfig = defaultConfig;
    cacheTime = now;
    return defaultConfig;
  }

  cachedConfig = { ...defaultConfig, ...siteConfig, updatedAt: siteConfig.updatedAt || new Date() };
  cacheTime = now;
  return cachedConfig;
}

export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = SiteConfigSchema.parse(data);

    await dbConnect();
    const config = await SettingsModel.findOneAndUpdate(
      {},
      { ...validatedData, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    // Limpar cache
    cachedConfig = null;
    cacheTime = 0;

    return NextResponse.json(config);
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao salvar configurações' }, { status: 500 });
  }
}
```


---
### 📄 Arquivo: `src/app/api/users/route.ts`

```typescript
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/user';

const UserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome não pode exceder 100 caracteres'),
  email: z.string().email('Formato de email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['admin', 'editor', 'viewer'], { message: 'Função inválida' }),
});

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const users = await UserModel.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(50) // Limite para performance
      .lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar usuários' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // Validação com Zod
    const parsedData = UserSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsedData.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password, role } = parsedData.data;

    // Verifica email duplicado
    const existingUser = await UserModel.findOne({ email }).lean();
    if (existingUser) {
      return NextResponse.json({ error: 'Email já está em uso' }, { status: 400 });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    // Remove senha da resposta
    const user = newUser.toObject();
    delete user.password;

    return NextResponse.json(
      { message: 'Usuário criado com sucesso', data: user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ error: 'Erro interno ao criar usuário' }, { status: 500 });
  }
}
```


---
### 📄 Arquivo: `src/app/avaliar/[token]/page.tsx`

```typescript
// src/app/avaliar/[token]/page.tsx
'use client';

import dynamic from 'next/dynamic';

const ReviewPage = dynamic(() => import('./ReviewPage'), { ssr: false });

export default ReviewPage;
```


---
### 📄 Arquivo: `src/app/avaliar/[token]/ReviewPage.tsx`

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useReview } from '@/hooks/useReview';

export default function ReviewPage() {
  const {
    review,
    rating,
    setRating,
    text,
    setText,
    loading,
    submitting,
    submitted,
    setSubmitted,
    handleSubmit,
  } = useReview();

  const renderStars = (currentRating: number = rating) =>
    Array(5)
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
            className={`transition-all duration-300 ${index < currentRating
                ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-accent-dark)]'
              }`}
          />
        </motion.button>
      ));

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

  const linkVariants = {
    rest: {
      scale: 1,
      backgroundColor: 'var(--color-accent)',
    },
    hover: {
      scale: 1.05,
      backgroundColor: 'var(--color-accent-dark)',
    },
    tap: {
      scale: 0.95,
    },
  };

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
              <div className="flex justify-center gap-4">{renderStars(review.rating)}</div>
              <p className="text-base italic text-[var(--color-dark)] dark:text-[var(--color-text)]">
                "{review.text}"
              </p>
              <motion.a
                href={typeof window !== 'undefined' ? window.location.origin : '/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full mt-6 inline-block text-center"
                variants={linkVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
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
                  className="btn btn-primary w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {submitting ? 'Enviando...' : 'Enviar Avaliação'}
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


---
### 📄 Arquivo: `src/app/dashboard/appearance/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { ServiceEditor } from '@/components/settings/ServiceEditor';
import { TemplateEditor } from '@/components/settings/TemplateEditor';

export default function AppearancePage() {
  const { config, updateConfig, loading } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'template' | 'general'>('template');

  const tabs = [
    { id: 'template', label: 'Templates', icon: <span className="i-lucide-layout" /> },
    { id: 'general', label: 'Geral', icon: <span className="i-lucide-settings" /> },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateConfig({ [name]: value });
  };

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...config.services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateConfig({ services: newServices });
  };

  const addTemplate = () => {
    const newTemplates = [...config.templates, { name: 'Novo Template', styles: {} }];
    updateConfig({ templates: newTemplates });
  };

  const updateTemplateStyle = (index: number, key: string, value: string) => {
    const newTemplates = [...config.templates];
    newTemplates[index] = {
      ...newTemplates[index],
      styles: { ...newTemplates[index].styles, [key]: value },
    };
    updateConfig({ templates: newTemplates });
  };

  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateStyles, setNewTemplateStyles] = useState<{ [key: string]: string }>({});

  const iconOptions = [
    { value: 'wrench', label: 'Chave Inglesa' },
    { value: 'hammer', label: 'Martelo' },
    { value: 'screwdriver', label: 'Chave de Fenda' },
    { value: 'paint-roller', label: 'Rolo de Tinta' },
    { value: 'brush', label: 'Pincel' },
    { value: 'ruler', label: 'Régua' },
    { value: 'tape-measure', label: 'Fita Métrica' },
    { value: 'tool', label: 'Ferramenta' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent)]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'template' | 'general')}
                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'template' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Configurações de Template
                </h2>
                <div className="space-y-4">
                  <TemplateEditor
                    templates={config.templates}
                    updateTemplateStyle={updateTemplateStyle}
                    addTemplate={addTemplate}
                    newTemplateName={newTemplateName}
                    setNewTemplateName={setNewTemplateName}
                    newTemplateStyles={newTemplateStyles}
                    setNewTemplateStyles={setNewTemplateStyles}
                    activeTemplate={config.activeTemplate}
                    handleChange={handleChange}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Configurações Gerais
                </h2>
                <div className="space-y-4">
                  <ServiceEditor
                    services={config.services}
                    updateService={updateService}
                    iconOptions={iconOptions}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
```


---
### 📄 Arquivo: `src/app/dashboard/blog/new/page.tsx`

```typescript
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

// Schema de validação sem transformação para evitar conflitos de tipo
const blogSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  slug: z
    .string()
    .min(1, 'Slug é obrigatório')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  excerpt: z.string().min(1, 'Resumo é obrigatório').max(300, 'Resumo deve ter no máximo 300 caracteres'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  tags: z.string(), // Mantido como string para evitar conflitos de tipo
  isPublished: z.boolean().default(false),
  publishDate: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

// Interface para a imagem de capa
interface CoverImage {
  url: string;
  driveId: string;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<CoverImage | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BlogFormValues>({
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

  // Valores observados
  const watchedContent = watch('content');
  const watchedTitle = watch('title');
  const watchedExcerpt = watch('excerpt');
  const watchedCategory = watch('category');
  const watchedTags = watch('tags');

  // Função para processar tags como array para exibição
  const getTagsArray = (tagsString: string): string[] => {
    if (!tagsString) return [];
    return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
  };

  // Submissão do formulário
  const onSubmit = async (data: BlogFormValues) => {
    setIsSubmitting(true);
    try {
      // Processar tags antes de enviar
      const processedData = {
        ...data,
        tags: getTagsArray(data.tags)
      };

      const response = await axios.post('/api/blog', { 
        ...processedData,
        coverImage 
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

  // Geração automática de slug
  const generateSlug = (title: string): string =>
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  // Upload simulado de imagem
  const handleImageUpload = () => {
    const newImage: CoverImage = {
      url: 'https://via.placeholder.com/800x400',
      driveId: `mockid-${Date.now()}`,
    };
    setCoverImage(newImage);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Voltar"
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
      </header>

      {previewMode ? (
        <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {coverImage && (
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700">
              <img src={coverImage.url} alt={watchedTitle} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{watchedTitle || 'Título do Post'}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {watchedCategory && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs">
                  {watchedCategory}
                </span>
              )}
              {getTagsArray(watchedTags).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs"
                >
                  {tag}
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
        </article>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="space-y-6 p-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
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
                        if (!currentSlug) setValue('slug', generateSlug(e.target.value));
                      },
                    })}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
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
                  {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    URL amigável para o post. Use apenas letras minúsculas, números e hífens.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="excerpt"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
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
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
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
                {coverImage ? (
                  <div className="relative rounded-md overflow-hidden">
                    <img src={coverImage.url} alt="Imagem de capa" className="w-full h-48 object-cover" />
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
                <p className="mt-4 text-sm text-gray-500">
                  Tamanho recomendado: 1200 x 630 pixels. Formatos suportados: JPG, PNG.
                </p>
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
                    <label
                      htmlFor="isPublished"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Publicar post
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="publishDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Data de Publicação
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Categoria
                    </label>
                    <div className="relative">
                      <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Tags (separadas por vírgula)
                    </label>
                    <input
                      id="tags"
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.tags ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Ex: reforma, dicas, residencial"
                      {...register('tags')}
                    />
                    {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>}
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
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Salvando...
                  </div>
                ) : (
                  'Salvar'
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
```


---
### 📄 Arquivo: `src/app/dashboard/blog/page.tsx`

```typescript
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


---
### 📄 Arquivo: `src/app/dashboard/estimates/new/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { Calculator } from 'lucide-react';
import PageHeader from '@/components/new-estimate/PageHeader';
import EstimateTypeSelector from '@/components/new-estimate/EstimateTypeSelector';
import ClientInfoCard from '@/components/new-estimate/ClientInfoCard';
import EstimateDetailsCard from '@/components/new-estimate/EstimateDetailsCard';
import DetailedItemsTable from '@/components/new-estimate/DetailedItemsTable';
import MaterialsTable from '@/components/new-estimate/MaterialsTable';
import ServicesTable from '@/components/new-estimate/ServicesTable';
import TotalsCard from '@/components/new-estimate/TotalsCard';
import AdditionalInfoCard from '@/components/new-estimate/AdditionalInfoCard';
import ActionButtons from '@/components/new-estimate/ActionButtons';
import SuccessModal from '@/components/new-estimate/SuccessModal';
import { useEstimateSchema } from '@/hooks/useEstimateSchema';
import { useCalculations } from '@/hooks/useCalculations';
import { EstimateFormValues, EstimateType } from '@/types/estimate';

export default function NewEstimatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [estimateType, setEstimateType] = useState<EstimateType>('detailed');

  const { estimateSchema } = useEstimateSchema();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { register, handleSubmit, control, watch, setValue, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      estimateType: 'detailed',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      address: '',
      title: '',
      description: '',
      items: [{ description: '', quantity: 1, unit: 'un', unitPrice: 0 }],
      materials: [{ description: '', quantity: 1, unit: 'un', unitPrice: 0 }],
      services: [{ description: '', value: 0 }],
      discount: 0,
      tax: 0,
      notes: '',
      paymentTerms: 'Pagamento em até 12x no cartão ou via PIX/transferência bancária.',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  const itemsFieldArray = useFieldArray({ control, name: 'items' });
  const materialsFieldArray = useFieldArray({ control, name: 'materials' });
  const servicesFieldArray = useFieldArray({ control, name: 'services' });

  const currentEstimateType = watch('estimateType');
  const items = watch('items') || [];
  const materials = watch('materials') || [];
  const services = watch('services') || [];
  const discount = watch('discount') || 0;
  const tax = watch('tax') || 0;

  const {
    calculateSubtotal,
    calculateTotal,
    calculateMaterialsSubtotal,
    calculateServicesSubtotal,
    formatCurrency
  } = useCalculations(items, materials, services, discount, tax, estimateType);

  useEffect(() => {
    if (currentEstimateType !== estimateType) setEstimateType(currentEstimateType);
  }, [currentEstimateType, estimateType]);

  const onSubmit = async (data: EstimateFormValues) => {
    console.log('Iniciando submissão do formulário:', data);
    
    // Filtrar dados com base no tipo de orçamento
    const dataToSend = { ...data };
    dataToSend.subtotal = calculateSubtotal();
    dataToSend.total = calculateTotal();
    
    // Remover campos desnecessários de acordo com o tipo de orçamento
    if (dataToSend.estimateType === 'simple') {
      delete dataToSend.items;
      delete dataToSend.materials;
    } else if (dataToSend.estimateType === 'materials') {
      delete dataToSend.items;
    } else if (dataToSend.estimateType === 'detailed') {
      delete dataToSend.materials;
      delete dataToSend.services;
    }
    
    setIsSubmitting(true);
  
    try {
      console.log('Enviando dados para a API:', dataToSend);
      const response = await axios.post('/api/estimates', dataToSend);
      console.log('Resposta da API:', response);
      toast.success('Orçamento criado com sucesso!');
      setGeneratedLink(response.data.estimateLink);
      setShowLinkModal(true);
      setTimeout(() => router.push('/dashboard/estimates'), 500);
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      console.error('Status do erro:', error.response?.status);
      console.error('Dados do erro:', error.response?.data);
      const errorMsg = error.response?.data?.error || 'Erro ao salvar orçamento. Verifique os dados e tente novamente.';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
      console.log('Submissão finalizada');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência!');
    setTimeout(() => setLinkCopied(false), 3000);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get('from_quote');
    if (quoteId) {
      const fetchQuote = async () => {
        try {
          const response = await axios.get(`/api/quotes/${quoteId}`);
          const quote = response.data;
          setValue('clientName', quote.name);
          setValue('clientPhone', quote.phone);
          setValue('title', `Orçamento para ${quote.name}`);
          setValue('description', quote.message);
          toast.success('Dados do pedido carregados!');
        } catch (error) {
          console.error('Erro ao carregar dados do pedido:', error);
          toast.error('Erro ao carregar dados do pedido');
        }
      };
      fetchQuote();
    }
  }, [setValue]);

  const manualSubmit = () => {
    console.log("Submit manual iniciado");

    // Teste se os dados básicos existem
    const formData = {
      estimateType: watch('estimateType'),
      clientName: watch('clientName'),
      clientPhone: watch('clientPhone'),
      title: watch('title'),
      items: watch('items'),
      materials: watch('materials'),
      services: watch('services'),
      discount: watch('discount'),
      tax: watch('tax'),
      notes: watch('notes'),
      paymentTerms: watch('paymentTerms'),
      validUntil: watch('validUntil')
    };

    console.log("Dados do formulário coletados:", formData);

    // Verificação manual dos campos obrigatórios
    if (!formData.clientName) {
      toast.error("Nome do cliente é obrigatório");
      return;
    }

    if (!formData.clientPhone) {
      toast.error("Telefone do cliente é obrigatório");
      return;
    }

    if (!formData.title) {
      toast.error("Título do orçamento é obrigatório");
      return;
    }

    // Se chegou aqui, os dados básicos estão ok
    console.log("Validação básica passou, enviando para API");
    onSubmit(formData as EstimateFormValues);
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  return (
    <div className="space-y-6 pb-6">
      <PageHeader router={router} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <EstimateTypeSelector
          register={register}
          estimateType={estimateType}
          setValue={setValue}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="lg:col-span-2 space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
            <ClientInfoCard
              register={register}
              errors={errors}
            />

            <EstimateDetailsCard
              register={register}
              errors={errors}
            />

            {estimateType === 'detailed' && (
              <DetailedItemsTable
                itemsFieldArray={itemsFieldArray}
                register={register}
                errors={errors}
                items={items}
                formatCurrency={formatCurrency}
                calculateSubtotal={calculateSubtotal}
                discount={discount}
                tax={tax}
                calculateTotal={calculateTotal}
                isMobile={isMobile}
              />
            )}

            {estimateType === 'materials' && (
              <>
                <MaterialsTable
                  materialsFieldArray={materialsFieldArray}
                  register={register}
                  errors={errors}
                  materials={materials}
                  formatCurrency={formatCurrency}
                  calculateMaterialsSubtotal={calculateMaterialsSubtotal}
                  isMobile={isMobile}
                />

                <ServicesTable
                  servicesFieldArray={servicesFieldArray}
                  register={register}
                  errors={errors}
                  services={services}
                  formatCurrency={formatCurrency}
                  calculateServicesSubtotal={calculateServicesSubtotal}
                  isMobile={isMobile}
                />

                <TotalsCard
                  register={register}
                  calculateMaterialsSubtotal={calculateMaterialsSubtotal}
                  calculateServicesSubtotal={calculateServicesSubtotal}
                  calculateSubtotal={calculateSubtotal}
                  discount={discount}
                  tax={tax}
                  calculateTotal={calculateTotal}
                  formatCurrency={formatCurrency}
                  isMobile={isMobile}
                />
              </>
            )}

            {estimateType === 'simple' && (
              <ServicesTable
                servicesFieldArray={servicesFieldArray}
                register={register}
                errors={errors}
                services={services}
                formatCurrency={formatCurrency}
                calculateServicesSubtotal={calculateServicesSubtotal}
                calculateSubtotal={calculateSubtotal}
                discount={discount}
                tax={tax}
                calculateTotal={calculateTotal}
                isSimpleEstimate={true}
                isMobile={isMobile}
              />
            )}
          </motion.div>

          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
            <AdditionalInfoCard
              register={register}
            />

            <ActionButtons
              router={router}
              isSubmitting={isSubmitting}
              onSaveClick={manualSubmit} // Use a nova função aqui
            />

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-md">
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
          </motion.div>
        </div>
      </form>

      <SuccessModal
        showLinkModal={showLinkModal}
        generatedLink={generatedLink}
        linkCopied={linkCopied}
        copyToClipboard={copyToClipboard}
        router={router}
      />
    </div>
  );
}
```


---
### 📄 Arquivo: `src/app/dashboard/estimates/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Copy, 
  CheckCircle, 
  FileText, 
  Edit, 
  Trash2, 
  Send, 
  Eye, 
  AlertTriangle, 
  Loader2,
  X,
  ChevronRight,
  Calendar,
  DollarSign
} from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface Estimate {
  _id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{key: keyof Estimate, direction: 'asc' | 'desc'}>({
    key: 'createdAt',
    direction: 'desc'
  });

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
      draft: { 
        label: 'Rascunho', 
        class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        icon: <FileText size={14} className="mr-1" />
      },
      sent: { 
        label: 'Enviado', 
        class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        icon: <Send size={14} className="mr-1" />
      },
      accepted: { 
        label: 'Aceito', 
        class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        icon: <CheckCircle size={14} className="mr-1" />
      },
      rejected: { 
        label: 'Recusado', 
        class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        icon: <X size={14} className="mr-1" />
      },
      expired: { 
        label: 'Expirado', 
        class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: <AlertTriangle size={14} className="mr-1" />
      },
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[status].class}`}>
        {statusConfig[status].icon}
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

  // Ordenação de tabela
  const requestSort = (key: keyof Estimate) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedEstimates = () => {
    const filteredEstimates = searchTerm
      ? estimates.filter(
          est => 
            est.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            est.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : estimates;

    return [...filteredEstimates].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedEstimates = getSortedEstimates();

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 } 
    }
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 } 
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };
  
  // Hook para detectar o tamanho da tela
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar inicialmente
    checkScreenSize();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Heading title="Orçamentos" description="Crie e gerencie orçamentos para clientes" />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/dashboard/estimates/new')}
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-4 py-2 rounded-md flex items-center gap-2 self-start md:self-auto"
        >
          <Plus size={18} />
          Novo Orçamento
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-accent)]"
          />
        </div>
      ) : estimates.length === 0 ? (
        <Card>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="py-10 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-[var(--color-neutral)]/20">
                <FileText size={32} className="text-[var(--color-accent)]" />
              </div>
            </div>
            <p className="text-[var(--color-text)] opacity-70 mb-6">
              Nenhum orçamento encontrado
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/dashboard/estimates/new')}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Criar Primeiro Orçamento
            </motion.button>
          </motion.div>
        </Card>
      ) : (
        <>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full px-4 py-2 pl-10 rounded-lg border border-[var(--color-neutral)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 bg-[var(--color-card-bg)] text-[var(--color-card-text)]"
                placeholder="Buscar orçamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <Card>
            {/* Visualização em formato de tabela para telas médias e grandes */}
            <div className="hidden md:block overflow-x-auto rounded-lg">
              <table className="w-full">
                <thead className="bg-[var(--color-neutral)]/10 border-b border-[var(--color-neutral)]/20">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('clientName')}
                    >
                      <div className="flex items-center gap-1">
                        Cliente
                        {sortConfig.key === 'clientName' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('title')}
                    >
                      <div className="flex items-center gap-1">
                        Título
                        {sortConfig.key === 'title' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('total')}
                    >
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} />
                        Valor
                        {sortConfig.key === 'total' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {sortConfig.key === 'status' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('createdAt')}
                    >
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        Data
                        {sortConfig.key === 'createdAt' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70">
                      Ações
                    </th>
                  </tr>
                </thead>
                <motion.tbody 
                  className="bg-[var(--color-card-bg)] divide-y divide-[var(--color-neutral)]/15"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {sortedEstimates.map((estimate) => (
                    <motion.tr 
                      key={estimate._id} 
                      className="hover:bg-[var(--color-neutral)]/5 transition-colors"
                      variants={itemVariants}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[var(--color-card-text)]">
                          {estimate.clientName}
                        </div>
                        <div className="text-xs text-[var(--color-card-text)] opacity-60">
                          {estimate.clientPhone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                        <div className="text-sm text-[var(--color-card-text)] opacity-80">
                          {estimate.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[var(--color-card-text)]">
                          {formatCurrency(estimate.total)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(estimate.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--color-card-text)] opacity-70 flex items-center">
                          {formatDate(estimate.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-1">
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            onClick={() => router.push(`/dashboard/estimates/${estimate._id}`)}
                            className="p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] hover:opacity-100"
                            title="Ver orçamento"
                          >
                            <Eye size={18} />
                          </motion.button>
                          {estimate.status === 'draft' && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                onClick={() => router.push(`/dashboard/estimates/${estimate._id}/edit`)}
                                className="p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-blue-500/10 hover:text-blue-500 hover:opacity-100"
                                title="Editar"
                              >
                                <Edit size={18} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                onClick={() => {
                                  setSelectedEstimate(estimate);
                                  setShowDeleteConfirm(true);
                                }}
                                className="p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-red-500/10 hover:text-red-500 hover:opacity-100"
                                title="Excluir"
                              >
                                <Trash2 size={18} />
                              </motion.button>
                            </>
                          )}
                          {(estimate.status === 'draft' || estimate.status === 'sent') && (
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              onClick={() => shareEstimate(estimate)}
                              className="p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-green-500/10 hover:text-green-500 hover:opacity-100"
                              title="Compartilhar"
                            >
                              <Send size={18} />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>

            {/* Visualização em formato de cards para telas pequenas */}
            <div className="md:hidden">
              <motion.div 
                className="grid grid-cols-1 gap-4 p-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedEstimates.map((estimate) => (
                  <motion.div 
                    key={estimate._id}
                    variants={itemVariants}
                    className="bg-[var(--color-neutral)]/5 rounded-lg overflow-hidden border border-[var(--color-neutral)]/20"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-[var(--color-card-text)]">{estimate.clientName}</h3>
                          <p className="text-xs text-[var(--color-card-text)] opacity-60 mt-0.5">{estimate.clientPhone}</p>
                        </div>
                        <div>
                          {getStatusBadge(estimate.status)}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-card-text)] opacity-70">Título:</span>
                          <span className="text-[var(--color-card-text)] font-medium">{estimate.title}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-card-text)] opacity-70">Valor:</span>
                          <span className="text-[var(--color-card-text)] font-medium">{formatCurrency(estimate.total)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-card-text)] opacity-70">Data:</span>
                          <span className="text-[var(--color-card-text)]">{formatDate(estimate.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--color-neutral)]/10 px-4 py-3 flex justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`/dashboard/estimates/${estimate._id}`)}
                        className="p-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                        aria-label="Ver orçamento"
                      >
                        <Eye size={18} />
                      </motion.button>
                      
                      {estimate.status === 'draft' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push(`/dashboard/estimates/${estimate._id}/edit`)}
                            className="p-2 rounded-full bg-blue-500/10 text-blue-500"
                            aria-label="Editar orçamento"
                          >
                            <Edit size={18} />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedEstimate(estimate);
                              setShowDeleteConfirm(true);
                            }}
                            className="p-2 rounded-full bg-red-500/10 text-red-500"
                            aria-label="Excluir orçamento"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </>
                      )}
                      
                      {(estimate.status === 'draft' || estimate.status === 'sent') && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => shareEstimate(estimate)}
                          className="p-2 rounded-full bg-green-500/10 text-green-500"
                          aria-label="Compartilhar orçamento"
                        >
                          <Send size={18} />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Card>
        </>
      )}

      {/* Modal de confirmação de exclusão */}
      <AnimatePresence>
        {showDeleteConfirm && selectedEstimate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              className="bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-1 bg-gradient-to-r from-red-500 to-red-600">
                <div className="p-5 bg-[var(--color-card-bg)] rounded-t-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      <AlertTriangle size={24} />
                    </div>
                    <h2 className="text-xl font-medium text-[var(--color-card-text)]">Confirmar Exclusão</h2>
                  </div>
                  
                  <p className="text-[var(--color-card-text)] opacity-80 mb-8">
                    Tem certeza que deseja excluir o orçamento <strong>{selectedEstimate.title}</strong> para {selectedEstimate.clientName}? Esta ação não pode ser desfeita.
                  </p>
                  
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 border border-[var(--color-neutral)]/30 text-[var(--color-card-text)] rounded-md hover:bg-[var(--color-neutral)]/10"
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de compartilhamento */}
      <AnimatePresence>
        {showShareModal && selectedEstimate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              className="bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)]">
                <div className="p-5 bg-[var(--color-card-bg)] rounded-t-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <Send size={20} />
                    </div>
                    <h2 className="text-xl font-medium text-[var(--color-card-text)]">Compartilhar Orçamento</h2>
                  </div>
                  
                  <div className="space-y-5 mb-6">
                    <div className="bg-[var(--color-neutral)]/10 p-4 rounded-md">
                      <p className="text-sm text-[var(--color-card-text)] opacity-70 mb-3">
                        Link para visualização do orçamento:
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={`${window.location.origin}/orcamento/${selectedEstimate.token}`}
                          readOnly
                          className="flex-1 p-2 text-sm border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)]"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyToClipboard}
                          className={`p-2 rounded-md transition-colors ${
                            linkCopied 
                              ? 'bg-green-500/10 text-green-500' 
                              : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20'
                          }`}
                          title="Copiar link"
                        >
                          {linkCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                        </motion.button>
                      </div>
                    </div>
                    
                    {selectedEstimate.status === 'draft' && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-md">
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowShareModal(false)}
                      className="px-4 py-2 border border-[var(--color-neutral)]/30 text-[var(--color-card-text)] rounded-md hover:bg-[var(--color-neutral)]/10"
                    >
                      Fechar
                    </motion.button>
                    {selectedEstimate.status === 'draft' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateStatus(selectedEstimate._id, 'sent')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Marcar como Enviado
                      </motion.button>
                    )}
                    {selectedEstimate.clientEmail && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
```


---
### 📄 Arquivo: `src/app/dashboard/portfolio/new/page.tsx`

```typescript
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


---
### 📄 Arquivo: `src/app/dashboard/portfolio/page.tsx`

```typescript
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


---
### 📄 Arquivo: `src/app/dashboard/quotes/page.tsx`

```typescript
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


---
### 📄 Arquivo: `src/app/dashboard/reviews/page.tsx`

```typescript
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
        className="min-h-screen flex items-center justify-center bg-[var(--color-gray)]"
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
      className="min-h-screen flex items-center justify-center bg-[var(--color-gray)] p-4 relative overflow-hidden"
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
              <h1 className="text-lg font-medium text-[var(--color-text)]">
                Avaliação Enviada
              </h1>
              <p className="text-sm text-[var(--color-text)]/70">
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
              <h1 className="text-lg font-medium text-[var(--color-text)]">
                Avaliação Aprovada
              </h1>
              <p className="text-sm text-[var(--color-text)]/70">
                Obrigado, {review.name}, por avaliar sua experiência em {review.location}!
              </p>
              <div className="flex justify-center gap-4">
                {renderStars(review.rating)}
              </div>
              <p className="text-base italic text-[var(--color-text)]">
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
              <h1 className="text-lg font-medium text-center text-[var(--color-text)]">
                {review.isTokenUsed ? 'Editar Avaliação' : 'Deixe sua Avaliação'}
              </h1>
              <p className="text-sm text-center text-[var(--color-text)]/70 mt-2">
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
                    className="block text-sm font-medium text-[var(--color-text)] mb-1"
                  >
                    Comentário
                  </label>
                  <motion.textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-text)] border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/50"
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


---
### 📄 Arquivo: `src/app/dashboard/settings/page.tsx`

```typescript
// src/app/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import GeneralSettings from '@/components/settings/GeneralSettings';
import ContactSettings from '@/components/settings/ContactSettings';
import AdvancedSettings from '@/components/settings/AdvancedSettings';
import { useSettingsData } from '@/hooks/useSettingsData';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'advanced'>('general');
  const { settings, handleChange, loading } = useSettingsData();

  // Adicionar um fallback enquanto os dados estão carregando
  if (loading || !settings) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-gray)] dark:bg-[var(--color-dark)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-gray)] dark:bg-[var(--color-dark)]">
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === 'general' && <GeneralSettings settings={settings} handleChange={handleChange} />}
        {activeTab === 'contact' && <ContactSettings settings={settings} handleChange={handleChange} />}
        {activeTab === 'advanced' && <AdvancedSettings settings={settings} handleChange={handleChange} />}
      </div>
    </div>
  );
}
```


---
### 📄 Arquivo: `src/app/dashboard/users/page.tsx`

```typescript
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


---
### 📄 Arquivo: `src/app/dashboard/videos/new/page.tsx`

```typescript
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


---
### 📄 Arquivo: `src/app/dashboard/videos/page.tsx`

```typescript
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


---
### 📄 Arquivo: `src/app/dashboard/layout.tsx`

```typescript
// src/app/dashboard/layout.tsx
'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { SessionProvider } from 'next-auth/react';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { AppProvider } from '@/context/AppContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider isDashboard={true}>
        <FeedbackProvider>
          <div className="min-h-screen flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Topbar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </FeedbackProvider>
      </AppProvider>
    </SessionProvider>
  );
}
```


---
### 📄 Arquivo: `src/app/dashboard/page.tsx`

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
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


---
### 📄 Arquivo: `src/app/login/page.tsx`

```typescript
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


---
### 📄 Arquivo: `src/app/orcamento/[token]/page.tsx`

```typescript
// app/orcamento/[token]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { motion, useScroll } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

import { Estimate } from '@/types/estimate';
import LoadingState from '@/components/estimate-view/LoadingState';
import ErrorState from '@/components/estimate-view/ErrorState';
import Header from '@/components/estimate-view/Header';
import HistoryPanel from '@/components/estimate-view/HistoryPanel';
import EstimateHeader from '@/components/estimate-view/EstimateHeader';
import SummarySection from '@/components/estimate-view/SummarySection';
import DetailsSection from '@/components/estimate-view/DetailsSection';
import ItemsSection from '@/components/estimate-view/ItemsSection';
import NotesSection from '@/components/estimate-view/NotesSection';
import ContactSection from '@/components/estimate-view/ContactSection';
import Footer from '@/components/estimate-view/Footer';
import ConfirmModal from '@/components/estimate-view/ConfirmModal';
import ShareModal from '@/components/estimate-view/ShareModal';
import FeedbackModal from '@/components/estimate-view/FeedbackModal';

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
  const [showHistory, setShowHistory] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('summary');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/estimates/${token}`);
        const data = response.data;
        
        // Verificar se o orçamento foi modificado (diferença maior que 1 minuto)
        const wasModified = new Date(data.updatedAt).getTime() > new Date(data.createdAt).getTime() + 60000;
        
        // Simular histórico para demonstração
        const sampleHistory = [
          { date: data.createdAt, action: 'Orçamento criado', by: 'Sistema' },
        ];
        
        if (wasModified) {
          sampleHistory.push({ 
            date: data.updatedAt, 
            action: 'Orçamento atualizado', 
            by: 'Administrador' 
          });
        }
        
        if (data.status !== 'draft') {
          sampleHistory.push({ 
            date: data.updatedAt, 
            action: `Status alterado para ${data.status === 'sent' ? 'enviado' : 
              data.status === 'accepted' ? 'aceito' : 
              data.status === 'rejected' ? 'recusado' : 'expirado'}`, 
            by: data.status === 'sent' ? 'Administrador' : 'Cliente' 
          });
        }
        
        setEstimate({
          ...data,
          wasModified,
          history: sampleHistory
        });
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
        token: estimate.token,
      });
      
      // Adicionar ao histórico
      const newHistoryEntry = {
        date: new Date().toISOString(),
        action: `Status alterado para ${statusUpdate === 'accepted' ? 'aceito' : 'recusado'}`,
        by: 'Cliente'
      };
      
      setEstimate({
        ...estimate,
        status: statusUpdate,
        history: [...(estimate.history || []), newHistoryEntry]
      });
      
      setShowModal(false);
      setShowFeedbackModal(true);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setUpdating(false);
      setStatusUpdate(null);
    }
  };

  const submitFeedback = async () => {
    if (!estimate || !feedback.trim()) return;
    
    setSubmittingFeedback(true);
    try {
      // Simular envio de feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Adicionar ao histórico
      const newHistoryEntry = {
        date: new Date().toISOString(),
        action: `Feedback enviado: "${feedback.substring(0, 30)}${feedback.length > 30 ? '...' : ''}"`,
        by: 'Cliente'
      };
      
      setEstimate({
        ...estimate,
        history: [...(estimate.history || []), newHistoryEntry]
      });
      
      setShowFeedbackModal(false);
      setFeedback('');
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    } finally {
      setSubmittingFeedback(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!estimate) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-x-hidden">
      <Header 
        wasModified={estimate.wasModified || false}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        setShowShareModal={setShowShareModal}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        scrollProgress={scrollProgress}
      />
      
      <HistoryPanel 
        showHistory={showHistory}
        history={estimate.history}
        historyExpanded={historyExpanded}
        setHistoryExpanded={setHistoryExpanded}
        setShowHistory={setShowHistory}
      />
  
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EstimateHeader 
          estimate={estimate}
          statusUpdate={statusUpdate}
          setStatusUpdate={setStatusUpdate}
          setShowModal={setShowModal}
        />
  
        {activeSection === 'summary' && (
          <SummarySection estimate={estimate} setActiveSection={setActiveSection} />
        )}
  
        {activeSection === 'details' && (
          <DetailsSection estimate={estimate} />
        )}
  
        {activeSection === 'items' && (
          <ItemsSection estimate={estimate} />
        )}
  
        {activeSection === 'notes' && (
          <NotesSection estimate={estimate} />
        )}
  
        <ContactSection />
      </main>
  
      <Footer />
  
      <ConfirmModal 
        showModal={showModal}
        statusUpdate={statusUpdate}
        updating={updating}
        setShowModal={setShowModal}
        updateEstimateStatus={updateEstimateStatus}
      />
  
  <ShareModal 
        showShareModal={showShareModal}
        linkCopied={linkCopied}
        copyToClipboard={copyToClipboard}
        setShowShareModal={setShowShareModal}
      />
  
      <FeedbackModal 
        showFeedbackModal={showFeedbackModal}
        feedback={feedback}
        setFeedback={setFeedback}
        submittingFeedback={submittingFeedback}
        submitFeedback={submitFeedback}
        setShowFeedbackModal={setShowFeedbackModal}
        statusUpdate={statusUpdate}
      />
      
      {/* FAB - Botão de Ajuda Flutuante */}
      <motion.div
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowHelpTooltip(!showHelpTooltip)}
          aria-label="Ajuda"
        >
          <HelpCircle size={24} />
        </motion.button>
        
        {showHelpTooltip && (
          <motion.div 
            className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg w-64"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <h4 className="font-medium text-gray-900 mb-2">Precisa de ajuda?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Se precisar de ajuda com seu orçamento ou tiver dúvidas, entre em contato conosco através do WhatsApp ou telefone.
            </p>
            <a 
              href="https://wa.me/5548991919791" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Falar com um atendente →
            </a>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                setShowHelpTooltip(false);
              }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
```


---
### 📄 Arquivo: `src/app/portfolio/page.tsx`

```typescript
'use client';

import { ProjectCard } from '../../components/ProjectCard';
import { getProjects } from '../../data/projects';
import Link from 'next/link';
import { ArrowLeft, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PortfolioPage() {
  const projects = getProjects();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-white/90 dark:bg-gray-900/90 shadow-sm' : 'py-3 bg-white/80 dark:bg-gray-900/80'
      } backdrop-blur-md`}>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <span className="text-lg font-bold text-blue-600 dark:text-white">FH Resolve</span>
          </Link>
          
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Voltar para o início</span>
          </Link>
        </div>
      </header>

      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Portfólio de Trabalhos</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Confira alguns dos nossos projetos recentes e veja como podemos ajudar você com soluções de qualidade para sua casa ou negócio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
              />
            ))}
          </div>
          
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Nenhum projeto encontrado.</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} FH Resolve - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </>
  );
}
```


---
### 📄 Arquivo: `src/app/utils/formatters.ts`

```typescript
// utils/formatters.ts
export const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  export const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
```


---
### 📄 Arquivo: `src/app/utils/themeAdapter.ts`

```typescript
import { useAppContext } from "@/context/AppContext";

// Em src/utils/themeAdapter.ts ou equivalente
export const useTheme = () => {
  const context = useAppContext();
  return { 
    theme: context.theme, 
    toggleTheme: context.toggleTheme, 
    setTheme: context.setTheme, 
    isDashboard: false 
  };
};
```


---
### 📄 Arquivo: `src/app/globals.css`

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
  --color-accent-light: #4BAAB7; /* Versão mais clara do turquesa para efeitos */
  
  /* Cores de ação */
  --color-success: #22c55e; /* Verde para indicar sucesso */
  --color-warning: #f59e0b; /* Amarelo para indicar avisos */
  --color-error: #ef4444; /* Vermelho para indicar erros */
  --color-info: #3b82f6; /* Azul para informações */
  
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
  
  /* Variáveis para animações */
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 350ms;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  
  /* Variáveis para bordas arredondadas */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
}

[data-theme="dark"] {
  --color-text: #FFFFFF !important;
  --color-text-light: #FFFFFF !important;
  --color-card-bg: #333333 !important;
  --color-card-text: #FFFFFF !important;
  --color-light: #1F1F1F !important; /* Escurecido para maior contraste */
  --color-dark: #252525 !important;
  --color-primary: #FFFFFF !important;
  --color-gray: #3A3A3A !important;
  --color-neutral: #8D9192 !important;
  
  /* Ajustes de sombras para o tema escuro */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
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
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter;
  transition-timing-function: var(--ease-in-out);
  transition-duration: var(--transition-fast);
}

/* Forçar todas as classes text-[var(--color-text)] para terem a cor correta no tema dark */
[data-theme="dark"] .text-\[var\(--color-text\)\] {
  color: #FFFFFF !important;
}

[data-theme="dark"] .text-\[var\(--color-text\)\]\/80,
[data-theme="dark"] .text-\[var\(--color-text\)\]\/70 {
  color: rgba(255, 255, 255, 0.8) !important;
}

[data-theme="dark"] .text-\[var\(--color-card-text\)\] {
  color: #FFFFFF !important;
}

[data-theme="dark"] .bg-\[var\(--color-card-bg\)\] {
  background-color: #333333 !important;
}

[data-theme="dark"] .dark\:text-white {
  color: #FFFFFF !important;
}

/* Aplicar cores corretas para texto em elementos card */
[data-theme="dark"] .card, 
[data-theme="dark"] .card-text {
  color: #FFFFFF !important;
}

[data-theme="dark"] .card-text-secondary {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* Define variável específica para texto no modo dark */
[data-theme="dark"] {
  --color-text-dark: #FFFFFF !important;
}

/* Cores específicas para o tema dark */
.dark-theme .card {
  background-color: #333333;
  color: #FFFFFF;
}

.dark-theme .section-title,
.dark-theme .section-subtitle {
  color: #FFFFFF;
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
  border-radius: var(--radius-sm);
}

@layer utilities {
  /* Utilitários para mascaras e efeitos visuais */
  .mask-right {
    mask-image: linear-gradient(to right, black 85%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
  }
  
  .mask-bottom {
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  }
  
  .mask-radial {
    mask-image: radial-gradient(circle, black 40%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle, black 40%, transparent 70%);
  }
  
  /* Utilitários para backdrops */
  .backdrop-blur-xs {
    backdrop-filter: blur(2px);
  }
  
  .backdrop-saturate-50 {
    backdrop-filter: saturate(50%);
  }
  
  /* Efeito de máscara para a barra de progresso */
  .loading-bar {
    position: relative;
    overflow: hidden;
  }

  .loading-bar-progress {
    mask-image: linear-gradient(to right, transparent 100%, black 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 100%, black 100%);
  }

  /* Animações de partículas */
  .particle-tool {
    animation: float-tool 5s infinite ease-in-out;
  }

  @keyframes float-tool {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
    }
  }
  
  /* Utilitários para texto adaptativo */
  .text-adaptive {
    @apply text-[var(--color-text)];
  }
  
  .text-adaptive-secondary {
    @apply text-[var(--color-text)] opacity-80;
  }
  
  .text-adaptive-muted {
    @apply text-[var(--color-text)] opacity-60;
  }
  
  /* Utilitários para glassmorphism */
  .glass {
    @apply bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 dark:border-gray-800/20;
  }
  
  .glass-dark {
    @apply bg-gray-900/70 backdrop-blur-md border border-gray-800/20;
  }
  
  .glass-light {
    @apply bg-white/70 backdrop-blur-md border border-white/20;
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
  
  .btn-success {
    @apply bg-green-600 text-white hover:bg-green-700;
  }
  
  .btn-danger {
    @apply bg-red-600 text-white hover:bg-red-700;
  }
  
  .btn-warning {
    @apply bg-yellow-500 text-white hover:bg-yellow-600;
  }
  
  .btn-info {
    @apply bg-blue-600 text-white hover:bg-blue-700;
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
    @apply bg-[var(--color-accent)]/20 text-[var(--color-accent)];
  }
  
  .badge-success {
    @apply bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400;
  }
  
  .badge-warning {
    @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400;
  }
  
  .badge-danger {
    @apply bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400;
  }
  
  .badge-info {
    @apply bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400;
  }
  
  .badge-neutral {
    @apply bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300;
  }
  
  /* Componentes de tabela responsiva */
  .table-container {
    @apply w-full overflow-x-auto rounded-lg shadow-sm;
  }
  
  .table-responsive {
    @apply min-w-full divide-y divide-[var(--color-neutral)]/20;
  }
  
  .table-header {
    @apply bg-[var(--color-neutral)]/10 border-b border-[var(--color-neutral)]/20;
  }
  
  .table-header-cell {
    @apply px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)];
  }
  
  .table-row {
    @apply hover:bg-[var(--color-neutral)]/5 transition-colors;
  }
  
  .table-cell {
    @apply px-6 py-4 whitespace-nowrap text-sm text-[var(--color-card-text)];
  }
  
  /* Componentes de botões de ação */
  .action-icon-button {
    @apply p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] hover:opacity-100 transition-all;
  }
  
  /* Componentes de cards para mobile */
  .mobile-card {
    @apply bg-[var(--color-neutral)]/5 rounded-lg overflow-hidden border border-[var(--color-neutral)]/20 mb-4;
  }
  
  .mobile-card-header {
    @apply p-4 flex justify-between items-start;
  }
  
  .mobile-card-content {
    @apply px-4 py-2 space-y-2 text-sm;
  }
  
  .mobile-card-footer {
    @apply bg-[var(--color-neutral)]/10 px-4 py-3 flex justify-end gap-2;
  }
  
  /* Componentes de modais */
  .modal-overlay {
    @apply fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm;
  }
  
  .modal-container {
    @apply bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden;
  }
  
  .modal-accent-border {
    @apply p-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)];
  }
  
  .modal-content {
    @apply p-5 bg-[var(--color-card-bg)] rounded-t-lg;
  }
  
  .modal-header {
    @apply flex items-center gap-3 mb-6;
  }
  
  .modal-footer {
    @apply flex justify-end space-x-3 mt-6;
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

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
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
  
  /* Ajustes para visualização em dispositivos móveis */
  .mobile-card {
    padding: 1rem !important;
  }

  .mobile-card-header {
    margin-bottom: 0.75rem !important;
  }

  .mobile-card-content {
    font-size: 0.875rem !important;
  }

  /* Botões mais adequados para toque */
  .mobile-action-button {
    padding: 0.625rem !important;
    min-height: 2.5rem !important;
    min-width: 2.5rem !important;
  }

  /* Melhor visualização de status badges em mobile */
  .status-badge {
    padding: 0.25rem 0.75rem !important;
    font-size: 0.7rem !important;
  }
  
  /* Classes para melhorar a visualização de texto em mobile */
  .mobile-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* Ajuste automático de texto para tamanhos de tela menores */
  .mobile-break-words {
    word-break: break-word;
    hyphens: auto;
  }
  
  /* Melhor visualização de modais em telas pequenas */
  .mobile-modal {
    width: 92vw !important;
    max-width: none !important;
    margin: 1rem auto !important;
  }
  
  .mobile-modal-content {
    padding: 1rem !important;
  }
  
  .mobile-modal-actions {
    flex-direction: column !important;
    gap: 0.5rem !important;
  }
  
  .mobile-modal-actions button {
    width: 100% !important;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    padding-left: 1.5rem;
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

/* Classes utilitárias para transições */
.transition-fast {
  transition-duration: var(--transition-fast);
}

.transition-normal {
  transition-duration: var(--transition-normal);
}

.transition-slow {
  transition-duration: var(--transition-slow);
}

/* Utilitários para bordas arredondadas */
.rounded-custom-sm {
  border-radius: var(--radius-sm);
}

.rounded-custom-md {
  border-radius: var(--radius-md);
}

.rounded-custom-lg {
  border-radius: var(--radius-lg);
}

.rounded-custom-xl {
  border-radius: var(--radius-xl);
}

.rounded-custom-2xl {
  border-radius: var(--radius-2xl);
}

.rounded-custom-full {
  border-radius: var(--radius-full);
}

/* Classe de utilitário para esconder elementos em mobile */
.hide-on-mobile {
  @media (max-width: 768px) {
    display: none !important;
  }
}

/* Classe de utilitário para mostrar elementos apenas em mobile */
.show-on-mobile {
  @media (min-width: 769px) {
    display: none !important;
  }
}

/* Layout de grid adaptativo */
.mobile-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

/* Correções para Leaflet popups no modo dark */
.leaflet-popup-content-wrapper {
  background-color: white !important;
  color: #333 !important;
}

.leaflet-popup-tip {
  background-color: white !important;
}

/* Garante que os textos nas listas no modo dark sejam sempre visíveis */
[data-theme="dark"] .bg-\[var\(--color-card-bg\)\]:not(.bg-\[var\(--color-accent\)\]) li:not(.bg-\[var\(--color-accent\)\]) {
  color: #FFFFFF;
}

/* Corrige cor do texto nas tabs móveis que não estão ativas */
[data-theme="dark"] button:not(.bg-\[var\(--color-accent\)\]) .text-\[var\(--color-text\)\] {
  color: #FFFFFF !important;
}

/* Garantir que itens de navegação sejam visíveis no modo dark */
[data-theme="dark"] .bg-\[var\(--color-gray\)\] {
  background-color: #3A3A3A !important;
  color: #FFFFFF;
}

/* Corrige a cor do texto nos itens de região não selecionados */
[data-theme="dark"] .bg-\[var\(--color-gray\)\] .text-\[var\(--color-card-text\)\] {
  color: #FFFFFF !important;
}
```


---
### 📄 Arquivo: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/Toaster';

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
  title: 'FH Resolve - Soluções em Manutenção',
  description: 'Soluções completas em manutenção predial, elétrica, hidráulica e muito mais.',
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
    <html lang="pt-BR" suppressHydrationWarning>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const isDashboard = window.location.pathname.startsWith('/dashboard');
                  const themeKey = isDashboard ? 'dashboard-theme' : 'site-theme';
                  
                  const savedTheme = localStorage.getItem(themeKey);
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                  
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  console.error('Error accessing localStorage', e);
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```


---
### 📄 Arquivo: `src/app/page.tsx`

```typescript
'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import axios from '@/lib/axios';
import { Providers } from './providers';

import Hero from '../components/Hero';
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
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings', {
          timeout: 5000
        }).catch(error => {
          console.error('Erro na requisição de settings:', error);
          return { data: {} };
        });
        
        if (response.data?.defaultTheme) {
          setDefaultTheme(response.data.defaultTheme);
        }
        
        if (response.data?.maintenanceMode !== undefined) {
          setMaintenanceMode(response.data.maintenanceMode);
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
      }
    };
    fetchSettings();
  }, []);

  if (maintenanceMode) {
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
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeInOut" 
        }}
        className="flex flex-col min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Header />
        </motion.div>
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
          transition={{ delay: 1, duration: 0.5 }}
          aria-label="Entre em contato via WhatsApp"
        >
          <MessageCircle size={26} />
        </motion.a>
      </motion.div>
    </Providers>
  );
}
```


---
### 📄 Arquivo: `src/app/providers.tsx`

```typescript
'use client';

import { SessionProvider } from 'next-auth/react';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { AppProvider } from '@/context/AppContext';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Criar uma instância do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000, // 1 hora de "stale time" para cache
      gcTime: 24 * 60 * 60 * 1000, // 24 horas de tempo de limpeza do garbage collector
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
}

export function Providers({ children, initialTheme = 'system' }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider isDashboard={false}>
          <FeedbackProvider>
            {children}
          </FeedbackProvider>
        </AppProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
```


---
### 📄 Arquivo: `src/app/sitemap.xml`

```xml
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://fhresolve.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://fhresolve.com.br/#about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://fhresolve.com.br/#benefits',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://fhresolve.com.br/#contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
```


---
### 📄 Arquivo: `src/components/dashboard/Sidebar.tsx`

```typescript
// src/components/dashboard/Sidebar.tsx
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
  Calculator,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfólio', href: '/dashboard/portfolio', icon: FileImage },
  { name: 'Avaliações', href: '/dashboard/reviews', icon: Star },
  { name: 'Orçamentos', href: '/dashboard/estimates', icon: Calculator },
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

  // Função para verificar se é desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Variantes de animação para diferentes elementos
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1 
      } 
    },
    closed: { 
      x: '-100%', 
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    },
  };

  const itemVariants = {
    open: { 
      x: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 300, damping: 24 } 
    },
    closed: { 
      x: -20, 
      opacity: 0, 
      transition: { type: 'spring', stiffness: 300, damping: 24 } 
    }
  };

  return (
    <>
      {/* Botão de toggle para mobile */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="fixed z-50 bottom-6 right-6 md:hidden p-3 rounded-full
                  bg-[var(--color-accent)] 
                  text-[var(--color-text-light)]
                  border border-[var(--color-neutral)]/10"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Overlay para mobile */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[var(--color-dark)]/50 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar principal */}
      <motion.div
        initial={isDesktop ? 'open' : 'closed'}
        animate={isDesktop ? 'open' : isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 z-40 h-screen w-72 md:w-64
                  bg-[var(--color-card-bg)]
                  text-[var(--color-card-text)] 
                  border-r border-[var(--color-neutral)]/20
                  md:sticky md:top-0 md:left-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center h-20 border-b border-[var(--color-neutral)]/10"
          >
            <Link href="/dashboard" className="flex items-center gap-3 px-2">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-accent)]"
              >
                <FileImage className="h-5 w-5 text-[var(--color-text-light)]" />
              </motion.div>
              <span className="text-xl font-bold text-adaptive">FH Resolve</span>
            </Link>
          </motion.div>

          {/* Navegação com estilo de seleção melhorado */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                
                return (
                  <motion.li 
                    key={item.name}
                    variants={itemVariants}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center p-3 text-base font-medium rounded-lg transition-all ${
                        isActive
                          ? 'bg-[var(--color-accent)] text-[var(--color-text-light)]'
                          : 'hover:bg-[var(--color-neutral)]/10 text-adaptive'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 ${
                        isActive ? 'text-[var(--color-text-light)]' : 'text-[var(--color-accent)]'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="ml-3">{item.name}</span>
                      
                      {/* Indicador de item ativo */}
                      {isActive && (
                        <motion.div 
                          className="ml-auto w-1.5 h-5 rounded-full bg-[var(--color-text-light)]"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Botão de Sair */}
          <motion.div 
            variants={itemVariants}
            className="p-4 mt-auto border-t border-[var(--color-neutral)]/10"
          >
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center p-3 w-full text-base font-medium rounded-lg 
                        bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="ml-3">Sair</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
```


---
### 📄 Arquivo: `src/components/dashboard/Stats.tsx`

```typescript
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


---
### 📄 Arquivo: `src/components/dashboard/Topbar.tsx`

```typescript
// src/components/dashboard/Topbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Bell, User, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useFeedback } from '@/context/FeedbackContext';

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

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Se não estiver montado, renderize um placeholder
  if (!mounted) {
    return (
      <header className="sticky top-0 z-30 bg-[var(--color-card-bg)] text-[var(--color-card-text)] border-b border-[var(--color-neutral)]/30 shadow-md py-3 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8"></div>
            <div className="w-8 h-8"></div>
            <div className="w-8 h-8"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-[var(--color-card-bg)] text-[var(--color-card-text)] border-b border-[var(--color-neutral)]/30 shadow-md"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Botão de Tema */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
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
                    className="px-4 py-2 text-sm hover:bg-[var(--color-neutral)]/20 transition-colors flex items-center gap-1.5"
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


---
### 📄 Arquivo: `src/components/estimate-view/ConfirmModal.tsx`

```typescript
// components/estimate-view/ConfirmModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface ConfirmModalProps {
  showModal: boolean;
  statusUpdate: 'accepted' | 'rejected' | null;
  updating: boolean;
  setShowModal: (show: boolean) => void;
  updateEstimateStatus: () => Promise<void>;
}

export default function ConfirmModal({
  showModal,
  statusUpdate,
  updating,
  setShowModal,
  updateEstimateStatus
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50 pointer-events-none" />
            <div className="text-center relative z-10">
              {statusUpdate === 'accepted' ? (
                <>
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Aceitar Orçamento</h3>
                  <p className="text-gray-500 mb-6">
                    Ao aceitar este orçamento, você concorda com os termos, valores e condições descritos. Deseja prosseguir?
                  </p>
                </>
              ) : (
                <>
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
                  >
                    <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Recusar Orçamento</h3>
                  <p className="text-gray-500 mb-6">
                    Tem certeza que deseja recusar este orçamento? Esta ação não pode ser desfeita.
                  </p>
                </>
              )}
              
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm hover:shadow"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={updateEstimateStatus}
                  disabled={updating}
                  className={`px-4 py-2 rounded-md text-white shadow-sm ${
                    statusUpdate === 'accepted'
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  } flex items-center justify-center gap-2 min-w-[140px]`}
                >
                  {updating ? (
                    <>
                      <motion.div 
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                      Processando...
                    </>
                  ) : (
                    <>
                      {statusUpdate === 'accepted' ? 'Confirmar Aceitação' : 'Confirmar Recusa'}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/ContactSection.tsx`

```typescript
// components/estimate-view/ContactSection.tsx
'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4 text-blue-800 border-b border-blue-200 pb-2">Entre em contato</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div 
          className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-sm text-blue-800 font-medium">Telefone:</p>
          <p className="font-bold text-blue-900">(48) 99191-9791</p>
        </motion.div>
        <motion.div 
          className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-sm text-blue-800 font-medium">Email:</p>
          <p className="font-bold text-blue-900">contato@fhresolve.com.br</p>
        </motion.div>
        <motion.div 
          className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-sm text-blue-800 font-medium">Endereço:</p>
          <p className="font-bold text-blue-900">Ratones, Florianópolis - SC</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/DetailsSection.tsx`

```typescript
// components/estimate-view/DetailsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { Estimate } from '@/types/estimate';
import { formatDate } from '@/app/utils/formatters';


interface DetailsSectionProps {
  estimate: Estimate;
}

export default function DetailsSection({ estimate }: DetailsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Informações do cliente e do orçamento */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
          <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Dados do Cliente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              className="bg-gray-50 rounded-lg p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-500">Nome:</p>
              <p className="font-medium text-gray-900">{estimate.clientName}</p>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-lg p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-gray-500">Telefone:</p>
              <p className="font-medium text-gray-900">{estimate.clientPhone}</p>
            </motion.div>
            {estimate.clientEmail && (
              <motion.div 
                className="bg-gray-50 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm text-gray-500">Email:</p>
                <p className="font-medium text-gray-900">{estimate.clientEmail}</p>
              </motion.div>
            )}
            {estimate.address && (
              <motion.div 
                className="bg-gray-50 rounded-lg p-4 sm:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-gray-500">Endereço:</p>
                <p className="font-medium text-gray-900">{estimate.address}</p>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Detalhes</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Data do Orçamento:</p>
                <p className="font-medium text-gray-900">{formatDate(estimate.createdAt)}</p>
              </div>
            </div>
            {estimate.validUntil && (
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Válido até:</p>
                  <p className="font-medium text-gray-900">{formatDate(estimate.validUntil)}</p>
                </div>
              </div>
            )}
            {estimate.paymentTerms && (
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Condições de Pagamento:</p>
                  <p className="font-medium text-gray-900">{estimate.paymentTerms}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Descrição do orçamento */}
      {estimate.description && (
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Descrição</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{estimate.description}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/ErrorState.tsx`

```typescript
// components/estimate-view/ErrorState.tsx
'use client';

import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4"
    >
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-xl font-semibold mb-2">Orçamento não encontrado</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <motion.a
          href="/"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Voltar para a página inicial
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/EstimateHeader.tsx`

```typescript
// components/estimate-view/EstimateHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Estimate } from '@/types/estimate';

interface EstimateHeaderProps {
  estimate: Estimate;
  statusUpdate: 'accepted' | 'rejected' | null;
  setStatusUpdate: (status: 'accepted' | 'rejected' | null) => void;
  setShowModal: (show: boolean) => void;
}

export default function EstimateHeader({
  estimate,
  statusUpdate,
  setStatusUpdate,
  setShowModal
}: EstimateHeaderProps) {
  const getStatusBadge = () => {
    const statusConfig = {
      draft: { label: 'Rascunho', color: 'bg-gray-200 text-gray-800' },
      sent: { label: 'Enviado', color: 'bg-blue-100 text-blue-800' },
      accepted: { label: 'Aceito', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Recusado', color: 'bg-red-100 text-red-800' },
      expired: { label: 'Expirado', color: 'bg-yellow-100 text-yellow-800' },
    };
    
    return (
      <motion.span 
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[estimate.status].color}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {statusConfig[estimate.status].label}
      </motion.span>
    );
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6 mb-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div>
          <motion.h2 
            className="text-xl font-bold mb-2 text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {estimate.title}
          </motion.h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">Status:</p>
            {getStatusBadge()}
          </div>
        </div>
        {(estimate.status === 'sent' || estimate.status === 'draft') && (
          <motion.div 
            className="flex gap-2 w-full sm:w-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setStatusUpdate('accepted');
                setShowModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow hover:from-green-600 hover:to-green-700 transition-all flex-1 sm:flex-none flex items-center justify-center gap-1"
            >
              <CheckCircle size={16} />
              Aceitar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setStatusUpdate('rejected');
                setShowModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md shadow hover:from-red-600 hover:to-red-700 transition-all flex-1 sm:flex-none flex items-center justify-center gap-1"
            >
              <XCircle size={16} />
              Recusar
            </motion.button>
          </motion.div>
        )}
        {estimate.status === 'accepted' && (
          <motion.div 
            className="bg-green-50 border-l-4 border-green-500 p-4 w-full sm:w-auto rounded-r-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
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
          </motion.div>
        )}
        {estimate.status === 'rejected' && (
          <motion.div 
            className="bg-red-50 border-l-4 border-red-500 p-4 w-full sm:w-auto rounded-r-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
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
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/FeedbackModal.tsx`

```typescript
// components/estimate-view/FeedbackModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  showFeedbackModal: boolean;
  feedback: string;
  setFeedback: (feedback: string) => void;
  submittingFeedback: boolean;
  submitFeedback: () => Promise<void>;
  setShowFeedbackModal: (show: boolean) => void;
  statusUpdate: 'accepted' | 'rejected' | null;
}

export default function FeedbackModal({
  showFeedbackModal,
  feedback,
  setFeedback,
  submittingFeedback,
  submitFeedback,
  setShowFeedbackModal,
  statusUpdate
}: FeedbackModalProps) {
  return (
    <AnimatePresence>
      {showFeedbackModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Seu feedback é importante!</h3>
              <p className="text-gray-500 mb-4">
                {statusUpdate === 'accepted' 
                  ? 'Obrigado por aceitar o orçamento. Gostaria de deixar algum comentário ou observação adicional?'
                  : 'Gostaríamos de entender melhor por que este orçamento não atendeu às suas expectativas.'}
              </p>
              
              <div className="mb-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Seu feedback aqui..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Pular
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={submitFeedback}
                  disabled={!feedback.trim() || submittingFeedback}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 flex items-center gap-2"
                >
                  {submittingFeedback ? (
                    <>
                      <motion.div 
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                                     <MessageSquare size={16} />
                      Enviar Feedback
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/Footer.tsx`

```typescript
// components/estimate-view/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="bg-white py-6 mt-8 border-t">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} FH Resolve - Todos os direitos reservados</p>
        <p className="mt-1">CNPJ: 00.000.000/0000-00</p>
      </div>
    </footer>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/Header.tsx`

```typescript
// components/estimate-view/Header.tsx
'use client';

import { motion } from 'framer-motion';
import { History, Share2, Download, X } from 'lucide-react';

interface HeaderProps {
  wasModified: boolean;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  setShowShareModal: (show: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollProgress: number;
}

export default function Header({
  wasModified,
  showHistory,
  setShowHistory,
  setShowShareModal,
  activeSection,
  setActiveSection,
  scrollProgress
}: HeaderProps) {
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-blue-500"
          style={{ scaleX: scrollProgress, transformOrigin: "0% 50%" }}
        />
      </div>
      
      <motion.header 
        className="sticky top-0 bg-white shadow-md z-40 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex items-center">
            <motion.div 
              className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              FH
            </motion.div>
            <div className="ml-3">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">FH Resolve</h1>
              <p className="text-sm text-gray-500">Orçamento Personalizado</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {wasModified && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-full ${showHistory ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'}`}
                aria-label="Histórico de modificações"
              >
                <History size={18} />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShareModal(true)}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
              aria-label="Compartilhar"
            >
              <Share2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.print()}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
              aria-label="Imprimir/Baixar"
            >
              <Download size={18} />
            </motion.button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {['summary', 'details', 'items', 'notes'].map((section) => (
              <motion.button
                key={section}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === section 
                    ? 'text-blue-600 border-b-2 border-blue-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
                }`}
                onClick={() => setActiveSection(section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section === 'summary' && 'Resumo'}
                {section === 'details' && 'Detalhes do Cliente'}
                {section === 'items' && 'Itens do Orçamento'}
                {section === 'notes' && 'Observações'}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>
    </>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/HistoryPanel.tsx`

```typescript
// components/estimate-view/HistoryPanel.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, ChevronUp, ChevronDown, X } from 'lucide-react';
import { HistoryEntry } from '@/types/estimate';
import { formatDateTime } from '@/app/utils/formatters';


interface HistoryPanelProps {
  showHistory: boolean;
  history?: HistoryEntry[];
  historyExpanded: boolean;
  setHistoryExpanded: (expanded: boolean) => void;
  setShowHistory: (show: boolean) => void;
}

export default function HistoryPanel({
  showHistory,
  history = [],
  historyExpanded,
  setHistoryExpanded,
  setShowHistory
}: HistoryPanelProps) {
  return (
    <AnimatePresence>
      {showHistory && (
        <motion.div 
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-blue-50 border-l-4 border-blue-500 rounded-md shadow-sm overflow-hidden"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex">
                  <PenTool className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Histórico de modificações</h3>
                    <div className="mt-2 text-sm text-blue-700 space-y-1">
                      {(historyExpanded ? history : history?.slice(0, 2))?.map((entry, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="inline-block w-3 h-3 bg-blue-200 rounded-full mr-2 mt-1.5"></span>
                          <div>
                            <p className="text-blue-800">{entry.action}</p>
                            <p className="text-xs text-blue-600">{formatDateTime(entry.date)} - {entry.by}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    {history.length > 2 && (
                      <button 
                        onClick={() => setHistoryExpanded(!historyExpanded)}
                        className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {historyExpanded ? (
                          <>Mostrar menos <ChevronUp size={14} className="ml-1" /></>
                        ) : (
                          <>Ver histórico completo <ChevronDown size={14} className="ml-1" /></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/ItemsSection.tsx`

```typescript
// components/estimate-view/ItemsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Estimate } from '@/types/estimate';
import { formatCurrency } from '@/app/utils/formatters';


interface ItemsSectionProps {
  estimate: Estimate;
}

export default function ItemsSection({ estimate }: ItemsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Itens do orçamento */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Itens do Orçamento</h3>
        
        {estimate.estimateType === 'detailed' && estimate.items && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
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
                  <motion.tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <td className="px-4 py-4 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.unit}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
                  </motion.tr>
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
        )}
        
        {estimate.estimateType === 'simple' && estimate.services && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição do Serviço
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estimate.services.map((service, index) => (
                  <motion.tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <td className="px-4 py-4 text-sm text-gray-900">{service.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">{formatCurrency(service.value)}</td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    Subtotal:
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(estimate.subtotal)}
                  </td>
                </tr>
                {estimate.discount && estimate.discount > 0 && (
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Desconto:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      -{formatCurrency(estimate.discount)}
                    </td>
                  </tr>
                )}
                {estimate.tax && estimate.tax > 0 && (
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Taxas/Adicionais:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      +{formatCurrency(estimate.tax)}
                    </td>
                  </tr>
                )}
                <tr className="bg-blue-50">
                  <td className="px-4 py-4 text-base font-bold text-gray-900 text-right">
                    Total:
                  </td>
                  <td className="px-4 py-4 text-base font-bold text-blue-600 text-right">
                    {formatCurrency(estimate.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        
        {estimate.estimateType === 'materials' && (
          <>
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-800 mb-3 border-b pb-2">Materiais</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
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
                    {estimate.materials?.map((item, index) => (
                      <motion.tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{item.unit}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        Subtotal de Materiais:
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(estimate.materials?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-800 mb-3 border-b pb-2">Serviços</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição do Serviço
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {estimate.services?.map((service, index) => (
                      <motion.tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm text-gray-900">{service.description}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">{formatCurrency(service.value)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        Subtotal de Serviços:
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(estimate.services?.reduce((sum, service) => sum + service.value, 0) || 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <table className="min-w-full">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Subtotal:</td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right w-40">{formatCurrency(estimate.subtotal)}</td>
                  </tr>
                  {estimate.discount && estimate.discount > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Desconto:</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">-{formatCurrency(estimate.discount)}</td>
                    </tr>
                  )}
                  {estimate.tax && estimate.tax > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Taxas/Adicionais:</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">+{formatCurrency(estimate.tax)}</td>
                    </tr>
                  )}
                  <tr className="bg-blue-50 rounded-lg">
                    <td className="px-4 py-3 text-base font-bold text-gray-900 text-right rounded-l-lg">Total:</td>
                    <td className="px-4 py-3 text-base font-bold text-blue-600 text-right rounded-r-lg">{formatCurrency(estimate.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/LoadingState.tsx`

```typescript
// components/estimate-view/LoadingState.tsx
'use client';

import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50"
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="h-16 w-16 rounded-full border-4 border-t-blue-500 border-transparent relative"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.p 
          className="text-gray-600 mt-4 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Carregando orçamento...
        </motion.p>
      </div>
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/NotesSection.tsx`

```typescript
// components/estimate-view/NotesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Estimate } from '@/types/estimate';

interface NotesSectionProps {
  estimate: Estimate;
}

export default function NotesSection({ estimate }: NotesSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Observações */}
      {estimate.notes && (
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Observações</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{estimate.notes}</p>
          </div>
        </motion.div>
      )}
      
      {/* Termos e Condições */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Termos e Condições</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3 text-gray-700">
            <p>1. A aceitação deste orçamento implica na concordância com os termos e valores apresentados.</p>
            <p>2. O prazo de validade deste orçamento está especificado acima. Após este prazo, os valores podem sofrer alterações.</p>
            <p>3. Valores de materiais podem sofrer alterações conforme disponibilidade e preços de mercado.</p>
            <p>4. Quaisquer alterações no escopo dos serviços podem implicar em revisão dos valores e prazos.</p>
            <p>5. As condições de pagamento estão descritas neste orçamento e devem ser seguidas conforme acordo.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/ShareModal.tsx`

```typescript
// components/estimate-view/ShareModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Clipboard, CheckCircle } from 'lucide-react';

interface ShareModalProps {
  showShareModal: boolean;
  linkCopied: boolean;
  copyToClipboard: () => void;
  setShowShareModal: (show: boolean) => void;
}

export default function ShareModal({
  showShareModal,
  linkCopied,
  copyToClipboard,
  setShowShareModal
}: ShareModalProps) {
  return (
    <AnimatePresence>
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Compartilhar Orçamento</h3>
              <p className="text-gray-500 mb-4">
                Compartilhe este orçamento copiando o link abaixo:
              </p>
              
              <div className="flex mb-6">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md text-gray-900 text-sm bg-gray-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className={`px-4 py-2 ${linkCopied ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-r-md shadow-sm flex items-center gap-1`}
                >
                  {linkCopied ? (
                    <>
                      <CheckCircle size={16} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Clipboard size={16} />
                      Copiar
                    </>
                  )}
                </motion.button>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Fechar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```


---
### 📄 Arquivo: `src/components/estimate-view/SummarySection.tsx`

```typescript
// components/estimate-view/SummarySection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Estimate } from '@/types/estimate';
import { formatCurrency, formatDate } from '@/app/utils/formatters';


interface SummarySectionProps {
  estimate: Estimate;
  setActiveSection: (section: string) => void;
}

export default function SummarySection({ estimate, setActiveSection }: SummarySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Resumo do Orçamento</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Total do Orçamento</h4>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(estimate.total)}</p>
            {estimate.discount && estimate.discount > 0 && (
              <p className="text-xs text-blue-600 mt-1">Inclui desconto de {formatCurrency(estimate.discount)}</p>
            )}
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Cliente</h4>
            <p className="font-medium text-gray-900">{estimate.clientName}</p>
            <p className="text-sm text-gray-500 mt-1">{estimate.clientPhone}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Datas</h4>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-500">Criado em:</p>
                <p className="font-medium text-gray-900">{formatDate(estimate.createdAt)}</p>
              </div>
              {estimate.validUntil && (
                <div>
                  <p className="text-xs text-gray-500">Válido até:</p>
                  <p className="font-medium text-gray-900">{formatDate(estimate.validUntil)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          {estimate.description && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Descrição</h4>
              <p className="text-gray-700 whitespace-pre-line">{estimate.description}</p>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Quick Overview of Items - Resumo dependendo do tipo de orçamento */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Itens do Orçamento</h3>
          <button 
            onClick={() => setActiveSection('items')}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Ver detalhes <ArrowUpRight size={14} className="ml-1" />
          </button>
        </div>
        
        {/* Aqui renderiza uma versão condensada dos itens com base no tipo de orçamento */}
        {/* Implementação depende do tipo de orçamento (detailed, materials, simple) */}
        
        <div className="mt-4 border-t pt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total:</span>
          <span className="text-lg font-bold text-blue-600">{formatCurrency(estimate.total)}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/ActionButtons.tsx`

```typescript
// components/new-estimate/ActionButtons.tsx
import { motion } from 'framer-motion';
import { Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ActionButtonsProps {
  router: AppRouterInstance;
  isSubmitting: boolean;
  onSaveClick: () => void; // Nova prop para lidar diretamente com o salvar
}

export default function ActionButtons({ router, isSubmitting, onSaveClick }: ActionButtonsProps) {
  console.log("Renderizando ActionButtons, isSubmitting:", isSubmitting);
  
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={() => {
          console.log("Botão Cancelar clicado");
          router.back();
        }}
        className="flex-1 px-4 py-2.5 border border-[var(--color-neutral)]/30 text-[var(--color-card-text)] rounded-md hover:bg-[var(--color-neutral)]/10 transition-colors"
      >
        Cancelar
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="button" // Mudamos para button em vez de submit
        onClick={() => {
          console.log("Botão Salvar clicado");
          onSaveClick(); // Chamamos a função diretamente
        }}
        disabled={isSubmitting}
        className="flex-1 px-4 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
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
      </motion.button>
    </div>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/AdditionalInfoCard.tsx`

```typescript
// components/new-estimate/AdditionalInfoCard.tsx
import { HelpCircle, Calendar, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister } from 'react-hook-form';
import { EstimateFormValues } from '@/types/estimate';

interface AdditionalInfoCardProps {
  register: UseFormRegister<EstimateFormValues>;
}

export default function AdditionalInfoCard({ register }: AdditionalInfoCardProps) {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <HelpCircle size={18} className="text-[var(--color-accent)]" />
          Informações Adicionais
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="validUntil" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Válido até
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="validUntil"
                type="date"
                {...register('validUntil')}
                className="pl-10 w-full px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="paymentTerms" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Condições de Pagamento
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard size={16} className="text-[var(--color-secondary)]" />
              </div>
              <textarea
                id="paymentTerms"
                {...register('paymentTerms')}
                rows={3}
                className="pl-10 w-full px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Observações
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={4}
              className="w-full px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              placeholder="Informações adicionais sobre o orçamento"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/ClientInfoCard.tsx`

```typescript
// components/new-estimate/ClientInfoCard.tsx
import { User, Phone, Mail, Home, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { EstimateFormValues } from '@/types/estimate';

interface ClientInfoCardProps {
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
}

export default function ClientInfoCard({ register, errors }: ClientInfoCardProps) {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <User size={18} className="text-[var(--color-accent)]" />
          Dados do Cliente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="clientName" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Nome do Cliente
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="clientName"
                {...register('clientName')}
                className={`w-full pl-10 px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] ${
                  errors.clientName ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                }`}
              />
            </div>
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <X size={14} /> {errors.clientName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="clientPhone" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Telefone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="clientPhone"
                {...register('clientPhone')}
                className={`w-full pl-10 px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] ${
                  errors.clientPhone ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                }`}
              />
            </div>
            {errors.clientPhone && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <X size={14} /> {errors.clientPhone.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="clientEmail" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Email (opcional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="clientEmail"
                type="email"
                {...register('clientEmail')}
                className={`w-full pl-10 px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] ${
                  errors.clientEmail ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                }`}
              />
            </div>
            {errors.clientEmail && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <X size={14} /> {errors.clientEmail.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Endereço (opcional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Home size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="address"
                {...register('address')}
                className="w-full pl-10 px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/DetailedItemsTable.tsx`

```typescript
// components/new-estimate/DetailedItemsTable.tsx
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { EstimateFormValues, EstimateItem } from '@/types/estimate';

interface DetailedItemsTableProps {
  itemsFieldArray: UseFieldArrayReturn<EstimateFormValues, 'items', 'id'>;
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
  items: EstimateItem[];
  formatCurrency: (value: number) => string;
  calculateSubtotal: () => number;
  discount: number;
  tax: number;
  calculateTotal: () => number;
  isMobile: boolean;
}

export default function DetailedItemsTable({
  itemsFieldArray,
  register,
  errors,
  items,
  formatCurrency,
  calculateSubtotal,
  discount,
  tax,
  calculateTotal,
  isMobile
}: DetailedItemsTableProps) {
  const addItem = () => itemsFieldArray.append({ description: '', quantity: 1, unit: 'un', unitPrice: 0 });

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <h3 className="text-lg font-medium flex items-center gap-2 text-[var(--color-card-text)]">
            <Calculator size={18} className="text-[var(--color-accent)]" />
            Itens do Orçamento
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addItem}
            className="px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md flex items-center gap-1 text-sm transition-colors"
          >
            <Plus size={16} /> Adicionar Item
          </motion.button>
        </div>
        {errors.items?.root && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded-md flex items-start gap-2">
            <span className="mt-0.5"><X size={16} /></span>
            <p>{errors.items.root.message}</p>
          </div>
        )}
        
        {isMobile ? (
          <div className="space-y-4">
            {itemsFieldArray.fields.map((field, index) => (
              <div key={field.id} className="border border-[var(--color-neutral)]/30 rounded-lg p-3 bg-[var(--color-neutral)]/5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-[var(--color-card-text)]">Item {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => itemsFieldArray.remove(index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    disabled={itemsFieldArray.fields.length === 1}
                    aria-label="Remover item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Descrição</label>
                    <input
                      {...register(`items.${index}.description`)}
                      className={`w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                        errors.items?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                      }`}
                      placeholder="Descrição do item"
                    />
                    {errors.items?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-500">{errors.items[index]?.description?.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Quantidade</label>
                      <input
                        type="number"
                        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                        className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.quantity ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                        }`}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Unidade</label>
                      <input
                        {...register(`items.${index}.unit`)}
                        className="w-full px-2 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                        placeholder="un"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Preço Un.</label>
                      <input
                        type="number"
                        {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                        className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.unitPrice ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--color-neutral)]/20">
                    <span className="text-xs font-medium text-[var(--color-card-text)] opacity-80">Total do item:</span>
                    <span className="text-sm font-semibold text-[var(--color-accent)]">
                      {formatCurrency((items[index]?.quantity || 0) * (items[index]?.unitPrice || 0))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-[var(--color-neutral)]/10 rounded-lg p-4 space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[var(--color-card-text)]">Subtotal:</span>
                <span className="text-[var(--color-card-text)] font-medium">{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[var(--color-card-text)]">Desconto:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    {...register('discount', { valueAsNumber: true })}
                    className="w-24 px-2 py-1 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                    min="0"
                    step="0.01"
                  />
                  <span className="text-[var(--color-card-text)] opacity-80 text-sm">-{formatCurrency(discount)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    {...register('tax', { valueAsNumber: true })}
                    className="w-24 px-2 py-1 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                    min="0"
                    step="0.01"
                  />
                  <span className="text-[var(--color-card-text)] opacity-80 text-sm">+{formatCurrency(tax)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[var(--color-neutral)]/30">
                <span className="text-base font-bold text-[var(--color-card-text)]">Total:</span>
                <span className="text-lg font-bold text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-[var(--color-neutral)]/20">
              <thead>
                <tr className="bg-[var(--color-neutral)]/5">
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider">Descrição</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-20">Qtd</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-20">Un</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-32">Preço Un</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-32">Total</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-12">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral)]/20">
                {itemsFieldArray.fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-[var(--color-neutral)]/5">
                    <td className="px-3 py-2">
                      <input
                        {...register(`items.${index}.description`)}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        placeholder="Descrição do item"
                      />
                      {errors.items?.[index]?.description && (
                        <p className="mt-1 text-xs text-red-500">{errors.items[index]?.description?.message}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.quantity ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0.01"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        {...register(`items.${index}.unit`)}
                        className="w-full px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                        placeholder="un"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.unitPrice ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2 text-right text-sm font-medium text-[var(--color-card-text)]">
                      {formatCurrency((items[index]?.quantity || 0) * (items[index]?.unitPrice || 0))}
                    </td>
                    <td className="px-3 py-2">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => itemsFieldArray.remove(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        disabled={itemsFieldArray.fields.length === 1}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td colSpan={4} className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">{formatCurrency(calculateSubtotal())}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Desconto:</td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      {...register('discount', { valueAsNumber: true })}
                      className="w-full px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-3 py-3 text-right text-sm text-[var(--color-card-text)] opacity-80">-{formatCurrency(discount)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      {...register('tax', { valueAsNumber: true })}
                      className="w-full px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-3 py-3 text-right text-sm text-[var(--color-card-text)] opacity-80">+{formatCurrency(tax)}</td>
                  <td></td>
                </tr>
                <tr className="bg-[var(--color-neutral)]/10">
                  <td colSpan={4} className="px-3 py-4 text-right font-bold text-base text-[var(--color-card-text)]">Total:</td>
                  <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/EstimateDetailsCard.tsx`

```typescript
// components/new-estimate/EstimateDetailsCard.tsx
import { FileText, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { EstimateFormValues } from '@/types/estimate';

interface EstimateDetailsCardProps {
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
}

export default function EstimateDetailsCard({ register, errors }: EstimateDetailsCardProps) {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <FileText size={18} className="text-[var(--color-accent)]" />
          Detalhes do Orçamento
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Título do Orçamento
            </label>
            <input
              id="title"
              {...register('title')}
              className={`w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] ${
                errors.title ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
              }`}
              placeholder="Ex: Reforma do Banheiro"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <X size={14} /> {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Descrição (opcional)
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              placeholder="Descrição detalhada do serviço a ser realizado"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/EstimateTypeSelector.tsx`

```typescript
// components/new-estimate/EstimateTypeSelector.js
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface EstimateFormValues {
  estimateType: string;
}

export default function EstimateTypeSelector({ 
  register, 
  estimateType, 
  setValue 
}: { 
  register: UseFormRegister<EstimateFormValues>;
  estimateType: string;
  setValue: UseFormSetValue<EstimateFormValues>;
}) {
  const estimateTypes = [
    {
      id: 'detailed',
      title: 'Orçamento Detalhado',
      description: 'Lista detalhada com todos os itens, quantidades e valores unitários.'
    },
    {
      id: 'materials',
      title: 'Materiais e Serviços',
      description: 'Separa os materiais dos serviços com subtotais para cada categoria.'
    },
    {
      id: 'simple',
      title: 'Orçamento Simplificado',
      description: 'Lista apenas os serviços e seus valores, sem detalhes de materiais.'
    }
  ];

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <FileText size={18} className="text-[var(--color-accent)]" />
          Tipo de Orçamento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {estimateTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                estimateType === type.id 
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' 
                  : 'border-[var(--color-neutral)]/30 hover:border-[var(--color-accent)]/50'
              }`}
              onClick={() => setValue('estimateType', type.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  id={`type-${type.id}`}
                  value={type.id}
                  checked={estimateType === type.id}
                  {...register('estimateType')}
                  className="h-4 w-4 text-[var(--color-accent)]"
                />
                <label htmlFor={`type-${type.id}`} className="font-medium text-[var(--color-card-text)]">
                  {type.title}
                </label>
              </div>
              <p className="text-sm text-[var(--color-card-text)] opacity-70">
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/MaterialsTable.tsx`

```typescript
// components/new-estimate/MaterialsTable.tsx
import { motion } from 'framer-motion';
import { PackageOpen, Plus, Trash2, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { EstimateFormValues, MaterialItem } from '@/types/estimate';

interface MaterialsTableProps {
  materialsFieldArray: UseFieldArrayReturn<EstimateFormValues, 'materials', 'id'>;
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
  materials: MaterialItem[];
  formatCurrency: (value: number) => string;
  calculateMaterialsSubtotal: () => number;
  isMobile: boolean;
}

export default function MaterialsTable({
  materialsFieldArray,
  register,
  errors,
  materials,
  formatCurrency,
  calculateMaterialsSubtotal,
  isMobile
}: MaterialsTableProps) {
  const addMaterial = () => materialsFieldArray.append({ description: '', quantity: 1, unit: 'un', unitPrice: 0 });

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <h3 className="text-lg font-medium flex items-center gap-2 text-[var(--color-card-text)]">
            <PackageOpen size={18} className="text-[var(--color-accent)]" />
            Materiais
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addMaterial}
            className="px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md flex items-center gap-1 text-sm transition-colors"
          >
            <Plus size={16} /> Adicionar Material
          </motion.button>
        </div>
        {errors.materials?.root && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded-md flex items-start gap-2">
            <span className="mt-0.5"><X size={16} /></span>
            <p>{errors.materials.root.message}</p>
          </div>
        )}
        
        {isMobile ? (
          <div className="space-y-4">
            {materialsFieldArray.fields.map((field, index) => (
              <div key={field.id} className="border border-[var(--color-neutral)]/30 rounded-lg p-3 bg-[var(--color-neutral)]/5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-[var(--color-card-text)]">Material {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => materialsFieldArray.remove(index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    disabled={materialsFieldArray.fields.length === 1}
                    aria-label="Remover material"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Descrição</label>
                    <input
                      {...register(`materials.${index}.description`)}
                      className={`w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                        errors.materials?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                      }`}
                      placeholder="Descrição do material"
                    />
                    {errors.materials?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-500">{errors.materials[index]?.description?.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Quantidade</label>
                      <input
                        type="number"
                        {...register(`materials.${index}.quantity`, { valueAsNumber: true })}
                        className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.quantity ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                        }`}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Unidade</label>
                      <input
                        {...register(`materials.${index}.unit`)}
                        className="w-full px-2 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                        placeholder="un"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Preço Un.</label>
                      <input
                        type="number"
                        {...register(`materials.${index}.unitPrice`, { valueAsNumber: true })}
                        className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.unitPrice ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--color-neutral)]/20">
                    <span className="text-xs font-medium text-[var(--color-card-text)] opacity-80">Total do material:</span>
                    <span className="text-sm font-semibold text-[var(--color-accent)]">
                      {formatCurrency((materials[index]?.quantity || 0) * (materials[index]?.unitPrice || 0))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-[var(--color-neutral)]/20">
              <thead>
                <tr className="bg-[var(--color-neutral)]/5">
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider">Descrição</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-20">Qtd</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-20">Un</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-32">Preço Un</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-32">Total</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-12">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral)]/20">
                {materialsFieldArray.fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-[var(--color-neutral)]/5">
                    <td className="px-3 py-2">
                      <input
                        {...register(`materials.${index}.description`)}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        placeholder="Descrição do material"
                      />
                      {errors.materials?.[index]?.description && (
                        <p className="mt-1 text-xs text-red-500">{errors.materials[index]?.description?.message}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`materials.${index}.quantity`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.quantity ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0.01"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        {...register(`materials.${index}.unit`)}
                        className="w-full px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                        placeholder="un"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`materials.${index}.unitPrice`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.unitPrice ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2 text-right text-sm font-medium text-[var(--color-card-text)]">
                      {formatCurrency((materials[index]?.quantity || 0) * (materials[index]?.unitPrice || 0))}
                    </td>
                    <td className="px-3 py-2">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => materialsFieldArray.remove(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        disabled={materialsFieldArray.fields.length === 1}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td colSpan={4} className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal de Materiais:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">{formatCurrency(calculateMaterialsSubtotal())}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/PageHeader.tsx`

```typescript
// components/new-estimate/PageHeader.tsx
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Heading } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface PageHeaderProps {
  router: AppRouterInstance;
}

export default function PageHeader({ router }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.back()}
        className="p-2 rounded-full bg-[var(--color-neutral)]/10 text-[var(--color-text)] hover:bg-[var(--color-neutral)]/20"
        aria-label="Voltar"
      >
        <ArrowLeft size={20} />
      </motion.button>
      <Heading title="Novo Orçamento" description="Crie um orçamento detalhado para seu cliente" />
    </div>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/ServicesTable.tsx`

```typescript
// components/new-estimate/ServicesTable.tsx
import { motion } from 'framer-motion';
import { List, Plus, Trash2, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { EstimateFormValues, ServiceItem } from '@/types/estimate';

interface ServicesTableProps {
  servicesFieldArray: UseFieldArrayReturn<EstimateFormValues, 'services', 'id'>;
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
  services: ServiceItem[];
  formatCurrency: (value: number) => string;
  calculateServicesSubtotal: () => number;
  isMobile: boolean;
  isSimpleEstimate?: boolean;
  calculateSubtotal?: () => number;
  discount?: number;
  tax?: number;
  calculateTotal?: () => number;
}

export default function ServicesTable({
  servicesFieldArray,
  register,
  errors,
  services,
  formatCurrency,
  calculateServicesSubtotal,
  isMobile,
  isSimpleEstimate = false,
  calculateSubtotal,
  discount = 0,
  tax = 0,
  calculateTotal
}: ServicesTableProps) {
  const addService = () => servicesFieldArray.append({ description: '', value: 0 });

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <h3 className="text-lg font-medium flex items-center gap-2 text-[var(--color-card-text)]">
            <List size={18} className="text-[var(--color-accent)]" />
            Serviços
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addService}
            className="px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md flex items-center gap-1 text-sm transition-colors"
          >
            <Plus size={16} /> Adicionar Serviço
          </motion.button>
        </div>
        {errors.services?.root && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded-md flex items-start gap-2">
            <span className="mt-0.5"><X size={16} /></span>
            <p>{errors.services.root.message}</p>
          </div>
        )}
        
        {isMobile ? (
          <div className="space-y-4">
            {servicesFieldArray.fields.map((field, index) => (
              <div key={field.id} className="border border-[var(--color-neutral)]/30 rounded-lg p-3 bg-[var(--color-neutral)]/5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-[var(--color-card-text)]">Serviço {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => servicesFieldArray.remove(index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    disabled={servicesFieldArray.fields.length === 1}
                    aria-label="Remover serviço"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Descrição</label>
                    <input
                      {...register(`services.${index}.description`)}
                      className={`w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                        errors.services?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                      }`}
                      placeholder="Descrição do serviço"
                    />
                    {errors.services?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-500">{errors.services[index]?.description?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Valor</label>
                    <input
                      type="number"
                      {...register(`services.${index}.value`, { valueAsNumber: true })}
                      className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                        errors.services?.[index]?.value ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                      }`}
                      min="0"
                      step="0.01"
                    />
                    {errors.services?.[index]?.value && (
                      <p className="mt-1 text-xs text-red-500">{errors.services[index]?.value?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-[var(--color-neutral)]/20">
              <thead>
                <tr className="bg-[var(--color-neutral)]/5">
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider">Descrição do Serviço</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-40">Valor</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-12">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral)]/20">
                {servicesFieldArray.fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-[var(--color-neutral)]/5">
                    <td className="px-3 py-2">
                      <input
                        {...register(`services.${index}.description`)}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.services?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        placeholder="Descrição do serviço"
                      />
                      {errors.services?.[index]?.description && (
                        <p className="mt-1 text-xs text-red-500">{errors.services[index]?.description?.message}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`services.${index}.value`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.services?.[index]?.value ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => servicesFieldArray.remove(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        disabled={servicesFieldArray.fields.length === 1}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">
                    {isSimpleEstimate ? 'Subtotal:' : 'Subtotal de Serviços:'}
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">
                    {formatCurrency(isSimpleEstimate && calculateSubtotal ? calculateSubtotal() : calculateServicesSubtotal())}
                  </td>
                  <td></td>
                </tr>

                {isSimpleEstimate && calculateSubtotal && calculateTotal && (
                  <>
                    <tr>
                      <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Desconto:</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <input
                            type="number"
                            {...register('discount', { valueAsNumber: true })}
                            className="w-32 px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm text-[var(--color-card-text)] opacity-80 w-24 text-right">
                            -{formatCurrency(discount)}
                          </span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <input
                            type="number"
                            {...register('tax', { valueAsNumber: true })}
                            className="w-32 px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm text-[var(--color-card-text)] opacity-80 w-24 text-right">
                            +{formatCurrency(tax)}
                          </span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr className="bg-[var(--color-neutral)]/10">
                      <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-card-text)]">Total:</td>
                      <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</td>
                      <td></td>
                    </tr>
                  </>
                )}
              </tfoot>
            </table>
          </div>
        )}

        {isMobile && isSimpleEstimate && calculateSubtotal && calculateTotal && (
          <div className="bg-[var(--color-neutral)]/10 rounded-lg p-4 space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[var(--color-card-text)]">Subtotal:</span>
              <span className="text-[var(--color-card-text)] font-medium">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[var(--color-card-text)]">Desconto:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  {...register('discount', { valueAsNumber: true })}
                  className="w-24 px-2 py-1 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                  min="0"
                  step="0.01"
                />
                <span className="text-[var(--color-card-text)] opacity-80 text-sm">-{formatCurrency(discount)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  {...register('tax', { valueAsNumber: true })}
                  className="w-24 px-2 py-1 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                  min="0"
                  step="0.01"
                />
                <span className="text-[var(--color-card-text)] opacity-80 text-sm">+{formatCurrency(tax)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[var(--color-neutral)]/30">
              <span className="text-base font-bold text-[var(--color-card-text)]">Total:</span>
              <span className="text-lg font-bold text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/SuccessModal.tsx`

```typescript
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clipboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface SuccessModalProps {
  showLinkModal: boolean;
  generatedLink: string;
  linkCopied: boolean;
  copyToClipboard: () => void;
  router: AppRouterInstance;
}

export default function SuccessModal({
  showLinkModal,
  generatedLink,
  linkCopied,
  copyToClipboard,
  router
}: SuccessModalProps) {
  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            className="bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden mobile-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)]">
              <div className="p-5 bg-[var(--color-card-bg)] rounded-t-lg">
                <h2 className="text-xl font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Orçamento Criado com Sucesso
                </h2>
                <p className="text-[var(--color-card-text)] opacity-80 mb-4">
                  O orçamento foi criado e está pronto para ser compartilhado com o cliente.
                </p>
                <div className="mb-6">
                  <p className="text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-2">
                    Link do orçamento:
                  </p>
                  <div className="flex">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className="flex-grow px-3 py-2 border border-[var(--color-neutral)]/30 rounded-l-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className={`px-3 py-2 rounded-r-md flex items-center gap-1 transition-colors ${
                        linkCopied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white'
                      }`}
                      title="Copiar link"
                    >
                      {linkCopied ? (
                        <> 
                          <CheckCircle size={16} />
                          <span className="hidden sm:inline">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Clipboard size={16} />
                          <span className="hidden sm:inline">Copiar</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-3 mobile-modal-actions">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/dashboard/estimates')}
                    className="px-4 py-2 border border-[var(--color-neutral)]/30 text-[var(--color-card-text)] rounded-md hover:bg-[var(--color-neutral)]/10 transition-colors"
                  >
                    Ver Lista
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(`/orcamento/${generatedLink.split('/').pop()}`)}
                    className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md transition-colors"
                  >
                    Visualizar Orçamento
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```


---
### 📄 Arquivo: `src/components/new-estimate/TotalsCard.tsx`

```typescript
// components/new-estimate/TotalsCard.tsx
import { Calculator } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister } from 'react-hook-form';
import { EstimateFormValues } from '@/types/estimate';

interface TotalsCardProps {
  register: UseFormRegister<EstimateFormValues>;
  calculateMaterialsSubtotal: () => number;
  calculateServicesSubtotal: () => number;
  calculateSubtotal: () => number;
  discount: number;
  tax: number;
  calculateTotal: () => number;
  formatCurrency: (value: number) => string;
  isMobile: boolean;
}

export default function TotalsCard({
  register,
  calculateMaterialsSubtotal,
  calculateServicesSubtotal,
  calculateSubtotal,
  discount,
  tax,
  calculateTotal,
  formatCurrency,
  isMobile
}: TotalsCardProps) {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <Calculator size={18} className="text-[var(--color-accent)]" />
          Totais do Orçamento
        </h3>
        
        {isMobile ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[var(--color-neutral)]/5 rounded-md">
              <span className="font-medium text-[var(--color-card-text)]">Subtotal Materiais:</span>
              <span className="text-[var(--color-card-text)]">{formatCurrency(calculateMaterialsSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[var(--color-neutral)]/5 rounded-md">
              <span className="font-medium text-[var(--color-card-text)]">Subtotal Serviços:</span>
              <span className="text-[var(--color-card-text)]">{formatCurrency(calculateServicesSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[var(--color-neutral)]/5 rounded-md">
              <span className="font-medium text-[var(--color-card-text)]">Subtotal Geral:</span>
              <span className="text-[var(--color-card-text)]">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md">
              <label className="font-medium text-[var(--color-card-text)]">Desconto:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  {...register('discount', { valueAsNumber: true })}
                  className="w-24 px-2 py-1 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                  min="0"
                  step="0.01"
                />
                <span className="text-[var(--color-card-text)] opacity-80 text-sm">-{formatCurrency(discount)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md">
              <label className="font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  {...register('tax', { valueAsNumber: true })}
                  className="w-24 px-2 py-1 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                  min="0"
                  step="0.01"
                />
                <span className="text-[var(--color-card-text)] opacity-80 text-sm">+{formatCurrency(tax)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-[var(--color-neutral)]/10 rounded-md border-t border-[var(--color-neutral)]/30">
              <span className="text-base font-bold text-[var(--color-card-text)]">Total:</span>
              <span className="text-lg font-bold text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        ) : (
          <div>
            <table className="w-full min-w-full divide-y divide-[var(--color-neutral)]/20">
              <tbody>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal Materiais:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)] w-40">{formatCurrency(calculateMaterialsSubtotal())}</td>
                </tr>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal Serviços:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">{formatCurrency(calculateServicesSubtotal())}</td>
                </tr>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal Geral:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">{formatCurrency(calculateSubtotal())}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Desconto:</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end items-center gap-3">
                      <input
                        type="number"
                        {...register('discount', { valueAsNumber: true })}
                        className="w-32 px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                        min="0"
                        step="0.01"
                      />
                      <span className="text-sm text-[var(--color-card-text)] opacity-80 w-24 text-right">-{formatCurrency(discount)}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end items-center gap-3">
                      <input
                        type="number"
                        {...register('tax', { valueAsNumber: true })}
                        className="w-32 px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                        min="0"
                        step="0.01"
                      />
                      <span className="text-sm text-[var(--color-card-text)] opacity-80 w-24 text-right">+{formatCurrency(tax)}</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-[var(--color-neutral)]/10">
                  <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-card-text)]">Total:</td>
                  <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/settings/AdvancedSettings.tsx`

```typescript
// src/components/settings/AdvancedSettings.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { SettingsData } from '@/types/settings';
import { motion } from 'framer-motion';
import { SaveButton } from './SaveButton';
import { useSettingsData } from '@/hooks/useSettingsData';

interface AdvancedSettingsProps {
  settings: SettingsData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function AdvancedSettings({ settings, handleChange }: AdvancedSettingsProps) {
  const { saveSettings, saving, saved } = useSettingsData();
  const inputVariants = {
    focus: { scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' },
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
          Configurações Avançadas
        </h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="tracking.facebookPixel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Facebook Pixel
            </label>
            <motion.input
              id="tracking.facebookPixel"
              name="tracking.facebookPixel"
              type="text"
              value={settings.tracking.facebookPixel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="tracking.tiktokPixel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              TikTok Pixel
            </label>
            <motion.input
              id="tracking.tiktokPixel"
              name="tracking.tiktokPixel"
              type="text"
              value={settings.tracking.tiktokPixel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="tracking.googleTagManager" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Google Tag Manager
            </label>
            <motion.input
              id="tracking.googleTagManager"
              name="tracking.googleTagManager"
              type="text"
              value={settings.tracking.googleTagManager}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
        </div>
        <SaveButton onSave={saveSettings} saving={saving} saved={saved} />
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/settings/AppearanceSettings.tsx`

```typescript
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { SettingsData, Style, IconOption } from '@/types/settings';
import { ColorPicker } from './ColorPicker';
import { ThemeSelector } from './ThemeSelector';
import { ServiceEditor } from './ServiceEditor';
import { TemplateEditor } from './TemplateEditor';

interface AppearanceSettingsProps {
  settings: SettingsData;
  theme: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleDashboardThemeChange: () => void;
  updateThemeField: (theme: 'light' | 'dark', field: string, value: string) => void;
  updateHeroStyle: (field: 'titleStyles' | 'subtitleStyles', index: number, styleField: keyof Style, value: any) => void;
  updateCtaStyle: (field: keyof Style, value: any) => void;
  updateService: (index: number, field: string, value: string) => void;
  addTemplate: () => void;
  updateTemplateStyle: (index: number, key: string, value: string) => void;
  newTemplateName: string;
  setNewTemplateName: (name: string) => void;
  newTemplateStyles: { [key: string]: string };
  setNewTemplateStyles: (styles: { [key: string]: string }) => void;
  titleParts: string[];
  subtitleParts: string[];
  iconOptions: IconOption[];
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  settings,
  theme,
  handleChange,
  handleDashboardThemeChange,
  updateThemeField,
  updateHeroStyle,
  updateCtaStyle,
  updateService,
  addTemplate,
  updateTemplateStyle,
  newTemplateName,
  setNewTemplateName,
  newTemplateStyles,
  setNewTemplateStyles,
  titleParts,
  subtitleParts,
  iconOptions,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  // Garantir que titleStyles seja um array, mesmo que vazio
  const safeTitleStyles = settings.content.hero.titleStyles || [];

  // Função para aplicar as cores ao DOM
  const applyThemeColors = (themeType: 'light' | 'dark') => {
    const root = document.documentElement;
    const themeColors = settings.themes[themeType];
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  // Atualizar as cores no DOM quando o tema atual mudar
  useEffect(() => {
    applyThemeColors(theme as 'light' | 'dark');
  }, [settings.themes.light, settings.themes.dark, theme]);

  // Sobrescrever updateThemeField para aplicar as mudanças imediatamente
  const handleUpdateThemeField = (themeType: 'light' | 'dark', field: string, value: string) => {
    updateThemeField(themeType, field, value);
    const root = document.documentElement;
    root.style.setProperty(`--color-${field}`, value);
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
          Configurações de Aparência
        </h3>
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            variants={itemVariants}
          >
            <h4 className="text-md font-medium mb-4">Tema do Dashboard</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === 'light' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-500" />}
                <span className="text-sm">
                  O dashboard está usando o tema {theme === 'light' ? 'claro' : 'escuro'}
                </span>
              </div>
              <motion.button
                onClick={handleDashboardThemeChange}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Alternar para {theme === 'light' ? 'escuro' : 'claro'}
              </motion.button>
            </div>
          </motion.div>

          <ThemeSelector
            defaultTheme={settings.defaultTheme}
            handleChange={handleChange}
            variants={itemVariants}
          />

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Tema Claro</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(settings.themes.light).map(([key, value], index) => (
                <ColorPicker
                  key={key}
                  label={key}
                  value={value}
                  onChange={(newValue) => handleUpdateThemeField('light', key, newValue)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Tema Escuro</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(settings.themes.dark).map(([key, value], index) => (
                <ColorPicker
                  key={key}
                  label={key}
                  value={value}
                  onChange={(newValue) => handleUpdateThemeField('dark', key, newValue)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Hero - Título</h4>
            <div className="space-y-4">
              {titleParts.map((part, index) => (
                <motion.div 
                  key={index} 
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estilo para "{part}":
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="color"
                      value={safeTitleStyles[index]?.color || '#000000'}
                      onChange={(e) => updateHeroStyle('titleStyles', index, 'color', e.target.value)}
                      className="w-10 h-10 rounded-md cursor-pointer"
                    />
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={safeTitleStyles[index]?.bold || false}
                        onChange={(e) => updateHeroStyle('titleStyles', index, 'bold', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 font-bold">Negrito</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={safeTitleStyles[index]?.italic || false}
                        onChange={(e) => updateHeroStyle('titleStyles', index, 'italic', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 italic">Itálico</span>
                    </label>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Hero - Subtítulo</h4>
            <div className="space-y-2">
              {subtitleParts.slice(0, 3).map((part, index) => (
                <motion.div 
                  key={index} 
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estilo para "{part + (index < 2 ? '...' : '')}":
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="color"
                      value={settings.content.hero.subtitleStyles[index]?.color || '#000000'}
                      onChange={(e) => updateHeroStyle('subtitleStyles', index, 'color', e.target.value)}
                      className="w-10 h-10 rounded-md cursor-pointer"
                    />
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.content.hero.subtitleStyles[index]?.bold || false}
                        onChange={(e) => updateHeroStyle('subtitleStyles', index, 'bold', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 font-bold">Negrito</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.content.hero.subtitleStyles[index]?.italic || false}
                        onChange={(e) => updateHeroStyle('subtitleStyles', index, 'italic', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 italic">Itálico</span>
                    </label>
                  </div>
                </motion.div>
              ))}
              {subtitleParts.length > 3 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  + {subtitleParts.length - 3} palavras adicionais (configure as primeiras para definir o estilo geral)
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Hero - CTA</h4>
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="color"
                  value={settings.content.hero.ctaStyles?.color || '#FFFFFF'}
                  onChange={(e) => updateCtaStyle('color', e.target.value)}
                  className="w-10 h-10 rounded-md cursor-pointer"
                />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.content.hero.ctaStyles?.bold || false}
                    onChange={(e) => updateCtaStyle('bold', e.target.checked)}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 font-bold">Negrito</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.content.hero.ctaStyles?.italic || false}
                    onChange={(e) => updateCtaStyle('italic', e.target.checked)}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 italic">Itálico</span>
                </label>
              </div>
              <div className="mt-3 p-2 bg-accent rounded-md inline-block">
                <span style={{ 
                  color: settings.content.hero.ctaStyles?.color || '#FFFFFF',
                  fontWeight: settings.content.hero.ctaStyles?.bold ? 'bold' : 'normal',
                  fontStyle: settings.content.hero.ctaStyles?.italic ? 'italic' : 'normal'
                }}>
                  {settings.content.hero.ctaText}
                </span>
              </div>
            </div>
          </motion.div>

          <ServiceEditor
            services={settings.content.services}
            updateService={updateService}
            iconOptions={iconOptions}
            variants={itemVariants}
          />

          <TemplateEditor
            activeTemplate={settings.activeTemplate}
            templates={settings.templates}
            newTemplateName={newTemplateName}
            newTemplateStyles={newTemplateStyles}
            handleChange={handleChange}
            setNewTemplateName={setNewTemplateName}
            setNewTemplateStyles={setNewTemplateStyles}
            addTemplate={addTemplate}
            updateTemplateStyle={updateTemplateStyle}
            variants={itemVariants}
          />
        </motion.div>
      </div>
    </Card>
  );
};
```


---
### 📄 Arquivo: `src/components/settings/ColorPicker.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  delay?: number;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, delay = 0 }) => {
  return (
    <motion.div 
      className="flex items-center space-x-2 mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">{label}:</label>
      <div className="flex items-center space-x-2">
        <motion.div
          className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-300 dark:border-gray-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
          <div 
            className="w-full h-full" 
            style={{ backgroundColor: value }}
          />
        </motion.div>
        <motion.input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
          whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
        />
      </div>
    </motion.div>
  );
};
```


---
### 📄 Arquivo: `src/components/settings/ContactSettings.tsx`

```typescript
// src/components/settings/ContactSettings.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { SettingsData } from '@/types/settings';
import { motion } from 'framer-motion';

interface ContactSettingsProps {
  settings: SettingsData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function ContactSettings({ settings, handleChange }: ContactSettingsProps) {
  const inputVariants = {
    focus: { scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' },
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
          Configurações de Contato
        </h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="contactInfo.email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <motion.input
              id="contactInfo.email"
              name="contactInfo.email"
              type="email"
              value={settings.contactInfo.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="contactInfo.phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telefone
            </label>
            <motion.input
              id="contactInfo.phone"
              name="contactInfo.phone"
              type="text"
              value={settings.contactInfo.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="contactInfo.address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Endereço
            </label>
            <motion.input
              id="contactInfo.address"
              name="contactInfo.address"
              type="text"
              value={settings.contactInfo.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/settings/GeneralSettings.tsx`

```typescript
// src/components/settings/GeneralSettings.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { SettingsData } from '@/types/settings';
import { motion } from 'framer-motion';

interface GeneralSettingsProps {
  settings: SettingsData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function GeneralSettings({ settings, handleChange }: GeneralSettingsProps) {
  const inputVariants = {
    focus: { scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' },
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
          Configurações Gerais
        </h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome do Site
            </label>
            <motion.input
              id="siteName"
              name="siteName"
              type="text"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição do Site
            </label>
            <motion.textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Essa descrição é usada em meta tags para SEO.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
```


---
### 📄 Arquivo: `src/components/settings/SaveButton.tsx`

```typescript
import React from 'react';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SaveButtonProps {
  onClick: () => Promise<void>;
  disabled: boolean;
  saving: boolean;
  saved: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick, disabled, saving, saved }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {saving ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Salvando...</span>
        </>
      ) : saved ? (
        <>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <CheckCircle size={16} />
          </motion.div>
          <span>Salvo!</span>
        </>
      ) : (
        <>
          <Save size={16} />
          <span>Salvar Alterações</span>
        </>
      )}
    </motion.button>
  );
};
```


---
### 📄 Arquivo: `src/components/settings/ServiceEditor.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Service, IconOption } from '@/types/settings';

interface ServiceEditorProps {
  services: Service[];
  updateService: (index: number, field: string, value: string) => void;
  iconOptions: IconOption[];
  variants?: any;
}

export const ServiceEditor: React.FC<ServiceEditorProps> = ({ 
  services, 
  updateService, 
  iconOptions,
  variants
}) => {
  return (
    <motion.div variants={variants}>
      <h4 className="text-md font-medium mb-4">Serviços</h4>
      <div className="space-y-6">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 flex items-center justify-center mr-2 bg-accent/10 text-accent rounded-full">
                {iconOptions.find(opt => opt.name === service.icon)?.icon}
              </div>
              <h5 className="font-medium">Serviço {index + 1}</h5>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título
                </label>
                <motion.input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ícone
                </label>
                <motion.select
                  value={service.icon}
                  onChange={(e) => updateService(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
                >
                  {iconOptions.map(opt => (
                    <option key={opt.name} value={opt.name}>{opt.name}</option>
                  ))}
                </motion.select>
              </div>
            </div>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descrição
              </label>
              <motion.input
                type="text"
                value={service.desc}
                onChange={(e) => updateService(index, 'desc', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
```


---
### 📄 Arquivo: `src/components/settings/SettingsSidebar.tsx`

```typescript
// src/components/settings/SettingsSidebar.tsx
'use client';

import { useState } from 'react';
import { Settings, Mail, Shield } from 'lucide-react';

export default function SettingsSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'general', label: 'Geral', icon: <Settings size={20} /> },
    { id: 'contact', label: 'Contato', icon: <Mail size={20} /> },
    { id: 'advanced', label: 'Avançado', icon: <Shield size={20} /> },
  ];

  return (
    <div className="w-64 bg-[var(--color-card-bg)] p-4 border-r border-[var(--color-gray)]">
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center p-2 rounded-lg text-[var(--color-card-text)] ${
                activeTab === tab.id ? 'bg-[var(--color-accent)] text-white' : 'hover:bg-[var(--color-paralel)]'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```


---
### 📄 Arquivo: `src/components/settings/TemplateEditor.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Template } from '@/types/settings';
import { PlusCircle } from 'lucide-react';

interface TemplateEditorProps {
  activeTemplate: string;
  templates: Template[];
  newTemplateName: string;
  newTemplateStyles: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setNewTemplateName: (name: string) => void;
  setNewTemplateStyles: (styles: { [key: string]: string }) => void;
  addTemplate: () => void;
  updateTemplateStyle: (index: number, key: string, value: string) => void;
  variants?: any;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  activeTemplate,
  templates,
  newTemplateName,
  newTemplateStyles,
  handleChange,
  setNewTemplateName,
  setNewTemplateStyles,
  addTemplate,
  updateTemplateStyle,
  variants
}) => {
  return (
    <motion.div variants={variants}>
      <h4 className="text-md font-medium mb-4">Templates</h4>
      
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Template Ativo:
      </label>
      <motion.select
        name="activeTemplate"
        value={activeTemplate}
        onChange={handleChange}
        className="mb-6 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
      >
        {templates.map(template => (
          <option key={template.name} value={template.name}>{template.name}</option>
        ))}
      </motion.select>

      <div className="mb-8">
        <h5 className="text-sm font-medium mb-3">Templates Existentes</h5>
        <div className="space-y-4">
          {templates.map((template, index) => (
            <motion.div 
              key={template.name}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ 
                boxShadow: template.name === activeTemplate ? 
                  '0 0 0 2px rgba(43, 141, 154, 0.6)' : 
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h6 className="font-medium flex items-center">
                  {template.name === activeTemplate && (
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  )}
                  {template.name}
                </h6>
                {template.name === activeTemplate && (
                  <span className="text-xs text-green-500 font-medium">Ativo</span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(template.styles).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                      {key}:
                    </label>
                    <motion.input
                      type="text"
                      value={value}
                      onChange={(e) => updateTemplateStyle(index, key, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h5 className="text-sm font-medium mb-3 flex items-center">
          <PlusCircle size={16} className="mr-2 text-accent" />
          Adicionar Novo Template
        </h5>
        
        <div className="space-y-3">
          <motion.input
            type="text"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            placeholder="Nome do Template"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Hero Background:
              </label>
              <motion.input
                type="text"
                value={newTemplateStyles['hero-bg']}
                onChange={(e) => setNewTemplateStyles({ ...newTemplateStyles, 'hero-bg': e.target.value })}
                placeholder="Ex.: bg-blue-500"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Tamanho do Texto:
              </label>
              <motion.input
                type="text"
                value={newTemplateStyles['text-size']}
                onChange={(e) => setNewTemplateStyles({ ...newTemplateStyles, 'text-size': e.target.value })}
                placeholder="Ex.: text-4xl"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
              />
            </div>
          </div>
          
          <motion.button
            type="button"
            onClick={addTemplate}
            disabled={!newTemplateName}
            className="mt-3 px-4 py-2 bg-accent text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Adicionar Template
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
```


---
### 📄 Arquivo: `src/components/ui/Button.tsx`

```typescript
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]',
        secondary: 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary)]/90',
        outline: 'border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10',
        danger: 'bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90',
        success: 'bg-[var(--color-success)] text-white hover:bg-[var(--color-success)]/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```


---
### 📄 Arquivo: `src/components/ui/Card.tsx`

```typescript
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


---
### 📄 Arquivo: `src/components/ui/Heading.tsx`

```typescript
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


---
### 📄 Arquivo: `src/components/ui/Input.tsx`

```typescript
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full rounded-lg border border-[var(--color-neutral)]/30 bg-white px-4 py-2 text-[var(--color-text)] shadow-sm transition-colors placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
      error: {
        true: 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, errorMessage, label, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ size, error, className }))}
          ref={ref}
          {...props}
        />
        {(error && errorMessage) || helperText ? (
          <p
            className={cn(
              'text-sm',
              error
                ? 'text-[var(--color-error)]'
                : 'text-[var(--color-text)]/70'
            )}
          >
            {error ? errorMessage : helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
```


---
### 📄 Arquivo: `src/components/ui/LoadingSpinner.tsx`

```typescript
export function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }
```


---
### 📄 Arquivo: `src/components/ui/Modal.tsx`

```typescript
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { modalVariants } from '@/lib/motion-variants';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  showCloseButton = true,
  size = 'md',
}) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants.backdrop}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants.modal}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
              sizeClasses[size],
              'w-full p-4 sm:p-6'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                'relative rounded-2xl bg-white p-6 shadow-xl',
                className
              )}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="mb-4 flex items-center justify-between">
                  {title && (
                    <h2 className="text-xl font-semibold text-[var(--color-text)]">
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text)]/70 hover:bg-[var(--color-neutral)]/10 hover:text-[var(--color-text)]"
                      aria-label="Fechar"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="relative">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
```


---
### 📄 Arquivo: `src/components/ui/Toaster.tsx`

```typescript
'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--color-card-bg)',
          color: 'var(--color-card-text)',
          border: '1px solid var(--color-neutral)',
        },
      }}
    />
  );
}
```


---
### 📄 Arquivo: `src/components/About.tsx`

```typescript
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
      className="py-16 sm:py-20 bg-[var(--color-light)] dark:bg-[var(--color-dark)] relative"
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
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text)] dark:text-[var(--color-text-dark)] tracking-tight"
            >
              Soluções de Confiança para sua Casa
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg mb-6 text-[var(--color-text)] dark:text-[var(--color-text-dark)] leading-relaxed"
            >
              <span className="font-medium text-[var(--color-accent)]">FH Resolve</span> oferece serviços
              profissionais de manutenção residencial em Florianópolis. Atendemos
              Ratones, Jurerê e região com segurança e praticidade.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg mb-8 text-[var(--color-text)] dark:text-[var(--color-text-dark)] leading-relaxed"
            >
              Especializado em resolver problemas do dia a dia com rapidez e eficiência para manter
              sua casa em perfeito estado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-start gap-4 mb-8 p-4 bg-white dark:bg-[var(--color-neutral)]/10 rounded-lg shadow-sm dark:shadow-none"
            >
              <ShieldCheck className="h-10 w-10 text-[var(--color-accent)] flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg text-[var(--color-text)] dark:text-[var(--color-text-dark)]">Compromisso com Qualidade</h3>
                <p className="text-[var(--color-text)]/80 dark:text-[var(--color-text-dark)]/80">
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
              <h3 className="font-medium text-lg mb-4 text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
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
                    <span className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
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
                  className="p-4 rounded-lg bg-white dark:bg-[var(--color-neutral)]/10 shadow-sm border border-[var(--color-neutral)]/10 dark:border-[var(--color-neutral)]/20"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-[var(--color-accent)]/10 mb-2">
                      <div className="text-[var(--color-accent)]">{item.icon}</div>
                    </div>
                    <h3 className="font-medium text-[var(--color-text)] dark:text-[var(--color-text-dark)]">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text)]/80 dark:text-[var(--color-text-dark)]/80">{item.desc}</p>
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
              <div className="aspect-video sm:aspect-square rounded-lg overflow-hidden shadow-lg border border-[var(--color-neutral)]/10 dark:border-[var(--color-neutral)]/20">
                <div className="absolute inset-0 bg-[var(--color-accent)]/5 dark:bg-[var(--color-accent)]/10 z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Serviço de manutenção residencial em Florianópolis"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-10"
              >
                <div className="relative bg-[var(--color-accent)] text-white p-3 sm:p-4 rounded-lg shadow-lg">
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
                className="block w-full text-center py-3 px-4 bg-[var(--color-accent)] text-white rounded-md font-medium hover:bg-[var(--color-accent)]/90 transition-colors shadow-sm"
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


---
### 📄 Arquivo: `src/components/Benefits.tsx`

```typescript
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
const COVERAGE_RADIUS = 15;
// Taxa adicional por km
const ADDITIONAL_PRICE_PER_KM = 10;

// Valor mínimo para serviços em Ratones
const MINIMUM_PRICE = 150;
// Componentes de detalhes do serviço

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedService, setSelectedService] = useState<ServiceDetailsProps | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const isDarkMode = false;

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
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
        features: ['Garantia em todos os serviços executados', 'Profissional qualificado e experiente', 'Atendimento ético e transparente', 'Uso de materiais de qualidade', 'Orçamento sem compromisso'],
        benefits: ['Tranquilidade na contratação', 'Garantia de até 90 dias para serviços realizados', 'Compromisso com a qualidade', 'Satisfação garantida'],
        pricing: {
          basePrice: 'R$ 150,00',
          additionalInfo: 'Valor mínimo para áreas até 10km'
        }
      }
    },
    {
      icon: <Clock className="h-7 w-7" />,
      title: 'Rapidez',
      description: 'Atendimento ágil.',
      details: {
        features: [ 'Agendamento flexível', 'Atendimento de emergência disponível', 'Horários estendidos incluindo finais de semana', 'Equipe sempre disponível'],
        benefits: ['Solução rápida para seus problemas', 'Economia de tempo', 'Redução do tempo de espera', 'Menos transtornos no seu dia a dia'],
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
        features: [
          'Instalação de tomadas e interruptores',
          'Montagem de lustres e luminárias',
          'Instalação de chuveiros elétricos',
          'Reparos em curtos-circuitos',
          'Instalação de ventiladores de teto',
          'Manutenção de disjuntores e quadros elétricos',
          'Substituição de fios e cabos danificados',
          'Instalação de sensores de presença',
          // 'Instalação de ar-condicionado',
          'Identificação e solução de falhas elétricas',
          // 'Adequação e atualização de redes elétricas',
          'Instalação de equipamentos eletrônicos',
          'Instalação de iluminação externa e jardim',
          'Reparo em sistemas de segurança'
        ],
        benefits: ['Segurança para sua residência', 'Economia de energia', 'Prevenção de acidentes', 'Instalações dentro das normas técnicas'],
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
        features: [
          'Reparo de vazamentos',
          'Desentupimento de pias e ralos',
          'Instalação de torneiras e chuveiros',
          'Troca de registros e válvulas',
          'Conserto de caixas acopladas',
          'Manutenção de bombas d\'água',
          'Instalação de filtros e purificadores',
          'Troca de tubulações',
          'Impermeabilização de áreas úmidas',
          'Instalação de pias e cubas',
          'Manutenção de caixas d\'água',
          // 'Instalação de aquecedores a gás',
          // 'Detecção de vazamentos ocultos',
          'Desentupimento de tubulações externas',
          'Instalação de sistemas de irrigação',
          'Reparo em calhas e rufos'
        ],
        benefits: ['Economia na conta de água', 'Prevenção de infiltrações', 'Aumento da vida útil das instalações', 'Solução definitiva para problemas recorrentes'],
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
        features: [
          'Montagem de móveis',
          'Fixação de prateleiras e quadros',
          'Pequenos reparos em alvenaria',
          'Instalação de persianas e cortinas',
          'Limpezas externas e internas',
          'Manutenção de telhados e calhas',
          'Reparos em pinturas',
          'Tratamento de umidade',
          'Limpeza de pisos e telhas',
          'Instalação de portas e fechaduras',
          'Montagem e instalação de armários',
          'Conserto de gavetas e dobradiças',
          'Reparos em pisos e revestimentos',
          'Instalação de box e espelhos',
          'Vedação de janelas e portas',
          'Instalação de antenas',
          // 'Reparo em portões e cercas',
          'Instalação de corrimãos e guarda-corpos',
          'Manutenção preventiva residencial',
          'Limpeza de calhas e rufos',
          'Reparo de rachaduras em paredes',
          'Aplicação de silicone e vedantes',
          'Troca de vidros e esquadrias',
          'Limpeza de caixas d\'água'
        ],
        benefits: ['Otimização dos espaços', 'Acabamento de qualidade', 'Praticidade no dia a dia', 'Valorização do imóvel'],
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
        features: ['Parcelamento em até 12x sem juros', 'Aceitamos todos os cartões', 'Desconto para pagamento à vista', 'Transferência via PIX', 'Opções de pagamento via boleto'],
        benefits: ['Flexibilidade de pagamento', 'Planejamento financeiro', 'Solução imediata sem comprometer o orçamento', 'Facilidade e segurança nas transações'],
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
        className={`${isDarkMode ? 'bg-[#333333]' : 'bg-white'} rounded-lg shadow-xl w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-accent) transparent'
        }}
      >
        {/* Cabeçalho estilizado */}
        <div className={`sticky top-0 ${isDarkMode ? 'bg-[#333333]' : 'bg-white'} z-10 border-b border-[var(--color-neutral)]/20`}>
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
                <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#252525]'}`}>{service.title}</h3>
                <p className={`${isDarkMode ? 'text-white/80' : 'text-[#252525]/80'} text-sm sm:text-base`}>{service.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Corpo do modal com detalhes */}
        <div className="px-4 py-3 sm:px-6 sm:pb-6">
          {/* Recursos */}
          <div className="mb-5">
            <h4 className={`text-base sm:text-lg font-medium ${isDarkMode ? 'text-white' : 'text-[#252525]'} flex items-center gap-2 mb-3`}>
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
                  <span className={`${isDarkMode ? 'text-white/80' : 'text-[#252525]/80'} text-sm sm:text-base`}>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Benefícios */}
          <div className="mb-5">
            <h4 className={`text-base sm:text-lg font-medium ${isDarkMode ? 'text-white' : 'text-[#252525]'} flex items-center gap-2 mb-3`}>
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
                  <span className={`${isDarkMode ? 'text-white/80' : 'text-[#252525]/80'} text-sm sm:text-base`}>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Área de cobertura com verificação de localização */}
          <motion.div
            className={`p-3 sm:p-4 ${isDarkMode ? 'bg-[var(--color-neutral)]/20' : 'bg-[var(--color-neutral)]/10'} rounded-lg mb-5`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#252525]'} text-sm sm:text-base`}>Área de Cobertura</span>
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
                <p className={`${isDarkMode ? 'text-white/80' : 'text-[#252525]/80'}`}>Até 10km de Ratones, Florianópolis</p>
                

                {locationError && (
                  <div className={`mt-2 ${isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-500'} p-2 rounded-md flex items-start gap-2`}>
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{locationError}</span>
                  </div>
                )}

                {distance !== null && (
                  <div className={`mt-2 p-2 rounded-md flex items-start gap-2 ${distance <= COVERAGE_RADIUS
                      ? isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-600'
                      : isDarkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-600'
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
            className={`p-3 sm:p-4 ${isDarkMode ? 'bg-[var(--color-accent)]/10' : 'bg-[var(--color-accent)]/5'} rounded-lg mb-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <CreditCard className="h-5 w-5 text-[var(--color-accent)]" />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#252525]'} text-sm sm:text-base`}>Valor</span>
            </div>
            <div className={`${isDarkMode ? 'text-white/80' : 'text-[#252525]/80'} text-sm sm:text-base text-right`}>
              <div className="font-medium">
                {service.details.pricing.basePrice}
                {distance !== null && distance > COVERAGE_RADIUS && (
                  <span className={`${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`}>
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
              className={`flex-1 py-3 px-4 border border-[var(--color-neutral)]/30 rounded-md font-medium hover:bg-[var(--color-neutral)]/10 transition-colors ${isDarkMode ? 'text-white' : 'text-[#252525]'}`}
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
      className={`py-16 sm:py-20 ${isDarkMode ? 'bg-[#3A3A3A]' : 'bg-[#EDEDED]'}`}
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
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[var(--color-text)]'}`}>Soluções Completas</h2>
          <p className={`text-base md:text-lg ${isDarkMode ? 'text-white/80' : 'text-[var(--color-text)]/80'} max-w-2xl mx-auto`}>O que podemos fazer por você</p>
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
              <div className={`card h-full flex flex-col ${isDarkMode ? 'bg-[var(--color-card-bg)]' : 'bg-white'} transition-all duration-500 
                            border-2 border-transparent group-hover:border-[var(--color-accent)]/20`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)]/5 rounded-bl-full -z-10 
                              group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all duration-500"></div>
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full 
                                bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-5
                                group-hover:bg-[var(--color-accent)]/20 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className={`text-xl font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-[var(--color-card-text)]'}`}>{benefit.title}</h3>
                  <p className={`${isDarkMode ? 'text-white/80' : 'text-[var(--color-secondary)]'} mb-5`}>{benefit.description}</p>
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


---
### 📄 Arquivo: `src/components/Blog.tsx`

```typescript
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


---
### 📄 Arquivo: `src/components/Contact.tsx`

```typescript
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
    <section id="contact" className="py-16 sm:py-20 bg-[var(--color-light)]">
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


---
### 📄 Arquivo: `src/components/FeedbackToast.tsx`

```typescript
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


---
### 📄 Arquivo: `src/components/Footer.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[var(--color-dark)] text-[var(--color-text-light)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/10 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">FH Resolve</h3>
            <p className="text-sm md:text-base opacity-80">
              Sua solução confiável para manutenção residencial em Florianópolis.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Contato</h3>
            <p className="text-sm md:text-base opacity-80">contato@fhresolve.com.br</p>
            <p className="text-sm md:text-base opacity-80">+55 (48) 99191-9791</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Pronto para Começar?</h3>
            <motion.a
              href="#contact"
              className="inline-block px-6 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-text-light)] font-semibold hover:bg-[var(--color-accent-dark)] transition-all"
              whileHover={{ scale: 1.1, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Solicite um Orçamento
            </motion.a>
          </motion.div>
        </div>
        <div className="mt-8 text-center text-sm opacity-60">
          © {new Date().getFullYear()} FH Resolve. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```


---
### 📄 Arquivo: `src/components/Header.tsx`

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Menu, X, Wrench, MessageCircle } from 'lucide-react';
import { useFeedback } from '../context/FeedbackContext';
import { useSiteConfig } from '@/context/SiteConfigContext';

interface CommonContextType {
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
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
          if (rect.top <= 120 && rect.bottom >= 0) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      }, 300);
      return () => clearTimeout(timer);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 100);
    }
    
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      
      requestAnimationFrame(() => {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      });
    }
  };

  const getHeaderBackground = () => {
    const baseBg = 'bg-[var(--color-light)]';
    if (isOpen) {
      return `${baseBg}/95 backdrop-blur-md`;
    }
    if (scrolled) {
      return `${baseBg}/90 backdrop-blur-md shadow-sm`;
    }
    return `${baseBg}/80 backdrop-blur-sm`;
  };

  const getLinkClass = (isActive: boolean) => {
    const baseClass = "relative font-medium py-2 px-1 transition-all";
    
    if (isActive) {
      return `${baseClass} text-[var(--color-accent)]`;
    }
    
    return `${baseClass} text-[var(--color-primary)]/80 hover:text-[var(--color-accent)]`;
  };

  const mobileMenuVariants = {
    closed: { 
      x: "-100%",
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
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
          whileHover={{ scale: 1.02, x: 3 }}
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
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30 
                    }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            className="md:hidden z-50 p-2 rounded-md bg-[var(--color-accent)] text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              ref={navRef}
              className="fixed inset-0 w-full min-h-screen md:hidden z-40 overflow-y-auto"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
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
                        className={`block py-3 px-4 text-base font-medium rounded-lg transition-all ${
                          isActive
                            ? `bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium border-l-2 border-[var(--color-accent)]`
                            : `text-[var(--color-text)]/80 dark:text-[var(--color-text)]/80 hover:bg-[var(--color-neutral)]/10`
                        }`}
                        variants={mobileNavItemVariants}
                        whileHover={{ x: 5, backgroundColor: isActive ? undefined : 'rgba(var(--color-accent-rgb), 0.05)' }}
                        whileTap={{ x: 0, scale: 0.98 }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>

                <motion.div 
                  className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20"
                  variants={mobileNavItemVariants}
                >
                  <motion.a
                    href="https://wa.me/5548991919791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[var(--color-accent)] text-white rounded-lg font-medium shadow-md"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97, y: 0 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Fale Conosco via WhatsApp</span>
                  </motion.a>
                </motion.div>
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


---
### 📄 Arquivo: `src/components/Hero.tsx`

```typescript
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageCircle, CreditCard, ArrowDown, Wrench, Droplet, ShieldCheck, ChevronRight, Star } from 'lucide-react';
import { 
  buttonVariants, 
  cardVariants, 
  containerVariants, 
  entranceVariants, 
  iconButtonVariants, 
  spring,
  usePrefersReducedMotion,
  applyVariant,
  getReducedMotionVariants
} from '@/lib/motion-variants';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
  prefersReducedMotion: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, index, prefersReducedMotion }) => (
  <motion.div
    className="service-card relative overflow-hidden p-4 sm:p-5 rounded-lg 
               bg-white/10 dark:bg-white/5 border border-[var(--color-neutral)]/20 
               dark:border-white/10 transition-all duration-300 flex flex-col"
    style={{
      backdropFilter: "blur(8px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
    }}
    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      delay: prefersReducedMotion ? 0 : 0.15 * index, 
      duration: prefersReducedMotion ? 0.2 : 0.6, 
      ease: "easeOut" 
    }}
    whileHover={applyVariant(prefersReducedMotion, cardVariants.hover)}
    whileTap={applyVariant(prefersReducedMotion, cardVariants.tap)}
  >
    <div className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-28 bg-gradient-radial from-[var(--color-accent)]/10 to-transparent opacity-40 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    
    <div className="flex items-center gap-3 relative z-10 mb-2">
      <div className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl 
                    bg-[var(--color-accent)]/10 text-[var(--color-accent)] 
                    flex-shrink-0 shadow-sm">
        {prefersReducedMotion ? (
          <div className="text-[var(--color-accent)]">{icon}</div>
        ) : (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--color-accent)]"
          >
            {icon}
          </motion.div>
        )}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text)]">{title}</h3>
    </div>
    
    <p className="text-sm leading-relaxed text-[var(--color-text)]/80 pl-14 sm:pl-16">{desc}</p>
    
    {!prefersReducedMotion && (
      <motion.div 
        className="absolute bottom-2 right-2 text-[var(--color-accent)]/40"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronRight size={16} />
      </motion.div>
    )}
  </motion.div>
);

const Hero: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 30]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0.5]);

  const services = [
    { icon: <Wrench size={22} />, title: 'Reparos Elétricos', desc: 'Instalações, consertos e manutenção profissional realizada com segurança e garantia.' },
    { icon: <Droplet size={22} />, title: 'Serviços Hidráulicos', desc: 'Soluções completas para vazamentos, entupimentos e instalação de sistemas hidráulicos.' },
    { icon: <ShieldCheck size={22} />, title: 'Qualidade Garantida', desc: 'Atendimento rápido, materiais de primeira linha e garantia nos serviços realizados.' },
  ];

  // Verificar se é dispositivo móvel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Verificar no carregamento inicial
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Se o usuário prefere movimento reduzido, não aplicamos as animações GSAP
    if (prefersReducedMotion) return;
    
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

    // Animação otimizada para dispositivos móveis e desktop
    gsap.from('.service-card', {
      y: isMobile ? 10 : 20,
      opacity: 0.8,
      stagger: isMobile ? 0.1 : 0.2,
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top center',
        end: 'center center',
        scrub: isMobile ? 0.5 : 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile, prefersReducedMotion]); 

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('benefits');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determina quais variantes usar com base na preferência do usuário
  const fadeInVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : entranceVariants.fadeIn;

  const slideUpVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : entranceVariants.slideUp;

  const containerAnimVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : containerVariants;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20 sm:pt-20 md:pt-0"
    >
      <motion.div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574873934798-d7ef3dc98c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          y: backgroundY
        }}
      >
        {/* Overlay gradiente aprimorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/75 to-[var(--color-primary)]/60"></div>
        
        {/* Efeito de partículas sutis - Apenas exibir quando não há preferência por movimento reduzido */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[var(--color-light)]/30 blur-xl"
                initial={{ 
                  x: Math.random() * 100, 
                  y: Math.random() * 100,
                  opacity: 0.2
                }}
                animate={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  top: `${Math.random() * 90}%`,
                  left: `${Math.random() * 90}%`,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <motion.div 
        ref={contentRef} 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0"
        style={{ opacity: contentOpacity }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16">
          <div className="w-full lg:w-1/2 max-w-xl">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="mb-6 inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20"
            >
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[var(--color-accent)]">
                <Star size={14} className="fill-[var(--color-accent)]" /> 
                <span>Serviços residenciais de confiança</span>
              </span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4 md:mb-6 leading-tight tracking-tight"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              <span className="block mb-2">Solução Completa</span>
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-transparent bg-clip-text">para sua Casa</span>
            </motion.h1>

            <motion.p 
              className="text-lg sm:text-xl leading-relaxed text-[var(--color-text)]/80 mb-6 md:mb-8 max-w-lg"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0.1 : 0.4 }}
            >
              Reparos elétricos, hidráulicos e serviços gerais em 
              <span className="mx-1 font-medium">Florianópolis</span> 
              com rapidez, qualidade e preço justo.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0.2 : 0.6 }}
            >
              {/* CTA Principal Otimizado */}
              <motion.a
                href="https://wa.me/5548991919791"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 bg-[var(--color-accent)] text-white rounded-md font-medium transition-all shadow-lg shadow-[var(--color-accent)]/20 group"
                whileHover={applyVariant(prefersReducedMotion, buttonVariants.hover)}
                whileTap={applyVariant(prefersReducedMotion, buttonVariants.tap)}
              >
                {/* Efeito de brilho no botão - Só exibe se não preferir movimento reduzido */}
                {!prefersReducedMotion && (
                  <motion.span 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                )}
                
                <MessageCircle size={18} className="text-white" />
                <span className="font-semibold text-sm sm:text-base">Orçamento em 1 Hora</span>
                {!prefersReducedMotion && (
                  <motion.span 
                    className="absolute -right-4 -top-4 bg-white/20 rounded-full text-[10px] font-bold px-2 py-1 rotate-12"
                    animate={{ scale: [1, 1.1, 1], rotate: [12, 8, 12] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    GRÁTIS
                  </motion.span>
                )}
              </motion.a>
              
              <motion.div 
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-md border border-[var(--color-neutral)]/30 bg-white/5 backdrop-blur-sm text-[var(--color-text)]"
                whileHover={applyVariant(prefersReducedMotion, { 
                  backgroundColor: 'rgba(var(--color-neutral-rgb), 0.05)',
                  borderColor: 'rgba(var(--color-accent-rgb), 0.3)',
                  y: -2
                })}
                whileTap={applyVariant(prefersReducedMotion, { y: 0 })}
              >
                <CreditCard size={16} className="text-[var(--color-accent)]" />
                <span className="text-xs sm:text-sm">
                  Até <span className="font-bold text-[var(--color-accent)]">12x</span> sem juros
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Container dos cards com maior visibilidade e mais adequado para mobile */}
          <motion.div 
            className="w-full lg:w-1/2 mt-8 lg:mt-0"
            variants={containerAnimVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid gap-3 sm:gap-4">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  desc={service.desc}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Separador Visual */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-gray)] to-transparent dark:from-[var(--color-primary)] z-5" />

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0.2 : 1.2, duration: prefersReducedMotion ? 0.2 : 0.8 }}
        aria-label="Rolar para a seção Sobre"
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="text-[var(--color-text)]/60 text-xs sm:text-sm mb-2">Saiba Mais</span>
          <motion.div 
            className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
            whileHover={applyVariant(prefersReducedMotion, iconButtonVariants.hover)}
            whileTap={applyVariant(prefersReducedMotion, iconButtonVariants.tap)}
          >
            <ArrowDown className="text-[var(--color-accent)] h-4 w-4 sm:h-5 sm:w-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
```


---
### 📄 Arquivo: `src/components/LoadingScreen.tsx`

```typescript
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Wrench } from 'lucide-react';
import 'animate.css';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Impedir scroll durante a animação
    document.documentElement.classList.add('no-scroll');
    
    // Simulação de progresso de carregamento
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
    
    // Referências aos elementos DOM
    const container = containerRef.current;
    const logo = logoRef.current;
    
    if (!container || !logo) return;
    
    // Timeline com contexto GSAP
    const ctx = gsap.context(() => {
      // Timeline principal para a animação de loading
      const tl = gsap.timeline({
        onComplete: () => {
          // Quando a animação inicial terminar, permitir que o AnimatePresence faça a transição
          if (loadingProgress >= 100) {
            setTimeout(() => {
              setIsAnimationComplete(true);
            }, 500);
          }
        }
      });
      
      // Configuração inicial da animação
      gsap.set('.logo-icon', { scale: 0, opacity: 0 });
      gsap.set('.logo-text', { y: 30, opacity: 0 });
      gsap.set('.loading-message', { opacity: 0, y: 20 });
      gsap.set('.loading-particles', { opacity: 0 });
      
      // Anima o logo e os elementos
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
      .to('.tool-icon', {
        rotation: 360,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1
      }, '-=0.8');
    }, container);
    
    // Cleanup
    return () => {
      ctx.revert();
      clearInterval(progressInterval);
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);
  
  useEffect(() => {
    if (loadingProgress >= 100) {
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);
  
  const getAnimationClass = (index: number) => {
    const animations = [
      'animate__bounce',
      'animate__pulse',
      'animate__rubberBand',
      'animate__flip',
      'animate__swing',
      'animate__tada',
      'animate__jello'
    ];
    return animations[index % animations.length];
  };
  
  return (
    <motion.div
      ref={containerRef}
      className="loading-container fixed inset-0 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/95 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { 
          duration: 0.8,
          ease: "easeInOut"
        }
      }}
    >
      <div 
        ref={logoRef} 
        className="loading-content relative z-10 flex flex-col items-center animate__animated animate__zoomIn"
      >
        <motion.div 
          className="mb-8 flex flex-col items-center"
          exit={{ 
            scale: 1.2, 
            opacity: 0,
            transition: { duration: 0.5 } 
          }}
        >
          <div className="logo-icon relative bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-6 overflow-hidden animate__animated animate__rubberBand animate__delay-1s">
            {/* Efeito 3D no ícone */}
            <div className="absolute inset-0 bg-[var(--color-accent)]/20 rounded-xl animate__animated animate__pulse animate__infinite"></div>
            <Wrench className="h-12 w-12 text-[var(--color-accent)] tool-icon relative z-10" />
          </div>
          
          <div className="logo-text flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white animate__animated animate__fadeInUp">
              FH<span className="text-[var(--color-accent)] animate__animated animate__flash animate__delay-2s">Resolve</span>
            </h1>
            <p className="text-white/60 text-sm mt-1 animate__animated animate__fadeIn animate__delay-1s">Manutenção Residencial</p>
          </div>
        </motion.div>
        
        <div className="loading-message text-white/80 text-sm font-medium mb-8 flex items-center gap-2 animate__animated animate__fadeIn animate__delay-1s">
          <span className="inline-block h-2 w-2 bg-[var(--color-accent)] rounded-full animate__animated animate__pulse animate__infinite"></span>
          <span>Carregando soluções para sua casa...</span>
        </div>
        
        <motion.div
          className="w-64"
          exit={{ 
            width: 0,
            opacity: 0,
            transition: { duration: 0.3 } 
          }}
        >
          <div className="loading-bar w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="loading-bar-progress h-full bg-gradient-to-r from-[var(--color-accent)]/80 to-[var(--color-accent)] animate__animated animate__fadeIn"
              style={{ width: `${Math.min(loadingProgress, 100)}%`, transition: 'width 0.3s ease-out' }}
            ></div>
          </div>
        </motion.div>
        
        {/* Mensagem de dica abaixo da barra de progresso */}
        <p className="text-white/40 text-xs mt-4 max-w-xs text-center animate__animated animate__fadeIn animate__delay-2s">
          Oferecemos serviços profissionais de manutenção residencial em Florianópolis e região
        </p>
        
        {/* Contador de progresso */}
        <div className="mt-2 text-white/70 text-sm animate__animated animate__fadeIn">
          {Math.min(Math.floor(loadingProgress), 100)}%
        </div>
      </div>

      {/* Elementos decorativos - partículas flutuantes com Animate.css */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div 
            key={i}
            className={`loading-particles absolute rounded-full bg-[var(--color-accent)]/5 animate__animated ${getAnimationClass(i)} animate__infinite animate__slower`}
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
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.5 }
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
        
        {/* Elementos de ferramentas estilizados no fundo com animações */}
        <motion.div 
          className="absolute -bottom-20 -right-20 w-64 h-64 opacity-10 animate__animated animate__rotateIn animate__slower animate__infinite"
          exit={{ 
            opacity: 0, 
            rotate: 90,
            transition: { duration: 0.5 }
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
            <path d="M35.7,3.7 C34.4,4.9 33.7,6.6 33.7,8.3 L33.7,15.5 C33.7,19.1 36.6,22 40.2,22 C43.8,22 46.7,19.1 46.7,15.5 L46.7,8.3 C46.7,6.6 46,4.9 44.7,3.7 C42.2,1.2 38.2,1.2 35.7,3.7 L35.7,3.7 Z M40.2,18 C38.8,18 37.7,16.9 37.7,15.5 L37.7,8.3 C37.7,7.8 37.9,7.3 38.3,6.9 C39.1,6.1 40.4,6.1 41.2,6.9 C41.6,7.3 41.8,7.8 41.8,8.3 L41.8,15.5 C41.7,16.9 41.1,18 40.2,18 Z" />
            <path d="M85.4,70.8 L79.3,64.7 C77,62.4 73.1,62.4 70.8,64.7 L66.1,69.4 L30.9,34.2 L35.6,29.5 C37.9,27.2 37.9,23.3 35.6,21 L29.5,14.9 C27.2,12.6 23.3,12.6 21,14.9 L2.6,33.3 C0.3,35.6 0.3,39.5 2.6,41.8 L8.7,47.9 C9.8,49 11.3,49.6 12.9,49.6 C14.5,49.6 16,49 17.1,47.9 L21.8,43.2 L57,78.4 L52.3,83.1 C50,85.4 50,89.3 52.3,91.6 L58.4,97.7 C59.5,98.8 61,99.4 62.6,99.4 C64.2,99.4 65.7,98.8 66.8,97.7 L85.2,79.3 C87.7,77.1 87.7,73.2 85.4,70.8 L85.4,70.8 Z M14.1,44.9 C13.9,45.1 13.4,45.1 13.2,44.9 L7.1,38.8 C6.9,36.6 6.9,36.1 7.1,35.9 L25.5,17.5 C25.7,17.3 26.2,17.3 26.4,17.5 L32.5,23.6 C32.7,23.8 32.7,24.3 32.5,24.5 L14.1,44.9 Z M82.4,76.3 L64,94.7 C63.8,94.9 63.3,94.9 63.1,94.7 L57,88.6 C56.8,88.4 56.8,87.9 57,87.7 L77.3,67.4 C77.5,67.2 78,67.2 78.2,67.4 L84.3,73.5 C84.5,73.7 84.5,74.2 84.3,74.4 L82.4,76.3 Z" />
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute -top-10 -left-10 w-48 h-48 opacity-10 animate__animated animate__swing animate__infinite animate__slower"
          exit={{
            opacity: 0,
            x: -50,
            transition: { duration: 0.5 }
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
            <path d="M97.5,43.8 L92.5,43.8 L92.5,33.9 C92.5,32.3 91.2,31 89.6,31 L68.9,31 C67.3,31 66,32.3 66,33.9 L66,43.8 L61.1,43.8 L61.1,24 C61.1,22.4 59.8,21.1 58.2,21.1 L37.5,21.1 C35.9,21.1 34.6,22.4 34.6,24 L34.6,43.8 L29.6,43.8 L29.6,48.8 C29.6,50.4 30.9,51.7 32.5,51.7 L97.5,51.7 C99.1,51.7 100.4,50.4 100.4,48.8 L100.4,46.7 C100.4,45.1 99.1,43.8 97.5,43.8 Z" />
            <path d="M28.6,56.7 L28.6,76 C28.6,77.6 27.3,78.9 25.7,78.9 L5,78.9 C3.4,78.9 2.1,77.6 2.1,76 L2.1,56.7 C2.1,55.1 3.4,53.8 5,53.8 L25.7,53.8 C27.3,53.8 28.6,55.1 28.6,56.7 Z M25.7,73.9 L25.7,58.8 L5,58.8 L5,73.9 L25.7,73.9 Z" />
            <path d="M89.6,83.9 L68.9,83.9 C67.3,83.9 66,82.6 66,81 L66,61.7 C66,60.1 67.3,58.8 68.9,58.8 L89.6,58.8 C91.2,58.8 92.5,60.1 92.5,61.7 L92.5,81 C92.5,82.6 91.2,83.9 89.6,83.9 Z M68.9,63.8 L68.9,78.9 L89.6,78.9 L89.6,63.8 L68.9,63.8 Z" />
            <path d="M58.2,64.2 L37.5,64.2 C35.9,64.2 34.6,62.9 34.6,61.3 L34.6,56.3 L29.6,56.3 C28,56.3 26.7,55 26.7,53.4 C26.7,51.8 28,50.5 29.6,50.5 L34.6,50.5 L34.6,48.3 C34.6,46.7 35.9,45.4 37.5,45.4 L58.2,45.4 C59.8,45.4 61.1,46.7 61.1,48.3 L61.1,50.5 L66,50.5 C67.6,50.5 68.9,51.8 68.9,53.4 C68.9,55 67.6,56.3 66,56.3 L61.1,56.3 L61.1,61.3 C61.1,62.9 59.7,64.2 58.2,64.2 Z" />
          </svg>
        </motion.div>
        
        {/* Novo elemento de bolhas flutuantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm animate__animated animate__fadeInUp animate__infinite"
            style={{
              width: `${Math.random() * 40 + 15}px`,
              height: `${Math.random() * 40 + 15}px`,
              bottom: `-50px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
            exit={{
              opacity: 0,
              y: -100,
              transition: { duration: 0.5 }
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
```


---
### 📄 Arquivo: `src/components/MapContent.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { MapContainer, TileLayer, useMap, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Importação dinâmica para evitar problemas de SSR com react-leaflet
const DynamicMarker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const DynamicCircle = dynamic(() => import('react-leaflet').then((mod) => mod.Circle), { ssr: false });
const DynamicPopup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

// Componente para centralizar o mapa
const SetViewOnLocation: React.FC<{ coords: L.LatLngExpression }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13);
  }, [coords, map]);
  return null;
};

// Ícones personalizados para o mapa
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const activeMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  className: 'active-marker',
});

const userLocationIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: 'user-location-marker',
});

interface MapContentProps {
  currentView: L.LatLngExpression;
  locations: Array<{ name: string; position: L.LatLngExpression; primary?: boolean }>;
  selectedLocation: string | null;
  isUsingGeolocation: boolean;
  setSelectedLocation: (value: string) => void;
  setIsUsingGeolocation: (value: boolean) => void;
}

// Componentes personalizados para resolver problemas de tipagem
interface CustomMarkerProps {
  position: L.LatLngExpression;
  icon?: L.Icon;
  eventHandlers?: { click?: () => void; [key: string]: any };
  children?: ReactNode;
}

const CustomMarker: React.FC<CustomMarkerProps> = (props) => {
  return <DynamicMarker {...props} />;
};

interface CustomCircleProps {
  center: L.LatLngExpression;
  radius: number;
  pathOptions?: L.PathOptions;
  children?: ReactNode;
}

const CustomCircle: React.FC<CustomCircleProps> = (props) => {
  return <DynamicCircle {...props} />;
};

const MapContent: React.FC<MapContentProps> = ({
  currentView,
  locations,
  selectedLocation,
  isUsingGeolocation,
  setSelectedLocation,
  setIsUsingGeolocation,
}) => {
  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Configuração inicial do mapa
  const defaultCenter: [number, number] = [-27.5132, -48.4618];
  const defaultZoom = 12;

  // Opções de estilo para o mapa
  const mapStyle = { height: '100%', width: '100%', borderRadius: '0.5rem' };
  const attribution = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <MapContainer 
      center={defaultCenter}
      zoom={defaultZoom}
      style={mapStyle}
      className="z-10"
    >
      <TileLayer
        attribution={attribution}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnLocation coords={currentView} />

      {isUsingGeolocation && (
        <motion.div initial="hidden" animate="visible" variants={markerVariants}>
          <CustomMarker 
            position={currentView} 
            icon={userLocationIcon}
          >
            <DynamicPopup>
              <div className="text-center p-1">
                <p className="text-black">Sua localização atual</p>
              </div>
            </DynamicPopup>
          </CustomMarker>
          <CustomCircle
            center={currentView}
            radius={300}
            pathOptions={{
              color: 'var(--color-accent)',
              fillColor: 'var(--color-accent)',
              fillOpacity: 0.2,
              weight: 2
            }}
          />
        </motion.div>
      )}

      {locations.map((location) => (
        <motion.div key={location.name} variants={markerVariants} initial="hidden" animate="visible">
          <CustomMarker
            position={location.position}
            icon={location.name === selectedLocation ? activeMarkerIcon : markerIcon}
            eventHandlers={{
              click: () => {
                setSelectedLocation(location.name);
                setIsUsingGeolocation(false);
              },
            }}
          >
            <DynamicPopup>
              <div className="text-center p-1">
                <h3 className="font-bold text-base mb-1 text-black">{location.name}</h3>
                <p className="text-sm text-gray-600">Área atendida</p>
                {location.primary && (
                  <span className="inline-block px-2 py-1 mt-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Sede Principal
                  </span>
                )}
              </div>
            </DynamicPopup>
          </CustomMarker>
          <CustomCircle
            center={location.position}
            radius={2000}
            pathOptions={{
              color: location.name === selectedLocation ? 'var(--color-accent)' : 'var(--color-secondary)',
              fillColor: location.name === selectedLocation ? 'var(--color-accent)' : 'var(--color-secondary)',
              fillOpacity: location.name === selectedLocation ? 0.2 : 0.1
            }}
          />
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default MapContent;
```


---
### 📄 Arquivo: `src/components/Portfolio.tsx`

```typescript
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  details?: string;
}

const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    title: 'Instalação Elétrica', 
    description: 'Tomadas e interruptores em Jurerê.', 
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'elétrica',
    details: 'Instalação completa de rede elétrica residencial, incluindo tomadas, interruptores e pontos de iluminação.'
  },
  { 
    id: 2, 
    title: 'Reparo Hidráulico', 
    description: 'Conserto de vazamento em Ratones.', 
    image: 'https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'hidráulica',
    details: 'Identificação e correção de vazamento em tubulação embutida.'
  }
];

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [filter, setFilter] = useState('todos');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedImage]);

  const filteredItems = filter === 'todos' ? portfolioItems : portfolioItems.filter((item) => item.category === filter);
  const categories = ['todos', 'elétrica', 'hidráulica', 'montagem', 'pintura'];

  const getGridCols = () => {
    if (windowWidth < 640) return 'grid-cols-1';
    if (windowWidth < 1024) return 'grid-cols-2';
    return 'grid-cols-3';
  };

  const toggleExpandItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-[#EDEDED]">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4">
            Trabalhos Realizados
          </span>
          <h2 className="section-title mb-4 text-[var(--color-text)]">Nosso Portfólio</h2>
          <p className="section-subtitle text-[var(--color-text)]/80">Conheça alguns dos nossos trabalhos recentes</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button 
              key={category} 
              onClick={() => setFilter(category)} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-white text-[var(--color-text)] hover:bg-[var(--color-neutral)]/10 border border-[var(--color-neutral)]/30'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid do portfólio */}
        <div className={`grid ${getGridCols()} gap-6 sm:gap-8 md:gap-10`}>
          {filteredItems.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl shadow-lg border border-[var(--color-neutral)]/20">
              <p className="text-[var(--color-text)]/70">Nenhum item encontrado na categoria selecionada.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-neutral)]/20 cursor-pointer transition-all duration-500 ${expandedItem === item.id ? 'col-span-full md:col-span-2 md:row-span-2' : ''}`}
              >
                <div 
                  className={`relative overflow-hidden ${expandedItem === item.id ? 'aspect-auto' : 'aspect-[4/3]'}`}
                  onClick={() => {
                    if (windowWidth < 768) {
                      setSelectedItem(item);
                      setSelectedImage(item.image);
                    } else {
                      toggleExpandItem(item.id);
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/80 via-[var(--color-dark)]/20 to-transparent opacity-60 transition-opacity duration-300 z-10"></div>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={800}
                    height={600}
                    className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${expandedItem === item.id ? 'max-h-80 object-cover object-top' : ''}`}
                  />
                  <div className="absolute inset-0 bg-[var(--color-accent)]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-5"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md">{item.title}</h3>
                    <p className="text-white/90 mb-3 drop-shadow-md">{item.description}</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-accent)]/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    {expandedItem === item.id ? (
                      <button className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[var(--color-accent)] rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-accent)]/10" onClick={(e) => { e.stopPropagation(); toggleExpandItem(item.id); }}>
                        Fechar
                      </button>
                    ) : (
                      <button className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors">
                        Ver detalhes
                      </button>
                    )}
                  </div>
                </div>
                {expandedItem === item.id && (
                  <div className="p-6 border-t border-[var(--color-neutral)]/20">
                    <h4 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Detalhes do Projeto</h4>
                    <p className="text-[var(--color-text)]/80 mb-6">{item.details}</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors shadow-md hover:scale-105 active:scale-95">
                        Solicitar orçamento similar
                      </a>
                      <button onClick={() => { setSelectedItem(item); setSelectedImage(item.image); }} className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-neutral)]/10 text-[var(--color-text)] rounded-full font-medium hover:bg-[var(--color-neutral)]/20 transition-colors hover:scale-105 active:scale-95">
                        Ampliar imagem
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal de visualização */}
        {selectedImage && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4" onClick={() => { setSelectedImage(null); setSelectedItem(null); }}>
            <button className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white backdrop-blur-md z-50 border border-white/20 hover:bg-white/20 active:scale-95 transition-all" onClick={() => { setSelectedImage(null); setSelectedItem(null); }} aria-label="Fechar">
              Fechar
            </button>
            <div className="relative max-w-5xl w-full flex flex-col items-center rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage}
                alt={selectedItem.title}
                width={1200}
                height={800}
                className="w-full max-h-[70vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="w-full bg-white/10 backdrop-blur-lg p-6 border-t border-white/20">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-white/90 mb-4">{selectedItem.description}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent)]/80 text-white text-sm font-medium rounded-full">
                  {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}
                </span>
                {selectedItem.details && <p className="text-white/80 max-w-3xl">{selectedItem.details}</p>}
                <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors hover:scale-105 active:scale-95" onClick={(e) => e.stopPropagation()}>
                  Solicitar orçamento similar
                </a>
              </div>
              <div className="absolute inset-x-0 bottom-20 flex justify-between w-full h-24 sm:hidden">
                <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()}></div>
                <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()}></div>
                <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()}></div>
              </div>
            </div>
          </div>
        )}

        {filteredItems.length > 0 && (
          <div className="mt-16 text-center">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg shadow-[var(--color-accent)]/20 hover:scale-105 hover:shadow-xl active:scale-95">
              Solicitar orçamento personalizado
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
```


---
### 📄 Arquivo: `src/components/ProjectCard.tsx`

```typescript
import { motion } from 'framer-motion';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
}

export function ProjectCard({ id, title, description, image, tags }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      {image ? (
        <div className="h-52 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className="h-52 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
          <span className="text-blue-500 dark:text-blue-300 font-medium">Sem imagem</span>
        </div>
      )}
      
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag: string) => (
            <span 
              key={tag} 
              className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```


---
### 📄 Arquivo: `src/components/Projects.tsx`

```typescript
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


---
### 📄 Arquivo: `src/components/Reviews.tsx`

```typescript
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


---
### 📄 Arquivo: `src/components/RoleGuard.tsx`

```typescript
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
  fallbackUrl = '/dashboard',
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      const hasRequiredRole = session?.user?.role ? allowedRoles.includes(session.user.role) : false;
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


---
### 📄 Arquivo: `src/components/ServiceMap.tsx`

```typescript
'use client';

import { useEffect, useState, ReactNode, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Map as MapIcon, List, Navigation, Star, CheckCircle, AlertCircle, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Importação dinâmica para evitar problemas de SSR com react-leaflet
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then((mod) => mod.Circle), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

// Componentes personalizados para resolver problemas de tipagem
interface CustomMarkerProps {
  position: [number, number];
  icon?: Icon;
  eventHandlers?: { click?: () => void; [key: string]: any };
  children?: ReactNode;
}

const CustomMarker: React.FC<CustomMarkerProps> = (props) => {
  // @ts-ignore - Ignorando erros de tipo para o Marker
  return <Marker {...props} />;
};

interface CustomCircleProps {
  center: [number, number];
  radius: number;
  pathOptions?: {
    color?: string;
    fillColor?: string;
    fillOpacity?: number;
    weight?: number;
  };
  children?: ReactNode;
}

const CustomCircle: React.FC<CustomCircleProps> = (props) => {
  // @ts-ignore - Ignorando erros de tipo para o Circle
  return <Circle {...props} />;
};

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
  const isDarkMode = true;
  
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
    <section id="map" className="py-20 bg-[var(--color-light)]">
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
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text)] tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Áreas Atendidas
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-[var(--color-text)] opacity-80 leading-relaxed max-w-3xl mx-auto"
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
                  ? 'bg-[var(--color-accent)] text-white font-medium'
                  : isDarkMode 
                    ? 'bg-[#333333] text-white hover:bg-[var(--color-accent)]/10' 
                    : 'bg-white text-[var(--color-text)] hover:bg-[var(--color-accent)]/10'
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
                  ? 'bg-[var(--color-accent)] text-white font-medium'
                  : isDarkMode 
                    ? 'bg-[#333333] text-white hover:bg-[var(--color-accent)]/10' 
                    : 'bg-white text-[var(--color-text)] hover:bg-[var(--color-accent)]/10'
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
                <div className={`p-6 rounded-lg transition-all duration-300 border border-[var(--color-neutral)]/30 shadow-custom-sm ${
                  isDarkMode ? 'bg-[#333333]' : 'bg-white'
                }`}>
                  <h3 className={`text-lg font-medium mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-[var(--color-text)]'}`}>
                    <MapPin className="h-5 w-5 text-[var(--color-accent)] mr-2" />
                    Regiões Atendidas
                  </h3>
                  <ul className="space-y-2">
                    {locations.map((location) => (
                      <motion.li
                        key={location.name}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          location.name === selectedLocation
                            ? 'bg-[var(--color-accent)] text-white'
                            : isDarkMode
                              ? 'bg-[#3A3A3A] text-white hover:bg-[var(--color-neutral)]/20'
                              : 'bg-[#EDEDED] text-[var(--color-text)] hover:bg-[var(--color-neutral)]/20'
                        }`}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLocationSelect(location.name)}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                              location.name === selectedLocation
                                ? 'bg-white/20'
                                : 'bg-[var(--color-accent)]/10'
                            }`}
                          >
                            <MapPin
                              className={`h-4 w-4 ${
                                location.name === selectedLocation
                                  ? 'text-white'
                                  : 'text-[var(--color-accent)]'
                              }`}
                            />
                          </span>
                          <span className="font-medium">
                            {location.name}
                          </span>
                          {location.primary && location.name === selectedLocation && (
                            <span className="text-xs ml-auto bg-white/20 px-2 py-0.5 rounded-full">
                              Principal
                            </span>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20">
                    <p className="text-sm text-[var(--color-text)] opacity-80 mb-4">
                      Atendemos estas regiões e arredores. Consulte disponibilidade.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGetUserLocation}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-300"
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
                <div className={`h-[450px] md:h-[500px] relative overflow-hidden p-2 rounded-lg border border-[var(--color-neutral)]/30 shadow-custom-sm ${
                  isDarkMode ? 'bg-[#333333]' : 'bg-white'
                }`}>
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
                          <CustomMarker
                            position={currentView}
                            icon={new Icon({
                              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                              iconSize: [25, 41],
                              iconAnchor: [12, 41],
                              className: 'user-location-marker',
                            })}
                          >
                            <Popup>
                              <div className="text-[#333]">
                                Sua localização atual
                              </div>
                            </Popup>
                          </CustomMarker>
                          <CustomCircle
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
                          <CustomMarker
                            position={location.position as [number, number]}
                            icon={location.name === selectedLocation ? activeMarkerIcon : markerIcon}
                            eventHandlers={{
                              click: () => {
                                setSelectedLocation(location.name);
                                setIsUsingGeolocation(false);
                              },
                            }}
                          >
                            <Popup>
                              <div className="text-center p-1 text-[#333]">
                                <h3 className="font-bold text-base mb-1">{location.name}</h3>
                                <p className="text-sm opacity-80">Área atendida</p>
                                {location.primary && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-accent)]/20 text-[var(--color-accent)] mt-1">
                                    Sede Principal
                                  </span>
                                )}
                              </div>
                            </Popup>
                          </CustomMarker>
                          <CustomCircle
                            center={location.position as [number, number]}
                            radius={2000}
                            pathOptions={{
                              color: location.name === selectedLocation ? 'var(--color-accent)' : 'var(--color-secondary)',
                              fillColor: location.name === selectedLocation ? 'var(--color-accent)' : 'var(--color-secondary)',
                              fillOpacity: location.name === selectedLocation ? 0.2 : 0.1,
                            }}
                          />
                        </motion.div>
                      ))}
                    </MapContainer>
                  )}

                  {/* Botão de localização */}
                  <motion.button
                    className={`absolute bottom-4 right-4 p-3 rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-300 z-[1000] ${
                      isDarkMode ? 'bg-[#333333]' : 'bg-white'
                    }`}
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
                      className={`absolute top-4 left-0 right-0 mx-auto w-max px-3 py-1.5 z-[1000] flex items-center gap-2 rounded-lg border border-[var(--color-neutral)]/30 shadow-custom-sm ${
                        isDarkMode ? 'bg-[#333333] text-white' : 'bg-white text-[var(--color-text)]'
                      }`}
                    >
                      <MapPin size={14} className="text-[var(--color-accent)]" />
                      <span className="font-medium text-sm">{selectedLocation}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--color-text)] opacity-60 italic">
            Verifique disponibilidade para sua região
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;
```


---
### 📄 Arquivo: `src/components/Testimonials.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

// Dados dos depoimentos
const testimonials = [
  {
    id: 1,
    name: 'Ana Silva',
    location: 'Jurerê',
    rating: 5,
    text: 'Serviço rápido e confiável! O Fernando resolveu um problema elétrico que outros não conseguiram identificar. Super recomendo!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    location: 'Ratones',
    rating: 5,
    text: 'Excelente profissional! Pontual, organizado e resolveu o vazamento no banheiro com muita eficiência. Meu contato fixo para reparos!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Mariana Costa',
    location: 'Canasvieiras',
    rating: 5,
    text: 'Contratei para montar os móveis do meu apartamento novo e fiquei muito satisfeita. Trabalho impecável e preço justo!',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    name: 'Roberto Almeida',
    location: 'Ingleses',
    rating: 5,
    text: 'Reparo urgente na pia da cozinha resolvido em menos de uma hora. Atendimento super rápido. Recomendo!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
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
    <section
      id="testimonials"
      className="relative py-12 md:py-20 bg-[var(--color-gray)] overflow-hidden"
    >
      {/* Fundo com máscara radial */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(var(--color-accent-rgb),0.15),transparent_70%)] mask-radial" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título */}
        <div className="text-center mb-8 md:mb-12">
          <motion.span
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Depoimentos
          </motion.span>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            O Que Nossos Clientes Dizem
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-[var(--color-text)]/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A satisfação dos nossos clientes é o nosso maior orgulho
          </motion.p>
        </div>

        {/* Métricas de Satisfação */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 md:mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: '98%', label: 'Satisfação' },
            { value: '200+', label: 'Clientes' },
            { value: '500+', label: 'Projetos concluídos' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-4 sm:p-6 rounded-lg bg-[var(--color-card-bg)]/10 backdrop-blur-sm border border-[var(--color-neutral)]/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-accent)] mb-1">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text)]/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Carrossel de Depoimentos */}
        <div
          className="relative max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <motion.div
            className={`relative rounded-2xl transition-all duration-300 border border-[var(--color-neutral)]/30 shadow-custom-sm ${
              'bg-[var(--color-light)]'
            } p-6 sm:p-8 md:p-10`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Gradiente de fundo sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent pointer-events-none" />

            {/* Aspas Decorativas */}
            <motion.svg
              className="absolute top-6 left-6 w-10 h-10 md:w-12 md:h-12 text-[var(--color-accent)]/20"
              fill="currentColor"
              viewBox="0 0 32 32"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <path d="M9.352 27.12c-2.56 0-4.64-.832-6.24-2.496C1.52 22.967.72 20.8.72 18.137c0-2.24.544-4.48 1.632-6.72 1.088-2.24 2.4-4.16 3.936-5.76C7.824 4.065 9.584 2.72 11.568 1.632L13.872 4.8c-1.92 1.088-3.456 2.4-4.608 3.936-1.152 1.536-1.728 3.184-1.728 4.944 0 .768.16 1.376.48 1.824a39.77 39.77 0 0 0 1.44-1.44c.512-.576 1.136-1.056 1.872-1.44.736-.384 1.6-.576 2.592-.576 1.856 0 3.36.672 4.512 2.016 1.152 1.344 1.728 3.08 1.728 5.208 0 1.856-.544 3.456-1.632 4.8-1.088 1.344-2.8 2.016-5.136 2.016zm16.128 0c-2.56 0-4.64-.832-6.24-2.496-1.6-1.664-2.4-3.824-2.4-6.48 0-2.24.544-4.48 1.632-6.72 1.088-2.24 2.4-4.16 3.936-5.76 1.536-1.6 3.288-2.944 5.28-4.032L30 4.8c-1.92 1.088-3.456 2.4-4.608 3.936a10.824 10.824 0 0 0-1.728 4.944c0 .768.16 1.376.48 1.824.448-.448.896-.928 1.344-1.44.512-.576 1.136-1.056 1.872-1.44.736-.384 1.6-.576 2.592-.576 1.856 0 3.36.672 4.512 2.016 1.152 1.344 1.728 3.08 1.728 5.208 0 1.856-.544 3.456-1.632 4.8-1.088 1.344-2.8 2.016-5.136 2.016z" />
            </motion.svg>

            {/* Conteúdo do Depoimento */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row items-start gap-6 md:gap-8 relative z-10"
              >
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[var(--color-accent)]/30 shadow-lg">
                    <Image
                      src={testimonials[current].image}
                      alt={`Foto de ${testimonials[current].name}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
                <div className="flex-grow">
                  <div className="flex items-center justify-start mb-3 gap-1">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 600 }}
                      >
                        <Star className="h-5 w-5 md:h-6 md:w-6 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                      </motion.div>
                    ))}
                  </div>
                  <blockquote className="text-base sm:text-lg md:text-xl text-[var(--color-card-text)] leading-relaxed mb-4 italic font-light">
                    "{testimonials[current].text}"
                  </blockquote>
                  <div>
                    <h4 className="font-semibold text-lg sm:text-xl md:text-2xl text-[var(--color-card-text)]">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-sm md:text-base text-[var(--color-accent)] font-medium">
                      {testimonials[current].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navegação */}
            <div className="flex justify-between items-center mt-8 md:mt-10">
              <motion.button
                whileHover={{ scale: 1.2, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="p-3 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-accent)]/20 transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 text-[var(--color-accent)]" />
              </motion.button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrent(index)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? 'bg-[var(--color-accent)] w-6'
                        : 'bg-[var(--color-neutral)]/30 hover:bg-[var(--color-accent)]/50'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="p-3 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-accent)]/20 transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-6 w-6 md:h-7 md:w-7 text-[var(--color-accent)]" />
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


---
### 📄 Arquivo: `src/components/ThemeProvider.tsx`

```typescript
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```


---
### 📄 Arquivo: `src/components/Tracking.tsx`

```typescript
// src/components/Tracking.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import Script from 'next/script';

export default function Tracking() {
  const { data: config, isLoading } = useQuery({
    queryKey: ['site-config'],
    queryFn: () => fetch('/api/site-config').then(res => res.json()),
  });

  if (isLoading || !config) return null;

  const { tracking } = config;

  return (
    <>
      {/* Facebook Pixel */}
      {tracking.facebookPixel && (
        <>
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];(t=b.createElement(e)).async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${tracking.facebookPixel}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${tracking.facebookPixel}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* TikTok Pixel */}
      {tracking.tiktokPixel && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${tracking.tiktokPixel}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* Google Tag Manager */}
      {tracking.googleTagManager && (
        <>
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${tracking.googleTagManager}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${tracking.googleTagManager}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
    </>
  );
}
```


---
### 📄 Arquivo: `src/context/AppContext.tsx`

```typescript
// src/context/AppContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface ThemeColors {
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

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  themes: {
    light: ThemeColors;
  };
  defaultTheme: 'light';
  activeTemplate: string;
  maintenanceMode: boolean;
  logoUrl: string;
  faviconUrl: string;
}

interface AppContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<void>;
  loading: boolean;
}

const defaultConfig: SiteConfig = {
  siteName: 'FH Resolve',
  siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
  contactInfo: { email: 'contato@fhresolve.com.br', phone: '48991919791', address: 'Ratones, Florianópolis - SC' },
  socialMedia: { instagram: '', facebook: '', whatsapp: '48991919791' },
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
    }
  },
  defaultTheme: 'light',
  activeTemplate: 'default',
  maintenanceMode: false,
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode; isDashboard?: boolean }> = ({ children, isDashboard = false }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get('/api/site-config');
        setConfig(data);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const applyTheme = () => {
    const root = document.documentElement;
    const colors = config.themes.light;
    Object.entries(colors).forEach(([key, value]) => root.style.setProperty(`--color-${key}`, value));
  };

  useEffect(() => {
    if (!loading) applyTheme();
  }, [config.themes, loading]);

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    setLoading(true);
    try {
      const updatedConfig = { ...config, ...newConfig };
      await axios.post('/api/site-config', updatedConfig);
      setConfig(updatedConfig);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ config, updateConfig, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
```


---
### 📄 Arquivo: `src/context/FeedbackContext.tsx`

```typescript
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


---
### 📄 Arquivo: `src/context/SiteConfigContext.tsx`

```typescript
// src/context/SiteConfigContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactInfo: { email: string; phone: string; address: string };
  socialMedia: { instagram?: string; facebook?: string; whatsapp?: string };
  tracking: { facebookPixel: string; tiktokPixel: string; googleTagManager: string };
  updatedAt: Date;
}

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>({
    siteName: 'FH Resolve',
    siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
    contactInfo: { email: 'contato@fhresolve.com.br', phone: '48991919791', address: 'Ratones, Florianópolis - SC' },
    socialMedia: { instagram: '', facebook: '', whatsapp: '48991919791' },
    tracking: { facebookPixel: '', tiktokPixel: '', googleTagManager: '' },
    updatedAt: new Date(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get('/api/site-config');
        setConfig(response.data);
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

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    try {
      setLoading(true);
      const updatedConfig = { ...config, ...newConfig };
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

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, loading, error }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  return context;
};
```


---
### 📄 Arquivo: `src/data/projects.ts`

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Dados de exemplo - você pode substituir isso por uma chamada à API ou banco de dados
export const projects: Project[] = [
  {
    id: '1',
    title: 'Reforma de Banheiro',
    description: 'Reforma completa de um banheiro em Ratones, incluindo troca de revestimentos, instalação de box de vidro temperado, nova pia e vaso sanitário, além de instalações elétricas e hidráulicas.',
    image: '/images/project1.jpg',
    tags: ['Reforma', 'Hidráulica', 'Elétrica', 'Revestimentos'],
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15')
  },
  {
    id: '2',
    title: 'Instalação Elétrica Residencial',
    description: 'Revisão completa da instalação elétrica de uma residência em Jurerê, com troca do quadro de disjuntores, aterramento e instalação de novos pontos de tomada e iluminação.',
    image: '/images/project2.jpg',
    tags: ['Elétrica', 'Instalação', 'Segurança'],
    createdAt: new Date('2023-11-22'),
    updatedAt: new Date('2023-11-22')
  },
  {
    id: '3',
    title: 'Montagem de Móveis',
    description: 'Montagem e instalação de todos os móveis de um apartamento recém-adquirido nos Ingleses, incluindo armários de cozinha, guarda-roupas e prateleiras personalizadas.',
    image: '/images/project3.jpg',
    tags: ['Montagem', 'Móveis', 'Instalação'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '4',
    title: 'Reparo de Infiltração',
    description: 'Identificação e correção de infiltrações em uma casa em Canasvieiras, incluindo impermeabilização de laje, substituição de telhas e pintura das áreas afetadas.',
    image: '/images/project4.jpg',
    tags: ['Infiltração', 'Impermeabilização', 'Pintura'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: '5',
    title: 'Construção de Deck de Madeira',
    description: 'Projeto e construção de um deck de madeira tratada para área externa em residência em Santo Antônio de Lisboa, incluindo escada e guarda-corpo.',
    image: '/images/project5.jpg',
    tags: ['Carpintaria', 'Área Externa', 'Madeira'],
    createdAt: new Date('2024-03-18'),
    updatedAt: new Date('2024-03-18')
  },
  {
    id: '6',
    title: 'Automação Residencial',
    description: 'Instalação de sistema de automação residencial em Jurerê Internacional, incluindo iluminação inteligente, cortinas motorizadas e integração com assistentes de voz.',
    image: '/images/project6.jpg',
    tags: ['Automação', 'Smart Home', 'Elétrica'],
    createdAt: new Date('2024-04-22'),
    updatedAt: new Date('2024-04-22')
  }
];

export function getProjects(): Project[] {
  // Aqui você pode implementar a lógica para buscar os projetos do seu banco de dados
  // Por enquanto, estamos retornando os dados de exemplo
  return projects;
}
```


---
### 📄 Arquivo: `src/hooks/useCalculations.ts`

```typescript
// hooks/useCalculations.ts
import { useMemo } from 'react';

import { EstimateItem, MaterialItem, ServiceItem } from '@/types/estimate';

// Definição do tipo EstimateType
type EstimateType = 'detailed' | 'materials' | 'simple';

export const useCalculations = (
  items: EstimateItem[], 
  materials: MaterialItem[], 
  services: ServiceItem[], 
  discount: number, 
  tax: number, 
  estimateType: EstimateType
) => {
  const calculateSubtotal = useMemo(() => {
    return () => {
      if (estimateType === 'detailed') {
        return items.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
      } else if (estimateType === 'materials') {
        const materialTotal = materials.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
        const serviceTotal = services.reduce((sum, service) => sum + (service.value || 0), 0);
        return materialTotal + serviceTotal;
      } else {
        return services.reduce((sum, service) => sum + (service.value || 0), 0);
      }
    };
  }, [items, materials, services, estimateType]);

  const calculateMaterialsSubtotal = useMemo(() => {
    return () => {
      return materials.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
    };
  }, [materials]);

  const calculateServicesSubtotal = useMemo(() => {
    return () => {
      return services.reduce((sum, service) => sum + (service.value || 0), 0);
    };
  }, [services]);

  /**
   * Calcula o valor total do orçamento considerando o subtotal, descontos e impostos.
   * 
   * @returns {number} O valor total calculado do orçamento em reais.
   * 
   * @remarks
   * Esta função utiliza os seguintes parâmetros implícitos do hook:
   * - calculateSubtotal(): Função que calcula o subtotal dos itens baseado no tipo de orçamento.
   * - discount: Valor do desconto aplicado ao orçamento (em reais).
   * - tax: Valor de impostos ou taxas adicionais aplicados ao orçamento (em reais).
   * 
   * O cálculo é realizado da seguinte forma:
   * 1. Obtém o subtotal através da função calculateSubtotal()
   * 2. Subtrai o valor do desconto (se existir)
   * 3. Adiciona o valor de impostos/taxas (se existir)
   * 
   * @example
   * ```tsx
   * const { calculateTotal } = useCalculations(items, materials, services, 50, 10, 'detailed');
   * const total = calculateTotal(); // Retorna o valor total considerando R$50 de desconto e R$10 de impostos
   * ```
   */
  const calculateTotal = useMemo(() => {
    return () => {
      const subtotal = calculateSubtotal();
      let total = subtotal;
      if (discount) total -= discount;
      if (tax) total += tax;
      return total;
    };
  }, [calculateSubtotal, discount, tax]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return {
    calculateSubtotal,
    calculateTotal,
    calculateMaterialsSubtotal,
    calculateServicesSubtotal,
    formatCurrency
  };
};
```


---
### 📄 Arquivo: `src/hooks/useEstimateSchema.ts`

```typescript
// hooks/useEstimateSchema.ts
import { z } from 'zod';

export const useEstimateSchema = () => {
  const estimateItemSchema = z.object({
    description: z.string().min(1, 'Descrição é obrigatória'),
    quantity: z.number().positive('Quantidade deve ser maior que zero'),
    unit: z.string().default('un'),
    unitPrice: z.number().min(0, 'Preço não pode ser negativo'),
  });

  const materialItemSchema = z.object({
    description: z.string().min(1, 'Descrição é obrigatória'),
    quantity: z.number().positive('Quantidade deve ser maior que zero'),
    unit: z.string().default('un'),
    unitPrice: z.number().min(0, 'Preço não pode ser negativo'),
  });

  const serviceItemSchema = z.object({
    description: z.string().min(1, 'Descrição é obrigatória'),
    value: z.number().min(0, 'Valor não pode ser negativo'),
  });

  const estimateSchema = z.object({
    estimateType: z.enum(['detailed', 'materials', 'simple']),
    clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
    clientEmail: z.string().email('Email inválido').optional().or(z.literal('')),
    clientPhone: z.string().min(1, 'Telefone do cliente é obrigatório'),
    address: z.string().optional().or(z.literal('')),
    title: z.string().min(1, 'Título do orçamento é obrigatório'),
    description: z.string().optional().or(z.literal('')),
    items: z.array(estimateItemSchema).optional(),
    materials: z.array(materialItemSchema).optional(),
    services: z.array(serviceItemSchema).optional(),
    subtotal: z.number().optional(),
    discount: z.number().min(0, 'Desconto não pode ser negativo').optional(),
    tax: z.number().min(0, 'Taxas não podem ser negativas').optional(),
    total: z.number().optional(),
    notes: z.string().optional().or(z.literal('')),
    paymentTerms: z.string().optional().or(z.literal('')),
    validUntil: z.string().optional().or(z.literal('')),
  }).refine((data) => {
    if (data.estimateType === 'detailed') return data.items && data.items.length > 0;
    if (data.estimateType === 'materials') return (data.materials && data.materials.length > 0) && (data.services && data.services.length > 0);
    if (data.estimateType === 'simple') return data.services && data.services.length > 0;
    return true;
  }, {
    message: 'Adicione pelo menos um item ao orçamento conforme o tipo selecionado',
    path: ['items'],
  });

  return { estimateSchema };
};
```


---
### 📄 Arquivo: `src/hooks/useReview.ts`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Review {
  name: string;
  location: string;
  isTokenUsed: boolean;
  isApproved: boolean;
  rating?: number;
  text?: string;
}

export const useReview = () => {
  const router = useRouter();
  const { token } = useParams();
  const [review, setReview] = useState<Review | null>(null);
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

  return {
    review,
    rating,
    setRating,
    text,
    setText,
    loading,
    submitting,
    submitted,
    setSubmitted,
    handleSubmit,
  };
};
```


---
### 📄 Arquivo: `src/hooks/useSettingsData.ts`

```typescript
// src/hooks/useSettingsData.ts
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useFeedback } from '@/context/FeedbackContext';

export interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  tracking: {
    facebookPixel: string;
    tiktokPixel: string;
    googleTagManager: string;
  };
  maintenanceMode: boolean;
}

export const useSettingsData = () => {
  const { showToast } = useFeedback();

  const [settings, setSettings] = useState<SettingsData>({
    siteName: 'FH Resolve',
    siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
    contactInfo: {
      email: 'contato@fhresolve.com.br',
      phone: '48991919791',
      address: 'Ratones, Florianópolis - SC',
    },
    socialMedia: {
      instagram: '',
      facebook: '',
      whatsapp: '48991919791',
    },
    tracking: {
      facebookPixel: '',
      tiktokPixel: '',
      googleTagManager: '',
    },
    maintenanceMode: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/site-config');
      if (response.data) {
        setSettings(response.data);
      }
    } catch (error: any) {
      console.error('Erro ao carregar configurações:', error);
      
      // Tratamento de erro mais detalhado
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        
        if (statusCode === 401 || statusCode === 403) {
          showToast('Sem permissão para acessar as configurações do site. Faça login novamente.', 'error');
        } else if (statusCode === 404) {
          showToast('Configurações não encontradas. Usando valores padrão.', 'info');
        } else if (statusCode === 500) {
          showToast(`Erro interno do servidor: ${errorMessage}`, 'error');
        } else if (error.code === 'ECONNABORTED') {
          showToast('Tempo de conexão esgotado. Verifique sua internet e tente novamente.', 'error');
        } else if (!navigator.onLine) {
          showToast('Você está offline. Verifique sua conexão com a internet.', 'error');
        } else {
          showToast(`Erro ao carregar configurações: ${errorMessage}`, 'error');
        }
      } else {
        showToast(`Erro inesperado: ${error.message || 'Erro desconhecido'}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      
      // Validações básicas antes de enviar
      if (!settings.siteName.trim()) {
        showToast('O nome do site não pode estar vazio', 'error');
        return;
      }
      
      if (!settings.contactInfo.email.includes('@')) {
        showToast('Informe um email válido', 'error');
        return;
      }
      
      const response = await axios.post('/api/site-config', settings);
      if (response.data) {
        showToast('Configurações salvas com sucesso', 'success');
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error: any) {
      console.error('Erro ao salvar configurações:', error);
      
      // Tratamento de erro mais detalhado
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        
        if (statusCode === 400) {
          showToast(`Dados inválidos: ${errorMessage}`, 'error');
        } else if (statusCode === 401 || statusCode === 403) {
          showToast('Sem permissão para salvar as configurações. Faça login novamente.', 'error');
        } else if (statusCode === 413) {
          showToast('Os dados enviados são muito grandes. Reduza o tamanho dos valores.', 'error');
        } else if (statusCode === 429) {
          showToast('Muitas requisições. Aguarde alguns instantes e tente novamente.', 'error');
        } else if (statusCode === 500) {
          showToast(`Erro no servidor: ${errorMessage}`, 'error');
        } else if (error.code === 'ECONNABORTED') {
          showToast('Tempo de conexão esgotado. Verifique sua internet e tente novamente.', 'error');
        } else if (!navigator.onLine) {
          showToast('Você está offline. Verifique sua conexão com a internet.', 'error');
        } else {
          showToast(`Erro ao salvar configurações: ${errorMessage}`, 'error');
        }
      } else {
        showToast(`Erro inesperado: ${error.message || 'Erro desconhecido'}`, 'error');
      }
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
          ...(prev[parent as keyof SettingsData] as Record<string, unknown>),
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        },
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleSiteModeChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, maintenanceMode: checked }));
  };

  return {
    settings,
    loading,
    saving,
    saved,
    setSaving,
    setSaved,
    setSettings,
    fetchSettings,
    saveSettings,
    handleChange,
    handleSiteModeChange,
  };
};
```


---
### 📄 Arquivo: `src/hooks/useSiteConfig.ts`

```typescript
'use client';

import { useAppContext } from '@/context/AppContext';

export const useSiteConfig = () => {
  const context = useAppContext();
  if (!context) {
    throw new Error('useSiteConfig deve ser usado dentro de um AppProvider');
  }
  return {
    config: context.config,
    updateConfig: context.updateConfig,
    loading: context.loading,
    theme: context.theme,
    setTheme: context.setTheme,
    toggleTheme: context.toggleTheme
  };
};
```


---
### 📄 Arquivo: `src/lib/auth.ts`

```typescript
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/user';
import sanitizeHtml from 'sanitize-html';

// Alinhar CustomUser com o tipo User do NextAuth
export interface CustomUser extends User {
  _id?: string; // Opcional para compatibilidade com MongoDB
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  password?: string; // Opcional, já que User não exige
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios');
        }

        const sanitizedEmail = sanitizeHtml(credentials.email.trim().toLowerCase());
        await dbConnect();
        const dbUser = await UserModel.findOne({ email: sanitizedEmail }).lean() as unknown as CustomUser;

        if (!dbUser) {
          console.error('Usuário não encontrado:', sanitizedEmail);
          throw new Error('Usuário não encontrado');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, dbUser.password || '');
        if (!isPasswordValid) {
          console.error('Senha inválida para:', sanitizedEmail);
          throw new Error('Senha inválida');
        }

        return { id: dbUser._id!.toString(), name: dbUser.name, email: dbUser.email, role: dbUser.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as CustomUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as 'admin' | 'editor' | 'viewer';
      return session;
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};
```


---
### 📄 Arquivo: `src/lib/axios.ts`

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


---
### 📄 Arquivo: `src/lib/drive-service.ts`

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


---
### 📄 Arquivo: `src/lib/mongodb.ts`

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

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```


---
### 📄 Arquivo: `src/lib/motion-variants.ts`

```typescript
/**
 * src/lib/motion-variants.ts
 * 
 * Este arquivo contém configurações de animação padronizadas para criar 
 * uma experiência de usuário consistente em toda a aplicação.
 */

import { useEffect, useState } from 'react';

// Hook para verificar se o usuário prefere movimento reduzido
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Verificar a preferência do usuário
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listener para atualizar se a preferência mudar
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  return prefersReducedMotion;
};

// Utilitário para desativar animações para usuários que preferem movimento reduzido
export const getReducedMotionVariants = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    };
  }
  return undefined;
};

// Wrapper seguro para variantes que respeita prefers-reduced-motion
export const applyVariant = (prefersReducedMotion: boolean, variant: any) => {
  return prefersReducedMotion
    ? { transition: { duration: 0.2 } }
    : variant;
};

// Transições comuns
export const spring = {
  soft: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 1
  },
  medium: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1
  },
  stiff: {
    type: "spring",
    stiffness: 400,
    damping: 35,
    mass: 1
  }
};

export const ease = {
  smooth: [0.43, 0.13, 0.23, 0.96], // Custom bezier curve
  default: [0.25, 0.1, 0.25, 1], 
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1]
};

// ===== ANIMAÇÕES PARA BOTÕES =====

// Botão padrão
export const buttonVariants = {
  hover: {
    scale: 1.03,
    y: -1,
    transition: {
      ...spring.soft,
      duration: 0.3
    }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      ...spring.stiff,
      duration: 0.2
    }
  },
  // Variante para botões com animação de brilho
  shimmer: (baseColor: string = 'rgba(255, 255, 255, 0.2)') => ({
    before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `linear-gradient(90deg, transparent, ${baseColor}, transparent)`,
      transform: 'translateX(-100%)'
    },
    animate: {
      transform: 'translateX(100%)',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 1
      }
    }
  })
};

// Botão de ícone (para botões circulares ou quadrados apenas com ícone)
export const iconButtonVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: spring.soft
  },
  tap: {
    scale: 0.9,
    rotate: -5,
    transition: spring.stiff
  }
};

// Botão Flutuante/FAB 
export const fabVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    transition: spring.soft
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: spring.stiff
  }
};

// ===== ANIMAÇÕES PARA CARTÕES E ELEMENTOS DE CONTEÚDO =====

// Card padrão
export const cardVariants = {
  hover: {
    y: -6, 
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
    transition: {
      ...spring.soft,
      duration: 0.3
    }
  },
  tap: {
    y: -3,
    scale: 0.99,
    transition: {
      ...spring.stiff,
      duration: 0.2
    }
  },
  // Para cards como parte de uma lista ou grid
  list: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        ...spring.medium
      }
    }
  }
};

// Animações de entrada
export const entranceVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  slideIn: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }
};

// Para listas com staggering animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};

// Para navegação
export const navVariants = {
  // Mobile menu
  mobileMenu: {
    closed: { 
      x: "-100%",
      opacity: 0,
      transition: { 
        ...spring.stiff,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { 
        ...spring.soft,
        staggerChildren: 0.07,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  },
  
  // Item no menu mobile
  menuItem: {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  },
  
  // Indicador de navegação ativa
  activeIndicator: {
    layoutTransition: spring.stiff
  }
};

// Para modais e dialogs
export const modalVariants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  modal: {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.5,
        bounce: 0.2,
      },
    },
  },
};

// Para items em carrosséis ou galerias
export const carouselItemVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      ...spring.medium
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: {
      ...spring.medium
    }
  })
};

// Animações de loading
export const loadingVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: ease.easeInOut
    }
  },
  rotate: {
    rotate: [0, 360],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: ease.easeInOut
    }
  }
};

// Variantes para animações de scroll
export const scrollAnimationVariants = {
  // Para uso com useInView do Framer Motion
  fadeInScroll: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  // Com staggering para listas
  staggerScroll: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  },
  // Item individual em uma lista com staggering
  staggerItem: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }
};

// Variantes para hover e tap em formulários
export const formControlVariants = {
  // Para inputs e selects
  input: {
    focus: {
      scale: 1.01,
      transition: spring.soft
    }
  },
  // Para submit buttons
  submit: {
    hover: {
      scale: 1.03,
      transition: spring.soft
    },
    tap: {
      scale: 0.97,
      transition: spring.stiff
    }
  }
};

// Variantes para tooltips e popovers
export const tooltipVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      ...spring.stiff,
      delay: 0.1
    }
  }
};

// Funções utilitárias para criar transições personalizadas
export const createStaggerTransition = (delayChildren: number = 0.1, staggerTime: number = 0.05) => ({
  staggerChildren: staggerTime,
  delayChildren: delayChildren,
  when: "beforeChildren" 
});

export const createHoverTransition = (scale: number = 1.05, yOffset: number = -2) => ({
  scale: scale,
  y: yOffset,
  transition: spring.soft
});

export const createTapTransition = (scale: number = 0.97) => ({
  scale: scale,
  transition: spring.stiff
});
```


---
### 📄 Arquivo: `src/lib/projects.ts`

```typescript
import { Project } from '../types/project';

// Dados de exemplo - você pode substituir isso por uma chamada à API ou banco de dados
const projects: Project[] = [
  {
    id: '1',
    title: 'Projeto 1',
    description: 'Descrição do projeto 1',
    image: '/images/project1.jpg',
    tags: ['React', 'TypeScript', 'Next.js'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Projeto 2',
    description: 'Descrição do projeto 2',
    image: '/images/project2.jpg',
    tags: ['Node.js', 'Express', 'MongoDB'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];

export async function getProjects(): Promise<Project[]> {
  // Aqui você pode implementar a lógica para buscar os projetos do seu banco de dados
  // Por enquanto, estamos retornando os dados de exemplo
  return projects;
}
```


---
### 📄 Arquivo: `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```


---
### 📄 Arquivo: `src/models/blog.ts`

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


---
### 📄 Arquivo: `src/models/estimate.ts`

```typescript
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

// Schema para itens de orçamento detalhado
const estimateItemSchema = new Schema({
  description: {
    type: String,
    required: function() {
      // Somente requer descrição se o tipo de orçamento for "detailed"
      return this.parent().estimateType === 'detailed';
    },
  },
  quantity: {
    type: Number,
    required: function() {
      return this.parent().estimateType === 'detailed';
    },
    min: [0.01, 'Quantidade deve ser maior que 0'],
  },
  unit: {
    type: String,
    default: 'un',
  },
  unitPrice: {
    type: Number,
    required: function() {
      return this.parent().estimateType === 'detailed';
    },
    min: [0, 'Preço unitário não pode ser negativo'],
  },
});

// Schema para materiais
const materialItemSchema = new Schema({
  description: {
    type: String,
    required: function() {
      return this.parent().estimateType === 'materials';
    },
  },
  quantity: {
    type: Number,
    required: function() {
      return this.parent().estimateType === 'materials';
    },
    min: [0.01, 'Quantidade deve ser maior que 0'],
  },
  unit: {
    type: String,
    default: 'un',
  },
  unitPrice: {
    type: Number,
    required: function() {
      return this.parent().estimateType === 'materials';
    },
    min: [0, 'Preço unitário não pode ser negativo'],
  },
});

// Schema para serviços
const serviceItemSchema = new Schema({
  description: {
    type: String,
    required: function() {
      return this.parent().estimateType === 'simple' || this.parent().estimateType === 'materials';
    },
  },
  value: {
    type: Number,
    required: function() {
      return this.parent().estimateType === 'simple' || this.parent().estimateType === 'materials';
    },
    min: [0, 'Valor não pode ser negativo'],
  },
});

const estimateSchema = new Schema({
  estimateType: {
    type: String,
    enum: ['detailed', 'materials', 'simple'],
    default: 'detailed',
    required: [true, 'Tipo de orçamento é obrigatório'],
  },
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
  items: {
    type: [estimateItemSchema],
    validate: [
      {
        validator: function(items) {
          // Somente valida se o tipo for "detailed"
          if (this.estimateType === 'detailed') {
            return items && items.length > 0;
          }
          return true;
        },
        message: 'Orçamento detalhado requer pelo menos um item'
      }
    ],
    default: undefined
  },
  materials: {
    type: [materialItemSchema],
    validate: [
      {
        validator: function(materials) {
          // Somente valida se o tipo for "materials"
          if (this.estimateType === 'materials') {
            return materials && materials.length > 0;
          }
          return true;
        },
        message: 'Orçamento de materiais requer pelo menos um material'
      }
    ],
    default: undefined
  },
  services: {
    type: [serviceItemSchema],
    validate: [
      {
        validator: function(services) {
          // Valida se o tipo for "simple" ou "materials"
          if (this.estimateType === 'simple' || this.estimateType === 'materials') {
            return services && services.length > 0;
          }
          return true;
        },
        message: 'Orçamento requer pelo menos um serviço'
      }
    ],
    default: undefined
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Desconto não pode ser negativo'],
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Taxa não pode ser negativa'],
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

// Pré-save para calcular valores com base no tipo de orçamento
estimateSchema.pre('save', function (next) {
  let subtotal = 0;

  if (this.estimateType === 'detailed' && this.items && this.items.length > 0) {
    subtotal = this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  } else if (this.estimateType === 'materials') {
    const materialTotal = this.materials && this.materials.length > 0 
      ? this.materials.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
      : 0;
    const serviceTotal = this.services && this.services.length > 0
      ? this.services.reduce((sum, service) => sum + service.value, 0)
      : 0;
    subtotal = materialTotal + serviceTotal;
  } else if (this.estimateType === 'simple' && this.services && this.services.length > 0) {
    subtotal = this.services.reduce((sum, service) => sum + service.value, 0);
  }

  this.subtotal = subtotal;
  let total = this.subtotal;
  if (this.discount) total -= this.discount;
  if (this.tax) total += this.tax;
  this.total = total;

  this.updatedAt = new Date();
  next();
});

const EstimateModel = models.Estimate || mongoose.model('Estimate', estimateSchema);

export default EstimateModel;
```


---
### 📄 Arquivo: `src/models/portfolio.ts`

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


---
### 📄 Arquivo: `src/models/quote.ts`

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


---
### 📄 Arquivo: `src/models/review.ts`

```typescript
// src/models/review.ts
import mongoose, { Schema, models } from 'mongoose';

interface IReview extends mongoose.Document {
  name: string;
  location: string;
  rating?: number;
  text?: string;
  image?: string;
  isApproved: boolean;
  token: string;
  isTokenUsed: boolean;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      maxlength: [100, 'Nome não pode exceder 100 caracteres'],
    },
    location: {
      type: String,
      required: [true, 'Localização é obrigatória'],
      trim: true,
      maxlength: [200, 'Localização não pode exceder 200 caracteres'],
    },
    rating: {
      type: Number,
      min: [1, 'A avaliação deve ser no mínimo 1'],
      max: [5, 'A avaliação deve ser no máximo 5'],
      required: [
        function (this: IReview) {
          return this.isTokenUsed === true;
        },
        'Avaliação é obrigatória quando o token é usado',
      ],
    },
    text: {
      type: String,
      required: [
        function (this: IReview) {
          return this.isTokenUsed === true;
        },
        'Texto da avaliação é obrigatório quando o token é usado',
      ],
      trim: true,
      maxlength: [1000, 'Texto não pode exceder 1000 caracteres'],
    },
    image: {
      type: String,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: { expires: '7d' }, // Token expira em 7 dias
    },
    isTokenUsed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // Índice para consultas por data
    },
  },
  {
    timestamps: { updatedAt: 'updatedAt' }, // Adiciona updatedAt automaticamente
  }
);

const ReviewModel = models.Review || mongoose.model<IReview>('Review', reviewSchema);

export default ReviewModel;
```


---
### 📄 Arquivo: `src/models/settings.ts`

```typescript
// src/models/settings.ts
import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactInfoSchema = new Schema({
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, default: 'contato@fhresolve.com.br' },
  phone: { type: String, required: true, minlength: 10, default: '48991919791' },
  address: { type: String, required: true, minlength: 5, default: 'Ratones, Florianópolis - SC' },
}, { _id: false });

const socialMediaSchema = new Schema({
  instagram: { type: String, default: '' },
  facebook: { type: String, default: '' },
  whatsapp: { type: String, minlength: 10, default: '48991919791' },
}, { _id: false });

const trackingSchema = new Schema({
  facebookPixel: { type: String, default: '' },
  tiktokPixel: { type: String, default: '' },
  googleTagManager: { type: String, default: '' },
}, { _id: false });

const settingsSchema = new Schema({
  siteName: { type: String, required: true, default: 'FH Resolve' },
  siteDescription: { type: String, required: true, default: 'Serviços profissionais de manutenção residencial em Florianópolis' },
  contactInfo: { type: contactInfoSchema, required: true, default: () => ({}) },
  socialMedia: { type: socialMediaSchema, default: () => ({}) },
  tracking: { type: trackingSchema, default: () => ({}) },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const SettingsModel = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default SettingsModel;
```


---
### 📄 Arquivo: `src/models/user.ts`

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


---
### 📄 Arquivo: `src/models/video.ts`

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


---
### 📄 Arquivo: `src/scripts/create-admin.ts`

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


---
### 📄 Arquivo: `src/types/estimate.ts`

```typescript
// types/estimate.ts
export interface EstimateItem {
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }
  
  export interface MaterialItem {
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }
  
  export interface ServiceItem {
    description: string;
    value: number;
  }
  
  export interface HistoryEntry {
    date: string;
    action: string;
    by: string;
  }
  
  export interface Estimate {
    _id: string;
    estimateType: 'detailed' | 'materials' | 'simple';
    clientName: string;
    clientEmail?: string;
    clientPhone: string;
    address?: string;
    title: string;
    description?: string;
    items?: EstimateItem[];
    materials?: MaterialItem[];
    services?: ServiceItem[];
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
    history?: HistoryEntry[];
    wasModified?: boolean;
  }
```


---
### 📄 Arquivo: `src/types/leaflet.d.ts`

```typescript
// Definições de tipos para leaflet e react-leaflet
declare module 'leaflet' {
    export interface LatLngExpression {
      lat: number;
      lng: number;
    }
  
    export type LatLngTuple = [number, number];
  
    export class Icon {
      constructor(options: {
        iconUrl: string;
        iconSize?: [number, number];
        iconAnchor?: [number, number];
        popupAnchor?: [number, number];
        className?: string;
      });
    }
  
    export interface PathOptions {
      color?: string;
      fillColor?: string;
      fillOpacity?: number;
      weight?: number;
      opacity?: number;
      lineCap?: string;
      lineJoin?: string;
      dashArray?: string;
      dashOffset?: string;
      className?: string;
    }
  }
  
  declare module 'react-leaflet' {
    import { ReactNode, ComponentType } from 'react';
    import * as L from 'leaflet';
  
    export interface MapContainerProps {
      center: L.LatLngExpression;
      zoom: number;
      style?: React.CSSProperties;
      className?: string;
      children?: ReactNode;
    }
  
    export interface TileLayerProps {
      attribution: string;
      url: string;
    }
  
    export interface MarkerProps {
      position: L.LatLngExpression;
      icon?: L.Icon;
      eventHandlers?: {
        click?: () => void;
        [key: string]: any;
      };
      children?: ReactNode;
    }
  
    export interface CircleProps {
      center: L.LatLngExpression;
      radius: number;
      pathOptions?: L.PathOptions;
      children?: ReactNode;
    }
  
    export interface PopupProps {
      children?: ReactNode;
    }
  
    export const MapContainer: ComponentType<MapContainerProps>;
    export const TileLayer: ComponentType<TileLayerProps>;
    export const Marker: ComponentType<MarkerProps>;
    export const Circle: ComponentType<CircleProps>;
    export const Popup: ComponentType<PopupProps>;
    export function useMap(): L.Map;
  }
```


---
### 📄 Arquivo: `src/types/next-auth.d.ts`

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


---
### 📄 Arquivo: `src/types/project.ts`

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```


---
### 📄 Arquivo: `src/types/settings.ts`

```typescript
// src/types/settings.ts
export interface Style {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  opacity?: string;
  transform?: string;
  transition?: string;
}

export interface IconOption {
  value: string;
  label: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
  duration?: string;
}

export interface Template {
  id: string;
  name: string;
  styles: { [key: string]: string };
}

export interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  services: Service[];
  templates: Template[];
  activeTemplate: string;
  maintenanceMode: boolean;
  logoUrl: string;
  faviconUrl: string;
}
```


---
### 📄 Arquivo: `src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  // Obtém o token e as informações do usuário (incluindo a role)
  const token = await getToken({ req, secret });
  const isAuthenticated = !!token;
  const userRole = token?.role as string | undefined; // Obtém a role do token

  const pathname = req.nextUrl.pathname;

  // --- Proteção do Dashboard ---
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      // 1. Se NÃO está autenticado, redireciona para login
      const loginUrl = new URL('/login', req.url);
      // Opcional: Adiciona a URL de callback para redirecionar de volta após login
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Se ESTÁ autenticado, verifica a role
    if (userRole !== 'admin') {
      // 3. Se NÃO é admin, redireciona para a página pública inicial
      return NextResponse.redirect(new URL('/', req.url));
    }

    // 4. Se é admin autenticado, permite o acesso ao dashboard
    return NextResponse.next();
  }

  // --- Tratamento da Página de Login ---
  if (pathname === '/login') {
    if (isAuthenticated) {
      // 5. Se já está autenticado, redireciona para o dashboard (evita ver login novamente)
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Se não está autenticado, permite acessar a página de login
    return NextResponse.next();
  }

  // --- Outras Páginas (Públicas) ---
  // Se a rota não for /dashboard/* nem /login, permite o acesso (incluindo a '/')
  // Esta linha só será alcançada para rotas DENTRO do matcher que não foram tratadas acima.
  // Como o matcher SÓ inclui /login e /dashboard/*, rotas públicas como '/' NUNCA
  // deveriam acionar este middleware.
  return NextResponse.next();
}

export const config = {
  // O matcher continua o mesmo, pois ele define *quais* rotas acionam o middleware.
  // A lógica DENTRO do middleware é que decide o que fazer com essas rotas.
  // Rotas públicas como '/' ou '/portfolio' NÃO estão no matcher e não passam por aqui.
  matcher: ['/login', '/dashboard/:path*'],
};
```


---
### 📄 Arquivo: `eslint.config.mjs`

```mjs
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Suas regras aqui
    },
  },
];
```


---
### 📄 Arquivo: `jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```


---
### 📄 Arquivo: `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```


---
### 📄 Arquivo: `next.config.ts`

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```


---
### 📄 Arquivo: `postcss.config.mjs`

```mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```


---
### 📄 Arquivo: `README-animacoes.md`

```markdown
# Documentação de Animações e Microinterações - FH Resolve

Este documento descreve as melhorias implementadas nas animações e microinterações da interface do FH Resolve, visando criar uma experiência de usuário mais consistente, fluida e profissional.

## Índice

1. [Sistema de Variantes de Animação](#sistema-de-variantes-de-animação)
2. [Melhoria na Navegação (Header)](#melhoria-na-navegação-header)
3. [Refinamento de Microinterações](#refinamento-de-microinterações)
4. [Suporte a Prefers-Reduced-Motion](#suporte-a-prefers-reduced-motion)
5. [Como Usar](#como-usar)
6. [Boas Práticas](#boas-práticas)

---

## Sistema de Variantes de Animação

Foi criado um sistema centralizado de animações no arquivo `src/lib/motion-variants.ts`, contendo variantes padronizadas para todos os componentes interativos da aplicação. Isso garante:

- **Consistência**: Todas as animações seguem o mesmo padrão visual
- **Reutilização**: Redução de código duplicado
- **Manutenção**: Facilidade para ajustar animações globalmente

As principais categorias de variantes incluem:

- **Botões**: `buttonVariants`, `iconButtonVariants`, `fabVariants`
- **Cartões/Cards**: `cardVariants`
- **Entrada/Saída**: `entranceVariants`
- **Contêineres/Listas**: `containerVariants`
- **Navegação**: `navVariants`
- **Modais**: `modalVariants`
- **Carrosséis**: `carouselItemVariants`
- **Loading**: `loadingVariants`
- **Scroll**: `scrollAnimationVariants`
- **Formulários**: `formControlVariants`
- **Tooltips**: `tooltipVariants`

Além de transições e curvas de easing padronizadas:

```typescript
// Transições spring
export const spring = {
  soft: { type: "spring", stiffness: 300, damping: 30 },
  medium: { type: "spring", stiffness: 400, damping: 35 },
  stiff: { type: "spring", stiffness: 500, damping: 40 }
};

// Curvas de easing personalizadas
export const ease = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  default: [0.25, 0.1, 0.25, 1],
  // etc.
};
```

## Melhoria na Navegação (Header)

### 1. Animação de Menu Mobile

- Substituição da animação simples por uma transição spring mais natural
- Adição de efeito staggered para itens do menu (entram/saem em sequência)
- Transição suave do ícone do menu (hambúrguer ↔ X)
- Prevenção de "pulos" de layout durante transições

```typescript
// Exemplo das variantes do menu mobile
const mobileMenuVariants = {
  closed: { 
    x: "-100%",
    opacity: 0,
    transition: { 
      type: "spring", 
      staggerChildren: 0.05,
      staggerDirection: -1
      // ...
    }
  },
  open: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      staggerChildren: 0.07,
      // ...
    }
  }
};
```

### 2. Indicador de Seção Ativa

- Indicador de navegação ativa com transição mais suave e natural
- Melhoria da detecção de seção ativa para maior precisão
- Transição baseada em spring para movimento mais orgânico
- Prevenção de falsos positivos durante rolagem

```jsx
{isActive && (
  <motion.div
    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full"
    layoutId="activeNavIndicator"
    transition={{ 
      type: "spring", 
      stiffness: 500, 
      damping: 30 
    }}
  />
)}
```

### 3. Experiência de Rolagem Suave

- Aprimoramento da rolagem suave utilizando `requestAnimationFrame` para eliminar irregularidades
- Cálculo mais preciso das posições de rolagem com compensação de altura do cabeçalho
- Offset adicional para evitar que o conteúdo comece exatamente sob o cabeçalho
- Bloqueio inteligente da rolagem durante abertura/fechamento do menu

```javascript
// Rolagem suave aprimorada
const handleLinkClick = (href: string) => {
  // ...
  requestAnimationFrame(() => {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight - 20; // 20px de margem extra
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  });
  // ...
};
```

## Refinamento de Microinterações

### Hero e Componentes Principais

Padronização das microinterações em todos os componentes interativos:

1. **Botões CTAs**
   - Hover: Elevação suave (y: -2px) + escala (1.04)
   - Clique: Compressão natural (scale: 0.97)
   - Efeito de brilho em botões de destaque

2. **Cartões de Serviço**
   - Hover: Elevação (y: -8px) + sombra suave
   - Clique: Compressão leve (scale: 0.98)
   - Animações estáticas das partículas/ícones para dar vida sem distrair

3. **Animações de Entrada**
   - Sequenciamento consistente de elementos principais
   - Staggering (atraso sequencial) em listas e grids
   - Animações de fade/slide direcionais consistentes

4. **Botões de Ação Secundária**
   - Sutil mas perceptível feedback visual nos estados hover/active
   - Transições de cor respeitando o design system
   - Hover/tap consistente com outros elementos para familiaridade

## Suporte a Prefers-Reduced-Motion

O sistema inclui suporte integrado para a preferência do usuário `prefers-reduced-motion`, seguindo as melhores práticas de acessibilidade:

### Hook Personalizado

```typescript
// Hook para verificar se o usuário prefere movimento reduzido
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Verificar a preferência do usuário
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listener para atualizar se a preferência mudar
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    // Adiciona e remove listeners adequadamente
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  return prefersReducedMotion;
};
```

### Utilitários para Aplicar Corretamente

```typescript
// Utilitário para desativar animações complexas
export const getReducedMotionVariants = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    };
  }
  return null;
};

// Aplicar variante com segurança
export const applyVariant = (prefersReducedMotion: boolean, variant: any) => {
  return prefersReducedMotion
    ? { transition: { duration: 0.2 } }
    : variant;
};
```

### Exemplo de Uso

```jsx
import { usePrefersReducedMotion, applyVariant, buttonVariants } from '@/lib/motion-variants';

const MyComponent = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  return (
    <motion.button
      whileHover={applyVariant(prefersReducedMotion, buttonVariants.hover)}
      whileTap={applyVariant(prefersReducedMotion, buttonVariants.tap)}
    >
      Clique-me
    </motion.button>
  );
};
```

Isso garante que usuários que preferem movimento reduzido ainda recebam feedback visual adequado, mas sem animações que podem causar desconforto.

## Como Usar

Para implementar estas animações e microinterações em novos componentes:

1. **Importe as variantes necessárias**:

```jsx
import { 
  buttonVariants, 
  cardVariants, 
  entranceVariants,
  usePrefersReducedMotion,
  applyVariant 
} from '@/lib/motion-variants';
```

2. **Verifique a preferência do usuário**:

```jsx
const prefersReducedMotion = usePrefersReducedMotion();
```

3. **Aplique as variantes aos elementos com segurança**:

```jsx
<motion.button
  whileHover={applyVariant(prefersReducedMotion, buttonVariants.hover)}
  whileTap={applyVariant(prefersReducedMotion, buttonVariants.tap)}
  className="..."
>
  Conteúdo do botão
</motion.button>
```

4. **Para animações de entrada/saída**:

```jsx
<motion.div
  variants={prefersReducedMotion 
    ? getReducedMotionVariants(prefersReducedMotion) 
    : entranceVariants.slideUp}
  initial="hidden"
  animate="visible"
  exit="hidden"
>
  Conteúdo
</motion.div>
```

5. **Para listas com staggering**:

```jsx
<motion.ul
  variants={prefersReducedMotion 
    ? getReducedMotionVariants(prefersReducedMotion) 
    : containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li 
      key={item.id} 
      variants={prefersReducedMotion 
        ? undefined 
        : entranceVariants.slideUp}
    >
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

## Boas Práticas

1. **Performance Primeiro**
   - Anime apenas propriedades performáticas: `transform`, `opacity`
   - Evite animar `width`, `height`, `top`, `left`, etc.
   - Use `will-change` com moderação

2. **Acessibilidade**
   - **SEMPRE** respeite `prefers-reduced-motion` para usuários sensíveis a movimento
   - Mantenha animações sutis (não excessivas)
   - Nunca dependa apenas de animação para transmitir informações importantes

3. **Consistência**
   - Use as variantes padronizadas em vez de criar novas
   - Mantenha a "personalidade" das animações consistente em toda a aplicação
   - Para casos especiais, crie variantes estendendo as existentes

4. **Simplificação Progressiva**
   - As animações devem degradar graciosamente em dispositivos com menos recursos
   - Usuários que preferem movimento reduzido ainda devem receber feedback visual adequado

---

*Este sistema de animações foi projetado para evoluir com o projeto. Sinta-se à vontade para adicionar novas variantes conforme necessário, mas mantenha a consistência com o sistema existente.*
```


---
### 📄 Arquivo: `README.md`

```markdown
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


---
### 📄 Arquivo: `tailwind.config.mjs`

```mjs
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'dark:bg-opacity-10',
    'dark:border-opacity-20',
    'dark:bg-[var(--color-neutral)]',
    'dark:border-[var(--color-neutral)]',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        secondary: 'var(--color-secondary)',
        neutral: 'var(--color-neutral)',
        'text-color': 'var(--color-text)',
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        gray: 'var(--color-gray)',
        paralel: 'var(--color-paralel)',
        'accent-dark': 'var(--color-accent-dark)',
        black: '#252525',
        'gray-medium': '#8D9192',
        'light-gray': '#EDEDED',
        white: '#FFFFFF',
        teal: '#2B8D9A',
        accent: {
          DEFAULT: 'var(--color-accent)',
          20: 'rgba(var(--color-accent-rgb), 0.2)',
        },
        gray: {
          900: '#252525',
          600: '#4B5563',
          500: '#6B7280',
          400: '#9CA3AF',
          300: '#D1D5DB',
        },
      },
      borderColor: {
        'neutral-30': 'rgba(var(--color-neutral-rgb), 0.3)',
        'accent-20': 'rgba(var(--color-accent-rgb), 0.2)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        spacing: 'margin, padding',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'custom-sm': 'var(--shadow-sm)',
        'custom-md': 'var(--shadow-md)',
        'custom-lg': 'var(--shadow-lg)',
        'custom-xl': 'var(--shadow-xl)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
```


---
### 📄 Arquivo: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "esnext", // Alinhar com "module": "esnext" para consistência
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
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "src/components/new-estimate/PageHeader.tsx"],
  "exclude": ["node_modules"]
}
```


---
### 📄 Arquivo: `tsconfig.tsnode.json`

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


## 6. Instruções e Prompts para Análise via IA

**Lembrete:** Use **apenas** o contexto fornecido neste documento.

Com base nas informações detalhadas acima, você pode solicitar à IA diversas análises. Aqui estão alguns exemplos de prompts e modelos:

**1. Identificação de Problemas e Bugs:**
   - *Prompt Exemplo:* `Revise o código em [NomeDoArquivo.ext] e [OutroArquivo.ext]. Existem possíveis bugs lógicos, condições de corrida ou erros de tratamento de exceção? Liste-os e explique por quê.`
   - *Modelo:* `Analise o fluxo de [Funcionalidade Específica] envolvendo os arquivos [ArquivoA.js], [ArquivoB.ts]. Há algum potencial para [Tipo de Erro, ex: NullPointerException, Loop Infinito]?`

**2. Sugestões de Melhoria e Refatoração:**
   - *Prompt Exemplo:* `Sugira 3 refatorações no arquivo [NomeDoArquivoLongo.java] para melhorar a legibilidade e aplicar o princípio SOLID.`
   - *Modelo:* `Olhando para o componente [NomeDoComponente.vue], como ele poderia ser otimizado para performance? Existe algum código repetido que poderia ser extraído para um utilitário?`
   - *Modelo:* `Avalie a arquitetura geral baseada na estrutura de pastas e nos pontos de entrada. Quais são os pontos fortes e fracos? Há sugestões para melhorar a separação de responsabilidades?`

**3. Análise de Performance:**
   - *Prompt Exemplo:* `No arquivo [ArquivoComLoops.py], identifique loops ou operações que podem ser gargalos de performance. Sugira otimizações.`
   - *Modelo:* `Considerando as dependências listadas ([DepA], [DepB]), existem alternativas mais performáticas conhecidas para as tarefas que elas realizam (baseado no código onde são usadas)?` (Nota: a IA pode precisar de conhecimento geral aqui, mas deve basear a aplicabilidade no código fornecido).

**4. Verificação de Segurança (Básica):**
   - *Prompt Exemplo:* `Analise o código que lida com [Entrada do Usuário/Acesso a Dados] no arquivo [SecuritySensitive.php]. Existem vulnerabilidades óbvias como [SQL Injection, XSS, etc.]?`
   - *Modelo:* `Verifique se alguma das dependências listadas ([DepX], [DepY]) tem vulnerabilidades conhecidas e críticas (CVEs).` (Nota: Requer capacidade da IA de acessar dados externos, mas pode ser solicitado).

**5. Explicação de Código:**
   - *Prompt Exemplo:* `Explique o que a função [nomeDaFuncaoComplexa] no arquivo [ArquivoComplexo.ts] faz, qual seu propósito e como ela interage com [OutraParteDoCodigo].`
   - *Modelo:* `Descreva o fluxo de dados para a funcionalidade de [Login/Cadastro/Etc.], começando por [ArquivoDeEntrada.js].`

**6. Geração de Documentação:**
   - *Prompt Exemplo:* `Gere comentários no formato JSDoc para a função [nomeDaFuncao] em [Arquivo.js].`
   - *Modelo:* `Com base no README e na estrutura, escreva uma seção de 'Como Começar' (Getting Started) para a documentação do projeto.`

**7. Perguntas Específicas:**
   - *Prompt Exemplo:* `Onde a variável de ambiente [NOME_VAR] é utilizada no projeto?`
   - *Modelo:* `Qual a versão da dependência [NomeDependencia] utilizada e onde ela é importada/requerida no código?`

**Lembre-se de ser específico em seus prompts para obter os melhores resultados!**