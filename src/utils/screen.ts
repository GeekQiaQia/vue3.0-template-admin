/*
 * @Author: GeekQiaQia
 * @Date: 2022-02-21 20:47:22
 * @LastEditTime: 2022-02-21 20:49:53
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /vue3.0-template-admin/src/utils/screen.ts
 */
import { ElMessage } from 'element-plus'

function toFullScreen() {
  const elem = document.body
  if (elem?.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen()
  } else if (elem?.mozRequestFullScreen) {
    elem.mozRequestFullScreen()
  } else if (elem?.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem?.requestFullScreen) {
    elem.requestFullscreen()
  } else {
    ElMessage.warning('浏览器不支持全屏！')
  }
}

function exitFullScreen() {
  const elem = window.parent.document
  if (elem?.webkitCancelFullScreen) {
    elem.webkitCancelFullScreen()
  } else if (elem?.mozCancelFullScreen) {
    elem.mozCancelFullScreen()
  } else if (elem?.cancelFullScreen) {
    elem.cancelFullScreen()
  } else if (elem?.msExitFullscreen) {
    elem.msExitFullscreen()
  } else if (elem?.exitFullscreen) {
    elem.exitFullscreen()
  } else {
    ElMessage.warning('浏览器不支持全屏！')
  }
}

export { toFullScreen, exitFullScreen }
