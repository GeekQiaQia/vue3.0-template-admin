<template>
  <div class="cropWrapper">
    <div class="operation-bar">
      <div class="bar">
        <el-tooltip content="打开" placement="left-end" effect="light">
          <div class="operator" @click="openFile">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="_2Xy1u button-icon">
              <path
                d="M15.6 13.3l1.9-.7c0-.1-1.2-3.2-4.2-3.2-2 0-3.1 1.3-3.7 2.3-.7-.2-1.8-.2-2.6.3-1 .6-1.4 1.8-1.4 3.4h2c0-.5.1-1.4.5-1.7.5-.3 1.3-.1 1.7.1l1 .5.3-1.1s.6-1.8 2.2-1.8c1.6.1 2.2 1.9 2.3 1.9z"
              ></path>
              <circle cx="8.5" cy="8" r="1.5"></circle>
              <path d="M21.5 16.5h-3v-3h-2v3h-3v2h3v3h2v-3h3z"></path>
              <path d="M4.5 4.5h14v8h2v-8c0-1.1-.9-2-2-2h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2h-8v-14z"></path>
            </svg>
            <input ref="filElem" style="display: none" type="file" accept="image/*" class="upload-file" @change="chooseImage" />
          </div>
        </el-tooltip>
        <div class="text" @click.prevent="handleSave">保存</div>
        <div class="text" @click.prevent="handleReset">重做</div>
        <div class="text" @click.prevent="handleShot">快照</div>

        <!-- <el-tooltip content="重做" placement="top" effect="light">
          <div class="operator" @click.prevent="handleReset">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="_2Xy1u button-icon">
              <path
                d="M9.6 10.5h9.2l-4.2-4.2c-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0l5.7 5.7.2.2c.2.2.3.5.3.7 0 .3-.1.5-.3.7l-.2.2-5.8 5.9c-.4.4-1.1.4-1.5 0s-.4-1.1 0-1.5l4.2-4.2H9.6c-3.2 0-5.8 2.6-5.8 5.8v.2c0 .6-.4 1-1 1s-1-.4-1-1v-.2c-.1-4.3 3.5-7.8 7.8-7.8z"
              ></path>
            </svg>
          </div>
        </el-tooltip> -->
        <!-- <el-tooltip content="快照" placement="top" effect="light">
          <div class="operator" @click.prevent="handleReset">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="_2Xy1u button-icon"><circle cx="16.5" cy="7.5" r="1.5"></circle><path d="M12 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0-2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"></path><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>
          </div>
        </el-tooltip> -->

        <el-tooltip content="缩小" placement="top" effect="light">
          <div class="operator" @click.prevent="handleZoom(-0.2)">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" class=""><rect width="12" height="2" x="6" y="11" fill-rule="evenodd" rx="1" transform="translate(-6 -11)"></rect></svg>
          </div>
        </el-tooltip>
        <el-tooltip content="放大" placement="top" effect="light">
          <div class="operator" @click.prevent="handleZoom(0.2)">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="">
              <path fill-rule="evenodd" d="M5 5V1a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2H7v4a1 1 0 0 1-2 0V7H1a1 1 0 0 1 0-2h4z"></path>
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip content="正向旋转+90" placement="top" effect="light">
          <div class="text" @click="handleRotate(90)">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="">
              <path fill-rule="evenodd" d="M14 6V0l-2.05 2.05a7 7 0 1 0 0 9.9l-1.416-1.416A4.988 4.988 0 0 1 7 12c-2.757 0-5-2.243-5-5s2.243-5 5-5c1.378 0 2.628.561 3.534 1.466L8 6h6z"></path>
            </svg>
          </div>
        </el-tooltip>

        <el-tooltip content="反向旋转-90" placement="top" effect="light">
          <div class="text" @click="handleRotate(-90)">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="">
              <path
                fill-rule="evenodd"
                d="M0 6V0l2.05 2.05C3.611.488 5.907-.338 8.375.131c2.741.521 4.955 2.723 5.488 5.463A7.007 7.007 0 0 1 7 14a6.974 6.974 0 0 1-4.95-2.05l1.416-1.416a4.995 4.995 0 0 0 4.379 1.396c1.983-.326 3.627-1.883 4.041-3.85A5.01 5.01 0 0 0 7 2a4.988 4.988 0 0 0-3.534 1.466L6 6H0z"
              ></path>
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip content="上下翻转" placement="top" effect="light">
          <div ref="flipY" class="text" @click="handleFlipY()">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" class=""><path fill-rule="evenodd" d="M7 0l4 4H3l4-4zM3 10h8l-4 4-4-4zM0 8V6h14v2H0z"></path></svg>
          </div>
        </el-tooltip>
        <el-tooltip content="左右翻转" placement="top" effect="light">
          <div ref="flipX" class="text" @click="handleFlipX()">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" class=""><path fill-rule="evenodd" d="M0 6.999l4-4v8L0 7zM10.184 11V3l4 4-4 4zm-4.185 3V0H8v14H5.999z"></path></svg>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="cropperAll">
      <div class="cropContainer">
        <VueCropper
          ref="cropper"
          :aspect-ratio="16 / 9"
          :src="imgSrc"
          preview=".preview"
          alt="Source Image"
          @ready="cropImageReady"
          @zoom="cropImageZoom"
          @cropmove="cropImageMove"
          @crop="cropImage"
        ></VueCropper>
      </div>
      <section class="preview-area">
        <div class="tip">预览</div>
        <div class="preview" />

        <div class="cropped-image">
          <div class="tip">快照</div>
          <img v-if="cropShotImg" :src="cropShotImg" alt="Cropped Image" />
          <div v-else class="crop-placeholder" />
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Crop',
  components: {
    VueCropper
  },
  setup() {
    const cropper = ref()
    const filElem = ref()
    const imgSrc = ref<string | ArrayBuffer>('https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81de421e98cc45dab6d8fcc87aef7f08~tplv-k3u1fbpfcp-watermark.image')
    const cropImg = ref('')
    const cropShotImg = ref()
    const flipY = ref()
    const flipX = ref()
    const cropImageMove = () => {
      // 返回base64
      cropImg.value = cropper.value.getCroppedCanvas().toDataURL()
      console.log('cropImageMove')
    }
    const cropImageZoom = () => {
      console.log('cropImageZoom')
    }
    const cropImageReady = () => {
      console.log('cropImageReady')
    }
    const cropImage = () => {
      console.log('cropImage')
      cropImg.value = cropper.value.getCroppedCanvas().toDataURL()
    }
    const handleRotate = (deg: number) => {
      cropper.value.rotate(deg)
    }
    const handleFlipY = () => {
      const dom = flipY.value
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      cropper.value.scaleY(scale)
      dom.setAttribute('data-scale', scale)
      cropper.value.rotate()
    }
    const handleFlipX = () => {
      const dom = flipX.value
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      cropper.value.scaleX(scale)
      dom.setAttribute('data-scale', scale)
      cropper.value.rotate()
    }
    const handleReset = () => {
      cropper.value.reset()
    }
    const handleShot = () => {
      cropShotImg.value = cropper.value.getCroppedCanvas().toDataURL()
      console.log(cropShotImg.value)
    }
    const openFile = () => {
      filElem.value.dispatchEvent(new MouseEvent('click'))
    }
    const handleZoom = (percent: number) => {
      cropper.value.relativeZoom(percent)
    }
    const chooseImage = () => {
      const inputFile = filElem.value.files[0]
      console.log(inputFile)
      if (inputFile) {
        if (!/(gif|png|jpg|jpeg)$/i.test(inputFile.type)) {
          ElMessage({
            message: '上传头像图片只能是gif|png|jpg|jpeg 格式!',
            type: 'warning'
          })
          return false
        }

        const reader = new FileReader()
        reader.readAsDataURL(inputFile)
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          imgSrc.value = ev?.target?.result ?? ''
          cropper.value.replace(ev?.target?.result)
        }

        return true
      }
      return false
    }
    const dataURLtoBlob = (dataurl: string) => {
      const arr = dataurl.split(',')
      const mime = arr[0]?.match(/:(.*?);/)?.[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      // eslint-disable-next-line no-plusplus
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    }

    const downloadFile = (url: string, name = "What's the fuvk") => {
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', name)
      a.setAttribute('target', '_blank')
      const clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent('click', true, true)
      a.dispatchEvent(clickEvent)
    }

    const downloadFileByBase64 = (base64: string, name: string | undefined) => {
      const myBlob = dataURLtoBlob(base64)
      const myUrl = URL.createObjectURL(myBlob)
      downloadFile(myUrl, name)
    }

    const handleSave = () => {
      console.log('cropImg.value', cropImg.value)
      downloadFileByBase64(cropImg.value, 'cropImg')
    }

    return {
      filElem,
      openFile,
      chooseImage,
      cropper,
      cropShotImg,
      imgSrc,
      cropImage,
      cropImageMove,
      cropImageZoom,
      cropImageReady,
      handleRotate,
      handleFlipY,
      handleFlipX,
      handleReset,
      handleShot,
      flipY,
      flipX,
      handleZoom,
      handleSave
    }
  }
})
</script>
<style lang="stylus" scoped>
.cropWrapper {
  width: 100%;

  height: 100vh;
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);
  background-size: 20px 20px;
  background-repeat: repeat;
  background-position: center center;
      display:flex;
    flex-direction:column;
    align-items:center;
    justify-content :flex-start;
      .operation-bar{
    z-index: 100;
    width:80%;
    top: .5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-transition: right .4s ease-in-out;
    transition: right .4s ease-in-out;
    margin-bottom :10px;
    .bar{
      position: relative;
    z-index: 2;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 2.5rem;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: .25rem .5rem .25rem 1rem;
    background: #2b2c2f;
    border-radius: 4px;
    color: #9da2ad;
    svg{
      fill: currentColor;
    }
    .operator{
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      height: 2rem!important;
      min-width: 2rem;
      cursor: pointer;
      -webkit-transition: color .3s;
      transition: color .3s;
      position: relative;
      z-index: 100;
     &:hover{
        background-color :rgb(65,66,68);
        color :rgb(240,240,240)
      }
    }
    .text{
      font-size: .79012346rem;
      line-height: 1rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      height: 2rem;
      padding-left: .5rem;
      padding-right: .5rem;
      margin-left: .5rem;
      border-radius :.25rem;
      cursor: pointer;

      &:hover{
        background-color :rgb(65,66,68);
        color :rgb(240,240,240)
      }
    }
    }
  }
    .cropperAll{
         display:flex;
    flex-direction:row;
    align-items:flex-start;
    justify-content :flex-start;
    width:100%;
    height:auto;
    min-height:600px;
    }
  .cropContainer{

    width: 70%;
  }

.preview-area {
  width: 30%;
  padding:10px;
      display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

  .tip{
        padding-left: 12px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: #1a1b1c;
    text-align :left;
  }
  .cropped-image  {
  max-width: 100%;
  width:100%;
  img{
        width: 100%;
    height: 200px;
  }
  .crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
}
}

.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}





}
</style>
