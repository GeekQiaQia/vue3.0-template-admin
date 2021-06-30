<template>
  <div class="export-container">
    <div>
      <el-form size="mini" inline :model="form">
        <el-form-item label="导出文件名称">
          <el-input v-model="form.fileName" style="width: 150px" clearable placeholder="请输入模板名称"> </el-input>
        </el-form-item>

        <el-form-item label="导出文件类型">
          <el-select v-model="form.fileType" clearable placeholder="请选择">
            <el-option v-for="item in fileTypes" :key="item.value" :label="item.value" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleExportExcel">导出excel文件 <i class="el-icon-search"></i> </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table id="tableId" ref="tableRef" :data="tableData" border highlight-current-row style="width: 100%">
      <el-table-column v-for="item in tableColumn" :key="item.prop" :fixed="item.fixed" :prop="item.prop" :label="item.label" :width="item.width"> </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import XLSX from 'xlsx'

interface stateTypes {
  tableData: {
    date: string
    name: string
    province: string
    city: string
    address: string
    zip: number
  }[]
  form: {
    fileName: string
    fileType: XLSX.BookType
  }
}
export default defineComponent({
  setup() {
    const state = reactive<stateTypes>({
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ],
      form: {
        fileName: 'exportExcel',
        fileType: 'xlsx'
      }
    })
    const fileTypes = [
      {
        value: 'xlsx',
        code: 'xlsx'
      },
      {
        value: 'xls',
        code: 'xls'
      },
      {
        value: 'csv',
        code: 'csv'
      },
      {
        value: 'txt',
        code: 'txt'
      }
    ]
    const tableColumn = [
      {
        prop: 'date',
        fixed: true,
        width: '150',
        label: '日期'
      },
      {
        prop: 'name',
        fixed: false,
        width: '120',
        label: '姓名'
      },
      {
        prop: 'province',
        fixed: false,
        width: '120',
        label: '省份'
      },
      {
        prop: 'city',
        fixed: false,
        width: '120',
        label: '市区'
      },
      {
        prop: 'address',
        fixed: false,
        width: '400',
        label: '地址'
      },
      {
        prop: 'zip',
        fixed: false,
        width: '120',
        label: '邮编'
      }
    ]
    const tableRef = ref()
    const formatJson = (filterVal: any[], jsonData: any[]) => jsonData.map((v) => filterVal.map((j) => v[j]))
    const filterArrayProp = (arrayObj: any, prop: string | number) => {
      console.log(arrayObj)
      const tempArray = []
      for (let i = 0; i < arrayObj.length; i++) {
        tempArray.push(arrayObj[i][prop])
      }
      return tempArray
    }
    const handleExportExcel = () => {
      import('./useExportExcel').then((excel) => {
        const table = state.tableData
        const tHeader = filterArrayProp(tableColumn, 'label')
        const filterVal = filterArrayProp(tableColumn, 'prop')
        const data = formatJson(filterVal, table)
        console.log(data)
        excel.exportJsonToExcel({
          multiHeader: [],
          merges: [],
          header: tHeader,
          data,
          filename: state.form.fileName,
          autoWidth: true,
          bookType: state.form.fileType
        })
      })
    }
    return {
      fileTypes,
      tableColumn,
      tableRef,
      ...toRefs(state),
      handleExportExcel
    }
  }
})
</script>
<style lang="stylus" scoped>
.export-container{

}
</style>
