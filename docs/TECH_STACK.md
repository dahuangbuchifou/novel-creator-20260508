# 技术栈选型 - 小说创作助手

## 一、技术栈对比

| 技术栈 | 前端 | 后端 | 数据库 | 优点 | 缺点 | 推荐度 |
|--------|------|------|--------|------|------|--------|
| **方案 A** | React | Node.js + Express | SQLite/JSON | 全栈 JS，开发快，适合 MVP | 大型项目性能一般 | ⭐⭐⭐⭐⭐ |
| **方案 B** | Vue 3 | Python + FastAPI | PostgreSQL | Python 生态好，AI 集成方便 | 前后端分离，开发稍慢 | ⭐⭐⭐⭐ |
| **方案 C** | 纯前端 | 无（Serverless） | 无 | 极简，适合演示 | 功能受限 | ⭐⭐ |

## 二、推荐方案：方案 A（React + Node.js + JSON）

### 选择理由

1. **开发速度快** - 全栈 JS，一人可搞定前后端
2. **适合 MVP** - 快速验证想法，后续可重构
3. **AI 集成方便** - Node.js 有成熟的 OpenAI/百炼 SDK
4. **部署简单** - 单进程即可运行，无需复杂配置
5. **三省六部友好** - 工部熟悉 Node.js（知识库项目已验证）

### 技术栈详情

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **前端** | React | 18.x | 用户界面 |
| **状态管理** | Zustand | 4.x | 轻量级状态管理 |
| **UI 组件** | Ant Design | 5.x | 用户面板组件 |
| **HTTP 客户端** | Axios | 1.x | API 调用 |
| **后端** | Node.js | 20.x | 运行时 |
| **Web 框架** | Express | 4.x | API 服务 |
| **AI SDK** | 百炼 SDK / OpenAI SDK | 最新 | 模型调用 |
| **数据存储** | JSON 文件 + SQLite | - | 分析结果、版本快照 |
| **向量检索** | ChromaDB / LanceDB | - | 长文本语义检索 |
| **JSON 校验** | ajv | 8.x | JSON Schema 校验 |

### 项目结构

```
novel-creator/
├── docs/                    # 技术文档
│   ├── PRINCIPLES.md        # 项目限制
│   ├── JSON_SCHEMA_V1.0.md  # 分析 Schema
│   └── TECH_STACK.md        # 本文档
├── src/
│   ├── api/                 # 后端 API
│   │   ├── server.js        # Express 服务
│   │   ├── routes/          # API 路由
│   │   │   ├── analysis.js  # 分析接口
│   │   │   ├── planning.js  # 规划接口
│   │   │   ├── generation.js # 生成接口
│   │   │   └── validation.js # 校验接口
│   │   └── middleware/      # 中间件
│   │       ├── jsonValidator.js # JSON Schema 校验
│   │       └── gatekeeper.js    # 阶段门禁
│   ├── analysis/            # 维度分析模块
│   │   ├── analyzer.js      # 分析引擎
│   │   ├── prompts/         # 分析 Prompt 模板
│   │   └── schema/          # JSON Schema 定义
│   ├── planning/            # 创意规划模块
│   │   ├── planner.js       # 规划引擎
│   │   └── prompts/         # 规划 Prompt 模板
│   ├── generation/          # 正文生成模块
│   │   ├── generator.js     # 生成引擎
│   │   └── prompts/         # 生成 Prompt 模板
│   ├── validation/          # 一致性校验模块
│   │   ├── validator.js     # 校验引擎
│   │   └── rules/           # 校验规则
│   ├── versioning/          # 版本管理模块
│   │   ├── manager.js       # 版本管理器
│   │   └── storage/         # 版本存储
│   └── frontend/            # 前端代码
│       ├── src/
│       │   ├── components/  # React 组件
│       │   │   ├── AnalysisPanel.jsx
│       │   │   ├── PlanningPanel.jsx
│       │   │   ├── GenerationPanel.jsx
│       │   │   └── ValidationPanel.jsx
│       │   ├── store/       # 状态管理
│       │   │   └── useStore.js
│       │   ├── App.jsx      # 主组件
│       │   └── main.jsx     # 入口
│       └── public/
│           └── index.html   # HTML 模板
├── data/                    # 数据存储
│   ├── analyses/            # 分析结果
│   ├── plans/               # 规划结果
│   ├── generations/         # 生成内容
│   └── versions/            # 版本快照
├── tests/                   # 测试
│   ├── analysis.test.js
│   ├── planning.test.js
│   ├── generation.test.js
│   └── validation.test.js
├── examples/                # 示例
│   └── sample-analysis.json
├── package.json
└── README.md
```

## 三、核心接口定义

### 3.1 分析接口

```
POST /api/analysis
Request:
{
  "text": "原文内容",
  "options": {
    "source_type": "chapter",
    "chapter_range": { "start": 1, "end": 10 }
  }
}
Response:
{
  "analysis_id": "uuid",
  "status": "completed",
  "result": { /* JSON Schema 分析结果 */ },
  "metadata": {
    "token_usage": 12345,
    "analysis_time_ms": 3456
  }
}
```

### 3.2 规划接口

```
POST /api/planning
Request:
{
  "analysis_id": "uuid",
  "directions": 3
}
Response:
{
  "plan_id": "uuid",
  "directions": [
    {
      "direction_id": "d1",
      "core_conflict": "核心冲突描述",
      "protagonist_goal": "主角目标",
      "emotion_trend": "情绪走向",
      "relation_to_original": "与原文关系",
      "risk_points": ["风险点 1", "风险点 2"]
    }
  ]
}
```

### 3.3 生成接口

```
POST /api/generation
Request:
{
  "plan_id": "uuid",
  "direction_id": "d1",
  "chapter_outline": { /* 章节细纲 */ },
  "options": {
    "word_count": 1500,
    "innovation_level": "medium",
    "main_dimension": "plot_engine",
    "constraint_dimensions": ["characters", "world_rules"],
    "inspiration_dimension": "emotion_engine"
  }
}
Response:
{
  "generation_id": "uuid",
  "text": "生成的正文",
  "reference_table": [
    { "text_segment": "段落内容", "source_dimension": "plot_engine", "source_field": "main_plot" }
  ]
}
```

### 3.4 校验接口

```
POST /api/validation
Request:
{
  "analysis_id": "uuid",
  "generation_id": "uuid"
}
Response:
{
  "validation_id": "uuid",
  "passed": true,
  "issues": [
    {
      "type": "ooc",
      "severity": "warning",
      "description": "人物性格略有偏离",
      "suggestion": "建议调整对话风格"
    }
  ],
  "scores": {
    "ooc_score": 0.85,
    "world_consistency": 0.92,
    "plot_alignment": 0.88,
    "emotion_continuity": 0.90,
    "style_consistency": 0.87
  }
}
```

## 四、阶段门禁实现

```javascript
// middleware/gatekeeper.js
const STAGE_ORDER = ['analysis', 'planning', 'outline', 'generation', 'validation'];

function gatekeeper(requiredStage) {
  return (req, res, next) => {
    const currentStage = req.session?.currentStage || 'analysis';
    const requiredIndex = STAGE_ORDER.indexOf(requiredStage);
    const currentIndex = STAGE_ORDER.indexOf(currentStage);
    
    if (requiredIndex > currentIndex + 1) {
      return res.status(403).json({
        error: '阶段门禁拦截',
        message: `当前处于 ${currentStage} 阶段，无法调用 ${requiredStage} 接口`,
        currentStage,
        requiredStage
      });
    }
    
    next();
  };
}

module.exports = gatekeeper;
```

## 五、开发计划

| 阶段 | 内容 | 预计耗时 | 负责 |
|------|------|----------|------|
| **Phase 1.1** | 项目初始化 + 基础架构 | 1 天 | 工部 |
| **Phase 1.2** | JSON Schema 定义 + 校验 | 1 天 | 工部 |
| **Phase 1.3** | 阶段门禁中间件 | 0.5 天 | 工部 |
| **Phase 1.4** | 分析模块 Prompt 模板 | 1 天 | 中书省 |
| **Phase 1.5** | 前端基础组件 | 1 天 | 礼部 |

**Phase 1 总计：** 约 4.5 天

---

_三省六部 敬呈_ 🏛️
_2026-05-08_
