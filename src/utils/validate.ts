/*
 * @Author: GeekQiaQia
 * @Date: 2022-02-21 21:07:08
 * @LastEditTime: 2022-05-18 14:43:56
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /vue3.0-template-admin/src/utils/validate.ts
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
  // eslint-disable-next-line camelcase
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
