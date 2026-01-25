/**
 * Streak Calendar Component
 *
 * Calendar display for habit tracker
 * - Monthly display
 * - Highlight days with logs (no violation = green, violation = red)
 * - Connect consecutive days with lines
 */

import { useState, useMemo } from 'react';
import { getDailyLogs } from '../utils/storage';
import type { DailyLog } from '../types/index';
import './StreakCalendar.css';

interface StreakCalendarProps {
  logs: DailyLog[];
  onDayClick?: (date: string) => void;
}

export default function StreakCalendar({ logs, onDayClick }: StreakCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get start and end dates of current month
  const { startDate, endDate, daysInMonth } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    return {
      startDate: start,
      endDate: end,
      daysInMonth: end.getDate(),
    };
  }, [currentDate]);

  // Get day of week for first day of month (0 = Sunday)
  const firstDayOfWeek = startDate.getDay();

  // Add days to date
  const addDays = (dateStr: string, days: number): string => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  // Map logs by date string as key
  const logsByDate = useMemo(() => {
    const map = new Map<string, DailyLog>();
    logs.forEach((log) => {
      map.set(log.date, log);
    });
    return map;
  }, [logs]);

  // Calculate consecutive days (excluding violation days)
  const getStreakDays = useMemo(() => {
    const streakDays = new Set<string>();
    const sortedLogs = [...logs]
      .filter((log) => !log.calculatedMetrics?.hasViolation)
      .sort((a, b) => b.date.localeCompare(a.date));

    if (sortedLogs.length === 0) return streakDays;

    const today = new Date().toISOString().split('T')[0];
    let expectedDate =
      sortedLogs[0].date === today || sortedLogs[0].date === addDays(today, -1)
        ? sortedLogs[0].date
        : null;

    if (expectedDate) {
      for (const log of sortedLogs) {
        if (log.date === expectedDate) {
          streakDays.add(log.date);
          expectedDate = addDays(expectedDate, -1);
        } else {
          break;
        }
      }
    }

    return streakDays;
  }, [logs]);

  // Previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Determine date status
  const getDayStatus = (day: number): 'normal' | 'hasLog' | 'hasViolation' | 'inStreak' => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    const log = logsByDate.get(dateStr);

    if (getStreakDays.has(dateStr)) {
      return 'inStreak';
    }

    if (log) {
      return log.calculatedMetrics?.hasViolation ? 'hasViolation' : 'hasLog';
    }

    return 'normal';
  };

  // Check if consecutive
  const isPartOfStreak = (day: number): boolean => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    return getStreakDays.has(dateStr);
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayNames = ['日', '朁E, '火', '水', '木', '釁E, '圁E];

  // 空白セルを生成（月初めの空白�E�E  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div key={`empty-${i}`} className="streak-calendar-day empty" />
  ));

  return (
    <div className="streak-calendar-container">
      {/* 月ナビゲーション */}
      <div className="streak-calendar-header">
        <button onClick={goToPreviousMonth} className="streak-calendar-nav-button">
          ←        </button>
        <h3 className="streak-calendar-month-title">
          {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
        </h3>
        <button onClick={goToNextMonth} className="streak-calendar-nav-button">
          →        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="streak-calendar-weekdays">
        {dayNames.map((day) => (
          <div key={day} className="streak-calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* カレンダーグリチE�� */}
      <div className="streak-calendar-grid-wrapper">
        <div className="streak-calendar-grid">
          {emptyCells}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const status = getDayStatus(day);
            const inStreak = isPartOfStreak(day);
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateStr = date.toISOString().split('T')[0];

            // 前日・翌日が連続してぁE��かチェチE��
            const prevDateStr = addDays(dateStr, -1);
            const nextDateStr = addDays(dateStr, 1);
            const prevInStreak = getStreakDays.has(prevDateStr);
            const nextInStreak = getStreakDays.has(nextDateStr);

            const hasLog = logsByDate.has(dateStr);

            return (
              <div
                key={day}
                className={`streak-calendar-day ${status} ${inStreak ? 'streak' : ''}`}
                data-date={dateStr}
                data-day={day}
                onClick={() => {
                  if (hasLog && onDayClick) {
                    onDayClick(dateStr);
                  }
                }}
                style={{
                  cursor: hasLog && onDayClick ? 'pointer' : 'default',
                }}
              >
                <span className="streak-calendar-day-number">{day}</span>
                {/* 連続線�E表示�E�横のみ、E��間にのみ描画�E�E*/}
                {inStreak && (
                  <>
                    {/* 左への線（前日が連続してぁE��場合！E*/}
                    {prevInStreak && (
                      <div
                        className="streak-line streak-line-left"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '-0.5rem',
                          transform: 'translateY(-50%)',
                          width: '0.5rem',
                          height: '3px',
                          backgroundColor: '#059669',
                          zIndex: 1,
                        }}
                      />
                    )}
                    {/* 右への線（翌日が連続してぁE��場合！E*/}
                    {nextInStreak && (
                      <div
                        className="streak-line streak-line-right"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '-0.5rem',
                          transform: 'translateY(-50%)',
                          width: '0.5rem',
                          height: '3px',
                          backgroundColor: '#059669',
                          zIndex: 1,
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 凡侁E*/}
      <div className="streak-calendar-legend">
        <div className="streak-calendar-legend-item">
          <div className="streak-calendar-legend-color" style={{ backgroundColor: '#10b981' }} />
          <span>連続記録中</span>
        </div>
        <div className="streak-calendar-legend-item">
          <div
            className="streak-calendar-legend-color"
            style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
          />
          <span>記録なぁE/span>
        </div>
        <div className="streak-calendar-legend-item">
          <div className="streak-calendar-legend-color" style={{ backgroundColor: '#dc2626' }} />
          <span>違反あり</span>
        </div>
      </div>
    </div>
  );
}

