<template>
  <div class="zip-container">
    <div class="info">
      <el-divider content-position="left">导出压缩文件Zip</el-divider>
      <span style="text-align: left"
        ><span class="title">导出压缩文件场景：</span>通常用于选择某些文件，并将其压缩导出的场景，比如蓝湖批量导出压缩图片文件等<el-link
          type="primary"
          href="https://stuk.github.io/jszip/documentation/examples.html"
          >JSZip <el-tooltip class="item" effect="dark" :content="contentTip" placement="top-start"> <i class="el-icon-question"></i></el-tooltip> </el-link
      ></span>
    </div>

    <el-row>
      <el-col :offset="1" :span="22">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <div style="text-align: left">
              <span style="margin-right: 20px">下载生成编辑文件zip场景</span>
              <el-button id="blob" size="medium" type="success" plain @click="handleDownloadFile('FileSaver')"
                >下载 Zip (FileSaver API) <el-tooltip class="item" effect="dark" :content="downloadTip" placement="bottom-start"> <i class="el-icon-question"></i></el-tooltip>
              </el-button>
              <el-input v-model="zipFileName" placeholder="请输入zip压缩文件名" style="width: 200px; margin-left: 10px" clearable> </el-input>
              <el-input v-model="fileName" placeholder="请输入编辑文件名" style="width: 200px; margin-left: 10px" clearable> </el-input>

              <el-divider></el-divider>
            </div>
            <div class="section">
              <RichEditor :model-value="editorValue" @update:modelValue="handleUpdateValue"></RichEditor>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :offset="1" :span="22">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <div style="text-align: left">
              <span style="margin-right: 20px">下载压缩已上传文件的zip场景</span>
              <el-button id="blob" size="medium" type="success" plain @click="handleDownloadSelectFile()"
                >下载 Zip (FileSaver API) <el-tooltip class="item" effect="dark" :content="downloadTip" placement="bottom-start"> <i class="el-icon-question"></i></el-tooltip>
              </el-button>
              <el-progress style="width: 40%; margin: 10px" :text-inside="true" :stroke-width="20" :percentage="percentage" status="success"></el-progress>
              <el-divider></el-divider>
            </div>
            <div class="section">
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="fileName" label="文件名称">
                  <template #default="scope">{{ scope.row.fileName }}</template>
                </el-table-column>
                <el-table-column prop="uploadTime" label="上传时间"> </el-table-column>
                <el-table-column prop="uploadUser" label="上传人" show-overflow-tooltip> </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import JSZip from 'jszip'
// 缺少ts文件声明
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import { ElMessage, ElNotification } from 'element-plus'
import RichEditor from '@/components/Editor/richEditor.vue'

interface stateType {
  contentTip: string
  downloadTip: string
  tableData: { fileName: string; fileUrl: string; uploadTime: string; uploadUser: string }[]
  multipleSelection: { fileName: string; fileUrl: string; uploadTime: string; uploadUser: string }[]
  percentage: number
}

export default defineComponent({
  name: 'ExportZip',
  components: {
    RichEditor
  },
  setup() {
    const state = reactive<stateType>({
      contentTip: 'JSZip的实例表示一组文件。您可以添加它们、删除它们、修改它们。您还可以导入现有的zip文件或生成一个。',
      downloadTip: 'FileSaver API适用于firefox、chrome、opera &gt;= 15和IE &gt;= 10(但不适用于兼容性视图)。',
      tableData: [
        {
          fileName: 'package.zip',
          fileUrl: './test/package.zip',
          uploadTime: '2021-07-01',
          uploadUser: 'MrZip'
        },
        {
          fileName: 'jszip.js',
          fileUrl: './test/jszip.js',
          uploadTime: '2021-07-02',
          uploadUser: 'MrZip'
        },
        {
          fileName: 'style.css',
          fileUrl: './test/style.css',
          uploadTime: '2021-07-03',
          uploadUser: 'MrCss'
        }
      ],
      multipleSelection: [],
      percentage: 0
    })
    const editorValue = ref() // 富文本值做初始化
    const richHtml = ref() // 富文本内容；
    const zipFileName = ref() // 压缩文件名
    const fileName = ref() // 文件名
    let dowloadZip: JSZip
    let downloadSelectZip: JSZip

    /**
     * @description 下载文件
     */
    const handleDownloadFile = (saveType: string) => {
      dowloadZip.file(`${fileName.value || 'default'}.html`, richHtml.value)
      if (saveType === 'FileSaver') {
        dowloadZip.generateAsync({ type: 'blob' }).then(
          (blob) => {
            // 1) generate the zip file
            // 2) trigger the download
            saveAs(blob, `${zipFileName.value || '压缩'}`)
            ElNotification({
              type: 'success',
              message: `文件下载成功`
            })
          },
          (err) => {
            ElNotification({
              type: 'warning',
              message: `文件下载失败,${err}`
            })
          }
        )
      }
    }

    /**
     * Fetch the content and return the associated promise.
     * @param {String} url the url of the content to fetch.
     * @return {Promise} the promise containing the data.
     */
    const urlToPromise = (url: string) =>
      new Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent(url, (err: any, data: unknown) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    const handleDownloadSelectFile = (): boolean => {
      if (state.multipleSelection.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请先选择需要下载的文件'
        })
        return false
      }

      state.multipleSelection.forEach((item) => {
        downloadSelectZip.file(item.fileName, urlToPromise(item.fileUrl), { binary: true })
      })
      // when everything has been downloaded, we can trigger the dl
      downloadSelectZip
        .generateAsync({ type: 'blob' }, (metadata) => {
          let msg = `progression : ${metadata.percent.toFixed(2)} %`
          if (metadata.currentFile) {
            msg += `, current file = ${metadata.currentFile}`
          }
          console.log(msg)
          // showMessage(msg)
          // updatePercent(metadata.percent | 0)
          state.percentage = metadata.percent
        })
        .then(
          (blob) => {
            // see FileSaver.js
            saveAs(blob, 'example.zip')

            // showMessage('done !')
          },
          (e) => {
            console.log(e)
            // showError(e)
          }
        )
      return true

      //
    }
    /**
     * @description  获取接收最新文本
     */
    const handleUpdateValue = (val: any) => {
      console.log(val)
      richHtml.value = val
    }
    const handleSelectionChange = (val: any) => {
      if (state.percentage > 0) {
        state.percentage = 0
      }
      state.multipleSelection = val
    }
    // 初始化实例
    onMounted(() => {
      // new 文件集合
      downloadSelectZip = new JSZip()
      dowloadZip = new JSZip()
    })

    return {
      ...toRefs(state),
      editorValue,
      zipFileName,
      fileName,
      handleSelectionChange,
      handleDownloadFile,
      handleDownloadSelectFile,
      handleUpdateValue
    }
  }
})
</script>
<style lang="stylus" scoped>
.zip-container{

    .info{
      .title{
        font-size:14px;
      }
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
    }
     .el-row {
       margin-bottom: 20px;
     }

}
</style>
