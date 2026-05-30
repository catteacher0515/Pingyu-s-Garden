# 文章内容维护

这个页面的数据来源是 `src/data/articles.ts`，封面资源放在 `public/articles/`。

## 推荐方式：使用脚本

运行：

```bash
npm run add:article
```

脚本会依次询问：

- 文章标题
- 知乎文章链接
- 文章 `id`：页面内部使用的唯一标识，不会显示在页面上。用英文小写、数字和短横线，例如 `github-w21`、`weread-skill`。
- 本地封面文件路径：你电脑上的图片路径。可以直接把图片拖进终端。
- 保存到 `public/articles/` 的封面文件名：网站实际使用的图片文件名。通常直接回车使用默认值即可。
- 选择已有系列，或新增一个系列

脚本会自动：

- 复制封面到 `public/articles/`
- 将文章记录插入 `src/data/articles.ts`
- 新增系列时同步更新 `src/types.ts` 和 `src/data/articles.ts`

## 新增一篇文章

如果不用脚本，也可以手动维护。

1. 将文章封面放到 `public/articles/`。

推荐命名：

```text
public/articles/weread-skill.png
public/articles/github-w21.png
```

2. 在 `src/data/articles.ts` 的 `articles` 数组顶部新增一条记录。

```ts
{
  id: 'new-article-id',
  title: '文章标题',
  cover: '/articles/new-article-cover.png',
  url: 'https://zhuanlan.zhihu.com/p/xxxx',
  seriesId: 'ai-tools',
}
```

字段说明：

- `id`：文章唯一标识，使用英文小写和短横线。
- `title`：页面卡片显示的文章标题。
- `cover`：本地封面路径，必须以 `/articles/` 开头。
- `url`：知乎文章链接。
- `seriesId`：文章所属系列。

当前可用的 `seriesId`：

```ts
'ai-talk'
'ai-tools'
'github-weekly'
```

## 新增一个文章系列

如果后续要新增系列，例如 `内容工作流`：

1. 在 `src/types.ts` 扩展 `ArticleSeriesId`。

```ts
export type ArticleSeriesId = 'ai-talk' | 'ai-tools' | 'github-weekly' | 'content-workflow'
```

2. 在 `src/data/articles.ts` 的 `articleSeries` 中新增配置。

```ts
{ id: 'content-workflow', label: '内容工作流' }
```

3. 新文章即可使用：

```ts
seriesId: 'content-workflow'
```

筛选按钮会根据 `articleSeries` 自动生成，不需要修改页面组件。

## 验证

修改文章数据或系列配置后，运行：

```bash
npx vitest run src/pages/ArticlesPage.test.tsx
npm run build
npm run lint
```
