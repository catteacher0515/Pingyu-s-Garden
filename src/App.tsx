import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { routeTransition } from './lib/motion'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ToolsPage from './pages/ToolsPage'
import ArticlesPage from './pages/ArticlesPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function AnimatedRoutes() {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const motionProps = shouldReduceMotion
    ? {
        initial: { opacity: 1, y: 0, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0 },
      }
    : routeTransition

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        data-testid="route-transition"
        data-route={location.pathname}
        initial={motionProps.initial}
        animate={motionProps.animate}
        exit={motionProps.exit}
        transition={motionProps.transition}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const basename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename}>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
