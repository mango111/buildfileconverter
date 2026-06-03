# 关键词研究 Agent 机会报告

## 输入
- 项目方向：从 0 找 SEO 小产品机会
- 种子词：默认工具词根 + AI 图片/提示词 + PoE2 build planner 方向
- 目标市场：US / English
- 排除条件：纯新闻、纯品牌导航、定义词、歌词/填字、无工具化意图

## Preflight
- `KEYWORD_TOOL_API_KEY`：已存在
- `GK_API_KEY`：脚本运行时由 `KEYWORD_TOOL_API_KEY` 映射
- 关键词 API 状态：可调用，但当前 key 进入 student-safe/shared-cache 模式，自定义种子不会创建新的上游任务
- 缺口：新词 volume/KD/CPC 未能按自定义词根完整拉取，以下主判断以 API 雷达 + 公开 SERP 证据为准

## 一句话判断

今天没有特别干净的 AI 新词；最值得马上做的是 `poe2 .build converter / poe2 build planner`，其次才是 `gpt image 2 prompt generator` 这类新模型提示词工具。

## 值得做

| 关键词 | 分级 | 意图 | 趋势/新鲜度 | 商业信号 | SERP 判断 | 切入方向 |
|---|---|---|---|---|---|---|
| `poe2 .build converter` / `poe2 build planner` | A_NOW | 把 PoB / pobb.in / guide 转成 PoE2 官方 `.build` 文件，下载并放入游戏目录 | API 命中 `build planner poe2`：新词 90d，watch，0.57x；公开 SERP 显示 2026-05-31 至 2026-06-01 多篇新内容 | 游戏玩家愿意下载模板、导入 build、看 class build；可做广告/会员/模板库 | Top 结果有攻略站、新小站、Reddit 讨论、单一功能站；不是纯大站锁死 | 单页转换器 + 每职业 `.build` 模板库 + Windows/Linux/Mac 路径说明 + schema 校验 |
| `gpt image 2 prompt generator` | B_QUEUE | 把粗略需求转成 GPT Image 2 专用 prompt，用于产品图、海报、UI mockup、文案图 | 官方模型页显示 `gpt-image-2-2026-04-21`；SERP 已出现多个 2026 新小站 | 创作者/设计/电商图有付费空间；但 prompt generator 很容易同质化 | SERP 有 randomprompts、gpt-image2-ai、gptimg2 等小站，说明可进入，但拥挤会迅速上升 | 不做泛 prompt，做“文本排版/电商主图/多语言海报/品牌一致性”垂直模板 |
| `gpt image 2 product image prompt` / `amazon product image prompt` | B_QUEUE | 为电商主图、信息图、A+ 内容生成结构化 prompt | GPT Image 2 的模型能力与 Reddit/文章讨论都指向更强文字和版式能力 | 电商场景 CPC/付费意愿通常更强；适合模板包/批量生成 | 当前搜索更多是泛 GPT Image 2，垂直长尾可能更干净 | 做 Amazon / Shopify 商品图 prompt builder，输出 prompt + negative constraints + aspect ratio |

## 可观察

| 关键词 | 为什么观察 | 下次看什么 |
|---|---|---|
| `It Reaches` | API 游戏雷达推荐，Steam 显示 2026-05-17 发布；但这是游戏导航/攻略词，不是工具词 | 是否出现 `It Reaches walkthrough`, `safe code`, `map`, `achievements` 等可工具化长尾 |
| `Sora 2 alternative` | Sora/Sora 1/Sora 2 相关搜索会有迁移需求 | OpenAI 官方页面显示 Sora 产品 2026-04-26 后不可用；只适合做替代品目录/迁移指南，不适合新 Sora 工具站 |
| `ai calculator` | 老词报告：volume 6,600，CPC $1.44，KD 29，低竞争 | 需要明确细分场景，否则只是泛词，难转化 |
| `ai paragraph writer` | 老词报告：volume 4,400，CPC $2.12，KD 33，低竞争 | 观察教育/SEO/邮件等垂直场景，不做泛写作器 |
| `ai story generator` | 老词报告：volume 90,500，CPC $1.34，KD 28 | 量大但老词，竞争与内容合规成本较高 |

## 不值得做

| 关键词 | 排除原因 |
|---|---|
| `psg manager`, `iraola manager` | 纯新闻/人物导航，工具化意图弱 |
| `teamfight manager`, `teamfight manager 2` | 游戏导航/购买意图，且可能涉及品牌/游戏名；不适合作为独立工具主线 |
| `builder cape minecraft` | 活动/领取信息词，时效短、品牌依赖强 |
| `ai detection tool`, `tdee calculator free`, `ai editor rsp` | API 判为 stable old，不作为近期新词机会 |
| `sora prompt generator` / `sora 2 generator` | Sora 产品状态不稳定且官方页面显示旧产品/产品已不可用，不能作为新站主推 |

## SERP/证据摘要

- PoE2 build planner：
  - Destructoid 在 2026-05-31 发布 Build Planner 使用/导入指南。
  - MMOJUGG 在 2026-06-01 发布 `.build` 文件导入/导出指南。
  - `poe2buildplanner.com` 已经是小站形态，主打 `.build` 文件下载与 PoB 转换，证明需求和产品形态都成立。
  - Reddit 近 3 天有多个关于 `.build` 文件、Linux 路径、导出/导入的帖子，说明用户还在摸索。
- GPT Image 2：
  - OpenAI 官方开发者页面列出 `gpt-image-2`，快照为 `gpt-image-2-2026-04-21`。
  - SERP 已出现 `GPT Image 2 Prompt Generator`、`gpt-image2-ai.org`、`gptimg2.io` 等小站，证明可进入但同质化风险高。
- Sora：
  - OpenAI 帮助中心显示 Sora 1 于 2026-03-13 在美国不可用，当前默认 Sora 2。
  - OpenAI 旧 Sora 页面标注 2026-04-26 起 Sora product no longer available；该方向只能做迁移/替代品内容，不能直接做 Sora 工具主线。

## Top 3 下一步

1. 先做 `poe2 .build converter` MVP：输入 pobb.in / PoB export / JSON，输出官方 `.build` 文件；附带 class 模板库和路径安装说明。
2. 排队做 `gpt image 2 prompt generator`，但必须选垂直场景，例如 product image / poster text / UI mockup，而不是泛 prompt。
3. 老词兜底只考虑 `ai calculator`，但要先找细分任务，如 token cost calculator、image generation cost calculator、AI agent ROI calculator。

## 给 PRD 的项目 brief

### 项目 1：POE2 Build File Converter
- ICP：Path of Exile 2 玩家、build guide 作者、Reddit/Discord 分享 build 的创作者
- 核心任务：把现有 build 链接或配置转成游戏可导入 `.build` 文件
- MVP 页面：Converter、Class templates、How to import、Build file schema checker
- 差异化：跨平台路径说明、schema validation、pobb.in 转换、每职业模板库、完全浏览器端处理
- 风险：游戏数据更新频繁；需避免冒充官方；需要准确跟 Patch 0.5/后续 schema

### 项目 2：GPT Image 2 Product Prompt Builder
- ICP：电商卖家、设计师、独立站主、广告投放者
- 核心任务：把商品信息转成 GPT Image 2 可用的产品图/海报 prompt
- MVP 页面：Product prompt builder、Poster text prompt、Amazon infographic prompt、Prompt examples
- 差异化：围绕“文字可读、版式约束、品牌一致性、商品合规”而不是泛 AI art
- 风险：OpenAI 品牌词依赖；prompt 站同质化；需要持续更新模型能力

## 质量门槛自检
- 主推荐有趋势/新鲜度：部分通过。PoE2 有 API 新词信号和公开近 3 天证据；GPT Image 2 有官方发布日期/快照证据。
- GPTs/ChatGPT 基准对比：部分通过。API 使用 `gpts` benchmark，但自定义词根未完整新建 compare。
- 12 个月 freshness：通过。PoE2 `.build` 与 GPT Image 2 都是近期事件/模型触发。
- 工具化意图：通过。PoE2 转换器最强，GPT Image 2 prompt builder 次之。
- SERP 可进入性：通过。两个方向都有小站或新站结果，不是纯大站锁死。
- ROI：部分通过。商业化路径存在，但真实 CPC/KD 对自定义新词仍待查。

# 关键词研究 Agent 交接摘要

## 当前结论
- 状态：[NEEDS_REVIEW]
- 一句话结论：优先做 `poe2 .build converter / build planner`，AI 新模型提示词方向排队，不建议今天硬做泛 AI prompt 站。

## 关键输入
- 项目：SEO 小产品机会筛选
- 当前阶段：01-research
- 上游资料：用户未提供种子词，默认 US / English / 工具站

## 本阶段交付物
- 文件/内容：本报告
- 核心判断：PoE2 `.build` 转换器是当前最干净机会；GPT Image 2 适合垂直 prompt builder；Sora 方向不做主线
- 已确认项：API 可调用；公开 SERP 有新鲜证据；老词兜底列表可用
- 待确认项：自定义词 volume/KD/CPC、Google Trends 手动图、Top 10 逐项域名年龄

## 风险
- P0：不要用 Sora 作为新工具站主线，官方状态显示旧产品/产品不可用。
- P1：PoE2 build schema 更新会导致工具失效。
- P2：GPT Image 2 prompt generator 竞争会快速拥挤。

## 给下游的最小必要信息
- 下一阶段：产品定义与 PRD
- 必须读取：本报告的 Top 3 下一步和两个项目 brief
- 不能假设：不能假设自定义新词已有精确 volume/KD/CPC
- 建议启动 Prompt：请基于 `POE2 Build File Converter` brief 进入产品定义与 PRD，先定义 MVP 页面矩阵、数据合同、更新机制和非官方免责声明。
