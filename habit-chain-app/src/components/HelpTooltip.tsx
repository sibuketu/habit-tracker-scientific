'use client';

import React, { useState } from 'react';
import { Lightbulb, X, ChevronRight } from 'lucide-react';

interface HelpTooltipProps {
  title: string;
  content: string;
  detailedContent?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({
  title,
  content,
  detailedContent,
  position = 'top',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-700';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-700';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-700';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-700';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-700';
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* ヘルプアイコン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-5 h-5 flex items-center justify-center text-yellow-400 hover:text-yellow-300 transition-colors"
      >
        <Lightbulb size={16} />
      </button>

      {/* ツールチップ */}
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* ツールチップコンテンツ */}
          <div className={`absolute z-50 bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-4 min-w-64 max-w-80 ${getPositionClasses()}`}>
            {/* 矢印 */}
            <div className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`} />
            
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium text-sm">{title}</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* コンテンツ */}
            <div className="text-gray-300 text-sm mb-3">
              {content}
            </div>
            
            {/* 詳細説明への導線 */}
            {detailedContent && (
              <div>
                {!showDetailed ? (
                  <button
                    onClick={() => setShowDetailed(true)}
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs transition-colors"
                  >
                    <span>もっと見る</span>
                    <ChevronRight size={12} />
                  </button>
                ) : (
                  <div className="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-600">
                    <div className="text-gray-300 text-xs leading-relaxed">
                      {detailedContent}
                    </div>
                    <button
                      onClick={() => setShowDetailed(false)}
                      className="mt-2 text-blue-400 hover:text-blue-300 text-xs transition-colors"
                    >
                      閉じる
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HelpTooltip;

