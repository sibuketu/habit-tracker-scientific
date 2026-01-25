export interface AnalyzedStory {
  title: string;
  before: string;
  after: string;
  text: string;
  hashtags: string[];
}

/**
 * 過去の日記データを�E析し、SNSシェア用のスト�Eリー�E�Eefore/After�E�を生�E
 */
export async function analyzeDiaryForStories(
  diaryLogs: Array<{ date: string; diary?: string; foods: string[]; physicalCondition?: any }>
): Promise<AnalyzedStory[]> {
  if (!isGeminiAvailable()) {
    throw new Error('Gemini APIキーが設定されてぁE��せん、E);
  }

  try {
    const model = genAI!.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // 日記データの整形
    const context = diaryLogs
      .filter(
        (log) =>
          log.diary || (log.physicalCondition && Object.keys(log.physicalCondition).length > 0)
      )
      .map((log) => {
        const date = new Date(log.date);
        const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        const condition = log.physicalCondition ? JSON.stringify(log.physicalCondition) : 'なぁE;
        return `、E{dateStr}】\n日訁E ${log.diary || 'なぁE}\n体調ログ: ${condition}`;
      })
      .join('\n\n');

    if (context.length < 50) {
      // チE�Eタが少なすぎる場吁E      return [];
    }

    const prompt = `あなた�E「カーニ�EアダイエチE��の成功体験発掘AI」です、E以下�Eユーザーの日記データ�E�過去の不調めE��在の好調の記録�E�を刁E��し、ESNS�E�Ewitter/Instagram�E�でシェアすべき「劇皁E��改喁E��ト�Eリー�E�Eefore/After�E�」を最大3つ抽出してください、E
【�E析するデータ、E${context}

【抽出の視点、E1. **具体的な痁E��の改喁E*: 便秘、肌荒れ、E��痛、E��節痛、疲労感、メンタル不調などが解消されたエピソード、E2. **期間の明確匁E*: 「、E��E��で治った」「、E��月で改喁E��た」とぁE��具体的な期間、E3. **対毁E*: 過去の辛い状態！Eefore�E�と現在の良ぁE��態！Efter�E��Eコントラスト、E
【�E力形式、E以下�EJSON配�E形式で出力してください、E[
  {
    "title": "キャチE��ーなタイトル�E�例！E0年来の便秘が20日で完治�E�E��E,
    "before": "過去の状態（例：毎日薬を飲まなぁE��出なかった。お腹が張って苦しかった。！E,
    "after": "現在の状態（例：肉食に変えてから毎日快便。薬も不要になった。！E,
    "text": "SNS投稿用の本斁E��ハチE��ュタグ込み、E40斁E��、E00斁E��程度。絵斁E��使用OK。�E体的な期間を�Eれること。！E,
    "hashtags": ["#カーニ�EアダイエチE��", "#便秘解涁E, "#肉飁E などのハッシュタグ配�E]
  }
]

もし特筁E��べき改喁E��ト�Eリーが見つからなぁE��合�E、空の配�E [] を返してください、E無琁E��り捏造しなぁE��ください。事実に即した冁E��のみ抽出してください。`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed as AnalyzedStory[];
    }

    return [];
  } catch (error) {
    logError(error, { component: 'aiService', action: 'analyzeDiaryForStories' });
    return [];
  }
}

