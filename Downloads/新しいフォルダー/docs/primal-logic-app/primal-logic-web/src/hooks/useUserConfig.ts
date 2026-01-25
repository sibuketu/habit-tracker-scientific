import { useState, useCallback } from 'react';
import type { UserProfile } from '../types/index';
import { saveUserProfile, getUserProfile } from '../utils/storage';

export function useUserConfig() {
  const [config, setConfig] = useState<Partial<UserProfile>>({});

  const loadConfig = useCallback(async () => {
    const profile = await getUserProfile();
    if (profile) {
      setConfig(profile);
    }
  }, []);

  const updateConfig = useCallback(async (newConfig: Partial<UserProfile>) => {
    const current = await getUserProfile();
    const updated = { ...current, ...newConfig } as UserProfile;
    await saveUserProfile(updated);
    setConfig(updated);
  }, []);

  return { config, updateConfig, loadConfig };
}
