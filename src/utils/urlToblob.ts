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
