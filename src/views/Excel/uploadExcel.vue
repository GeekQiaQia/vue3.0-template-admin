<template>
  <div class="upload-container">
    <div class="info">
      <el-divider content-position="left">上传excel</el-divider>
      <span style="text-align: left">excel上传预览场景。</span>
    </div>
    <div>
      <el-row>
        <el-col :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              <div style="text-align: left">
                <span>上传excel文件并预览场景</span>
                <el-divider></el-divider>
              </div>
              <div class="section">
                <!-- <upload :auto-upload="false" :accept="accept" :disabled="disabled" action="https://jsonplaceholder.typicode.com/posts/" :on-filter-data="handleFileData">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </upload> -->
                <el-upload
                  ref="uploadRef"
                  style="width: 100%"
                  :accept="accept"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

                  <template #tip>
                    <div class="el-upload__tip">点击文件进行预览</div>
                  </template>
                </el-upload>

                <div class="preview-table">
                  <el-table v-loading="loading" :data="excelData" border style="width: 100%">
                    <el-table-column v-for="item in header" :key="item" :prop="item" :label="item" width="180"> </el-table-column>
                  </el-table>
                </div>
                <el-button style="margin-left: 10px" size="small" type="success" @click="handleSubmitUpload">确认上传</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { useReadRawData } from './useReadExcel'
// import upload from './components/upload.vue'

interface stateTypes {
  excelData: any[]
  header: string[]
  fileList: { name: String; url: String }[]
  loading: Boolean
}
export default defineComponent({
  components: {},
  setup() {
    const disabled = ref(false)
    const uploadRef = ref()
    // const loading = ref(false)
    const accept = ref('.xls,.xlsx')
    const state = reactive<stateTypes>({
      excelData: [],
      header: [],
      fileList: [],
      loading: false
    })
    const toPreviewExcelData = async (rawFile: File) => {
      const { excelData, header } = await useReadRawData(rawFile)
      state.excelData = excelData
      state.header = header
      state.loading = false
    }
    const handleFileData = (rawFile: File) => {
      toPreviewExcelData(rawFile)
    }
    const handlePreview = (file: { raw: File }) => {
      state.loading = true
      toPreviewExcelData(file.raw)
    }
    const handleRemove = (file: any, fileList: any) => {
      console.log(file, fileList)
    }
    const handleSubmitUpload = () => {
      uploadRef.value.submit()
      ElMessage({
        type: 'success',
        message: '上传成功'
      })
    }
    return {
      uploadRef,
      accept,
      disabled,
      handlePreview,
      handleRemove,
      handleFileData,
      handleSubmitUpload,
      ...toRefs(state)
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
      flex-direction:column;
      justify-content: flex-start;
      align-items :center;
      .preview-table{
        width:100%;
        margin-top:10px;
      }
    }
     .el-row {
       margin-bottom: 20px;
     }
}
</style>
