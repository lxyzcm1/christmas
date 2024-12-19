import { motion } from 'framer-motion';

const floatAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const ChristmasTree = () => (
  <motion.div
    className="absolute bottom-0 left-[10%] text-8xl md:text-9xl opacity-80"
    {...floatAnimation}
  >
    🎄
  </motion.div>
);

export const Santa = () => (
  <motion.div
    className="absolute top-[10%] right-[10%] text-6xl md:text-7xl opacity-90"
    animate={{
      x: [-20, window.innerWidth + 20],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }}
  >
    🎅
  </motion.div>
);

export const Gift = () => (
  <motion.div
    className="absolute bottom-[10%] right-[10%] text-5xl md:text-6xl"
    animate={{
      rotate: [-5, 5, -5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    🎁
  </motion.div>
);

export const Star = () => (
  <motion.div
    className="absolute top-[5%] left-1/2 -translate-x-1/2 text-4xl md:text-5xl"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    ⭐
  </motion.div>
);

export const Bells = () => (
  <motion.div
    className="absolute top-[20%] left-[10%] text-4xl md:text-5xl"
    animate={{
      rotate: [-10, 10, -10],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    🔔
  </motion.div>
);

export const CandyCane = () => (
  <motion.div
    className="absolute bottom-[20%] left-[25%] text-5xl md:text-6xl"
    animate={{
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }}
  >
    🍬
  </motion.div>
);

const Holly = () => (
  <motion.div
    className="absolute top-[40%] right-[15%] text-4xl md:text-5xl"
    {...floatAnimation}
    style={{ animationDelay: '1s' }}
  >
    🎍
  </motion.div>
);

const ChristmasSock = () => (
  <motion.div
    className="absolute top-[30%] left-[20%] text-5xl md:text-6xl"
    animate={{
      rotate: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    🧦
  </motion.div>
);

export const Decorations = () => (
  <>
    <div className="fixed inset-0 pointer-events-none">
      <ChristmasTree />
      <Santa />
      <Gift />
      <Star />
      <Bells />
      <CandyCane />
      <Holly />
      <ChristmasSock />
    </div>
  </>
);
