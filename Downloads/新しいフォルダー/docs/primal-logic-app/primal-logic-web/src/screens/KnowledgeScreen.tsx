/**
 * CarnivoreOS - Knowledge Screen (逅・ｫ匁ｭｦ陬・Δ繝ｼ繝・
 *
 * 繧ｫ繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｫ髢｢縺吶ｋ荳闊ｬ逧・↑隱､隗｣・・yth・峨→遘大ｭｦ逧・悄螳滂ｼ・ruth・峨ｒ陦ｨ遉ｺ
 * 繧ｫ繝ｼ繝牙梛縺ｮ繝ｪ繧ｹ繝郁｡ｨ遉ｺ縺ｧ縲｀yth繧偵ち繝・・縺吶ｋ縺ｨTruth縺ｨSource縺瑚｡ｨ遉ｺ縺輔ｌ繧・ */

import { useState, useMemo } from 'react';
import {
  KNOWLEDGE_BASE,
  getAllCategories,
  getKnowledgeByCategory,
  type KnowledgeItem,
} from '../data/knowledgeBase';
import './KnowledgeScreen.css';

export default function KnowledgeScreen() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeItem['category'] | 'All'>(
    'All'
  );

  const categories = useMemo(() => ['All', ...getAllCategories()] as const, []);
  const filteredKnowledge = useMemo(() => {
    if (selectedCategory === 'All') {
      return KNOWLEDGE_BASE;
    }
    return getKnowledgeByCategory(selectedCategory);
  }, [selectedCategory]);

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="knowledge-screen-container">
      <div className="knowledge-screen-header">
        <h1 className="knowledge-screen-title">孱・・Logic Armor (逅・ｫ匁ｭｦ陬・</h1>
        <p className="knowledge-screen-subtitle">
          繧ｫ繝ｼ繝九・繧｢縺ｫ蟇ｾ縺吶ｋ隱､隗｣繧定ｧ｣縺阪∫ｧ大ｭｦ逧・ｹ諡縺ｧ豁ｦ陬・☆繧・        </p>
      </div>

      {/* 繧ｫ繝・ざ繝ｪ繝輔ぅ繝ｫ繧ｿ繝ｼ */}
      <div className="knowledge-category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`knowledge-category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'All'
              ? '縺吶∋縺ｦ'
              : category === 'Digestion'
                ? '豸亥喧'
                : category === 'Heart Health'
                  ? '蠢・∮'
                  : category === 'Long-term Health'
                    ? '髟ｷ譛溷▼蠎ｷ'
                    : category === 'Nutrition'
                      ? '譬・､・
                      : '縺昴・莉・}
          </button>
        ))}
      </div>

      {/* 遏･隴倥き繝ｼ繝峨Μ繧ｹ繝・*/}
      <div className="knowledge-cards-container">
        {filteredKnowledge.map((item) => {
          const isFlipped = flippedCards.has(item.id);
          return (
            <div
              key={item.id}
              className={`knowledge-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => toggleCard(item.id)}
            >
              <div className="knowledge-card-inner">
                {/* 陦ｨ髱｢・・yth・・*/}
                <div className="knowledge-card-front">
                  <div className="knowledge-card-category">{item.category}</div>
                  <h3 className="knowledge-card-title">{item.title}</h3>
                  <div className="knowledge-card-myth">
                    <div className="knowledge-card-label">笶・Myth (隱､隗｣)</div>
                    <p className="knowledge-card-text">{item.myth}</p>
                  </div>
                  <div className="knowledge-card-hint">繧ｿ繝・・縺励※逵溷ｮ溘ｒ隕九ｋ 竊・/div>
                </div>

                {/* 陬城擇・・ruth + Source・・*/}
                <div className="knowledge-card-back">
                  <div className="knowledge-card-category">{item.category}</div>
                  <h3 className="knowledge-card-title">{item.title}</h3>
                  <div className="knowledge-card-truth">
                    <div className="knowledge-card-label">笨・Truth (逵溷ｮ・</div>
                    <p className="knowledge-card-text">{item.truth}</p>
                  </div>
                  <div className="knowledge-card-details">
                    <div className="knowledge-card-label">当 Details</div>
                    <p className="knowledge-card-text">{item.details}</p>
                  </div>
                  <div className="knowledge-card-source">
                    <div className="knowledge-card-label">溌 Source</div>
                    <p className="knowledge-card-text">{item.source}</p>
                  </div>
                  <div className="knowledge-card-hint">繧ｿ繝・・縺励※謌ｻ繧・竊・/div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredKnowledge.length === 0 && (
        <div className="knowledge-empty-state">
          <p>縺薙・繧ｫ繝・ざ繝ｪ縺ｫ縺ｯ遏･隴倥′縺ゅｊ縺ｾ縺帙ｓ</p>
        </div>
      )}
    </div>
  );
}

