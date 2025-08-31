import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HabitsScreen from './components/screens/HabitsScreen';
import RecordsScreen from './components/screens/RecordsScreen';
import ResultsScreen from './components/screens/ResultsScreen';
import MessagesScreen from './components/screens/MessagesScreen';
import SettingsScreen from './components/screens/SettingsScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/habits" element={<HabitsScreen />} />
        <Route path="/records" element={<RecordsScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/messages" element={<MessagesScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;