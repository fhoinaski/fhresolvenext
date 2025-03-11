import dynamic from 'next/dynamic';

const ReviewPage = dynamic(() => import('./ReviewPage'), { ssr: false });

export default ReviewPage;