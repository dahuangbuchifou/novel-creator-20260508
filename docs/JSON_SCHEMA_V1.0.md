# 6 维分析 JSON Schema v1.0

## 一、用途

本 Schema 用于将小说/网文原文拆解为结构化数据，作为后续续写、改写、规划和一致性校验的基础输入。

**核心目标：**
- 让 AI 分析结果可被程序读取
- 降低生成阶段发散风险
- 保证人物、世界观、情节、情绪、文风稳定
- 支持后续模块化调用

---

## 二、顶层结构

```json
{
  "metadata": {},
  "theme": {},
  "characters": [],
  "world_rules": {},
  "plot_engine": {},
  "emotion_engine": {},
  "style_system": {},
  "genre_strategy": {},
  "continuation_constraints": {},
  "risk_report": {}
}
```

---

## 三、完整 JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "小说分析结果",
  "type": "object",
  "required": ["metadata", "theme", "characters", "world_rules", "plot_engine", "emotion_engine", "style_system", "continuation_constraints", "risk_report"],
  "properties": {
    "metadata": {
      "type": "object",
      "description": "元数据，不参与直接创作，用于版本管理和缓存",
      "properties": {
        "title": { "type": "string", "description": "作品标题" },
        "source_type": { "type": "string", "enum": ["novel", "webnovel", "chapter", "excerpt"], "description": "来源类型" },
        "genre_tags": { "type": "array", "items": { "type": "string" }, "description": "类型标签" },
        "analyzed_range": {
          "type": "object",
          "properties": {
            "start_chapter": { "type": "string" },
            "end_chapter": { "type": "string" },
            "word_count": { "type": "integer" }
          }
        },
        "analysis_confidence": { "type": "string", "enum": ["low", "medium", "high"] }
      }
    },
    "theme": {
      "type": "object",
      "description": "主题立意，控制作品精神内核",
      "required": ["core_theme", "emotional_core"],
      "properties": {
        "core_theme": { "type": "string", "description": "核心主题（1-2 句话）" },
        "surface_theme": { "type": "string", "description": "表层主题" },
        "deep_theme": { "type": "string", "description": "深层主题" },
        "value_orientation": { "type": "string", "description": "价值取向" },
        "emotional_core": { "type": "string", "description": "情感内核" },
        "recurring_motifs": { "type": "array", "items": { "type": "string" }, "description": "重复出现的意象" },
        "theme_risks": { "type": "array", "items": { "type": "string" }, "description": "主题风险点" }
      }
    },
    "characters": {
      "type": "array",
      "description": "人物系统，防止 OOC，是续写阶段的硬约束",
      "items": {
        "type": "object",
        "required": ["character_id", "name", "role", "core_motivation", "bottom_line", "ooc_constraints"],
        "properties": {
          "character_id": { "type": "string", "description": "人物唯一 ID" },
          "name": { "type": "string" },
          "role": { "type": "string", "enum": ["protagonist", "antagonist", "supporting", "mentor", "love_interest", "other"] },
          "position_in_story": { "type": "string", "description": "在故事中的位置" },
          "personality_tags": { "type": "array", "items": { "type": "string" } },
          "core_motivation": { "type": "string", "description": "核心动机" },
          "external_goal": { "type": "string", "description": "外在目标" },
          "internal_need": { "type": "string", "description": "内在需求" },
          "fear_or_weakness": { "type": "string", "description": "恐惧或弱点" },
          "bottom_line": { "type": "string", "description": "底线（不得违反）" },
          "relationship_map": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "target_character": { "type": "string" },
                "relationship_type": { "type": "string", "enum": ["ally", "enemy", "family", "romantic", "rival", "mentor", "unknown"] },
                "current_status": { "type": "string" },
                "tension_points": { "type": "array", "items": { "type": "string" } }
              }
            }
          },
          "arc_stage": { "type": "string", "enum": ["setup", "growth", "fall", "transformation", "resolution", "unknown"] },
          "voice_traits": {
            "type": "object",
            "properties": {
              "dialogue_style": { "type": "string" },
              "common_phrases": { "type": "array", "items": { "type": "string" } },
              "speech_rhythm": { "type": "string" },
              "emotional_expression": { "type": "string" }
            }
          },
          "ooc_constraints": { "type": "array", "items": { "type": "string" }, "description": "OOC 约束（不得违反）" }
        }
      }
    },
    "world_rules": {
      "type": "object",
      "description": "世界观规则，防止设定崩坏",
      "properties": {
        "setting_summary": { "type": "string" },
        "time_period": { "type": "string" },
        "location_system": { "type": "array", "items": { "type": "string" } },
        "power_system": {
          "type": "object",
          "properties": {
            "exists": { "type": "boolean" },
            "rules": { "type": "array", "items": { "type": "string" } },
            "levels_or_ranks": { "type": "array", "items": { "type": "string" } },
            "costs_or_limits": { "type": "array", "items": { "type": "string" } },
            "forbidden_actions": { "type": "array", "items": { "type": "string" } }
          }
        },
        "factions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "type": { "type": "string", "enum": ["sect", "family", "company", "kingdom", "organization", "race", "other"] },
              "goal": { "type": "string" },
              "relationship_to_protagonist": { "type": "string" },
              "resources": { "type": "array", "items": { "type": "string" } },
              "conflicts": { "type": "array", "items": { "type": "string" } }
            }
          }
        },
        "social_rules": { "type": "array", "items": { "type": "string" } },
        "economic_rules": { "type": "array", "items": { "type": "string" } },
        "unresolved_worldbuilding_questions": { "type": "array", "items": { "type": "string" } },
        "world_consistency_constraints": { "type": "array", "items": { "type": "string" }, "description": "世界观一致性约束（不得违反）" }
      }
    },
    "plot_engine": {
      "type": "object",
      "description": "情节引擎，用于规划下一步情节",
      "properties": {
        "main_plot": { "type": "string", "description": "主线" },
        "current_stage": { "type": "string", "enum": ["opening", "development", "turning_point", "climax", "aftermath", "unknown"] },
        "active_conflicts": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "conflict_id": { "type": "string" },
              "type": { "type": "string", "enum": ["person_vs_person", "person_vs_self", "person_vs_society", "person_vs_world", "person_vs_fate", "other"] },
              "description": { "type": "string" },
              "stake": { "type": "string" },
              "current_status": { "type": "string" },
              "possible_next_steps": { "type": "array", "items": { "type": "string" } }
            }
          }
        },
        "subplots": { "type": "array", "items": { "type": "string" } },
        "foreshadowing_items": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "item": { "type": "string" },
              "introduced_at": { "type": "string" },
              "expected_payoff": { "type": "string" },
              "urgency": { "type": "string", "enum": ["low", "medium", "high"] }
            }
          }
        },
        "chapter_hook_patterns": { "type": "array", "items": { "type": "string" } },
        "pacing_pattern": { "type": "string", "enum": ["fast", "medium", "slow", "mixed"] },
        "plot_constraints": { "type": "array", "items": { "type": "string" } }
      }
    },
    "emotion_engine": {
      "type": "object",
      "description": "情绪引擎，控制读者体验",
      "properties": {
        "overall_tone": { "type": "string" },
        "reader_expectation": { "type": "string" },
        "emotional_curve": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "segment": { "type": "string" },
              "dominant_emotion": { "type": "string" },
              "intensity": { "type": "integer", "minimum": 1, "maximum": 10 },
              "trigger_event": { "type": "string" }
            }
          }
        },
        "payoff_patterns": { "type": "array", "items": { "type": "string" } },
        "tension_sources": { "type": "array", "items": { "type": "string" } },
        "cooldown_methods": { "type": "array", "items": { "type": "string" } },
        "reader_retention_hooks": { "type": "array", "items": { "type": "string" } },
        "emotion_constraints": { "type": "array", "items": { "type": "string" } }
      }
    },
    "style_system": {
      "type": "object",
      "description": "文风系统，控制表达规律",
      "properties": {
        "narrative_pov": { "type": "string", "enum": ["first_person", "third_person_limited", "third_person_omniscient", "mixed", "unknown"] },
        "narrative_distance": { "type": "string", "enum": ["close", "medium", "far", "mixed"] },
        "sentence_rhythm": { "type": "string", "enum": ["short", "medium", "long", "mixed"] },
        "description_density": { "type": "string", "enum": ["low", "medium", "high"] },
        "dialogue_ratio": { "type": "string", "enum": ["low", "medium", "high"] },
        "sensory_focus": { "type": "array", "items": { "type": "string" } },
        "common_rhetorical_methods": { "type": "array", "items": { "type": "string" } },
        "scene_description_style": { "type": "string" },
        "action_description_style": { "type": "string" },
        "psychological_description_style": { "type": "string" },
        "style_do": { "type": "array", "items": { "type": "string" } },
        "style_dont": { "type": "array", "items": { "type": "string" } }
      }
    },
    "genre_strategy": {
      "type": "object",
      "description": "类型策略，作为策略层使用",
      "properties": {
        "primary_genre": { "type": "string" },
        "secondary_genres": { "type": "array", "items": { "type": "string" } },
        "trope_patterns": { "type": "array", "items": { "type": "string" } },
        "reader_promises": { "type": "array", "items": { "type": "string" } },
        "innovation_points": { "type": "array", "items": { "type": "string" } },
        "allowed_innovation_level": { "type": "string", "enum": ["low", "medium", "high"] },
        "genre_constraints": { "type": "array", "items": { "type": "string" } }
      }
    },
    "continuation_constraints": {
      "type": "object",
      "description": "续写约束，从分析进入续写的桥梁",
      "required": ["must_keep", "must_not_change"],
      "properties": {
        "must_keep": { "type": "array", "items": { "type": "string" }, "description": "必须保留的内容" },
        "must_not_change": { "type": "array", "items": { "type": "string" }, "description": "不得修改的内容（硬约束）" },
        "can_expand": { "type": "array", "items": { "type": "string" }, "description": "可扩展的内容" },
        "need_user_confirmation": { "type": "array", "items": { "type": "string" }, "description": "需要用户确认的内容" },
        "recommended_next_direction": { "type": "array", "items": { "type": "string" }, "description": "推荐下一步方向" }
      }
    },
    "risk_report": {
      "type": "object",
      "description": "风险报告，标记潜在失控点",
      "properties": {
        "ooc_risks": { "type": "array", "items": { "type": "string" } },
        "worldbuilding_risks": { "type": "array", "items": { "type": "string" } },
        "plot_drift_risks": { "type": "array", "items": { "type": "string" } },
        "style_mismatch_risks": { "type": "array", "items": { "type": "string" } },
        "copyright_or_similarity_risks": { "type": "array", "items": { "type": "string" } },
        "overall_risk_level": { "type": "string", "enum": ["low", "medium", "high"] }
      }
    }
  }
}
```

---

## 四、字段使用原则

| 字段 | 用途 | 是否参与创作 |
|------|------|-------------|
| metadata | 元数据，版本管理 | ❌ 否 |
| theme | 控制精神内核 | ✅ 是（激发维度） |
| characters | 防止 OOC | ✅ 是（约束维度） |
| world_rules | 防止设定崩坏 | ✅ 是（约束维度） |
| plot_engine | 规划下一步情节 | ✅ 是（主维度） |
| emotion_engine | 控制读者体验 | ✅ 是（激发维度） |
| style_system | 控制表达规律 | ✅ 是（主维度） |
| genre_strategy | 策略层 | ⚠️ 视情况 |
| continuation_constraints | 续写桥梁 | ✅ 是（约束维度） |
| risk_report | 风险标记 | ⚠️ 校验用 |

---

## 五、硬性限制

1. `characters[].ooc_constraints` 不得违反
2. `world_rules.world_consistency_constraints` 不得违反
3. `continuation_constraints.must_not_change` 不得修改
4. 未经用户确认，不得使用 `continuation_constraints.need_user_confirmation` 中的内容进入正文
5. `risk_report.overall_risk_level` 为 high 时，不得直接生成正文，必须先修复方案

---

## 六、最小可用版本字段

MVP 阶段至少保留：
- theme
- characters
- world_rules
- plot_engine
- emotion_engine
- style_system
- continuation_constraints
- risk_report

---

_三省六部 敬呈_ 🏛️
_版本：v1.0 | 2026-05-08_
