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