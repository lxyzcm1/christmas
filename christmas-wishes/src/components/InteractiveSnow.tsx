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

  // 创建雪花
  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 10, // 稍微调小雪花大小
      opacity: Math.random() * 0.5 + 0.3, // 调整透明度范围
      delay: Math.random() * 10,
    }));
    setSnowflakes(flakes);
  }, []);

  // 处理鼠标移动
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

  // 动画循环
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      setSnowflakes(prevFlakes => 
        prevFlakes.map(flake => {
          let newX = flake.x;
          let newY = flake.y;

          // 降低下落速度
          newY = (newY + 0.2) % 100;

          // 计算与鼠标的距离
          const dx = (mousePosition.x / (containerRef.current?.clientWidth || 1)) * 100 - flake.x;
          const dy = (mousePosition.y / (containerRef.current?.clientHeight || 1)) * 100 - flake.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // 增加影响范围但降低影响强度
          if (distance < 30) {
            const angle = Math.atan2(dy, dx);
            const force = (30 - distance) / 30 * 0.15; // 大幅降低力度
            newX += Math.cos(angle) * force;
            newY += Math.sin(angle) * force;
          }

          // 减小随机漂移幅度
          newX += Math.sin(time / 2000 + flake.delay) * 0.05;

          // 确保雪花保持在容器内
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
            filter: 'blur(0.3px)', // 添加轻微模糊效果
          }}
        >
          ❄️
        </motion.div>
      ))}
    </div>
  );
};
