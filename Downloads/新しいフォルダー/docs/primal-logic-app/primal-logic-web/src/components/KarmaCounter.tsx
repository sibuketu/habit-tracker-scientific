import type { DailyLog } from '../types/index';
import { useTranslation } from '../utils/i18n';

interface KarmaCounterProps {
  logs: DailyLog[];
}

export default function KarmaCounter({ logs }: KarmaCounterProps) {
  const { t } = useTranslation();
  
  // Calculate total animal protein from all logs
  const totalProtein = logs.reduce(
    (sum, log) => sum + (log.calculatedMetrics?.proteinTotal || 0),
    0
  );

  // Animal conversion (edible portion basis)
  const cowEquivalent = totalProtein / 180000; // 1 cow = 180kg edible portion
  const pigEquivalent = totalProtein / 70000; // 1 pig = 70kg edible portion
  const chickenEquivalent = totalProtein / 1200; // 1 chicken = 1.2kg edible portion

  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        border: '1px solid #27272a',
      }}
    >
      <h2
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#f43f5e',
          textShadow: '0 0 5px rgba(244, 63, 94, 0.4)',
        }}
      >
        🥩 {t('stats.karmaCounter')}
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#27272a',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#a1a1aa', marginBottom: '0.5rem' }}>
            {t('stats.cumulativeProteinIntake')}
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e4e4e7' }}>
            {totalProtein.toFixed(0)} g
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#27272a',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#a1a1aa', marginBottom: '0.5rem' }}>
            {t('stats.animalConversion')}
          </div>
          <div style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6' }}>
            🐄 {t('stats.cows')}: {cowEquivalent.toFixed(2)}
            <br />
            🐷 {t('stats.pigs')}: {pigEquivalent.toFixed(2)}
            <br />
            🐔 {t('stats.chickens')}: {chickenEquivalent.toFixed(0)}
          </div>
          <div
            style={{
              marginTop: '0.75rem',
              fontSize: '12px',
              color: '#71717a',
              fontStyle: 'italic',
            }}
          >
            {cowEquivalent < 1
              ? t('stats.karmaMessageUnderOne')
              : t('stats.karmaMessageOverOne').replace('{count}', Math.floor(cowEquivalent).toString())}
          </div>
        </div>
      </div>
    </div>
  );
}

