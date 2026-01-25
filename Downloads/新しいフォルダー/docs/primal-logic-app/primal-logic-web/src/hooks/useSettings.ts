import { useState, useEffect } from 'react';

// Simple hook to manage app settings
// In a real app, this might use Context or a state management library

export function useSettings() {
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showNutrientPreview, setShowNutrientPreview] = useState(true);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [darkMode, setDarkMode] = useState(true);
  const [tipsEnabled, setTipsEnabled] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [nutrientDisplayMode, setNutrientDisplayMode] = useState<'simple' | 'detailed'>('simple');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Helper to toggle booleans
  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => setter(prev => !prev);

  return {
    showKnowledge,
    toggleKnowledge: toggle(setShowKnowledge),
    showNutrientPreview,
    toggleNutrientPreview: toggle(setShowNutrientPreview),
    fontSize,
    setFontSize,
    darkMode,
    toggleDarkMode: toggle(setDarkMode),
    tipsEnabled,
    toggleTips: toggle(setTipsEnabled),
    debugMode,
    toggleDebugMode: toggle(setDebugMode),
    nutrientDisplayMode,
    setNutrientDisplayMode,
    unitSystem,
    setUnitSystem,
  };
}
