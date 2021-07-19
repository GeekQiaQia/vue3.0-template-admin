import {store} from '@/store'

// eslint-disable-next-line no-unused-vars
type VoidNoop = (arg0: any) => any
// 权限指令
export default {
    mounted(el: { parentNode: { removeChild: VoidNoop} }, binding:any) {
    const { value } = binding
    const permissions = store.getters['permissionModule/getPermission']
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = permissions.some((role: any) => permissionRoles.includes(role))
      console.log("value is",hasPermission);

      if (!hasPermission) {
        // eslint-disable-next-line no-unused-expressions
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}

/**
 * 全局权限方法
 * @param {Array} value
 * @returns {Boolean}
 */
export function isPermission(value: string | any[]) {
  if (value && value instanceof Array && value.length > 0) {
    const permissions = store.getters['permissionModule/getPermission']
    const permissionRoles = value

    const hasPermission = permissions.some((role: any) => permissionRoles.includes(role))

    if (!hasPermission) {
      return false
    }
    return true
  }
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false

}
