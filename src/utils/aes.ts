/** *
 * aes加密 解密
 * param { String } word 加密或解密的值
 * param { String } keyStr 秘钥key
 * return { String} 返回值
 *
 */
 import CryptoJS from 'crypto-js'

 const keyStr = 'eSEdSfdED==WGDH'
 // 加密
 export function encrypt(word:string) {
   const key = CryptoJS.enc.Utf8.parse(keyStr)
   const srcs = CryptoJS.enc.Utf8.parse(word)
   const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
   return encrypted.toString()
 }

 // 解密
 export function decrypt(word:string) {
   const key = CryptoJS.enc.Utf8.parse(keyStr)
   const decryptStr = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
   return CryptoJS.enc.Utf8.stringify(decryptStr).toString()
 }
