import { ref, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash'

/**
 * 窗口大小变化监听 Hook
 * @param callback 回调函数
 * @param delay 防抖延迟时间（毫秒）
 */
export function useWindowResize(callback: () => void, delay = 200) {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const handleResize = debounce(() => {
    width.value = window.innerWidth
    height.value = window.innerHeight
    callback?.()
  }, delay)

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    width,
    height
  }
}

/**
 * 响应式断点 Hook
 */
export function useBreakpoints() {
  const width = ref(window.innerWidth)

  const breakpoints = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }

  const isMobile = ref(width.value < breakpoints.sm)
  const isTablet = ref(width.value >= breakpoints.sm && width.value < breakpoints.lg)
  const isDesktop = ref(width.value >= breakpoints.lg)

  const handleResize = debounce(() => {
    width.value = window.innerWidth
    isMobile.value = width.value < breakpoints.sm
    isTablet.value = width.value >= breakpoints.sm && width.value < breakpoints.lg
    isDesktop.value = width.value >= breakpoints.lg
  }, 200)

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints
  }
}
