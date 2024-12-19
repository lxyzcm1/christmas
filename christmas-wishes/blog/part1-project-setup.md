# React圣诞祝福网页开发教程（一）：项目环境搭建

在这个教程系列中，我们将一步步创建一个精美的圣诞祝福网页。本文是系列的第一部分，我们将完成项目的环境搭建。

## 环境准备

### 1. Node.js安装
1. 访问 [Node.js官网](https://nodejs.org/)
2. 下载并安装LTS（长期支持）版本
3. 验证安装：
```bash
node --version
npm --version
```

### 2. 开发工具
1. 安装VSCode：[下载地址](https://code.visualstudio.com/)
2. 安装必要的VSCode插件：
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin (Volar)

## 项目创建

### 1. 使用Vite创建项目
打开终端，执行以下命令：
```bash
# 创建项目
npm create vite@latest christmas-wishes -- --template react-ts

# 进入项目目录
cd christmas-wishes

# 安装依赖
npm install
```

### 2. 安装必要依赖
```bash
# 安装Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 安装Framer Motion动画库
npm install framer-motion

# 安装其他工具库
npm install classnames @types/node
```

## 项目配置

### 1. 配置TypeScript
创建/更新`tsconfig.json`：
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2. 配置Tailwind CSS
1. 更新`tailwind.config.js`：
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'christmas': {
          red: '#D42426',
          green: '#2F5233',
          gold: '#FFD700',
        },
      },
      animation: {
        'snow-fall': 'snow-fall 10s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'rotate': 'rotate 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'sway': 'sway 6s ease-in-out infinite',
      },
      keyframes: {
        'snow-fall': {
          '0%': { transform: 'translateY(-10vh) translateX(0)' },
          '50%': { transform: 'translateY(45vh) translateX(20px)' },
          '100%': { transform: 'translateY(100vh) translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        'rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'sway': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}
```

2. 更新`src/index.css`：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-blue-950 text-white min-h-screen overflow-hidden;
  }
}

@layer components {
  .christmas-button {
    @apply px-6 py-3 rounded-full bg-gradient-to-r from-christmas-red to-christmas-green
           text-white font-bold shadow-lg transform transition-all duration-300
           hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 
           focus:ring-christmas-gold focus:ring-opacity-50;
  }
  
  .christmas-input {
    @apply w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20
           text-white placeholder-white/50 focus:outline-none focus:ring-2
           focus:ring-christmas-gold focus:border-transparent
           transition-all duration-300;
  }
}
```

### 3. 创建项目结构
1. 创建必要的目录：
```bash
mkdir src/assets
mkdir src/assets/audio
mkdir src/components
mkdir src/utils
mkdir src/hooks
mkdir src/types
```

2. 目录结构说明：
```
src/
├── assets/          # 静态资源
│   └── audio/       # 音频文件
├── components/      # React组件
├── utils/          # 工具函数
├── hooks/          # 自定义Hooks
├── types/          # TypeScript类型定义
├── App.tsx         # 主应用组件
├── main.tsx        # 入口文件
└── index.css       # 全局样式
```

### 4. 添加音频资源
1. 在`src/assets/audio`目录下创建`README.md`：
```markdown
请添加以下音频文件到此目录：
1. Merry Christmas Mr. Lawrence.mp3 - 背景音乐
2. bell-sound.mp3 - 交互音效
```

2. 下载所需的音频文件：
   - 背景音乐：[Merry Christmas Mr. Lawrence](https://example.com/music)
   - 铃声效果：[Bell Sound](https://example.com/bell)
   
3. 将下载的文件放入`src/assets/audio`目录

### 5. 验证环境
1. 启动开发服务器：
```bash
npm run dev
```

2. 访问控制台输出的URL（通常是 http://localhost:5173）

3. 确认是否看到Vite的默认页面

## 常见问题解决

### 1. 依赖安装失败
```bash
# 清除npm缓存
npm cache clean --force

# 重新安装依赖
npm install
```

### 2. TypeScript错误
确保`tsconfig.json`配置正确，并安装了所有必要的类型定义：
```bash
npm install -D @types/react @types/react-dom
```

### 3. Tailwind CSS不生效
1. 检查`postcss.config.js`：
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

2. 确保`index.css`已在`main.tsx`中导入：
```typescript
import './index.css'
```

## 下一步
环境搭建完成后，我们将在下一篇教程中开始实现核心组件，包括交互式雪花效果和圣诞装饰元素。请确保你能成功运行项目，并且所有配置文件都正确设置。

如果遇到任何问题，可以：
1. 检查终端输出的错误信息
2. 确认所有依赖都已正确安装
3. 验证配置文件的语法
4. 参考项目源码进行对比

[下一篇：实现核心组件 →]
