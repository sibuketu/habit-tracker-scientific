'use client';

import { useNavigationStore } from '@/store';
import MainNavigation from './MainNavigation';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import HabitSettingScreen from '../screens/HabitSettingScreen';
import TimeAttackScreen from '../screens/TimeAttackScreen';
import MyRoutineScreen from '../screens/MyRoutineScreen';

const MainLayout = () => {
  const { currentTab } = useNavigationStore();

  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />;
      case 'record':
        return <RecordScreen />;
      case 'habit-setting':
        return <HabitSettingScreen />;
      case 'time-attack':
        return <TimeAttackScreen />;
      case 'my-routine':
        return <MyRoutineScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl relative">
      {/* Main Content */}
      <main className="pb-20">
        {renderCurrentScreen()}
      </main>

      {/* Main Navigation */}
      <MainNavigation />
    </div>
  );
};

export default MainLayout;
