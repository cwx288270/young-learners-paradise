import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AppShell from './components/layout/AppShell'
import Login from './pages/Login'
import Home from './pages/Home'
import { initDatabase } from './utils/sqliteAdapter'
import CharacterIndex from './pages/character/Index'
import CharacterLearn from './pages/character/Learn'
import CharacterPractice from './pages/character/Practice'
import CharacterWriting from './pages/character/Writing'
import CharacterTest from './pages/character/Test'
import PinyinIndex from './pages/pinyin/Index'
import PinyinLearn from './pages/pinyin/Learn'
import PinyinPlay from './pages/pinyin/Play'
import MathIndex from './pages/math/Index'
import MathLearn from './pages/math/Learn'
import MathPlay from './pages/math/Play'
import ReadingIndex from './pages/reading/Index'
import ReadingStory from './pages/reading/Story'
import WritingIndex from './pages/writing/Index'
import WritingDraw from './pages/writing/Draw'
import ParentIndex from './pages/parent/Index'
import ParentReport from './pages/parent/Report'
import ParentUnlock from './pages/parent/Unlock'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants}
        initial="initial" animate="animate" exit="exit"
        transition={{ duration: 0.2, ease: 'easeOut' }} style={{ height: '100%' }}>
        <Routes location={location}>
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* 拼音 */}
            <Route path="/pinyin" element={<PinyinIndex />} />
            <Route path="/pinyin/learn" element={<PinyinLearn />} />
            <Route path="/pinyin/play" element={<PinyinPlay />} />
            <Route path="/pinyin/play/:mode" element={<PinyinPlay />} />

            {/* 数学 */}
            <Route path="/math" element={<MathIndex />} />
            <Route path="/math/learn" element={<MathLearn />} />
            <Route path="/math/play" element={<MathPlay />} />

            {/* 识字 */}
            <Route path="/character" element={<CharacterIndex />} />
            <Route path="/character/learn" element={<CharacterLearn />} />
            <Route path="/character/play" element={<CharacterPractice />} />
            <Route path="/character/write" element={<CharacterWriting />} />
            <Route path="/character/listen" element={<CharacterTest />} />

            {/* 阅读 */}
            <Route path="/reading" element={<ReadingIndex />} />
            <Route path="/reading/story/:id" element={<ReadingStory />} />

            {/* 写字 */}
            <Route path="/writing" element={<WritingIndex />} />
            <Route path="/writing/draw/:char" element={<WritingDraw />} />

            {/* 家长 */}
            <Route path="/parent" element={<ParentIndex />} />
            <Route path="/parent/report/:childId" element={<ParentReport />} />
            <Route path="/parent/unlock" element={<ParentUnlock />} />

            {/* 兼容旧路由 */}
            <Route path="/*" element={<Home />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => { initDatabase() }, [])
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
