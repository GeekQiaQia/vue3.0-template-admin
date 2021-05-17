<template>
  <div class="table-container">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="filterTable" class="table-list" row-key="date" :data="tableData.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' }
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter"> </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="输入姓名字段关键字搜索" />
        </template>
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-popconfirm
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定删除该条记录吗？"
                      @confirm="handleDelete(scope.$index, scope.row)"
                    >
                      <template #reference>
                          <el-button size="mini" type="danger" >删除</el-button>
                      </template>
                    </el-popconfirm>

        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[
          { text: '家', value: '家' },
          { text: '公司', value: '公司' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="false"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20, 25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: 'TableList',
  setup() {
    // 思考 ref 响应式和 reactive 响应式的区别； 修改对象属性值，是否会刷新数据

    const tableData = ref([
      {
        date: '2016-05-07',
        name: '白小白',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      },
      {
        date: '2016-05-04',
        name: '李小胖',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      },
      {
        date: '2016-05-01',
        name: '王老五',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      },
      {
        date: '2016-07-03',
        name: '王麻子',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
      },
      {
        date: '2016-07-07',
        name: '白小白',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      },
      {
        date: '2016-07-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      },
      {
        date: '2016-07-04',
        name: '李小胖',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      },
      {
        date: '2016-07-01',
        name: '王老五',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }
    ])
    const router=useRouter();
    const filterTable = ref()
    const search = ref()
    const currentPage = ref(1)
    const pageSize = ref(5)
    const total = ref(tableData.value.length)
    const formInline=reactive({
         user: '',
          region: ''
    });
    onMounted(() => {
      // eslint-disable-next-line no-console
      console.dir(filterTable.value)
    })
    // methods
    const resetDateFilter = () => {
      filterTable.value.clearFilter('date')
    }

    const clearFilter = () => {
      filterTable.value.clearFilter()
    }

    const formatter = (row: { address: any }) => row.address;
    const filterTag = (value: any, row: { tag: any }) => row.tag === value;
    const filterHandler = (value: any, row: { [x: string]: any }, column: { property: any }) => {
      const { property } = column
      return row[property] === value
    }
    const handleEdit = (index: any, row: any) => {
      // eslint-disable-next-line no-console
      console.log(index, row);
      router.push('/form/advanceForm');
    }
    const handleDelete = (index: any, row: any) => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      tableData.value.splice(index,1);
    }
    const handleSizeChange = (val: any) => {
      // eslint-disable-next-line no-console
      console.log(`每页 ${val} 条`)
      pageSize.value = val
      // request api to change tableData
    }
    const handleCurrentChange = (val: any) => {
      // eslint-disable-next-line no-console
      console.log(`当前页: ${val}`)
      currentPage.value = val
      // request api to change tableData
    };
    const onSubmit=()=> {
        // eslint-disable-next-line no-console
        console.log('submit!');
      }
    return {
        formInline,
      total,
      pageSize,
      handleCurrentChange,
      handleSizeChange,
      onSubmit,
      currentPage,
      handleEdit,
      handleDelete,
      search,
      filterTable,
      tableData,
      resetDateFilter,
      clearFilter,
      formatter,
      filterTag,
      filterHandler
    }
  }
})
</script>
<style lang="stylus" scoped>
.table-container{
    .form-inline{
        margin:15px;
        text-align:left;
    }
    .table-list{
        margin:15px;
    }

}
</style>
