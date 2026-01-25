import type { DailyLog } from '../types/index';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
  category: 'app_usage' | 'carnivore_practice';
}

interface AchievementsProps {
  logs: DailyLog[];
  shareCount?: number;
  feedbackCount?: number;
  contributedFeedbackCount?: number;
}

export default function Achievements({ logs, shareCount = 0, feedbackCount = 0, contributedFeedbackCount = 0 }: AchievementsProps) {
  // Calculate consecutive recording days
  const calculateStreak = (): number => {
    if (logs.length === 0) return 0;

    const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (logDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  // Calculate perfect days (0 violations)
  const perfectDays = logs.filter((log) => !log.calculatedMetrics?.hasViolation).length;

  // Consecutive perfect days
  const perfectStreak = (() => {
    const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    for (const log of sortedLogs) {
      if (!log.calculatedMetrics?.hasViolation) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  const currentStreak = calculateStreak();

  // Achievements as app user
  const appUsageAchievements: Achievement[] = [
    {
      id: 'first_log',
      title: '🥩 First Record',
      description: 'Recorded your first meal',
      icon: '🎉',
      unlocked: logs.length >= 1,
      progress: Math.min(logs.length, 1),
      target: 1,
      category: 'app_usage',
    },
    {
      id: 'logs_50',
      title: '📊 50 Days of Records',
      description: 'Recorded 50 days of meals',
      icon: '📊',
      unlocked: logs.length >= 50,
      progress: Math.min(logs.length, 50),
      target: 50,
      category: 'app_usage',
    },
    {
      id: 'logs_100',
      title: '💯 100 Days of Records',
      description: 'Recorded 100 days of meals',
      icon: '💯',
      unlocked: logs.length >= 100,
      progress: Math.min(logs.length, 100),
      target: 100,
      category: 'app_usage',
    },
  ];

  // Achievements as Carnivore practitioner
  const carnivoreAchievements: Achievement[] = [
    {
      id: 'streak_7',
      title: '🔥 7 Day Streak',
      description: 'Maintained a 7-day recording streak',
      icon: '🔥',
      unlocked: currentStreak >= 7,
      progress: Math.min(currentStreak, 7),
      target: 7,
      category: 'carnivore_practice',
    },
    {
      id: 'streak_30',
      title: '💪 30 Day Streak',
      description: 'Maintained a 30-day recording streak',
      icon: '💪',
      unlocked: currentStreak >= 30,
      progress: Math.min(currentStreak, 30),
      target: 30,
      category: 'carnivore_practice',
    },
    {
      id: 'streak_100',
      title: '👑 100 Day Streak',
      description: 'Maintained a 100-day recording streak',
      icon: '👑',
      unlocked: currentStreak >= 100,
      progress: Math.min(currentStreak, 100),
      target: 100,
      category: 'carnivore_practice',
    },
    {
      id: 'perfect_day',
      title: '🎯 Perfect Day',
      description: 'Achieved a day with no violations',
      icon: '🎯',
      unlocked: perfectDays >= 1,
      progress: Math.min(perfectDays, 1),
      target: 1,
      category: 'carnivore_practice',
    },
    {
      id: 'perfect_week',
      title: '📈 Perfect Week',
      description: 'Achieved 7 consecutive days with no violations',
      icon: '📈',
      unlocked: perfectStreak >= 7,
      progress: Math.min(perfectStreak, 7),
      target: 7,
      category: 'carnivore_practice',
    },
    {
      id: 'share_1',
      title: '📢 Carnivore Evangelist',
      description: 'Shared your record once',
      icon: '📢',
      unlocked: shareCount >= 1,
      progress: Math.min(shareCount, 1),
      target: 1,
      category: 'carnivore_practice',
    },
    {
      id: 'share_10',
      title: '🔥 Carnivore Missionary',
      description: 'Shared your record 10 times',
      icon: '🔥',
      unlocked: shareCount >= 10,
      progress: Math.min(shareCount, 10),
      target: 10,
      category: 'carnivore_practice',
    },
    {
      id: 'share_50',
      title: '👑 Carnivore Ambassador',
      description: 'Shared your record 50 times',
      icon: '👑',
      unlocked: shareCount >= 50,
      progress: Math.min(shareCount, 50),
      target: 50,
      category: 'carnivore_practice',
    },
    {
      id: 'feedback_1',
      title: '💬 Feedback Provider',
      description: 'Sent feedback once',
      icon: '💬',
      unlocked: feedbackCount >= 1,
      progress: Math.min(feedbackCount, 1),
      target: 1,
      category: 'carnivore_practice',
    },
    {
      id: 'feedback_5',
      title: '🔧 Improver',
      description: 'Sent feedback 5 times',
      icon: '🔧',
      unlocked: feedbackCount >= 5,
      progress: Math.min(feedbackCount, 5),
      target: 5,
      category: 'carnivore_practice',
    },
    {
      id: 'feedback_10',
      title: '⭁EContributor',
      description: 'Sent feedback 10 times',
      icon: '⭁E,
      unlocked: feedbackCount >= 10,
      progress: Math.min(feedbackCount, 10),
      target: 10,
      category: 'carnivore_practice',
    },
    {
      id: 'feedback_contributed',
      title: '👥 Team Member',
      description: 'Your feedback was adopted in the app',
      icon: '👥',
      unlocked: contributedFeedbackCount >= 1,
      progress: Math.min(contributedFeedbackCount, 1),
      target: 1,
      category: 'carnivore_practice',
    },
    {
      id: 'feedback_contributed_3',
      title: '🎯 Product Improver',
      description: 'Your feedback was adopted 3 times',
      icon: '🎯',
      unlocked: contributedFeedbackCount >= 3,
      progress: Math.min(contributedFeedbackCount, 3),
      target: 3,
      category: 'carnivore_practice',
    },
    {
      id: 'feedback_contributed_10',
      title: '🚀 Development Partner',
      description: 'Your feedback was adopted 10 times',
      icon: '🚀',
      unlocked: contributedFeedbackCount >= 10,
      progress: Math.min(contributedFeedbackCount, 10),
      target: 10,
      category: 'carnivore_practice',
    },
  ];

  const allAchievements = [...appUsageAchievements, ...carnivoreAchievements];
  const unlockedCount = allAchievements.filter((a) => a.unlocked).length;

  const renderAchievementSection = (title: string, achievements: Achievement[]) => {
    const sectionUnlocked = achievements.filter((a) => a.unlocked).length;

    return (
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #3f3f46',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#e4e4e7',
            }}
          >
            {title}
          </h3>
          <div
            style={{
              fontSize: '12px',
              color: '#a1a1aa',
            }}
          >
            {sectionUnlocked} / {achievements.length}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              style={{
                padding: '1rem',
                backgroundColor: achievement.unlocked ? '#27272a' : '#1c1c1e',
                borderRadius: '8px',
                border: achievement.unlocked ? '1px solid #f59e0b' : '1px solid #3f3f46',
                opacity: achievement.unlocked ? 1 : 0.6,
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                <div style={{ fontSize: '24px' }}>{achievement.icon}</div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: achievement.unlocked ? '#e4e4e7' : '#71717a',
                    }}
                  >
                    {achievement.title}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#a1a1aa',
                      marginTop: '0.25rem',
                    }}
                  >
                    {achievement.description}
                  </div>
                </div>
              </div>

              {!achievement.unlocked && (
                <div style={{ marginTop: '0.75rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: '#71717a',
                      marginBottom: '0.25rem',
                    }}
                  >
                    <span>Progress</span>
                    <span>
                      {achievement.progress.toFixed(0)} / {achievement.target}
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: '#3f3f46',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${(achievement.progress / achievement.target) * 100}%`,
                        height: '100%',
                        backgroundColor: '#f59e0b',
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                </div>
              )}

              {achievement.unlocked && (
                <div
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '11px',
                    color: '#34d399',
                    fontWeight: '600',
                  }}
                >
                  ✅ Unlocked
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#f59e0b',
            textShadow: '0 0 5px rgba(245, 158, 11, 0.4)',
          }}
        >
          🏆 Achievements
        </h2>
        <div
          style={{
            fontSize: '14px',
            color: '#a1a1aa',
          }}
        >
          {unlockedCount} / {allAchievements.length} Unlocked
        </div>
      </div>

      {renderAchievementSection('📱 App Usage Achievements', appUsageAchievements)}
      {renderAchievementSection('🥩 Carnivore Practice Achievements', carnivoreAchievements)}
    </div>
  );
}

