'use client';

import dynamic from 'next/dynamic';

const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), {
  ssr: false,
});

export default function Home() {
  return <MainLayout />;
}