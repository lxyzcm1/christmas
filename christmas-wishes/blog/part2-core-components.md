# React圣诞祝福网页开发教程（二）：核心组件实现

在第一部分中，我们完成了项目环境的搭建。现在，让我们开始实现核心组件。我们将一步步创建每个组件，并确保它们能够正常工作。

## 1. 交互式雪花效果

### 1.1 创建基础组件
创建文件`src/components/InteractiveSnow.tsx`：
```typescript
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

export const InteractiveSnow = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
    >
      {/* 雪花将在这里渲染 */}
    </div>
  );
};
```

### 1.2 生成雪花
添加雪花生成逻辑：
```typescript
// 在InteractiveSnow组件中添加
useEffect(() => {
  // 生成50个雪花
  const flakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 10,
    opacity: Math.random() * 0.5 + 0.3,
    delay: Math.random() * 10,
  }));
  setSnowflakes(flakes);
}, []);
```

### 1.3 添加鼠标交互
实现鼠标跟踪：
```typescript
// 在InteractiveSnow组件中添加
useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
```

### 1.4 实现动画循环
添加动画更新逻辑：
```typescript
// 在InteractiveSnow组件中添加
const animate = (time: number) => {
  if (previousTimeRef.current !== undefined) {
    setSnowflakes(prevFlakes => 
      prevFlakes.map(flake => {
        let newX = flake.x;
        let newY = flake.y;

        // 基础下落运动
        newY = (newY + 0.2) % 100;

        // 计算与鼠标的距离
        const dx = (mousePosition.x / (containerRef.current?.clientWidth || 1)) * 100 - flake.x;
        const dy = (mousePosition.y / (containerRef.current?.clientHeight || 1)) * 100 - flake.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 鼠标交互效果
        if (distance < 30) {
          const angle = Math.atan2(dy, dx);
          const force = (30 - distance) / 30 * 0.15;
          newX += Math.cos(angle) * force;
          newY += Math.sin(angle) * force;
        }

        // 随机漂移
        newX += Math.sin(time / 2000 + flake.delay) * 0.05;

        // 确保在视口内
        newX = ((newX + 100) % 100);
        newY = ((newY + 100) % 100);

        return {
          ...flake,
          x: newX,
          y: newY,
        };
      })
    );
  }
  previousTimeRef.current = time;
  requestRef.current = requestAnimationFrame(animate);
};

useEffect(() => {
  requestRef.current = requestAnimationFrame(animate);
  return () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };
}, [mousePosition]);
```

### 1.5 渲染雪花
更新渲染部分：
```typescript
// 在InteractiveSnow组件的return语句中
return (
  <div 
    ref={containerRef}
    className="fixed inset-0 pointer-events-none overflow-hidden"
  >
    {snowflakes.map((flake) => (
      <motion.div
        key={flake.id}
        className="absolute text-white select-none"
        style={{
          left: `${flake.x}%`,
          top: `${flake.y}%`,
          fontSize: `${flake.size}px`,
          opacity: flake.opacity,
          filter: 'blur(0.3px)',
        }}
      >
        ❄️
      </motion.div>
    ))}
  </div>
);
```

## 2. 音频控制器

### 2.1 创建基础组件
创建文件`src/components/AudioController.tsx`：
```typescript
import { useEffect, useRef, useState } from 'react';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 
                 transition-colors duration-300"
    >
      {isPlaying ? '🔊' : '🔈'}
    </button>
  );
};
```

### 2.2 添加音频控制
更新音频控制逻辑：
```typescript
// 在AudioController组件中添加
useEffect(() => {
  audioRef.current = new Audio('/src/assets/audio/Merry Christmas Mr. Lawrence.mp3');
  audioRef.current.loop = true;

  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };
}, []);

useEffect(() => {
  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }
}, [isPlaying]);
```

### 2.3 添加音效功能
创建文件`src/utils/audio.ts`：
```typescript
export const playBellSound = () => {
  const audio = new Audio('/src/assets/audio/bell-sound.mp3');
  audio.volume = 0.5;
  audio.play().catch(console.error);
};
```

## 3. 圣诞装饰元素

### 3.1 创建基础组件
创建文件`src/components/ChristmasElements.tsx`：
```typescript
import { motion } from 'framer-motion';

export const Decorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <ChristmasTree />
      <Santa />
      <Gifts />
      <Stars />
      <Bells />
      <CandyCanes />
      <ChristmasSocks />
    </div>
  );
};
```

### 3.2 实现装饰元素
在同一文件中添加各个装饰元素：
```typescript
const ChristmasTree = () => (
  <motion.div
    className="absolute bottom-10 left-10 text-6xl"
    animate={{
      y: [0, -10, 0],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    🎄
  </motion.div>
);

const Santa = () => (
  <motion.div
    className="absolute top-20 right-20 text-5xl"
    animate={{
      x: [0, -100, 0],
      y: [0, 20, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    🎅
  </motion.div>
);

const Gifts = () => (
  <motion.div
    className="absolute bottom-20 right-20 text-4xl"
    animate={{
      scale: [1, 1.1, 1],
      rotate: [-5, 5, -5],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    🎁
  </motion.div>
);

// ... 其他装饰元素
```

### 3.3 添加更多装饰
继续添加其他装饰元素：
```typescript
const Stars = () => (
  <motion.div
    className="absolute top-10 left-20 text-3xl"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    ⭐
  </motion.div>
);

const Bells = () => (
  <motion.div
    className="absolute top-40 left-40 text-4xl"
    animate={{
      rotate: [-10, 10, -10],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    🔔
  </motion.div>
);

const CandyCanes = () => (
  <motion.div
    className="absolute bottom-40 left-30 text-4xl"
    animate={{
      y: [0, -5, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    🍬
  </motion.div>
);

const ChristmasSocks = () => (
  <motion.div
    className="absolute bottom-30 right-40 text-4xl"
    animate={{
      rotate: [-5, 5, -5],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    🧦
  </motion.div>
);
```

## 4. 测试组件

### 4.1 创建测试页面
更新`src/App.tsx`：
```typescript
import { InteractiveSnow } from './components/InteractiveSnow';
import { AudioController } from './components/AudioController';
import { Decorations } from './components/ChristmasElements';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
      <AudioController />
      <InteractiveSnow />
      <Decorations />
      <div className="relative z-10 text-center pt-20">
        <h1 className="text-4xl font-bold text-white">圣诞快乐</h1>
      </div>
    </div>
  );
}

export default App;
```

### 4.2 运行和测试
1. 启动开发服务器：
```bash
npm run dev
```

2. 检查以下功能：
   - 雪花是否正确显示和动画
   - 鼠标移动时雪花是否有交互效果
   - 音频控制器是否正常工作
   - 装饰元素是否正确显示和动画

### 4.3 常见问题解决

1. 雪花不显示
- 检查`InteractiveSnow`组件是否正确导入
- 确认样式类名是否正确
- 检查控制台是否有错误

2. 音频不播放
- 确认音频文件路径正确
- 检查浏览器控制台错误信息
- 确保音频文件格式支持（推荐使用.mp3）

3. 动画不流畅
- 减少雪花数量
- 优化动画性能
- 检查浏览器性能面板

## 下一步
在下一篇教程中，我们将实现主应用逻辑，包括祝福语生成和页面交互效果。确保你已经成功实现了本篇教程中的所有组件，它们将是下一步工作的基础。

[下一篇：实现主应用逻辑 →]
