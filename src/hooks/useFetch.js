import { ref } from 'vue'

export const useFetch = async (url, isBlob) => {
  const data = ref(null)
  const address = ref('')
  await new Promise((resolve, reject) => {
    const client = new XMLHttpRequest()
    client.responseType = isBlob ? 'blob' : ''
    client.onreadystatechange = () => {
      if (client.readyState !== 4) return
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/')
        resolve(
          data.value = client.response,
          address.value = urlArr[urlArr.length - 1]
        )
      } else {
        reject(new Error(client.statusText))
      }
    }
    client.open('GET', url)
    client.send()
  })
  return {
    data: data.value,
    url: address.value
  }
}
export default useFetch
