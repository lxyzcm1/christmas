import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Decorations } from './components/ChristmasElements'
import { AudioController } from './components/AudioController'
import { getRandomWish, playBellSound } from './utils/wishesGenerator'
import { InteractiveSnow } from './components/InteractiveSnow'

function ChristmasWishes() {
  const [name, setName] = useState('')
  const [showWishes, setShowWishes] = useState(false)
  const [currentWish, setCurrentWish] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setCurrentWish(getRandomWish())
      setShowWishes(true)
      playBellSound()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-blue-950/50" />
      
      <AudioController />
      <InteractiveSnow />
      <Decorations />
      
      <div className="text-center z-10 max-w-2xl mx-auto px-4">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-500"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎄 圣诞快乐 🎄
          </motion.h1>
          <p className="text-lg text-white/80">分享你的圣诞祝福</p>
        </motion.div>
        
        {!showWishes ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入你的名字"
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all backdrop-blur-sm text-lg"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              查看祝福
            </motion.button>
          </motion.form>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text"
              >
                亲爱的 {name}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl leading-relaxed text-white/90 font-light"
              >
                {currentWish}
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowWishes(false)
                  setName('')
                }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
              >
                再许一个愿望
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default ChristmasWishes
