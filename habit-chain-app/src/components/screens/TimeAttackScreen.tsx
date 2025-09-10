'use client';

const TimeAttackScreen = () => {
  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">朝の散歩</h1>
        <p className="text-gray-400">目標時間: 15分</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-8 mb-6">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold text-white mb-2">
            12:34
          </div>
          <div className="text-lg text-green-400">
            -2:26 (目標より早い)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button className="bg-green-500 text-white p-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
          スタート
        </button>
        <button className="bg-blue-500 text-white p-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
          スプリット
        </button>
        <button className="bg-red-500 text-white p-4 rounded-lg font-medium hover:bg-red-600 transition-colors">
          終了
        </button>
      </div>
    </div>
  );
};

export default TimeAttackScreen;