/*
 * @Author: GeekQiaQia
 * @Date: 2022-02-21 21:07:08
 * @LastEditTime: 2022-06-21 15:46:26
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /vue3.0-template-admin/src/directive/clipboard/clipboard.ts
 */
import ClipBoard from 'clipboard'

if (!ClipBoard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

interface elNode {
  vClipboard?: ClipBoard & ClipBoard.Options
  vClipSuccess?: Function
  vClipFailure?: Function
}

// eslint-disable-next-line no-undef
declare type elType = (string | Element | NodeListOf<Element>) & elNode

// directive hooks
export default {
  // called before bound element's parent component is mounted
  beforeMount() {},
  // called when bound element's parent component is mounted

  mounted(el: elType, binding: any) {
    const targetEl = el
    const clipboard: ClipBoard = new ClipBoard(targetEl, {
      text() {
        return binding.value
      },
      action() {
        return binding.arg === 'cut' ? 'cut' : 'copy'
      }
    })
    clipboard.on('success', (e: ClipBoard.Event) => {
      console.log(e)
      const callback = el.vClipSuccess
      // eslint-disable-next-line no-unused-expressions
      callback && callback(e)
    })

    clipboard.on('error', (e: ClipBoard.Event) => {
      console.log(e)
      const callback = el.vClipFailure
      // eslint-disable-next-line no-unused-expressions
      callback && callback(e)
    })
    targetEl.vClipboard = clipboard
  },
  // called before the containing component's VNode is updated
  beforeUpdate() {},
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated(el: elType, binding: any) {
    const targetEl = el
    if (binding.arg === 'success') {
      targetEl.vClipSuccess = binding.value
    } else if (binding.arg === 'error') {
      targetEl.vClipFailure = binding.value
    } else if (targetEl?.vClipboard) {
      targetEl.vClipboard.text = () => binding.value
      targetEl.vClipboard.action = () => (binding.arg === 'cut' ? 'cut' : 'copy')
    }
  },
  // called before the bound element's parent component is unmounted
  beforeUnmount() {},
  // called when the bound element's parent component is unmounted
  unmounted(el: elType, binding: any) {
    const targetEl = el
    if (binding.arg === 'success') {
      delete targetEl.vClipSuccess
    } else if (binding.arg === 'error') {
      delete targetEl.vClipFailure
    } else {
      el?.vClipboard?.destroy()
      delete targetEl.vClipboard
    }
  }
}
