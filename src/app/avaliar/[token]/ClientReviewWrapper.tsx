'use client';

import dynamic from 'next/dynamic';

const ReviewPage = dynamic(() => import('./ReviewPage'), { loading: () => <div>Carregando...</div> });

export default function ClientReviewWrapper() {
  return <ReviewPage />;
}