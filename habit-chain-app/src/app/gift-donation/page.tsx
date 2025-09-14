'use client';

import dynamic from 'next/dynamic';

const GiftDonationScreen = dynamic(
  () => import('../../components/screens/GiftDonationScreen'),
  { ssr: false }
);

export default function GiftDonationPage() {
  return <GiftDonationScreen />;
}
