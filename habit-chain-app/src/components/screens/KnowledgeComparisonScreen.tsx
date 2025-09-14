'use client';

import React, { useState } from 'react';
import { BookOpen, Clock, DollarSign, Target, CheckCircle, ArrowRight, Lightbulb, TrendingUp, Users, Award } from 'lucide-react';

export default function KnowledgeComparisonScreen() {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const traditionalStats = {
    cost: '20,000〜40,000円',
    time: '80〜150時間',
    books: '10〜15冊',
    description: '行動科学・習慣化・目標設定・ゲーミフィケーション関連を網羅するには10〜15冊必要'
  };

  const appStats = {
    cost: '月額4,500円',
    costYearly: '年54,000円',
    time: '1日10分',
    timeMonthly: '月6〜8時間',
    description: '毎日10分のトラッキング＋アドバイス'
  };

  const knowledgeBenefits = [
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: '必要な時に「使える形」で知識が出てくる',
      description: 'If入力時に実行意図の解説が表示されるなど、実践と学習が一体化'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      title: '最新知見＋機能も込み',
      description: '本では得られない最新の研究結果と実装済み機能を同時に提供'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-400" />,
      title: '解説チップやハウツーもその場で吸収',
      description: '💡アイコンからすぐに実践的なアドバイスを確認可能'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            知識コスト対比
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            本で学ぶと数万円と100時間級。
          </p>
          <p className="text-xl text-gray-300">
            イフゼンなら月4,500円、1日10分で行動に直結。
          </p>
        </div>

        {/* メイン対比セクション */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 左側：通常（本で学ぶ場合） */}
          <div className="bg-gray-800 rounded-xl p-8 border-2 border-gray-700 relative">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-blue-400">通常</h2>
              <p className="text-gray-400 text-sm">本で学ぶ場合</p>
            </div>

            {/* 本のスタックイラスト */}
            <div className="flex justify-center items-end mb-6 h-32">
              <div className="relative">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="absolute bg-blue-600 rounded-sm shadow-lg"
                    style={{
                      width: '40px',
                      height: `${60 + i * 8}px`,
                      left: `${(i - 1) * 8}px`,
                      bottom: '0',
                      zIndex: i
                    }}
                  />
                ))}
                <div className="absolute -right-2 top-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  本{traditionalStats.books}
                </div>
              </div>
              <div className="ml-8 flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-gray-400">読書中</div>
              </div>
            </div>

            {/* 統計情報 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">費用</span>
                </div>
                <span className="text-xl font-bold text-red-400">{traditionalStats.cost}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">時間</span>
                </div>
                <span className="text-xl font-bold text-red-400">{traditionalStats.time}</span>
              </div>

              <div className="text-xs text-gray-400 p-3 bg-gray-700 rounded-lg">
                {traditionalStats.description}
              </div>
            </div>
          </div>

          {/* 右側：Dラボなら（イフゼンで学ぶ場合） */}
          <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-xl p-8 border-2 border-green-500 relative">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-400">イフゼンなら</h2>
              <p className="text-gray-300 text-sm">アプリで学ぶ場合</p>
            </div>

            {/* スマホイラスト */}
            <div className="flex justify-center items-center mb-6 h-32">
              <div className="relative">
                <div className="w-16 h-24 bg-gray-800 rounded-xl border-2 border-gray-600 flex items-center justify-center">
                  <div className="w-12 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">イフゼン</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-gray-800 text-xs">💡</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  アプリ
                </div>
              </div>
            </div>

            {/* 統計情報 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-800 bg-opacity-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-200">費用</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-400">{appStats.cost}</div>
                  <div className="text-sm text-gray-300">→ 年{appStats.costYearly}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-800 bg-opacity-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-200">時間</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-400">{appStats.time}</div>
                  <div className="text-sm text-gray-300">→ {appStats.timeMonthly}</div>
                </div>
              </div>

              <div className="text-xs text-gray-200 p-3 bg-green-800 bg-opacity-30 rounded-lg">
                {appStats.description}
              </div>
            </div>

            {/* 入会ボタン */}
            <button
              onClick={() => setShowDetailModal(true)}
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <span className="text-white text-xs font-bold text-center leading-tight">
                入会手続きは<br />こちら
              </span>
            </button>
          </div>
        </div>

        {/* 大きな矢印 */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* イフゼンの利点セクション */}
        <div className="bg-gray-800 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-green-400">
            イフゼンで学ぶ3つのメリット
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {knowledgeBenefits.map((benefit, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold mb-3 text-white">
                  {benefit.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 詳細比較表 */}
        <div className="bg-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">詳細比較</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6 text-gray-300">項目</th>
                  <th className="text-center py-4 px-6 text-blue-400">本で学ぶ場合</th>
                  <th className="text-center py-4 px-6 text-green-400">イフゼンで学ぶ場合</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300">初期費用</td>
                  <td className="py-4 px-6 text-center text-red-400">20,000〜40,000円</td>
                  <td className="py-4 px-6 text-center text-green-400">月額4,500円</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300">学習時間</td>
                  <td className="py-4 px-6 text-center text-red-400">80〜150時間</td>
                  <td className="py-4 px-6 text-center text-green-400">1日10分</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300">知識の鮮度</td>
                  <td className="py-4 px-6 text-center text-yellow-400">出版時点</td>
                  <td className="py-4 px-6 text-center text-green-400">常に最新</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300">実践との連動</td>
                  <td className="py-4 px-6 text-center text-yellow-400">別途実装必要</td>
                  <td className="py-4 px-6 text-center text-green-400">自動連動</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300">進捗管理</td>
                  <td className="py-4 px-6 text-center text-yellow-400">手動</td>
                  <td className="py-4 px-6 text-center text-green-400">自動</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-300">カスタマイズ性</td>
                  <td className="py-4 px-6 text-center text-yellow-400">限定的</td>
                  <td className="py-4 px-6 text-center text-green-400">高い</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 詳細モーダル */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-center mb-6 text-green-400">
              イフゼンに参加する
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-green-900 bg-opacity-30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-400 mb-2">プレミアムプラン</h4>
                <div className="text-3xl font-bold text-white mb-2">¥4,500<span className="text-lg text-gray-400">/月</span></div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 全機能へのアクセス</li>
                  <li>• 無制限の習慣管理</li>
                  <li>• 詳細な統計データ</li>
                  <li>• プライオリティサポート</li>
                  <li>• データ同期</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  // ここでサブスクリプション処理
                  setShowDetailModal(false);
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 font-semibold"
              >
                今すぐ始める
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
