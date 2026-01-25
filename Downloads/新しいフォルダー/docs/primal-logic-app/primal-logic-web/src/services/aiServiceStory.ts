import { logError } from '../utils/errorHandler';
import { geminiGenerate } from './geminiProxy';

export const isGeminiAvailable = (): boolean => {
  return true;
};

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
      // チE�Eタが少なすぎる場吁E      console.log('Diary data too short for analysis');
      return [];
    }

    const prompt = `あなた�E「カーニ�EアダイエチE��の成功体験発掘AI」です、E以下�Eユーザーの日記データ�E�過去の不調めE��在の好調の記録�E�を刁E��し、ESNS�E�Ewitter/Instagram�E�でシェアすべき「劇皁E��改喁E��ト�Eリー�E�Eefore/After�E�」を最大3つ抽出してください、E
【�E析するデータ、E${context}

【抽出の視点、E1. **具体的な痁E��の改喁E*: 便秘、肌荒れ、E��痛、E��節痛、疲労感、メンタル不調などが解消されたエピソード、E2. **期間の明確匁E*: 「、E��E��で治った」「、E��月で改喁E��た」とぁE��具体的な期間、E3. **対毁E*: 過去の辛い状態！Eefore�E�と現在の良ぁE��態！Efter�E��Eコントラスト、E
【�E力形式、E以下�EJSON配�E形式で出力してください、E[
  {
    "title": "キャチE��ーなタイトル�E�例！E0年来の便秘が20日で完治�E�E��E,
    "before": "過去の状態（例：毎日薬を飲まなぁE��出なかった。お腹が張って苦しかった。！E,
    "after": "現在の状態（例：肉食に変えてから毎日快便。薬も不要になった。！E,
    "text": "SNS投稿用の本斁E��ハチE��ュタグ込み、E40斁E��、E00斁E��程度。絵斁E��使用OK。�E体的な期間を文中に入れること。！E,
    "hashtags": ["#カーニ�EアダイエチE��", "#便秘解涁E, "#肉飁E などのハッシュタグ配�E]
  }
]

もし特筁E��べき改喁E��ト�Eリーが見つからなぁE��合�E、空の配�E [] を返してください、E無琁E��り捏造しなぁE��ください。事実に即した冁E��のみ抽出してください。`;

    const { text } = await geminiGenerate({ model: 'gemini-2.5-flash', prompt });

    // JSONブロチE��を探ぁE    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed as AnalyzedStory[];
      } catch (e) {
        console.error('Failed to parse JSON from AI response', e);
        return [];
      }
    }

    return [];
  } catch (error) {
    logError(error, { component: 'aiServiceStory', action: 'analyzeDiaryForStories' });
    return [];
  }
}

/**
 * ユーザーの持E��に基づぁE��スト�EリーのチE��ストを修正する
 */
export async function refineStory(originalText: string, instruction: string): Promise<string> {
  if (!isGeminiAvailable()) {
    throw new Error('Gemini APIキーが設定されてぁE��せん、E);
  }

  try {
    const prompt = `あなた�ESNS投稿のプロフェチE��ョナルです、E以下�E投稿チE��ストを、ユーザーの持E��に従って修正してください、E
【�EのチE��スト、E${originalText}

【ユーザーの持E��、E${instruction}

【制紁E��E- ハッシュタグは維持するか、より効果的なも�Eがあれ�E追加・修正してください、E- 斁E��めE��要な事実�E変えなぁE��ください、E- 出力�E修正後�EチE��スト�Eみ�E�ハチE��ュタグ含む�E�を返してください。余計な説明�E不要です。`;

    const { text } = await geminiGenerate({ model: 'gemini-2.5-flash', prompt });
    return text;
  } catch (error) {
    logError(error, { component: 'aiServiceStory', action: 'refineStory' });
    throw error;
  }
}

export interface MealShareContent {
  text: string;
  hashtags: string[];
  imagePrompt?: string; // 画像生成用プロンプト�E�封E��用�E�E}

/**
 * 食事ログからSNSシェア用コンチE��チE��生�E
 */
export async function generateMealShare(mealLog: {
  date: string;
  foods: string[];
  diary?: string;
}): Promise<MealShareContent> {
  if (!isGeminiAvailable()) {
    throw new Error('Gemini APIキーが設定されてぁE��せん、E);
  }

  try {
    const prompt = `あなた�E「カーニ�EアダイエチE��の食事記録シェアAI」です、E以下�E食事ログを�Eに、SNS�E�Ewitter/Instagram�E�でシェアするための魁E��皁E��投稿斁E��作�Eしてください、E音楽アプリの「Now Playing」機�Eのように、「私�Eこれを食べてぁE��す（食べました�E�」をスタイリチE��ュまた�Eワイルドに伝えてください、E
【食事ログ、E日仁E ${mealLog.date}
食べたもの: ${mealLog.foods.join(', ')}
${mealLog.diary ? `メモ: ${mealLog.diary}` : ''}

【�E力形式、EJSON形式で出力してください、E{
  "text": "投稿斁E��絵斁E��あり、E00、E40斁E��程度。食べたものを魁E��皁E��描�E�E�E,
  "hashtags": ["#CarnivOS", "#今日のカーニ�Eア飁E, "#スチE�Eキ" などのハッシュタグ配�E]
}`;

    const { text } = await geminiGenerate({ model: 'gemini-2.5-flash', prompt });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as MealShareContent;
    }

    return {
      text: `今日の食亁E ${mealLog.foods.join(', ')} #CarnivOS`,
      hashtags: ['#CarnivOS', '#CarnivoreDiet'],
    };
  } catch (error) {
    logError(error, { component: 'aiServiceStory', action: 'generateMealShare' });
    return {
      text: `今日の食亁E ${mealLog.foods.join(', ')} #CarnivOS`,
      hashtags: ['#CarnivOS'],
    };
  }
}

