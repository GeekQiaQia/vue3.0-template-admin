/**
 * @description url转换为blob类型
 */
 // eslint-disable-next-line import/prefer-default-export
 export const urlToBlob = (theUrl: string, callback:any) => {
    const xhr = new XMLHttpRequest(); // 初始化实例对象
    xhr.open('get', theUrl, true); // 初始化一个异步请求
    xhr.responseType = 'blob'; // 实例返回类型/ArrayBuffer/Blob/Document;
    // eslint-disable-next-line func-names
    xhr.onload = function() {
      if (this.status === 200) {
        if (callback) {
          callback(this.response);
        }
      }
    };
    xhr.send();
  };
  /**
 * @description base64转换为blob类型
 */
  export const base64ToBlob=(code: string)=> {
    const parts = code.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };

  export default {
    base64ToBlob,
    urlToBlob

  }
