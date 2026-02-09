---
name: smart-commit
description: 智能提交 - 自动更新文档后提交代码
---

按以下步骤执行：

1. **更新文档**
   - 分析最近的代码变更
   - 更新 README.md（如果需要）
   - 更新 CLAUDE.md（如果需要）
   - 询问用户是否接受这些文档更新

2. **查看 Git 状态**
   - 运行 `git status` 查看当前状态
   - 运行 `git diff` 查看未暂存的变更
   - 运行 `git log --oneline -5` 查看最近提交信息

3. **创建提交**
   - 分析变更内容，生成合适的提交信息
   - 提交信息格式应该清晰描述变更内容
   - 将文档更新和代码变更一起提交
   - 添加 Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

4. **推送到远程**
   - 使用 `git push origin main` 推送

**重要**：
- 在执行任何 git 操作前，先向用户展示将要提交的内容
- 等待用户确认后再执行提交
- 如果用户拒绝，不要强制提交
