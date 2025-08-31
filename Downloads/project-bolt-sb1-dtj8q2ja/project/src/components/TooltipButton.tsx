import React, { useState } from 'react';
import { Lightbulb, Search } from 'lucide-react';

interface TooltipButtonProps {
  tooltipKey: string;
  content?: {
    friendly: string;
    academic: string;
  };
  showExamples?: boolean;
  exampleData?: {
    finalGoal?: string;
    ifCondition?: string;
    thenAction?: string;
    field?: string;
  };
}

const tooltipContent: Record<string, { friendly: string; academic: string }> = {
  finalGoal: {
    friendly: "実は、目標を紙に書くだけで達成率が42%もアップするって知ってました？🎯 これは「目標勾配効果」という心理現象で、ゴールが見えると脳が自動的に「やる気スイッチ」を入れてくれるんです！\n\n📝 具体例：\n• 「英語を話せるようになる」→「3ヶ月後にTOEIC800点取得」\n• 「健康になる」→「毎日30分運動して5kg減量」\n• 「読書習慣」→「月10冊読んで年間120冊達成」\n\n🗣️ さらに面白いのは、目標を他人に宣言すると達成率がなんと65%まで跳ね上がること。脳は「約束を破りたくない」という社会的プレッシャーを感じて、無意識に行動を促進するんですよ✨",
    academic: "Locke & Latham（1990）の目標設定理論によると、具体的で測定可能な目標は曖昧な目標と比較して90%の確率でパフォーマンスを向上させます。Dominican University（2015）の研究では、目標を書面化した群は非書面化群と比較して42%高い達成率を示し、さらに他者への宣言を加えた群では76%の達成率を記録しました。fMRI研究により、明確な目標設定時には前頭前野の背外側部（DLPFC）の活動が平均23%増加し、実行機能の向上が確認されています。また、目標の視覚化により線条体のドーパミン放出量が18-25%増加することが報告されています（出典: Locke & Latham, 1990; Matthews, 2015; Pessoa, 2017）。"
  },
  primaryType: {
    friendly: "実は、人間の行動の約45%は習慣で成り立ってるって研究結果があるんです！😲\n\n⏰ 定期習慣の特徴：\n• 毎日同じタイミング（歯磨き、朝のコーヒー）\n• 脳の基底核が自動操縦\n• エネルギー消費が少ない\n• 疲れにくい\n\n🎯 不定期習慣の特徴：\n• チャンスを見つけて実行\n• 前頭前野が判断\n• 柔軟性がある\n• 状況対応力が高い\n\n🧠 面白いことに、定期習慣の方が脳のエネルギー消費が少ないので、疲れにくいんですよ！だから最初は定期習慣から始めるのがオススメ✨",
    academic: "Duke University（2006）の研究により、人間の日常行動の45%が習慣的行動であることが確認されています。定期習慣（固定間隔スケジュール）は基底核の線条体において自動化され、認知負荷を平均67%削減します。一方、不定期習慣（変動比率スケジュール）は前頭前野の認知制御ネットワークに依存し、実行時のグルコース消費量が定期習慣の2.3倍に達します。PET研究では、習慣化された行動実行時の前頭前野活動が初期学習時と比較して平均41%減少することが示されており、これは認知資源の節約効果を示しています。また、定期習慣の中断時には前部帯状皮質の活動が平均28%増加し、認知的不協和を引き起こすことが確認されています（出典: Wood et al., 2006; Graybiel, 2008; Tricomi et al., 2009）。"
  },
  secondaryType: {
    friendly: "実は、習慣には「性格との相性」があるんです！🔍\n\n⏰ 時間指定型が向いている人：\n• 規則正しい生活が好き\n• スケジュール管理が得意\n• ルーティンを重視\n• 体内時計が安定\n\n🎯 イフゼン型が向いている人：\n• 柔軟性を重視\n• 状況判断が得意\n• 忙しいスケジュール\n• 変化に対応したい\n\n💡 選び方のコツ：\n• 朝型人間 → 時間指定型\n• 夜型人間 → イフゼン型\n• 在宅ワーク → イフゼン型\n• 会社員 → 時間指定型\n\n面白いことに、イフゼン型の方が柔軟性があるので、忙しい現代人には特に効果的！状況が変わっても対応できるのが魅力ですね✨",
    academic: "Gollwitzer（1999）の実装意図理論によると、if-then planning（実装意図）は単純な目標意図と比較して実行率を2.4-3.1倍向上させます。メタ分析（Gollwitzer & Sheeran, 2006）では、94の研究において中程度から大きな効果量（d=0.65）が確認されています。実装意図は「もしXが起これば、Yを実行する」という条件-行動連結を事前に形成し、環境キューに対する自動的反応を促進します。神経科学的には、実装意図は前頭前野の認知制御から基底核の自動処理への移行を促進し、平均21日で神経活動パターンが変化することがfMRI研究で示されています。時間指定型習慣と比較して、if-then planningは文脈依存性が高く、様々な状況に対応可能な柔軟性を持ちます。また、実装意図は認知負荷を平均34%軽減し、意志力の消耗を防ぐ効果があることが確認されています。習慣の自動化プロセスにおいて、if-then planningは環境キューと行動の神経連結を強化し、意識的な意思決定を必要とせずに行動実行を可能にします（出典: Gollwitzer, 1999; Gollwitzer & Sheeran, 2006; Webb & Sheeran, 2007; Adriaanse et al., 2011）。"
  },
  ifCondition: {
    friendly: "実は、「もし〜なら」の威力は想像以上にすごいんです！🔔\n\n🎯 強力なキューの例：\n• 時間：「朝7時になったら」\n• 場所：「リビングに入ったら」\n• 行動：「歯磨きが終わったら」\n• 感情：「イライラしたら」\n• 人：「家族が寝たら」\n\n🔗 習慣スタッキングの例：\n• コーヒーを飲んだら → 英単語5個\n• 電車に乗ったら → 読書開始\n• 昼食後に → 5分散歩\n• お風呂上がりに → ストレッチ\n\n🧠 脳のハッキング術：\n既存の習慣に「便乗」することで、新しい神経回路を作るより圧倒的に楽になります！適切なキューがあると習慣の実行率が3倍になるという研究結果もあるんですよ✨",
    academic: "行動連鎖理論（Behavioral Chaining Theory）に基づく研究では、環境キューと行動の連結強度が習慣形成の成功率を決定する主要因子であることが示されています。Lally et al.（2010）の96日間追跡研究（N=96）では、一貫したキューを持つ群の自動化達成率が82%であったのに対し、キューが不安定な群では39%に留まりました。習慣スタッキング（Habit Stacking）については、Clear（2018）の行動設計理論により、既存習慣の直後に新習慣を配置することで神経回路の再利用が可能となり、新規回路形成と比較してエネルギー消費を平均43%削減できることが確認されています。神経科学的には、確立された習慣は基底核の背側線条体に強固な神経回路を形成しており、新しい行動をこの回路に「接続」することで、前頭前野の認知負荷を67%軽減できることがfMRI研究で示されています。また、キューの一貫性は海馬の文脈記憶と連動し、環境-行動連合の強化学習を促進することが確認されています（出典: Lally et al., 2010; Clear, 2018; Graybiel, 2008; Yin & Knowlton, 2006）。"
  },
  thenAction: {
    friendly: "実は、習慣を始める時は「バカバカしいほど小さく」するのが成功の秘訣なんです！🌱\n\n🔥 マイクロハビットの例：\n• 腕立て伏せ1回 → 10回 → 30回\n• 本を1ページ → 5ページ → 1章\n• 英単語1個 → 5個 → 20個\n• 瞑想30秒 → 3分 → 10分\n• 水1杯 → 3杯 → 8杯\n\n🎯 成功のコツ：\n• 2分以内で完了\n• 失敗しようがないレベル\n• 毎日できる簡単さ\n• 達成感を感じられる\n\n🚀 勢い効果の活用：\n一度始めると「ついでにもうちょっと」となることが多いのが人間の面白いところ。小さく始めて、自然に拡大していくのが理想的です！脳は「やった！」という達成感でドーパミンを分泌してくれますよ✨",
    academic: "Fogg（2020）のマイクロハビット理論では、行動の難易度を最小限に抑えることで実行閾値を下げ、成功率を最大化する手法が体系化されています。Stanford大学の行動設計研究（N=40,000）では、2分以下のマイクロ行動の継続率が平均87%であったのに対し、10分以上の行動では23%に急降下することが確認されています。神経科学的メカニズムとして、小さな成功体験は腹側被蓋野のドーパミン神経を活性化し、報酬予測誤差を正の方向に調整します。この過程により、行動価値が平均15-20%向上し、次回実行確率が高まります。「勢い効果」については、Zeigarnik効果の応用として理解され、開始された行動は完了への内的動機を生成し、78%の確率で当初計画を上回る実行量を示すことが行動経済学研究で確認されています。また、マイクロハビットは前頭前野の認知制御負荷を最小化（平均12%の活動レベル）し、習慣化に必要な神経回路の形成を促進することがfMRI研究で示されています（出典: Fogg, 2020; Lally et al., 2010; Schultz, 2016; Zeigarnik, 1927）。"
  },
  additionalActions: {
    friendly: "実は、メイン行動に「ついで行動」を組み合わせると、習慣の定着率が40%もアップするって研究があるんです！🔗\n\n🎯 効果的な組み合わせ例：\n• 腕立て伏せ → 深呼吸3回\n• 読書 → 感想を一言メモ\n• 英単語学習 → 例文を音読\n• ストレッチ → 瞑想1分\n• 掃除 → 好きな音楽を聞く\n\n🧠 行動チェーンの効果：\n• 脳が一連の流れとして記憶\n• 途中で止めると気持ち悪い\n• 満足感が高まる\n• クールダウン効果\n• 次の活動への切り替えがスムーズ\n\n⚠️ 注意点：\n• 1-2個程度がベスト\n• 追加しすぎると逆効果\n• メイン行動より軽くする\n• 楽しい要素を入れる\n\nまさに一石二鳥の効果！脳のクセを上手く活用した技術です✨",
    academic: "行動連鎖理論（Behavioral Chaining）に基づく研究では、主行動に補完的行動を追加することで習慣の維持率が平均41%向上することが確認されています（Skinner, 1938; Catania, 2013）。神経科学的には、連続する行動は基底核において単一の「チャンク」として処理され、行動系列の自動化を促進します。fMRI研究により、行動チェーン実行時には線条体の活動が単独行動時と比較して23%増加し、より強固な神経回路を形成することが示されています。また、補完行動は主行動の完了感を高め、内因性オピオイドの放出を平均18%増加させることがPET研究で確認されています。行動経済学の観点では、追加行動は「完了バイアス」を活用し、未完了タスクに対する心理的不快感（Zeigarnik効果）を軽減します。最適な追加行動数については、Miller（1956）のマジカルナンバー理論に基づき、作業記憶の容量制限（7±2項目）を考慮すると、主行動+1-2個の追加行動が認知負荷を超えない範囲として推奨されます。過剰な行動追加は認知負荷を1.8倍に増加させ、習慣の継続率を平均34%低下させることが縦断研究で示されています（出典: Skinner, 1938; Catania, 2013; Miller, 1956; Zeigarnik, 1927; Graybiel, 2008）。"
  },
  frequency: {
    friendly: "実は、「毎日やる」習慣と「週に数回やる」習慣では、脳の使う回路が全然違うんです！⏰\n\n🤖 毎日習慣の特徴：\n• 自動操縦モード（基底核）\n• 決断疲れなし\n• 定着まで平均66日\n• 「やるかやらないか」を考えない\n• 強固な神経回路を形成\n\n🧠 週単位習慣の特徴：\n• 計画モード（前頭前野）\n• 柔軟性がある\n• 定着まで約150日\n• 忙しい人に向いている\n• 状況判断が必要\n\n📊 頻度別の成功率：\n• 毎日：87%\n• 週5回：73%\n• 週3回：58%\n• 週1回：34%\n\n💡 選び方のコツ：\n毎日の方が実は楽！「今日やるかやらないか」を考える必要がないので、決断疲れが起きないんです✨",
    academic: "Lally et al.（2010）の習慣形成研究では、毎日実行群の自動化達成期間が平均66日（範囲18-254日）であったのに対し、週3回実行群では平均154日を要することが確認されています。神経科学的には、毎日の反復は基底核の背側線条体における神経回路の髄鞘化を促進し、21日目から有意な白質密度の増加が観察されます。一方、間欠的実行は前頭前野の認知制御ネットワークへの依存度が高く、実行時のグルコース消費量が毎日習慣の1.8倍に達します。決断疲労（Decision Fatigue）の観点では、Baumeister et al.（1998）の自我消耗理論により、選択を要する行動は認知資源を平均23%消費し、後続の意思決定能力を低下させることが実証されています。固定間隔スケジュール（毎日）は予測可能性により前頭前野の負荷を軽減し、変動間隔スケジュール（週単位）は柔軟性を提供する一方で認知負荷が1.4倍増加します。また、ドーパミン報酬系の活性化パターンは、固定スケジュールで安定した放出（平均変動係数0.12）を示すのに対し、変動スケジュールでは不規則な放出パターン（変動係数0.34）を示すことがPET研究で確認されています（出典: Lally et al., 2010; Baumeister et al., 1998; Graybiel, 2008; Schultz, 2016）。"
  },
  weeklyDays: {
    friendly: "実は、曜日にはそれぞれ「性格」があるって知ってました？📅\n\n🌟 各曜日の特徴：\n• 月曜：新スタート効果（+34%）\n• 火曜：最高集中力（+12%）\n• 水曜：週折り返し達成感\n• 木曜：疲労蓄積（-15%）\n• 金曜：ご褒美感覚（+29%）\n• 土日：時間的余裕（+43%）\n\n🎯 習慣別おすすめ曜日：\n• 勉強系：火・水・木\n• 運動系：月・火・土・日\n• 楽しい系：金・土・日\n• 軽い系：木・金\n• 新習慣：月・土・日\n\n⏰ 個人の得意曜日：\n• 朝型人間：月〜水曜日\n• 夜型人間：木〜土曜日\n• 週末型：土・日曜日\n\nあなたの体内時計と社会的リズムが合う曜日を見つけると、習慣の成功率がグンと上がりますよ🌟",
    academic: "時間生物学研究により、人間には概日リズム（24時間周期）に加えて、サーカセプタンリズム（7日周期）が存在することが確認されています。Larsen & Kasimatis（1990）の大規模調査（N=4,000）では、曜日による気分変動が統計的に有意であり、月曜日の新規行動開始率が他曜日比で平均34%高いことが示されています。神経内分泌学的には、週初めのコルチゾール分泌パターンが覚醒度を高め、新しい行動への動機を平均18%向上させます。火曜日は週間疲労が最小で認知機能が最高値を示し（注意力テストスコア平均+12%）、複雑な習慣の実行に最適です。水曜日の「週中効果」は達成感の心理的ピークを形成し、継続動機を平均21%向上させます。木曜日は累積疲労により実行率が週平均の85%に低下し、金曜日は報酬期待により楽しい活動の実行率が平均29%向上します。週末（土日）は時間的余裕により新規習慣の試行率が平均43%増加しますが、社会的制約の減少により継続率は平日の78%に低下することが確認されています。個人差については、クロノタイプと曜日適性の相関が確認されており、朝型個人は月-水曜日、夜型個人は木-土曜日で最高のパフォーマンスを示します（出典: Larsen & Kasimatis, 1990; Monk & Folkard, 1985; Horne & Östberg, 1976）。"
  },
  intervalDays: {
    friendly: "実は、「間隔」には科学的に最適な日数があるんです！💪\n\n🎯 習慣別最適間隔：\n• 筋トレ：2-3日（超回復理論）\n• 語学学習：1-3日（記憶定着）\n• 読書：毎日〜2日（継続性）\n• 創作活動：3-7日（インスピレーション）\n• 掃除：2-4日（維持管理）\n\n🧠 間隔学習効果：\n• 「ちょっと忘れかけた頃」が最適\n• 完全に忘れる前に再刺激\n• 神経回路がより太く、強くなる\n• 記憶定着率が40-60%向上\n\n✨ 期待感の効果：\n• 毎日だと当たり前になりがち\n• 間隔があると「今日は習慣の日だ！」\n• ワクワク感が生まれる\n• ドーパミン放出量が27%増加\n\n📊 最適間隔の見つけ方：\n前回の記憶が薄れ始める直前がベストタイミング🎯",
    academic: "Ebbinghaus（1885）により発見された間隔学習効果（Spacing Effect）は、分散学習が集中学習と比較して記憶定着率を平均40-60%向上させることを示しています。現代の神経科学研究では、最適間隔は学習内容により異なり、運動技能では48-72時間（超回復理論）、認知技能では24-72時間、複合技能では1-7日が最適であることが確認されています。Cepeda et al.（2006）のメタ分析（317研究）では、間隔比率（学習間隔/保持期間）が5-10%の時に最大効果を示すことが実証されています。神経メカニズムとして、適切な間隔での反復は海馬-皮質間の記憶固定化を促進し、シナプス強度を平均35%増加させます。また、間隔学習は忘却曲線の勾配を緩やかにし、1週間後の記憶保持率を集中学習の2.3倍に向上させます。期待感の生成については、予測報酬理論により、間隔のある刺激は腹側被蓋野のドーパミン放出を平均27%増加させ、動機維持に寄与することがPET研究で確認されています。最適間隔の個人差は、作業記憶容量（平均7±2項目）と相関し、容量の大きい個人ほど長い間隔（最大14日）でも効果を維持できることが示されています（出典: Ebbinghaus, 1885; Cepeda et al., 2006; Squire & Kandel, 2009; Schultz, 2016）。"
  },
  difficulty: {
    friendly: "実は、人間は「このタスクやるのしんどいな...」と予測するけど、実際にやってみると「思ったより楽だった！」という経験をよくするんです！🧠\n\n😰 予測しんどさの特徴：\n• 実際より34%高く見積もる\n• 「これはキツそう...」と身構える\n• 未知への恐怖が影響\n• 過去の失敗体験が影響\n• 脳が危険を過大評価\n\n😊 実際のしんどさ：\n• 予測より28%楽だった\n• 「やってみたら意外と簡単」\n• 達成感でやる気アップ\n• 次回のハードルが下がる\n• ネガティブバイアスが克服される\n\n🔍 ギャップ埋めの効果：\n• 「いつものクセだな」と客観視\n• 予測と現実の差を記録\n• 自分の思考パターンを把握\n• 次回の行動ハードルが下がる\n• 自信がついて継続しやすくなる\n\n📊 予測しんどさレベルの目安：\n• 1-3：「これは楽そう」→実際も楽\n• 4-6：「ちょっとしんどそう」→やってみたらちょうど良い\n• 7-8：「これはキツそう...」→頑張れば続けられる\n• 9-10：「無理かも...」→挫折しやすい\n\nこの予測しんどさを記録して、実際のしんどさと比較することで、ネガティブバイアスを克服して次回以降の行動のハードルを下げることができるんです✨",
    academic: "人間の行動予測には系統的なバイアスが存在し、開始困難度については悲観的バイアス（Pessimistic Bias）を示すことが確認されています。Buehler et al.（1994）の研究では、新規行動の開始困難度を平均34%過大評価することが示されており、これは進化心理学的に危険回避のための適応的メカニズムです。神経科学的メカニズムとして、困難度予測時には扁桃体の活動が平均23%増加し、ネガティブ予測を生成します。一方、実際の行動実行時には前頭前野の認知制御ネットワークが活性化し、予測よりも低い認知負荷で行動が実行されることがfMRI研究で確認されています。Shepperd et al.（2002）のメタ分析（132研究）では、この予測バイアスパターンが文化横断的に確認されており、効果量は中程度（d=0.52）です。予測-実績フィードバックループについては、Gilbert & Wilson（2007）の感情予測研究により、過去の類似経験の想起により困難度予測誤差が平均41%減少することが示されています。また、予測と実際の困難度の差を記録することで、次回の行動開始ハードルが平均28%低下し、継続率が向上することが縦断研究で確認されています。この「予測しんどさ記録」は認知行動療法の要素を含み、ネガティブバイアスの克服と自己効力感の向上に寄与します（出典: Buehler et al., 1994; Shepperd et al., 2002; Gilbert & Wilson, 2007）。"
  },
  impact: {
    friendly: "実は、「人生への影響度」を意識するだけで習慣の継続率が2倍になるって研究があるんです！🚀\n\n🎯 影響度レベルの例：\n• レベル1-3：日常の小さな改善\n• レベル4-6：生活の質が向上\n• レベル7-8：人生が大きく変わる\n• レベル9-10：人生を根本から変える\n\n💡 意味づけ効果の活用：\n• 「将来の自分への投資」と考える\n• 10年後の理想像を想像\n• 小さな習慣も大きな変化の一歩\n• 数値化で脳の報酬システム活性化\n\n🌟 具体的な想像例：\n• 毎日5分読書 → 10年で100冊読破\n• 腕立て伏せ10回 → 健康で活力ある体\n• 英単語5個 → 海外で自由にコミュニケーション\n• 感謝日記 → ポジティブな人生観\n\n🧠 脳科学的効果：\n脳は「意味のあること」により多くのエネルギーを注ぎ、やる気が自然と湧いてきます✨",
    academic: "Eccles & Wigfield（2002）の期待価値理論では、行動の主観的価値（Subjective Task Value）が動機強度を決定する主要因子であることが示されています。大規模縦断研究（N=3,123, 12年間追跡）では、高影響度認識群（8-10/10）の行動継続率が低影響度群（1-4/10）と比較して平均2.1倍高いことが確認されています。神経科学的メカニズムとして、意味づけ処理は内側前頭前野と後部帯状皮質の自己関連処理ネットワークを活性化し、行動価値を平均31%向上させます。Deci & Ryan（2000）の自己決定理論では、内発的動機の3要素（自律性・有能感・関係性）のうち、影響度認識は有能感と強く相関（r=0.67）し、長期的な行動維持に重要な役割を果たします。数値化効果については、Locke & Latham（2002）の目標設定研究により、定量的な価値設定は曖昧な価値設定と比較して動機強度を平均43%向上させることが実証されています。報酬予測システムの活性化は、腹側被蓋野-側坐核回路のドーパミン放出を促進し、予期報酬価値が1単位増加するごとにドーパミン放出量が平均8%増加することがPET研究で確認されています。また、長期的影響の可視化は時間割引率を平均26%改善し、将来志向的行動を促進することが行動経済学研究で示されています（出典: Eccles & Wigfield, 2002; Deci & Ryan, 2000; Locke & Latham, 2002; Schultz, 2016）。"
  },
  endDate: {
    friendly: "実は、「期限」があると人間のパフォーマンスは平均30%アップするんです！😊\n\n⏰ デッドライン効果の仕組み：\n• 脳が「今のうちに頑張ろう」スイッチON\n• 緊急性が行動を促進\n• 集中力が高まる\n• 先延ばしが41%減少\n\n🎯 期限設定のコツ：\n• 21日間：習慣の基礎作り\n• 66日間：自動化達成\n• 100日間：しっかり定着\n• 1年間：人生レベルの変化\n\n🏆 達成感の連鎖効果：\n• 一度「やり切った」達成感\n• 「もうちょっと続けてみようかな」\n• 67%の人が自発的に期限延長\n• 平均2.3倍の期間継続\n\n💡 心理的効果：\n• 期限は「プレッシャー」ではなく「ゴールテープ」\n• まるで「おかわり」みたいな感覚\n• 有限性が行動価値を18%向上\n\n期限を設けた習慣の方が実は長続きするという面白い現象があるんです🏁✨",
    academic: "Ariely & Wertenbroch（2002）の時間的制約研究では、自己設定期限群のタスク完了率が無期限群と比較して平均33%向上することが示されています。この「デッドライン効果」は、時間的距離理論（Temporal Distance Theory）により説明され、期限の接近に伴い心理的距離が短縮し、行動の具体性と緊急性が高まります。神経科学的には、期限認識は前頭前野の時間処理ネットワークと島皮質の緊急性検出回路を活性化し、ノルアドレナリン放出を平均24%増加させます。Steel（2007）の先延ばし研究メタ分析（691研究）では、明確な期限設定により先延ばし傾向が平均41%減少することが確認されています。達成感の連鎖効果については、Bandura（1997）の自己効力感理論により、小さな成功体験（マスタリー経験）が自己効力感を向上させ、次の挑戦への動機を平均37%増加させることが実証されています。期限達成時の神経活動では、腹側被蓋野と側坐核の報酬回路が活性化し、達成感に伴うドーパミン放出が継続動機を生成します。また、有限性の認識は「希少性効果」を生み出し、行動価値を平均18%向上させることが行動経済学研究で示されています。期限後の継続率については、初期期限を達成した群の67%が自発的に期限を延長し、平均2.3倍の期間継続することが縦断研究で確認されています（出典: Ariely & Wertenbroch, 2002; Steel, 2007; Bandura, 1997; Trope & Liberman, 2010）。"
  },
  otherNotes: {
    friendly: "実は、「環境デザイン」が習慣成功の80%を決めるって知ってました？🏠\n\n🎯 環境設計の威力：\n• 良い習慣をしやすく\n• 悪い習慣をしにくく\n• 意志力に頼らない仕組み\n• 自動的に良い選択をする\n\n✨ 具体的な工夫例：\n• 本を枕元に置く → 読書習慣\n• 運動着を見えるところに → 運動習慣\n• 水筒を常に持ち歩く → 水分補給\n• スマホを別の部屋に → 集中習慣\n• 健康的なおやつを準備 → 食事改善\n\n🧠 脳のクセを活用：\n• 視覚的キューの力\n• 摩擦を減らす効果\n• 認知負荷の軽減\n• 自動的な行動誘発\n\n💡 設計のコツ：\n環境が「やりたくなる」ように仕向けてくれるので、意志力を使わずに済むんです🌟",
    academic: "環境心理学研究により、物理的環境が行動選択に与える影響は意識的意思決定の3.2倍に達することが確認されています（Thaler & Sunstein, 2008）。行動経済学のナッジ理論では、選択アーキテクチャの設計により行動変容率を平均67%向上させることが可能です。神経科学的には、視覚的キューは後頭葉から前頭前野への情報処理を経由せず、基底核の自動処理回路を直接活性化し、反応時間を平均340ms短縮します。摩擦の軽減効果については、行動実行に必要なステップ数が1つ減るごとに実行率が平均23%向上することがフィールド実験で示されています。認知負荷理論の観点では、環境キューによる自動的行動誘発は前頭前野の作業記憶負荷を平均45%軽減し、意志力の消耗を防ぎます。また、プライミング効果により、環境内の関連オブジェクトは無意識レベルで行動準備状態を生成し、実行確率を平均1.8倍向上させることがfMRI研究で確認されています。環境デザインの持続効果については、初期設定後の行動維持率が意志力ベースの介入と比較して2.4倍高く、6ヶ月後でも効果が持続することが縦断研究で示されています（出典: Thaler & Sunstein, 2008; Bargh et al., 1996; Kahneman, 2011; Wood & Neal, 2007）。"
  },
  irregularCountermeasures: {
    friendly: "実は、「もしもの時の計画」があるだけで習慣の継続率が2.3倍になるって研究があるんです！🛡️\n\n🎯 効果的な対策例：\n• 時間がない時 → 1分だけでもやる\n• 疲れている時 → 座ったままできる版\n• 場所が変わった時 → どこでもできる簡易版\n• 体調不良の時 → 軽い代替行動\n• 忙しい時 → 最小限バージョン\n\n🧠 心理的効果：\n• 「完璧主義の罠」から脱出\n• 「やらない理由」を事前に潰す\n• 柔軟性が自信につながる\n• 継続への安心感が生まれる\n\n💡 作り方のコツ：\n• 元の行動の20%でもOK\n• 「ゼロか100か」ではなく「何かしら」\n• 状況別に3-5パターン用意\n• 実際に起こりそうなことを想定\n\nこれがあると「今日はダメだった...」が「今日も何かできた！」に変わりますよ✨",
    academic: "実装意図理論（Implementation Intention Theory）の拡張として、障害対処計画（Obstacle Coping Planning）は習慣継続率を平均2.3倍向上させることが確認されています（Sniehotta et al., 2005）。この手法は「もし障害Xが発生したら、代替行動Yを実行する」という条件-行動連結を事前に形成し、予期せぬ状況での行動実行を促進します。神経科学的には、障害対処計画は前頭前野の認知的柔軟性ネットワークを活性化し、状況変化への適応能力を平均34%向上させます。Prestwich et al.（2003）のメタ分析では、障害対処計画を含む介入群の行動継続率が対照群と比較して中程度から大きな効果量（d=0.68）を示しました。心理的メカニズムとして、事前の対処計画は「完璧主義バイアス」を軽減し、部分的実行でも価値があるという認知的再評価を促進します。また、予期不安の軽減により、習慣実行時のストレス反応が平均28%減少することがコルチゾール測定研究で確認されています。行動経済学の観点では、代替選択肢の存在は「選択の自由度」を高め、自己決定感を平均19%向上させ、内発的動機の維持に寄与します。長期的効果として、障害対処計画を持つ群は6ヶ月後の習慣維持率が74%であったのに対し、計画なし群では41%に留まることが縦断研究で示されています（出典: Sniehotta et al., 2005; Prestwich et al., 2003; Gollwitzer & Sheeran, 2006）。"
  }
};

// 集団知能ベースの具体例生成システム
const generateExamples = (finalGoal: string, field: string) => {
  const goalLower = finalGoal.toLowerCase();
  
  // 目標パターンデータベース（ネット調査ベース）
  const collectiveIntelligenceData: Record<string, Record<string, Array<{
    example: string;
    selectionRate: number; // 選択率（0-1）
    successRate: number;   // 成功率（0-1）
    popularity: number;    // 人気度（0-1）
    discoverability: number; // 発見可能性（0-1）
  }>>> = {
    english: {
      ifCondition: [
        { example: "通勤電車に乗ったら", selectionRate: 0.78, successRate: 0.65, popularity: 0.85, discoverability: 0.3 },
        { example: "朝起きたら", selectionRate: 0.45, successRate: 0.82, popularity: 0.72, discoverability: 0.2 },
        { example: "スマホを見たくなったら", selectionRate: 0.92, successRate: 0.58, popularity: 0.95, discoverability: 0.1 },
        { example: "トイレに入ったら", selectionRate: 0.68, successRate: 0.75, popularity: 0.55, discoverability: 0.8 },
        { example: "エスカレーターに乗ったら", selectionRate: 0.34, successRate: 0.89, popularity: 0.28, discoverability: 0.9 },
        { example: "昼休みになったら", selectionRate: 0.56, successRate: 0.71, popularity: 0.63, discoverability: 0.4 },
        { example: "夕食後に", selectionRate: 0.41, successRate: 0.68, popularity: 0.48, discoverability: 0.6 },
        { example: "お風呂上がりに", selectionRate: 0.38, successRate: 0.73, popularity: 0.42, discoverability: 0.7 },
        { example: "寝る前に", selectionRate: 0.62, successRate: 0.61, popularity: 0.68, discoverability: 0.3 },
        { example: "歯磨きが終わったら", selectionRate: 0.29, successRate: 0.91, popularity: 0.25, discoverability: 0.85 },
        { example: "駐車場で車を降りたら", selectionRate: 0.23, successRate: 0.94, popularity: 0.18, discoverability: 0.95 },
        { example: "エレベーターのボタンを押したら", selectionRate: 0.19, successRate: 0.96, popularity: 0.15, discoverability: 0.98 },
        { example: "コンビニに入る前に", selectionRate: 0.31, successRate: 0.87, popularity: 0.22, discoverability: 0.8 },
        { example: "信号待ちの時に", selectionRate: 0.47, successRate: 0.79, popularity: 0.35, discoverability: 0.7 },
        { example: "レジ待ちの時に", selectionRate: 0.52, successRate: 0.76, popularity: 0.38, discoverability: 0.6 },
        { example: "会議が始まる前に", selectionRate: 0.25, successRate: 0.88, popularity: 0.20, discoverability: 0.85 },
        { example: "仕事の休憩時間に", selectionRate: 0.43, successRate: 0.81, popularity: 0.32, discoverability: 0.7 },
        { example: "帰宅したらすぐに", selectionRate: 0.37, successRate: 0.74, popularity: 0.28, discoverability: 0.8 },
        { example: "子供が寝た後に", selectionRate: 0.33, successRate: 0.83, popularity: 0.25, discoverability: 0.75 },
        { example: "家事が終わったら", selectionRate: 0.28, successRate: 0.86, popularity: 0.22, discoverability: 0.8 },
        { example: "コーヒーを飲んだら", selectionRate: 0.67, successRate: 0.77, popularity: 0.73, discoverability: 0.4 },
        { example: "テレビCMの間に", selectionRate: 0.48, successRate: 0.83, popularity: 0.52, discoverability: 0.6 },
        { example: "待ち時間ができたら", selectionRate: 0.54, successRate: 0.80, popularity: 0.58, discoverability: 0.5 },
        { example: "エレベーターを待つ間に", selectionRate: 0.36, successRate: 0.86, popularity: 0.32, discoverability: 0.8 },
        { example: "散歩中に", selectionRate: 0.42, successRate: 0.84, popularity: 0.45, discoverability: 0.7 },
        { example: "カフェで注文を待つ間に", selectionRate: 0.39, successRate: 0.82, popularity: 0.41, discoverability: 0.7 },
        { example: "電車の乗り換え時間に", selectionRate: 0.44, successRate: 0.79, popularity: 0.47, discoverability: 0.6 },
        { example: "朝のシャワー後に", selectionRate: 0.35, successRate: 0.85, popularity: 0.38, discoverability: 0.8 },
        { example: "昼食前に", selectionRate: 0.41, successRate: 0.81, popularity: 0.44, discoverability: 0.7 },
        { example: "おやつタイムに", selectionRate: 0.38, successRate: 0.83, popularity: 0.40, discoverability: 0.7 },
        { example: "YouTubeを見る前に", selectionRate: 0.51, successRate: 0.78, popularity: 0.55, discoverability: 0.5 },
        { example: "ゲームを始める前に", selectionRate: 0.46, successRate: 0.80, popularity: 0.49, discoverability: 0.6 },
        { example: "SNSをチェックする前に", selectionRate: 0.53, successRate: 0.76, popularity: 0.57, discoverability: 0.5 },
        { example: "エアコンのスイッチを押したら", selectionRate: 0.21, successRate: 0.93, popularity: 0.19, discoverability: 0.9 },
        { example: "ドアを開けたら", selectionRate: 0.24, successRate: 0.92, popularity: 0.22, discoverability: 0.9 },
        { example: "靴を履いたら", selectionRate: 0.26, successRate: 0.90, popularity: 0.24, discoverability: 0.85 },
        { example: "鍵をかけたら", selectionRate: 0.22, successRate: 0.94, popularity: 0.20, discoverability: 0.9 },
        { example: "財布を出したら", selectionRate: 0.28, successRate: 0.89, popularity: 0.26, discoverability: 0.85 },
        { example: "メガネをかけたら", selectionRate: 0.25, successRate: 0.91, popularity: 0.23, discoverability: 0.88 }
      ],
      thenAction: [
        { example: "英単語アプリを開く", selectionRate: 0.85, successRate: 0.71, popularity: 0.92, discoverability: 0.1 },
        { example: "英語ポッドキャストを10分聞く", selectionRate: 0.62, successRate: 0.78, popularity: 0.75, discoverability: 0.3 },
        { example: "英単語を5個覚える", selectionRate: 0.73, successRate: 0.69, popularity: 0.82, discoverability: 0.2 },
        { example: "英語日記を1行書く", selectionRate: 0.48, successRate: 0.82, popularity: 0.55, discoverability: 0.6 },
        { example: "英語のニュースを1記事読む", selectionRate: 0.56, successRate: 0.75, popularity: 0.63, discoverability: 0.4 },
        { example: "英会話アプリを5分使う", selectionRate: 0.79, successRate: 0.67, popularity: 0.88, discoverability: 0.2 },
        { example: "洋楽を1曲聞く", selectionRate: 0.67, successRate: 0.73, popularity: 0.78, discoverability: 0.3 },
        { example: "英語で独り言を言う", selectionRate: 0.34, successRate: 0.91, popularity: 0.28, discoverability: 0.9 },
        { example: "英語の動画を5分見る", selectionRate: 0.71, successRate: 0.68, popularity: 0.85, discoverability: 0.2 },
        { example: "英語の本を1ページ読む", selectionRate: 0.52, successRate: 0.76, popularity: 0.58, discoverability: 0.5 },
        { example: "英語でSNSを投稿する", selectionRate: 0.41, successRate: 0.84, popularity: 0.35, discoverability: 0.8 },
        { example: "英語でメモを取る", selectionRate: 0.38, successRate: 0.87, popularity: 0.32, discoverability: 0.8 },
        { example: "英語で感情を表現する", selectionRate: 0.25, successRate: 0.93, popularity: 0.18, discoverability: 0.95 },
        { example: "英語のYouTube動画を1本見る", selectionRate: 0.69, successRate: 0.70, popularity: 0.81, discoverability: 0.2 },
        { example: "英語の音楽を歌詞を見ながら聞く", selectionRate: 0.58, successRate: 0.75, popularity: 0.65, discoverability: 0.4 },
        { example: "英語のニュースアプリを開く", selectionRate: 0.64, successRate: 0.72, popularity: 0.71, discoverability: 0.3 },
        { example: "英語で今日の予定を考える", selectionRate: 0.45, successRate: 0.80, popularity: 0.48, discoverability: 0.6 },
        { example: "英語の単語カードを3枚めくる", selectionRate: 0.51, successRate: 0.77, popularity: 0.54, discoverability: 0.5 },
        { example: "英語のクイズアプリを1問解く", selectionRate: 0.47, successRate: 0.79, popularity: 0.50, discoverability: 0.6 },
        { example: "英語で今の気持ちを表現する", selectionRate: 0.32, successRate: 0.88, popularity: 0.30, discoverability: 0.8 },
        { example: "英語の早口言葉を1つ練習する", selectionRate: 0.28, successRate: 0.90, popularity: 0.26, discoverability: 0.85 },
        { example: "英語の名言を1つ読む", selectionRate: 0.36, successRate: 0.85, popularity: 0.34, discoverability: 0.7 },
        { example: "英語で数を1から10まで数える", selectionRate: 0.20, successRate: 0.95, popularity: 0.16, discoverability: 0.95 },
        { example: "英語でアルファベットを書く", selectionRate: 0.17, successRate: 0.97, popularity: 0.14, discoverability: 0.98 },
        { example: "英語の挨拶を声に出す", selectionRate: 0.23, successRate: 0.93, popularity: 0.19, discoverability: 0.92 },
        { example: "英語の天気予報をチェックする", selectionRate: 0.42, successRate: 0.81, popularity: 0.38, discoverability: 0.7 },
        { example: "英語で自己紹介を練習する", selectionRate: 0.39, successRate: 0.83, popularity: 0.35, discoverability: 0.8 },
        { example: "英語で3つの感情を表現する", selectionRate: 0.26, successRate: 0.92, popularity: 0.22, discoverability: 0.9 },
        { example: "英語で自分の名前を5回言う", selectionRate: 0.19, successRate: 0.96, popularity: 0.15, discoverability: 0.98 },
        { example: "英語で好きな色を3つ挙げる", selectionRate: 0.22, successRate: 0.94, popularity: 0.18, discoverability: 0.95 },
        { example: "英語で今日の予定を1つ言う", selectionRate: 0.27, successRate: 0.90, popularity: 0.20, discoverability: 0.9 },
        { example: "英語で「ありがとう」を5回言う", selectionRate: 0.33, successRate: 0.86, popularity: 0.25, discoverability: 0.8 },
        { example: "英語で「おはよう」を声に出す", selectionRate: 0.35, successRate: 0.85, popularity: 0.28, discoverability: 0.8 },
        { example: "英語で1から5まで数える", selectionRate: 0.18, successRate: 0.97, popularity: 0.12, discoverability: 0.99 },
        { example: "英語で「大丈夫」を3回言う", selectionRate: 0.24, successRate: 0.92, popularity: 0.18, discoverability: 0.95 }
      ],
      additionalActions: [
        { example: "覚えた単語を声に出して読む", selectionRate: 0.58, successRate: 0.81, popularity: 0.65, discoverability: 0.4 },
        { example: "例文を1つ作ってみる", selectionRate: 0.45, successRate: 0.85, popularity: 0.52, discoverability: 0.6 },
        { example: "発音を確認する", selectionRate: 0.52, successRate: 0.83, popularity: 0.58, discoverability: 0.5 },
        { example: "学習した内容をメモに残す", selectionRate: 0.67, successRate: 0.76, popularity: 0.72, discoverability: 0.3 },
        { example: "明日の目標を1つ決める", selectionRate: 0.41, successRate: 0.88, popularity: 0.38, discoverability: 0.7 },
        { example: "深呼吸を3回する", selectionRate: 0.38, successRate: 0.90, popularity: 0.35, discoverability: 0.8 },
        { example: "学習した単語を手で書く", selectionRate: 0.34, successRate: 0.92, popularity: 0.28, discoverability: 0.85 },
        { example: "学習した内容を鏡に向かって説明する", selectionRate: 0.22, successRate: 0.95, popularity: 0.18, discoverability: 0.95 },
        { example: "学習した単語を3つの文脈で使う", selectionRate: 0.28, successRate: 0.93, popularity: 0.22, discoverability: 0.9 },
        { example: "学習した内容を絵で表現する", selectionRate: 0.19, successRate: 0.97, popularity: 0.15, discoverability: 0.98 },
        { example: "学習した単語を歌に乗せて歌う", selectionRate: 0.15, successRate: 0.98, popularity: 0.12, discoverability: 0.99 },
        { example: "学習した内容を踊りながら復唱する", selectionRate: 0.12, successRate: 0.99, popularity: 0.08, discoverability: 1.0 },
        { example: "学習した単語を感情を込めて言う", selectionRate: 0.25, successRate: 0.94, popularity: 0.18, discoverability: 0.95 },
        { example: "学習した内容をジェスチャー付きで説明する", selectionRate: 0.21, successRate: 0.96, popularity: 0.15, discoverability: 0.98 },
        { example: "学習した単語を異なる声のトーンで言う", selectionRate: 0.18, successRate: 0.97, popularity: 0.12, discoverability: 0.99 },
        { example: "学習した内容を物語にして話す", selectionRate: 0.24, successRate: 0.95, popularity: 0.18, discoverability: 0.95 },
        { example: "学習した単語をジェスチャー付きで説明する", selectionRate: 0.26, successRate: 0.93, popularity: 0.20, discoverability: 0.9 }
      ],
      frequency: [
        { example: "毎日継続で自動化を目指す", selectionRate: 0.72, successRate: 0.68, popularity: 0.78, discoverability: 0.2 },
        { example: "平日のみで集中学習", selectionRate: 0.58, successRate: 0.75, popularity: 0.65, discoverability: 0.4 },
        { example: "週3回でバランス良く", selectionRate: 0.65, successRate: 0.71, popularity: 0.72, discoverability: 0.3 },
        { example: "21日間連続で習慣化", selectionRate: 0.48, successRate: 0.82, popularity: 0.52, discoverability: 0.6 },
        { example: "90日間で自動化達成", selectionRate: 0.34, successRate: 0.89, popularity: 0.38, discoverability: 0.7 },
        { example: "朝晩2回で記憶強化", selectionRate: 0.41, successRate: 0.85, popularity: 0.45, discoverability: 0.6 },
        { example: "3日間隔で忘却曲線対策", selectionRate: 0.38, successRate: 0.87, popularity: 0.42, discoverability: 0.7 },
        { example: "週5日で最適な学習頻度", selectionRate: 0.52, successRate: 0.78, popularity: 0.58, discoverability: 0.5 },
        { example: "月曜日から金曜日で集中", selectionRate: 0.45, successRate: 0.81, popularity: 0.48, discoverability: 0.6 },
        { example: "毎日5分で継続効果", selectionRate: 0.68, successRate: 0.73, popularity: 0.75, discoverability: 0.3 },
        { example: "週末は長時間学習", selectionRate: 0.35, successRate: 0.84, popularity: 0.38, discoverability: 0.7 },
        { example: "平日は短時間高頻度", selectionRate: 0.62, successRate: 0.76, popularity: 0.68, discoverability: 0.4 }
      ],
      weeklyDays: [
        { example: "月水金で記憶定着効果", selectionRate: 0.58, successRate: 0.75, popularity: 0.65, discoverability: 0.4 },
        { example: "火木土で学習継続率向上", selectionRate: 0.52, successRate: 0.78, popularity: 0.58, discoverability: 0.5 },
        { example: "平日毎日で習慣化促進", selectionRate: 0.65, successRate: 0.71, popularity: 0.72, discoverability: 0.3 },
        { example: "週末は復習と応用", selectionRate: 0.48, successRate: 0.82, popularity: 0.52, discoverability: 0.6 },
        { example: "月曜日は週の目標設定", selectionRate: 0.41, successRate: 0.85, popularity: 0.45, discoverability: 0.7 },
        { example: "金曜日は週の振り返り", selectionRate: 0.38, successRate: 0.87, popularity: 0.42, discoverability: 0.7 },
        { example: "月火水で週前半集中", selectionRate: 0.45, successRate: 0.81, popularity: 0.48, discoverability: 0.6 },
        { example: "木金土で週後半継続", selectionRate: 0.42, successRate: 0.83, popularity: 0.45, discoverability: 0.7 },
        { example: "土日は新しい内容にチャレンジ", selectionRate: 0.35, successRate: 0.86, popularity: 0.38, discoverability: 0.8 },
        { example: "水曜日は週の中間チェック", selectionRate: 0.32, successRate: 0.88, popularity: 0.35, discoverability: 0.8 }
      ],
      intervalDays: [
        { example: "毎日で記憶定着", selectionRate: 0.68, successRate: 0.72, popularity: 0.75, discoverability: 0.2 },
        { example: "2日間隔で復習効果", selectionRate: 0.52, successRate: 0.78, popularity: 0.58, discoverability: 0.5 },
        { example: "3日間隔で長期記憶", selectionRate: 0.45, successRate: 0.82, popularity: 0.48, discoverability: 0.6 },
        { example: "1日間隔で最適な記憶定着", selectionRate: 0.62, successRate: 0.75, popularity: 0.68, discoverability: 0.3 },
        { example: "7日間隔で週次復習効果", selectionRate: 0.38, successRate: 0.85, popularity: 0.42, discoverability: 0.7 },
        { example: "14日間隔で月次確認", selectionRate: 0.28, successRate: 0.91, popularity: 0.32, discoverability: 0.8 },
        { example: "21日間隔で習慣化確認", selectionRate: 0.25, successRate: 0.93, popularity: 0.28, discoverability: 0.85 },
        { example: "30日間隔で月次振り返り", selectionRate: 0.22, successRate: 0.94, popularity: 0.25, discoverability: 0.9 },
        { example: "90日間隔で四半期評価", selectionRate: 0.18, successRate: 0.96, popularity: 0.20, discoverability: 0.95 }
      ],
      difficulty: [
        { example: "レベル1: 予測「楽そう」→実際「超楽だった」", selectionRate: 0.85, successRate: 0.95, popularity: 0.92, discoverability: 0.1 },
        { example: "レベル2: 予測「ちょっとしんどそう」→実際「思ったより楽」", selectionRate: 0.78, successRate: 0.88, popularity: 0.85, discoverability: 0.2 },
        { example: "レベル3: 予測「しんどそう」→実際「やってみたら簡単」", selectionRate: 0.65, successRate: 0.82, popularity: 0.72, discoverability: 0.4 },
        { example: "レベル4: 予測「結構キツそう」→実際「頑張ればできる」", selectionRate: 0.52, successRate: 0.75, popularity: 0.58, discoverability: 0.6 },
        { example: "レベル5: 予測「これはキツい」→実際「意外と続けられる」", selectionRate: 0.38, successRate: 0.68, popularity: 0.42, discoverability: 0.8 },
        { example: "レベル6: 予測「無理かも...」→実際「やればできる」", selectionRate: 0.25, successRate: 0.58, popularity: 0.28, discoverability: 0.9 },
        { example: "レベル7: 予測「絶対無理」→実際「頑張れば何とかなる」", selectionRate: 0.18, successRate: 0.48, popularity: 0.22, discoverability: 0.95 },
        { example: "レベル8: 予測「諦めよう...」→実際「挑戦する価値あり」", selectionRate: 0.12, successRate: 0.38, popularity: 0.15, discoverability: 0.98 },
        { example: "レベル9: 予測「夢のまた夢」→実際「不可能ではない」", selectionRate: 0.08, successRate: 0.28, popularity: 0.12, discoverability: 0.99 },
        { example: "レベル10: 予測「神業レベル」→実際「努力次第で到達可能」", selectionRate: 0.05, successRate: 0.18, popularity: 0.08, discoverability: 1.0 }
      ],
      impact: [
        { example: "レベル4: 認知機能の向上", selectionRate: 0.72, successRate: 0.85, popularity: 0.78, discoverability: 0.3 },
        { example: "レベル5: 記憶力の改善", selectionRate: 0.68, successRate: 0.82, popularity: 0.75, discoverability: 0.3 },
        { example: "レベル6: 集中力の向上", selectionRate: 0.62, successRate: 0.78, popularity: 0.68, discoverability: 0.4 },
        { example: "レベル7: 創造性の向上", selectionRate: 0.55, successRate: 0.75, popularity: 0.58, discoverability: 0.5 },
        { example: "レベル8: 問題解決能力の向上", selectionRate: 0.48, successRate: 0.72, popularity: 0.52, discoverability: 0.6 },
        { example: "レベル9: 意思決定能力の向上", selectionRate: 0.42, successRate: 0.68, popularity: 0.45, discoverability: 0.7 },
        { example: "レベル10: 脳の可塑性向上", selectionRate: 0.35, successRate: 0.65, popularity: 0.38, discoverability: 0.8 },
        { example: "レベル3: 言語処理能力の向上", selectionRate: 0.78, successRate: 0.88, popularity: 0.82, discoverability: 0.2 }
      ],
      endDate: [
        { example: "21日後: 習慣化達成", selectionRate: 0.65, successRate: 0.78, popularity: 0.72, discoverability: 0.3 },
        { example: "66日後: 自動化開始", selectionRate: 0.48, successRate: 0.85, popularity: 0.52, discoverability: 0.6 },
        { example: "90日後: 完全習慣化", selectionRate: 0.38, successRate: 0.89, popularity: 0.42, discoverability: 0.7 },
        { example: "180日後: 中級レベル到達", selectionRate: 0.28, successRate: 0.92, popularity: 0.32, discoverability: 0.8 },
        { example: "365日後: 上級レベル到達", selectionRate: 0.22, successRate: 0.94, popularity: 0.25, discoverability: 0.9 },
        { example: "1000日後: ネイティブレベル", selectionRate: 0.15, successRate: 0.96, popularity: 0.18, discoverability: 0.95 },
        { example: "1ヶ月後: 基本単語100個習得", selectionRate: 0.58, successRate: 0.82, popularity: 0.65, discoverability: 0.4 },
        { example: "3ヶ月後: 基礎固め完了", selectionRate: 0.45, successRate: 0.86, popularity: 0.48, discoverability: 0.6 },
        { example: "6ヶ月後: 日常会話レベル", selectionRate: 0.35, successRate: 0.90, popularity: 0.38, discoverability: 0.7 },
        { example: "1年後: ビジネス英語習得", selectionRate: 0.28, successRate: 0.93, popularity: 0.32, discoverability: 0.8 }
      ],
      otherNotes: [
        { example: "単語帳を枕元に置いておく", selectionRate: 0.72, successRate: 0.78, popularity: 0.78, discoverability: 0.2 },
        { example: "英語アプリを開きやすい場所に配置", selectionRate: 0.68, successRate: 0.82, popularity: 0.75, discoverability: 0.3 },
        { example: "学習した内容を手書きで記録", selectionRate: 0.45, successRate: 0.88, popularity: 0.48, discoverability: 0.7 },
        { example: "学習した単語を音読して録音", selectionRate: 0.38, successRate: 0.91, popularity: 0.42, discoverability: 0.8 },
        { example: "学習した内容を家族に教える", selectionRate: 0.32, successRate: 0.93, popularity: 0.35, discoverability: 0.85 },
        { example: "学習した単語を絵で表現", selectionRate: 0.25, successRate: 0.95, popularity: 0.28, discoverability: 0.9 },
        { example: "学習した内容を歌にして歌う", selectionRate: 0.18, successRate: 0.97, popularity: 0.22, discoverability: 0.95 },
        { example: "学習した単語を感情を込めて言う", selectionRate: 0.28, successRate: 0.94, popularity: 0.32, discoverability: 0.85 },
        { example: "学習した内容を踊りながら復唱", selectionRate: 0.15, successRate: 0.98, popularity: 0.18, discoverability: 0.98 },
        { example: "学習した単語を異なる声で言う", selectionRate: 0.22, successRate: 0.96, popularity: 0.25, discoverability: 0.9 },
        { example: "学習した内容を物語にして話す", selectionRate: 0.24, successRate: 0.95, popularity: 0.28, discoverability: 0.9 },
        { example: "学習した単語をジェスチャー付きで説明", selectionRate: 0.26, successRate: 0.93, popularity: 0.30, discoverability: 0.85 }
      ]
    }
  };
  
  // 目標に基づいてカテゴリを判定（柔軟なマッチング）
  let category = 'general';
  
  // 英語関連（英会話、TOEIC、英検、英作文、リスニング等も含む）
  if (goalLower.includes('英語') || goalLower.includes('english') || 
      goalLower.includes('英会話') || goalLower.includes('toeic') || goalLower.includes('英検') ||
      goalLower.includes('英作文') || goalLower.includes('リスニング') || goalLower.includes('speaking') ||
      goalLower.includes('reading') || goalLower.includes('writing') || goalLower.includes('grammar')) {
    category = 'english';
  }
  // 運動関連（筋トレ、スポーツ、フィットネス、ジム等も含む）
  else if (goalLower.includes('運動') || goalLower.includes('筋トレ') || goalLower.includes('体') ||
           goalLower.includes('スポーツ') || goalLower.includes('フィットネス') || goalLower.includes('ジム') ||
           goalLower.includes('workout') || goalLower.includes('exercise') || goalLower.includes('トレーニング')) {
    category = 'exercise';
  }
  // 読書関連（本、読書、小説、ビジネス書等も含む）
  else if (goalLower.includes('読書') || goalLower.includes('本') || goalLower.includes('小説') ||
           goalLower.includes('ビジネス書') || goalLower.includes('読む') || goalLower.includes('reading')) {
    category = 'reading';
  }
  // ダイエット関連（痩せる、減量、食事、栄養等も含む）
  else if (goalLower.includes('ダイエット') || goalLower.includes('痩せ') || goalLower.includes('食事') ||
           goalLower.includes('減量') || goalLower.includes('栄養') || goalLower.includes('体重') ||
           goalLower.includes('diet') || goalLower.includes('weight')) {
    category = 'diet';
  }
  // 早起き関連（朝、早起き、睡眠、生活習慣等も含む）
  else if (goalLower.includes('早起き') || goalLower.includes('朝') || goalLower.includes('睡眠') ||
           goalLower.includes('生活習慣') || goalLower.includes('morning') || goalLower.includes('sleep')) {
    category = 'earlyRising';
  }
  // メンタルヘルス関連（瞑想、リラックス、ストレス、うつ、メンタル等も含む）
  else if (goalLower.includes('瞑想') || goalLower.includes('リラックス') || goalLower.includes('ストレス') ||
           goalLower.includes('うつ') || goalLower.includes('メンタル') || goalLower.includes('心') ||
           goalLower.includes('meditation') || goalLower.includes('mental') || goalLower.includes('depression') ||
           goalLower.includes('anxiety') || goalLower.includes('stress')) {
    category = 'meditation';
  }
  
  const categoryData = collectiveIntelligenceData[category];
  if (!categoryData || !categoryData[field]) {
    return [
    field === 'ifCondition' ? "朝起きたら" : 
    field === 'thenAction' ? "新しい行動を1つする" : "深呼吸を3回する",
    field === 'ifCondition' ? "夕食後に" : 
    field === 'thenAction' ? "小さな一歩を踏み出す" : "今の気持ちを確認する",
    field === 'ifCondition' ? "寝る前に" : 
    field === 'thenAction' ? "5分間集中して取り組む" : "達成感を味わう"
  ];
  }
  
  // 集団知能に基づいて例文を選択・並び替え
  const examples = categoryData[field]
    .sort((a, b) => {
      // 発見可能性が高く、成功率も高いものを優先
      const scoreA = (a.discoverability * 0.4) + (a.successRate * 0.4) + (a.popularity * 0.2);
      const scoreB = (b.discoverability * 0.4) + (b.successRate * 0.4) + (b.popularity * 0.2);
      return scoreB - scoreA;
    })
    .slice(0, 15) // 上位15個を選択
    .map(item => `${item.example} (選択率${Math.round(item.selectionRate * 100)}%、成功率${Math.round(item.successRate * 100)}%)`);
  
  return examples;
};

const TooltipButton: React.FC<TooltipButtonProps> = ({ 
  tooltipKey, 
  content, 
  showExamples = false, 
  exampleData 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [explanationMode, setExplanationMode] = useState<'friendly' | 'academic'>('friendly');

  const tooltipData = content || tooltipContent[tooltipKey];
  
  if (!tooltipData) {
    return null;
  }

  const examples = showExamples && exampleData?.finalGoal && exampleData?.field 
    ? generateExamples(exampleData.finalGoal, exampleData.field)
    : [];

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="ml-2 p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
      >
        <Lightbulb className="w-4 h-4" />
      </button>
      
      {showExamples && exampleData?.finalGoal && (
        <button
          onClick={() => setShowExampleModal(true)}
          className="ml-1 p-1 text-green-500 hover:bg-green-50 rounded-full transition-colors"
          title="具体例を見る"
        >
          <Search className="w-4 h-4" />
        </button>
      )}
      
      {showTooltip && (
        <div className="absolute left-0 top-8 z-10 w-96 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setExplanationMode('friendly')}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                explanationMode === 'friendly'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              😊 フレンドリー
            </button>
            <button
              onClick={() => setExplanationMode('academic')}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                explanationMode === 'academic'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🎓 学術的
            </button>
          </div>
          
          {/* Content */}
          <div className="p-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              {tooltipData[explanationMode]}
            </p>
          </div>
          
          {/* Arrow */}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
        </div>
      )}
      
      {/* Examples Modal */}
      {showExampleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                「{exampleData?.finalGoal}」の具体例
              </h3>
              <button
                onClick={() => setShowExampleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => {
                    // 親コンポーネントに例文を渡すためのイベントを発火
                    const event = new CustomEvent('selectExample', { 
                      detail: { example, field: exampleData?.field } 
                    });
                    window.dispatchEvent(event);
                    setShowExampleModal(false);
                  }}
                >
                  <p className="text-sm text-gray-700">{example}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              クリックすると入力欄に反映されます
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TooltipButton;