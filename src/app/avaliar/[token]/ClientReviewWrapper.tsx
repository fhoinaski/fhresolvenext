'use client';

import dynamic from 'next/dynamic';

const ReviewPage = dynamic(() => import('./ReviewPage'), { ssr: false });

export default function ClientReviewWrapper() {
  return <ReviewPage />;
}