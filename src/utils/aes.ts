/** *
 * aes加密 解密
 * param { String } word 加密或解密的值
 * param { String } keyStr 秘钥key
 * return { String} 返回值
 *
 */
 import CryptoES  from 'crypto-es'

 const keyStr = 'eSEdSfdED==WGDH'
 // 加密
 export function encrypt(word:string) {
   const key = CryptoES .enc.Utf8.parse(keyStr)
   const srcs = CryptoES .enc.Utf8.parse(word)
   const encrypted = CryptoES .AES.encrypt(srcs, key, { mode: CryptoES .mode.ECB, padding: CryptoES .pad.Pkcs7 })
   return encrypted.toString()
 }

 // 解密
 export function decrypt(word:string) {
   const key = CryptoES .enc.Utf8.parse(keyStr)
   const decryptStr = CryptoES .AES.decrypt(word, key, { mode: CryptoES .mode.ECB, padding: CryptoES .pad.Pkcs7 })
   return CryptoES .enc.Utf8.stringify(decryptStr).toString()
 }

 export default {encrypt ,decrypt}
