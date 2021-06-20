<template>
  <div>excel</div>

  <input ref="uploadExcelRef" class="upload-excel" type="file" accept=".xlsx, .xls" @change="handleClickChoose" />
  <el-table :data="excelData" style="width: 100%">
    <el-table-column v-for="item in header" :key="item" :prop="item" :label="item" width="180"> </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useReadRawData } from './useReadExcel'

interface stateTypes {
  excelData: any[]
  header: string[]
}
export default defineComponent({
  setup() {
    const uploadExcelRef = ref()
    const state = reactive<stateTypes>({
      excelData: [],
      header: []
    })

    /**
     * @description 选择上传文件 .xlsx, .xls
     */
    const handleClickChoose = async (e: { target: { files: any } }) => {
      const { files } = e.target
      const rawFile = files[0]
      const { excelData, header } = await useReadRawData(rawFile)
      state.excelData = excelData
      state.header = header
    }
    return {
      uploadExcelRef,
      handleClickChoose,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="stylus" scoped></style>
