# 部署

## 构建静态站点

```bash
pnpm docs:build
```

产物输出到 `dist-docs/` 目录，是一个纯静态站点，可部署到任何静态托管服务。

## 部署方案

### Nginx

```nginx
server {
    listen 80;
    server_name apform-ui.example.com;
    root /var/www/apform-ui-docs;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Docker

```dockerfile
FROM nginx:alpine
COPY dist-docs/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### GitHub Pages

```yaml
# .github/workflows/docs.yml
name: Deploy Docs
on:
  push:
    branches: [main]
    paths: ['packages/core/**', 'docs/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: pnpm install
      - run: pnpm build:core
      - run: pnpm docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist-docs
```

### 内网部署

```bash
# 构建
pnpm build:core
pnpm docs:build

# 打包
tar -czf apform-ui-docs.tar.gz dist-docs/

# 传输到服务器
scp apform-ui-docs.tar.gz user@server:/var/www/

# 服务器解压
ssh user@server "cd /var/www && tar -xzf apform-ui-docs.tar.gz && mv dist-docs apform-ui-docs"
```

## 自定义域名

在 `docs/.vitepress/config.ts` 中配置 `base`：

```ts
export default defineConfig({
  // 子路径部署
  base: '/apform-ui/',
  // 或根路径
  base: '/',
})
```
