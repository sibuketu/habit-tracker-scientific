'use client';

const DashboardScreen = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">ダッシュボード</h1>
        <button className="p-2 text-gray-400 hover:text-white">
          ⚙️
        </button>
      </div>

      {/* 今日のルーティーン */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">今日のルーティーン</h2>
        <div className="space-y-2">
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white">朝の散歩</span>
              <span className="text-green-400">✓ 完了</span>
            </div>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white">読書</span>
              <span className="text-yellow-400">⏳ 未完了</span>
            </div>
          </div>
        </div>
      </div>

      {/* 進捗サマリー */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">進捗サマリー</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">7</div>
            <div className="text-sm text-gray-400">連続日数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">85%</div>
            <div className="text-sm text-gray-400">今週の達成率</div>
          </div>
        </div>
      </div>

      {/* リザルトへの導線 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">詳細な分析を見る</h3>
            <p className="text-sm text-gray-200">習慣の傾向と改善点を確認</p>
          </div>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium">
            分析画面へ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
