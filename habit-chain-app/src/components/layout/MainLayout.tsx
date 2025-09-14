'use client';

import React, { useState } from 'react';
import BottomNavigation from './BottomNavigation';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import HabitSettingScreen from '../screens/HabitSettingScreen';
import TimeAttackScreen from '../screens/TimeAttackScreen';
import MyRoutineScreen from '../screens/MyRoutineScreen';
import ResultScreen from '../screens/ResultScreen';
import KnowledgeComparisonScreen from '../screens/KnowledgeComparisonScreen';
import GiftDonationScreen from '../screens/GiftDonationScreen';
import { useNavigationStore } from '@/store';

export default function MainLayout() {
  const { currentTab, setCurrentTab } = useNavigationStore();
  const [showResult, setShowResult] = useState(false);

  const renderCurrentScreen = () => {
    if (showResult) {
      return <ResultScreen onBack={() => setShowResult(false)} />;
    }

    switch (currentTab) {
      case 'home':
        return <HomeScreen onShowResult={() => setShowResult(true)} />;
      case 'record':
        return <RecordScreen />;
      case 'habit-setting':
        return <HabitSettingScreen />;
      case 'time-attack':
        return <TimeAttackScreen />;
      case 'my-routine':
        return <MyRoutineScreen />;
      case 'knowledge-comparison':
        return <KnowledgeComparisonScreen />;
      case 'gift-donation':
        return <GiftDonationScreen />;
      default:
        return <HomeScreen onShowResult={() => setShowResult(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center">
      <div className="w-full max-w-sm bg-gray-900 flex flex-col h-screen">
        {/* コンテンツエリア - 固定高さでスクロール可能 */}
        <main className="flex-1 overflow-y-auto">
          {renderCurrentScreen()}
        </main>
        
        {/* ナビゲーションエリア - 完全に分離 */}
        <div className="flex-shrink-0">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
}