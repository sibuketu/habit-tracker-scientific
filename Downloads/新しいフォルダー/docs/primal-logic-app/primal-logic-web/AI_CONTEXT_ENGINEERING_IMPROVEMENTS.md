# CarnivoreGuid AIチャット機能のコンテキストエンジニアリング改善案

## 2025年版 大規模言語モデルにおけるコンテキストエンジニアリング実践ガイド適用

## 1. 現状の課題

現在のAIチャット機能は、自然言語中心のプロンプトを使用しており、以下の課題があります：
- プロンプトの構造が曖昧で、モデルの推論精度が最適化されていない
- 思考プロセスが可視化されていない
- 事実確認（検証）のステップがない
- 既存知識の誤りを防ぐ仕組みが不十分

## 2. 改善案

### 2.1 構造化プロンプトの導入（XMLタグ使用）

Claude等の最新モデルは、XMLタグで情報の境界を明示することで性能が最大化します。

**改善前（現状）**:
```
あなたはカーニボア専門家です。以下の情報に基づいて回答してください。
...
```

**改善後（XML構造化）**:
```xml
<system_prompt>
  <role_definition>
    あなたはカーニボアダイエットの専門家（Dr. Ken Berry、Dr. Shawn Baker、Dr. Paul Saladino、Dr. Anthony Chaffee、Dr. Bart Kay）のクローンです。論理的整合性を最優先してください。
  </role_definition>
  <behavioral_guidelines>
    <default_to_action>
      曖昧な点は合理的に推測し、能動的に解決策を提案してください。
    </default_to_action>
    <citation_requirement>
      回答の全センテンスに、根拠となる専門家名または研究名を付記すること。
    </citation_requirement>
  </behavioral_guidelines>
</system_prompt>

<context>
  <expert_knowledge>
    <!-- Carnivore専門家の情報 -->
  </expert_knowledge>
  <constraints>
    - 専門用語には英語を併記すること
    - 箇条書きより論理的な文章を優先すること
    - 既存知識を盲信せず、不確実な情報は「分からない」と認めること
  </constraints>
</context>

<input_data>
  {{USER_QUERY}}
</input_data>

<instruction>
  <thinking>タグ内で思考プロセスを展開した後、<answer>タグで回答してください。
  <verification>タグで事実確認を行い、<final_answer>タグで最終回答を提供してください。
</instruction>
```

### 2.2 Chain of Thought (CoT) の言語分離

複雑な論理推論を行う際、**「思考（Thinking）は英語で行い、回答（Answer）は日本語で出力する」**手法を採用します。

**実装例**:
```typescript
const prompt = `
Please perform logical reasoning in English inside <thinking> tags, 
then provide the final response in Japanese inside <answer> tags.

<thinking>
[English reasoning process]
</thinking>

<answer>
[Japanese final answer]
</answer>
`;
```

### 2.3 Chain of Verification (CoVe) による自己検証

事実確認が必要なタスクでは、以下の4ステップをモデルに踏ませます。

**実装フロー**:
1. **ベースライン作成**: とりあえず回答案を作る
2. **検証計画**: 回答案に含まれる事実（ファクト）を検証する質問リストを作る
3. **検証実行**: 各質問に独立して回答し、事実確認を行う
4. **最終回答**: 検証結果に基づき、最初の回答案を修正する

**プロンプト例**:
```xml
<instruction>
  <step1_baseline>
    まず、ユーザーの質問に対する回答を作成してください。
  </step1_baseline>
  
  <step2_verification_plan>
    回答に含まれる事実（ファクト）を検証する質問リストを作成してください。
  </step2_verification_plan>
  
  <step3_verification_execution>
    各質問に独立して回答し、事実確認を行ってください。
  </step3_verification_execution>
  
  <step4_final_answer>
    検証結果に基づき、最初の回答案を修正して最終回答を提供してください。
  </step4_final_answer>
</instruction>
```

### 2.4 既存知識の誤りを防ぐ（RAGと引用）

外部データを使うRAGシステムでは、モデルの「知ったかぶり」を防ぐ厳格な制約が必要です。

**改善案**:
- **引用の強制**: 「回答の全センテンスに、根拠となるドキュメントIDを付記すること」と指示
- **JSON出力**: 回答と引用元を分離したJSON形式で出力させ、プログラム側で「引用のない回答」を機械的に弾く設計

**実装例**:
```typescript
interface AIResponse {
  answer: string;
  citations: Array<{
    sentence: string;
    source: string; // 専門家名または研究名
    confidence: number; // 0-1
  }>;
  verification_status: 'verified' | 'uncertain' | 'needs_human_review';
}
```

### 2.5 人間とAIの協調（Human-in-the-Loop）

完全自動化よりも、人間が承認・修正を行うワークフローが信頼性を担保します。

**実装パターン**:

1. **承認ゲート (Gatekeeper)**
   - 重要なアクション（医学的アドバイス等）の直前で一時停止し、人間の承認を待つ
   - `<requires_approval>true</requires_approval>` を出力させる

2. **反復的洗練 (Sculptor)**
   - AIの草案に対し人間がフィードバックし、AIが修正するループ
   - 編集者とライターの関係性をエミュレート

3. **ルーター (Concierge)**
   - 難易度やリスクに応じて、AIが自律処理するか人間に回すかを振り分ける
   - 「法的リスクがある場合は escalate_to_human ツールを使え」と指示

## 3. 実装優先順位

### Phase 1: 即座に実装可能（高優先度）
1. **構造化プロンプトの導入（XMLタグ使用）**
   - プロンプトをXML構造に変更
   - 思考プロセスを可視化

2. **Chain of Thought (CoT) の言語分離**
   - 思考は英語、回答は日本語
   - 推論精度の向上

### Phase 2: 中期的に実装（中優先度）
3. **Chain of Verification (CoVe) による自己検証**
   - 事実確認のステップを追加
   - ハルシネーション抑制

4. **既存知識の誤りを防ぐ（RAGと引用）**
   - 引用の強制
   - JSON出力形式の導入

### Phase 3: 長期的に実装（低優先度）
5. **人間とAIの協調（Human-in-the-Loop）**
   - 承認ゲートの実装
   - 反復的洗練のループ

## 4. 実装例（TypeScript）

```typescript
interface StructuredPrompt {
  system_prompt: {
    role_definition: string;
    behavioral_guidelines: {
      default_to_action: string;
      citation_requirement: string;
    };
  };
  context: {
    expert_knowledge: string;
    constraints: string[];
  };
  input_data: string;
  instruction: {
    thinking: string;
    verification?: string;
    final_answer: string;
  };
}

async function chatWithAIStructured(
  userMessage: string,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<AIResponse> {
  const structuredPrompt: StructuredPrompt = {
    system_prompt: {
      role_definition: "あなたはカーニボアダイエットの専門家（Dr. Ken Berry、Dr. Shawn Baker、Dr. Paul Saladino、Dr. Anthony Chaffee、Dr. Bart Kay）のクローンです。",
      behavioral_guidelines: {
        default_to_action: "曖昧な点は合理的に推測し、能動的に解決策を提案してください。",
        citation_requirement: "回答の全センテンスに、根拠となる専門家名または研究名を付記すること。"
      }
    },
    context: {
      expert_knowledge: expertContext, // 既存の専門家情報
      constraints: [
        "専門用語には英語を併記すること",
        "箇条書きより論理的な文章を優先すること",
        "既存知識を盲信せず、不確実な情報は「分からない」と認めること"
      ]
    },
    input_data: userMessage,
    instruction: {
      thinking: "Please perform logical reasoning in English inside <thinking> tags.",
      verification: "Verify facts in <verification> tags.",
      final_answer: "Provide final answer in Japanese inside <final_answer> tags."
    }
  };

  const prompt = `
<system_prompt>
  <role_definition>${structuredPrompt.system_prompt.role_definition}</role_definition>
  <behavioral_guidelines>
    <default_to_action>${structuredPrompt.system_prompt.behavioral_guidelines.default_to_action}</default_to_action>
    <citation_requirement>${structuredPrompt.system_prompt.behavioral_guidelines.citation_requirement}</citation_requirement>
  </behavioral_guidelines>
</system_prompt>

<context>
  <expert_knowledge>${structuredPrompt.context.expert_knowledge}</expert_knowledge>
  <constraints>
    ${structuredPrompt.context.constraints.map(c => `- ${c}`).join('\n')}
  </constraints>
</context>

<input_data>
${structuredPrompt.input_data}
</input_data>

<instruction>
  ${structuredPrompt.instruction.thinking}
  ${structuredPrompt.instruction.verification || ''}
  ${structuredPrompt.instruction.final_answer}
</instruction>
`;

  // Gemini API呼び出し
  const model = genAI!.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent(prompt);
  
  // レスポンスのパースと検証
  const response = result.response.text();
  return parseStructuredResponse(response);
}
```

## 5. 期待される効果

1. **推論精度の向上**: XML構造化とCoT言語分離により、論理推論がより正確に
2. **ハルシネーション抑制**: CoVeによる自己検証で、誤情報を削減
3. **信頼性の向上**: 引用の強制とHuman-in-the-Loopで、より信頼できる回答
4. **透明性の向上**: 思考プロセスの可視化で、ユーザーがAIの判断過程を理解可能

## 6. 次のステップ

1. Phase 1の実装を開始（構造化プロンプトとCoT言語分離）
2. 既存のAIチャット機能との比較テスト
3. ユーザーフィードバックを収集
4. Phase 2、Phase 3の実装を段階的に進める

