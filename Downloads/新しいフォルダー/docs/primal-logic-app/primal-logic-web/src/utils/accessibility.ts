/**
 * CarnivoreOS - Accessibility Utilities
 *
 * 繧｢繧ｯ繧ｻ繧ｷ繝薙Μ繝・ぅ髢｢騾｣縺ｮ繝ｦ繝ｼ繝・ぅ繝ｪ繝・ぅ髢｢謨ｰ
 */

/**
 * 繧ｭ繝ｼ繝懊・繝峨リ繝薙ご繝ｼ繧ｷ繝ｧ繝ｳ逕ｨ縺ｮ繧､繝吶Φ繝医ワ繝ｳ繝峨Λ繝ｼ
 * Enter繧ｭ繝ｼ縺ｾ縺溘・Space繧ｭ繝ｼ縺ｧ繧ｯ繝ｪ繝・け縺ｨ蜷後§蜍穂ｽ懊ｒ螳溯｡・ */
export function handleKeyboardNavigation(e: React.KeyboardEvent, callback: () => void): void {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    callback();
  }
}

/**
 * ARIA繝ｩ繝吶Ν繧堤函謌・ */
export function getAriaLabel(screen: string): string {
  const labels: Record<string, string> = {
    home: '繝帙・繝逕ｻ髱｢',
    history: '螻･豁ｴ逕ｻ髱｢',
    labs: '縺昴・莉也判髱｢',
    profile: '險ｭ螳夂判髱｢',
    settings: 'UI險ｭ螳夂判髱｢',
    userSettings: '繝ｦ繝ｼ繧ｶ繝ｼ險ｭ螳夂判髱｢',
  };
  return labels[screen] || screen;
}

