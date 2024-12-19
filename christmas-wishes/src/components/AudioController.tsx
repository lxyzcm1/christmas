import { useState, useEffect } from 'react';

interface AudioControllerProps {
  onPlay?: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/src/assets/audio/Merry Christmas Mr. Lawrence.mp3');
    audio.loop = true;

    if (isPlaying) {
      audio.play().catch(console.error);
      onPlay?.();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, onPlay]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      title={isPlaying ? '关闭音乐' : '播放音乐'}
    >
      {isPlaying ? '🔊' : '🔈'}
    </button>
  );
};
