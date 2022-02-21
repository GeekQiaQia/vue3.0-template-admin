import {  onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { useStore } from '@/store/index'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

// usexxx api
function useResize(){

    const store = useStore()
    const isMobile=()=> {
        const rect = body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }

    const resizeHandler=()=> {
        if (!document.hidden) {
          const deviceType = isMobile()
          store.dispatch('appModule/toggleDevice', deviceType ? 'mobile' : 'desktop')

          if (deviceType) {
            store.dispatch('appModule/closeSideBar', { withoutAnimation: true })
          }
        }
      }

      onBeforeMount(()=>{

        window.addEventListener('resize',resizeHandler)
      })
      onBeforeUnmount(()=>{
        window.removeEventListener('resize', resizeHandler)
      })
      onMounted(()=>{
        const deviceType =isMobile()
        if (deviceType) {
          store.dispatch('appModule/toggleDevice', 'mobile')
          store.dispatch('appModule/closeSideBar', { withoutAnimation: true })
        }
      })
}

export default useResize
