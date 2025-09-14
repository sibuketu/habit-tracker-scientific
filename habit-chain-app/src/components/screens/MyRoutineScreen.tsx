'use client';

import dynamic from 'next/dynamic';

const WeeklyRoutineSchedule = dynamic(
  () => import('./WeeklyRoutineSchedule'),
  { ssr: false }
);

export default function MyRoutineScreen() {
  return <WeeklyRoutineSchedule />;
}