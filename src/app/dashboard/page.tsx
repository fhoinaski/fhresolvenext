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