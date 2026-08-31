# Publishing / 展示与隐私边界

这个仓库的展示目标是：**让普通访客直接在浏览器里玩展品；需要深入实验的人再 clone。**

## 1. 不依赖 `tmzncty.github.io` 个人站仓库

本项目不要求把实验入口写进 `tmzncty/tmzncty.github.io`。

原因：个人站与实验项目的隐私、生命周期和发布节奏不同。公开实验不应该迫使个人博客/历史归档继续保持公开，也不应该把私人内容与项目展示绑在同一个仓库里。

推荐：

```text
mechanical-computing-playground
        │
        └── GitHub Project Pages
            /mechanical-computing-playground/
```

其他实验仓同理各自发布自己的 Project Pages。

## 2. GitHub Pages 规则提醒

截至 2026-08：

- GitHub Free：Pages 需要公开仓库；
- GitHub Pro / Team / Enterprise：可以从私有仓库发布 Pages；
- **即使源仓库是私有的，普通 GitHub Pages 网站默认仍然是公网可访问的**（企业级受控私密发布是另一套能力）；
- 因此“把仓库改成 private”只能隐藏仓库内容，不能自动把已经发布的 Pages 变成私人网站。

官方文档：

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

## 3. 对 `tmzncty.github.io` 的建议

如果个人站里私人内容越来越多：

### 方案 A — 最推荐

把公开实验完全迁到各自 Project Pages，然后：

- 个人站停止承担 Labs 索引；
- 根据 GitHub 账户套餐决定是否把 `tmzncty.github.io` 改为 private；
- 如果不再希望站点公开，先在 Pages 设置中 **Unpublish/Disable Pages**，再处理仓库可见性；
- 检查自定义域 DNS，避免停站后仍留下指向 GitHub Pages 的悬空记录。

### 方案 B — 保留公开个人站，但做干净发布源

如果以后仍想保留个人主页，可以把“源材料/私人内容”和“公开静态产物”拆成两个仓：

```text
private-site-source     (private)
        ↓ build
public-pages-output     (only generated public files)
```

公开仓只接受构建后确认可公开的静态文件，不放草稿、原始笔记、配置和私人历史。

如果采用此方案，要把“发布是一次显式脱敏/审核动作”写进 workflow，而不是自动把整个私人源仓同步出去。

## 4. 本项目自己的展示方式

### 第一层：网页展品

`web/` 或 `site/`：

- Visible Carry；
- Finite Difference Engine；
- Hand-Crank Backpropagation Machine；
- 后续机制展品。

全部尽量纯前端：TypeScript + SVG/Canvas；没有必要就不要后端。

### 第二层：机制说明

每个展品页面包含：

```text
Try it
How it works
Internal state
History / evidence level
Sources
Run locally
```

### 第三层：本地实验

需要真实 pcap、硬件、复杂计算、测试或开发环境的部分才要求 clone。

## 5. Project Pages 路径约束

Project Pages 通常位于：

```text
https://<user>.github.io/<repository>/
```

所以前端不能默认自己部署在 `/`。

例如 Vite：

```ts
export default defineConfig({
  base: '/mechanical-computing-playground/',
})
```

如果未来给这个单独仓配置自己的 custom domain，再覆盖 base/deployment policy。

## 6. 不要做一个新的总门户

短期不要为了这五个实验再开发一套 Portal。

项目发现方式优先使用：

- GitHub profile pinned repositories；
- 每个仓 README 顶部的 Demo 链接；
- 项目之间少量 Related Projects 链接；
- 必要时以后单独建一个**只含公开内容**的 `labs-index` 小仓。

这个 `labs-index` 如果存在，也不能依赖或镜像私人站内容。

## 7. 发布前检查

任何 Pages build 前检查：

- [ ] 没有真实主机/IP/内网拓扑；
- [ ] 没有 API key、token、cookie、邮箱导出；
- [ ] 没有私人聊天、学习记录、生活记录；
- [ ] 没有未授权扫描件或大段受版权保护内容；
- [ ] source URL / DOI / license 已检查；
- [ ] 页面在 `/mechanical-computing-playground/` base 下工作；
- [ ] clone 才需要的实验不会被假装成浏览器可运行；
- [ ] 教学抽象与历史事实有明显标识。

## 8. 当前已验证部署

截至 2026-09-01，GitHub Actions `Deploy Pages` run `33443320058` 已成功发布提交 `db3b1aafdfdfa66db6998a14073f809af1f8433d`。公开 Project Pages URL 已通过直接 HTTP 读取验证：

<https://tmzncty.github.io/mechanical-computing-playground/>

返回页面标题/内容为 Mechanical Computing Playground，说明此前“Pages 尚未配置”的记录已经过时。静态站使用仓库 base path 与 hash routes；每次新提交仍需等待对应部署完成后，才能声称该提交已上线。

## 9. 结论

本仓采用：

> **Project repository = source + lab + public exhibit**

而不是：

> **personal website = all projects + personal archive + public exhibit**

这样以后个人站是否 private、是否停掉，都不会影响机械计算展品继续公开存在。
