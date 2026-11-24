# 排错 FAQ

## 症状：样式不生效 / 仍是 EP 默认皮

1. 是否按顺序引入 tokens → design-tokens → style/chat → element-override  
2. 是否被业务全局 CSS 更高优先级盖住  
3. 修法：保证 override 在 EP 与本库 style 之后

## 症状：MetricChart / PDF 空白

1. 是否安装对应 optional peer  
2. 是否注册 `apformOptionalPeers()`  
3. 修法：安装 peer 后重启 Vite；见 [optional-peers.md](./optional-peers.md)

## 症状：token 改了不响应

1. 是否改错前缀（`--color-*` vs `--apf-*`）  
2. 是否在错误选择器作用域  
3. 修法：在 `:root` 覆盖 `--apf-*`

## 症状：图标不显示

1. `@element-plus/icons-vue` / `@iconify/vue` 是否可用  
2. `AppIcon` name 是否在映射表内  

## 症状：SSR 白屏

1. 浏览器 API 是否在 setup 顶层访问  
2. bpmn / pdf 是否未包 `ClientOnly`  
3. 见 [ssr.md](./ssr.md)

## 症状：类型报错 / 找不到子路径

1. 是否用 ESM import  
2. `exports` 是否含 `./chat` `./bpmn` `./vite`  
3. TS `moduleResolution` 建议 `bundler`
