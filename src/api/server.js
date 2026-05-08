const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// 数据存储目录
const DATA_DIR = path.join(__dirname, '../../data');
const ANALYSES_DIR = path.join(DATA_DIR, 'analyses');
const PLANS_DIR = path.join(DATA_DIR, 'plans');
const GENERATIONS_DIR = path.join(DATA_DIR, 'generations');
const VERSIONS_DIR = path.join(DATA_DIR, 'versions');

// 创建数据目录
[DATA_DIR, ANALYSES_DIR, PLANS_DIR, GENERATIONS_DIR, VERSIONS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ========== 阶段门禁 ==========
const STAGE_ORDER = ['analysis', 'planning', 'outline', 'generation', 'validation'];
let currentStage = 'analysis';

app.get('/api/stage', (req, res) => {
  res.json({ stage: currentStage, nextStage: STAGE_ORDER[STAGE_ORDER.indexOf(currentStage) + 1] });
});

app.post('/api/stage/confirm', (req, res) => {
  const { stage } = req.body;
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  const targetIndex = STAGE_ORDER.indexOf(stage);
  
  if (targetIndex !== currentIndex + 1) {
    return res.status(403).json({ error: '只能确认下一个阶段' });
  }
  
  currentStage = stage;
  res.json({ stage: currentStage });
});

// ========== 分析接口 ==========
app.post('/api/analysis', async (req, res) => {
  const { text, options = {} } = req.body;
  
  if (!text || !text.trim()) {
    return res.status(400).json({ error: '请输入原文内容' });
  }
  
  // TODO: 调用 AI 进行 6+1 维分析
  // 当前返回模拟数据
  
  const analysisId = `analysis_${Date.now()}`;
  const result = {
    metadata: {
      title: options.title || '未命名作品',
      source_type: options.source_type || 'excerpt',
      genre_tags: [],
      analyzed_range: {
        start_chapter: '1',
        end_chapter: '1',
        word_count: text.length
      },
      analysis_confidence: 'medium'
    },
    theme: {
      core_theme: '待分析',
      emotional_core: '待分析'
    },
    characters: [],
    world_rules: {},
    plot_engine: {},
    emotion_engine: {},
    style_system: {},
    continuation_constraints: {
      must_keep: [],
      must_not_change: []
    },
    risk_report: {
      overall_risk_level: 'low'
    }
  };
  
  // 保存分析结果
  fs.writeFileSync(
    path.join(ANALYSES_DIR, `${analysisId}.json`),
    JSON.stringify(result, null, 2)
  );
  
  res.json({
    analysis_id: analysisId,
    status: 'completed',
    result
  });
});

// ========== 规划接口 ==========
app.post('/api/planning', async (req, res) => {
  const { analysis_id, directions = 3 } = req.body;
  
  if (!analysis_id) {
    return res.status(400).json({ error: '请提供 analysis_id' });
  }
  
  // TODO: 基于分析结果生成续写方向
  
  const planId = `plan_${Date.now()}`;
  const directionsList = Array.from({ length: Math.min(directions, 3) }, (_, i) => ({
    direction_id: `d${i + 1}`,
    core_conflict: '待规划',
    protagonist_goal: '待规划',
    emotion_trend: '待规划',
    relation_to_original: '待规划',
    risk_points: []
  }));
  
  // 保存规划结果
  fs.writeFileSync(
    path.join(PLANS_DIR, `${planId}.json`),
    JSON.stringify({ analysis_id, directions: directionsList }, null, 2)
  );
  
  res.json({
    plan_id: planId,
    directions: directionsList
  });
});

// ========== 生成接口 ==========
app.post('/api/generation', async (req, res) => {
  const { plan_id, direction_id, chapter_outline, options = {} } = req.body;
  
  if (!plan_id || !direction_id) {
    return res.status(400).json({ error: '请提供 plan_id 和 direction_id' });
  }
  
  // TODO: 调用 AI 生成正文
  
  const generationId = `gen_${Date.now()}`;
  const wordCount = options.word_count || 1500;
  
  // 保存生成结果
  fs.writeFileSync(
    path.join(GENERATIONS_DIR, `${generationId}.json`),
    JSON.stringify({
      plan_id,
      direction_id,
      text: '（待生成）',
      word_count: wordCount,
      options
    }, null, 2)
  );
  
  res.json({
    generation_id: generationId,
    text: '（待生成）',
    word_count: wordCount
  });
});

// ========== 校验接口 ==========
app.post('/api/validation', async (req, res) => {
  const { analysis_id, generation_id } = req.body;
  
  if (!analysis_id || !generation_id) {
    return res.status(400).json({ error: '请提供 analysis_id 和 generation_id' });
  }
  
  // TODO: 调用 AI 进行一致性校验
  
  const validationId = `val_${Date.now()}`;
  
  res.json({
    validation_id: validationId,
    passed: true,
    issues: [],
    scores: {
      ooc_score: 0.9,
      world_consistency: 0.9,
      plot_alignment: 0.9,
      emotion_continuity: 0.9,
      style_consistency: 0.9
    }
  });
});

// ========== 版本管理接口 ==========
app.post('/api/version/snapshot', (req, res) => {
  const { analysis_id, plan_id, generation_id, note = '' } = req.body;
  
  const versionId = `v${Date.now()}`;
  const snapshot = {
    version_id: versionId,
    timestamp: new Date().toISOString(),
    note,
    analysis_id,
    plan_id,
    generation_id
  };
  
  fs.writeFileSync(
    path.join(VERSIONS_DIR, `${versionId}.json`),
    JSON.stringify(snapshot, null, 2)
  );
  
  res.json(snapshot);
});

app.get('/api/versions', (req, res) => {
  const versions = fs.readdirSync(VERSIONS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(VERSIONS_DIR, f), 'utf-8')))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  res.json(versions);
});

// ========== 启动服务 ==========
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`📚 小说创作助手已启动`);
  console.log(`📱 访问地址：http://localhost:${PORT}`);
  console.log(`📊 当前阶段：${currentStage}`);
});

module.exports = app;
