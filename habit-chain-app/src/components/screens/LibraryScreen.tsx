'use client';

const LibraryScreen = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">習慣ライブラリ</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium">
          + 新規追加
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚶</span>
              <div>
                <h3 className="text-lg font-semibold text-white">朝の散歩</h3>
                <p className="text-sm text-gray-400">If 朝起きたら → Then 散歩する</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-400">編集</button>
              <button className="text-gray-400">アーカイブ</button>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            目標時間: 15分 | 大目標: 健康維持
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="text-lg font-semibold text-white">読書</h3>
                <p className="text-sm text-gray-400">If 寝る前 → Then 本を読む</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-400">編集</button>
              <button className="text-gray-400">アーカイブ</button>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            目標時間: 30分 | 大目標: 知識向上
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryScreen;
