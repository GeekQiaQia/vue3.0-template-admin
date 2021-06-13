<template>
  <div class="upload-container">
    <div class="copy-container">
      <div class="info">
        <el-divider content-position="left">文件上传</el-divider>
        <span style="text-align: left">文件、图片上传场景。</span>
      </div>
      <div>
        <el-row>
          <el-col :offset="1" :span="22">
            <div class="grid-content bg-purple-dark">
              <el-card class="box-card">
                <div style="text-align: left">
                  <span>拖拽上传场景</span>
                  <el-divider></el-divider>
                </div>
                <div class="section">
                  <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <template #tip>
                      <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                    </template>
                  </el-upload>
                </div>
              </el-card>

              <el-card class="box-card">
                <div style="text-align: left">
                  <span>图片列表缩略图场景</span>
                  <el-divider></el-divider>
                </div>
                <div class="section">
                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <template #tip>
                      <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                    </template>
                  </el-upload>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fileList = ref<{ name: string; url: string }[]>([
      { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
      { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
    ])
    const handleRemove = (file: any, List: any) => {
      console.log(file, List)
    }
    const handlePreview = (file: any) => {
      console.log(file)
    }
    return {
      fileList,
      handleRemove,
      handlePreview
    }
  }
})
</script>

<style lang="stylus" scoped>
.upload-container{
   margin-top:20px;

    .info{
        text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
    }
    .section{
      display:flex;
      flex-direction:row;
      justify-content: flex-start;
      align-items :center;
      .upload-demo{
          width:100%;
      }
    }
     .el-row {
       margin-bottom: 20px;
     }
}
</style>
