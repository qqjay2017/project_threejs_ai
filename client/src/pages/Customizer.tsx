import { AnimatePresence ,motion} from 'framer-motion'
import React from 'react'
import { useGlobalStore } from '../store'
import {slideAnimation} from '../config/motion'
export const Customizer = () => {
  const intro = useGlobalStore(s=>s.intro)
  return (
    <AnimatePresence>
      {
        !intro && (
          <>
            <motion.div   key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
            >

            </motion.div>
          </>
        )
      }
    </AnimatePresence>
  )
}
