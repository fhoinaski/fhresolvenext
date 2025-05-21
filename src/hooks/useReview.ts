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