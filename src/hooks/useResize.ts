import { useStore } from '@/store/index'
import {  onMounted, onBeforeMount, onBeforeUnmount } from "vue";

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
    setup(){
        const store = useStore()
        const isMobile=()=> {
            const rect = body.getBoundingClientRect()
            return rect.width - 1 < WIDTH
        }

        const resizeHandler=()=> {
            if (!document.hidden) {
              const deviceType = isMobile()
              store.dispatch('app/toggleDevice', deviceType ? 'mobile' : 'desktop')

              if (deviceType) {
                store.dispatch('app/closeSideBar', { withoutAnimation: true })
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
              store.dispatch('app/toggleDevice', 'mobile')
              store.dispatch('app/closeSideBar', { withoutAnimation: true })
            }
          })
          return {
            isMobile,
            resizeHandler
          }
    }
}
