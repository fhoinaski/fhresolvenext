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
                href="/"
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