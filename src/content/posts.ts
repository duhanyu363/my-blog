export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello World — 我的第一篇博客",
    date: "2026-06-30",
    summary: "欢迎来到我的个人博客！这是我的第一篇文章，记录搭建博客的过程与感想。",
    content: `
## 为什么要写博客？

一直想拥有一个属于自己的小角落，用来记录学习、生活和思考。今天终于迈出了第一步。

这个博客使用 **Next.js** 构建，通过 **GitHub Actions** 自动部署到 **GitHub Pages**。整个过程比想象中简单：

1. 创建 Next.js 项目
2. 配置静态导出（\`output: "export"\`）
3. 编写 GitHub Actions 工作流
4. 推送到 GitHub，自动发布

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS
- **部署**: GitHub Pages + GitHub Actions
- **语言**: TypeScript

## 接下来的计划

我打算在这里分享：

- 编程学习笔记
- 项目实践经验
- 技术探索与思考

希望这个博客能陪伴我持续成长。如果你也在阅读这篇文章，感谢你的到来！
    `.trim(),
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
