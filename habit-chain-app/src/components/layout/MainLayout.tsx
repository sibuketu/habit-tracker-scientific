'use client';

import React, { useState } from 'react';
import BottomNavigation from './BottomNavigation';
import Sidebar from './Sidebar';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import ResultScreen from '../screens/ResultScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GiftDonationScreen from '../screens/GiftDonationScreen';
import { useNavigationStore } from '@/store';

export default function MainLayout() {
  const { currentTab, setCurrentTab } = useNavigationStore();
  const [showResult, setShowResult] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen 
          onShowResult={() => setShowResult(true)} 
          onOpenSidebar={() => setSidebarOpen(true)}
        />;
      case 'record':
        return <RecordScreen />;
      case 'result':
        return <ResultScreen onBack={() => setCurrentTab('home')} />;
      case 'settings':
        return <SettingsScreen onOpenSidebar={() => setSidebarOpen(true)} />;
      case 'gift':
        return <GiftDonationScreen />;
      default:
        return <HomeScreen 
          onShowResult={() => setShowResult(true)} 
          onOpenSidebar={() => setSidebarOpen(true)}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center">
      <div className="w-full max-w-sm bg-gray-900 flex flex-col h-screen">
        {/* サイドバー */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
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