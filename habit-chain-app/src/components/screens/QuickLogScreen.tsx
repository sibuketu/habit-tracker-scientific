'use client';

const QuickLogScreen = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">クイックログ</h1>
      
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">習慣選択</h2>
        <select className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600">
          <option>朝の散歩</option>
          <option>読書</option>
          <option>運動</option>
        </select>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">気分入力</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">予測気分</label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              className="w-full mt-2"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">結果気分</label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">メモ</h2>
        <textarea 
          className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 h-20"
          placeholder="自由記述..."
        />
      </div>

      <button className="w-full bg-green-500 text-white p-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
        記録完了
      </button>
    </div>
  );
};

export default QuickLogScreen;
