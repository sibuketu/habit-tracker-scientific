/**
 * CarnivoreOS - 利用規紁E��面
 */

import './TermsOfServiceScreen.css';

export default function TermsOfServiceScreen() {
  return (
    <div className="terms-of-service-screen">
      <div className="terms-of-service-container">
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'settings' }));
          }}
          className="terms-of-service-back-button"
        >
          ↁE設定に戻めE        </button>
        <h1 className="terms-of-service-title">利用規紁E/h1>
        <div className="terms-of-service-content">
          <p className="terms-of-service-updated">最終更新日: 2025年1朁E日</p>

          <section className="terms-of-service-section">
            <h2>1. はじめに</h2>
            <p>
              本利用規紁E��以下「本規紁E��）�E、Primal
              Logic�E�以下「当アプリ」）�E利用条件を定めるものです、E              当アプリを利用することにより、本規紁E��同意したも�Eとみなされます、E            </p>
          </section>

          <section className="terms-of-service-section">
            <h2>2. サービスの冁E��</h2>
            <p>当アプリは、カーニ�EアダイエチE��管琁E��プリとして、以下�E機�Eを提供します！E/p>
            <ul>
              <li>栁E��素追跡�E�E00頁E��以上�E栁E��素�E�E/li>
              <li>動的目標値計算（ユーザープロファイルに基づく！E/li>
              <li>食事記録と履歴管琁E/li>
              <li>AIチャチE���E�カーニ�EアダイエチE��に関する質問対応！E/li>
              <li>統計�Eグラフ表示</li>
              <li>日記機�E</li>
            </ul>
          </section>

          <section className="terms-of-service-section">
            <h2>3. 利用賁E��</h2>
            <p>当アプリは、以下�E条件を満たす方にご利用ぁE��だけます！E/p>
            <ul>
              <li>18歳以上であること�E�保護老E�E同意がある場合�E除く！E/li>
              <li>本規紁E��同意すること</li>
              <li>正確な惁E��を提供すること</li>
            </ul>
          </section>

          <section className="terms-of-service-section">
            <h2>4. アカウンチE/h2>
            <h3>4.1 アカウント�E作�E</h3>
            <p>
              当アプリを使用するには、アカウントを作�Eする忁E��があります、E              アカウント作�E時には、正確な惁E��を提供してください、E            </p>

            <h3>4.2 アカウント�E管琁E/h3>
            <p>
              アカウント�E管琁E�E、ユーザーの責任です、E              パスワード�E管琁E��不正アクセスの防止に努めてください、E            </p>

            <h3>4.3 アカウント�E削除</h3>
            <p>
              ユーザーは、いつでもアカウントを削除できます、E              アカウント削除時には、E��連するチE�Eタも削除されます、E            </p>
          </section>

          <section className="terms-of-service-section">
            <h2>5. 禁止事頁E/h2>
            <p>以下�E行為は禁止されてぁE��す！E/p>
            <ul>
              <li>当アプリの機�Eを不正に使用すること</li>
              <li>他�Eユーザーのアカウントに不正にアクセスすること</li>
              <li>当アプリのシスチE��めE��ータを破壊、改ざんすること</li>
              <li>当アプリの知皁E��産権を侵害すること</li>
              <li>法令に違反する行為</li>
            </ul>
          </section>

          <section className="terms-of-service-section">
            <h2>6. 免責事頁E/h2>
            <h3>6.1 医療アドバイス</h3>
            <p>
              当アプリは、医療アドバイスを提供するものではありません、E              健康に関する重要な決定�E、忁E��医療専門家に相諁E��てください、E            </p>

            <h3>6.2 惁E��の正確性</h3>
            <p>
              当アプリは、情報の正確性につぁE��保証しません、E              栁E��素チE�EタめE��算結果は参老E��報としてご利用ください、E            </p>

            <h3>6.3 サービスの中断</h3>
            <p>
              当アプリは、予告なくサービスを中断、終亁E��る場合があります、E              これにより生じた損害につぁE��、当アプリは責任を負ぁE��せん、E            </p>
          </section>

          <section className="terms-of-service-section">
            <h2>7. 知皁E��産権</h2>
            <p>
              当アプリのコンチE��チE��デザイン、ロゴ、商標などは、当アプリの知皁E��産です、E              無断で褁E��、転載、改変することは禁止されてぁE��す、E            </p>
          </section>

          <section className="terms-of-service-section">
            <h2>8. 規紁E�E変更</h2>
            <p>
              本規紁E�E、予告なく変更される場合があります、E              重要な変更がある場合�E、アプリ冁E��通知します、E            </p>
          </section>

          <section className="terms-of-service-section">
            <h2>9. 準拠況E/h2>
            <p>本規紁E�E、日本法に準拠し、解釈されます、E/p>
          </section>

          <section className="terms-of-service-section">
            <h2>10. お問ぁE��わせ</h2>
            <p>本規紁E��関するご質問�E、設定画面からお問ぁE��わせください、E/p>
          </section>
        </div>
      </div>
    </div>
  );
}

