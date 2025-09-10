'use client';

const AnalyticsScreen = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">分析</h1>
      
      {/* 期間切替 */}
      <div className="flex space-x-2 mb-6">
        {['日', '週', '月', '年'].map((period) => (
          <button
            key={period}
            className={`px-4 py-2 rounded-lg font-medium ${
              period === '週'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* グラフ表示エリア */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">気分と難易度の相関</h2>
        <div className="h-32 bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">📈 グラフ表示エリア</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">実行時間の傾向</h2>
        <div className="h-32 bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">📊 棒グラフ表示エリア</span>
        </div>
      </div>

      {/* 数値サマリー */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-white mb-3">数値サマリー</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">42</div>
            <div className="text-sm text-gray-400">総実行回数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">7</div>
            <div className="text-sm text-gray-400">総連続日数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">3</div>
            <div className="text-sm text-gray-400">PB更新回数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">85%</div>
            <div className="text-sm text-gray-400">平均達成率</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
