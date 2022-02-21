<template>
  <div class="analysis-info">
    <el-row style="margin: 15px">
      <el-col :span="24" class="page-title-box">
        <h4 class="page-title">Dashboard</h4>
        <div class="page-title-right">
          <div style="margin-right: 10px"><el-date-picker v-model="pickDate" type="date" placeholder="选择日期"> </el-date-picker></div>
          <el-button :icon="Refresh" circle type="primary" style="maring-left: 10px"></el-button>
          <el-button :icon="Search" circle type="primary"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xl="10">
        <el-row>
          <el-col :lg="12">
            <el-card shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Customers</h5>
                <i class="widget-icon"><ShoppingCartFull /></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>37,258</h3>
              </div>
              <div class="card-footer text-muted">
                <span class="text-success margin-right-1"><Top />6.28%</span>
                <span class="text-nowrap">since last week </span>
              </div>
            </el-card>
          </el-col>
          <el-col :lg="12">
            <el-card shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Orders</h5>
                <i class="widget-icon"><GoodsFilled /></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>3,258</h3>
              </div>
              <div class="card-footer text-muted">
                <span class="text-danger margin-right-1"><Top />2.28%</span>
                <span class="text-nowrap">since last week </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="12">
            <el-card shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Revenue</h5>

                <i class="widget-icon"><Coin /></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>￥3,258</h3>
              </div>
              <div class="card-footer text-muted">
                <span class="text-danger margin-right-1"><Top />3.28%</span>
                <span class="text-nowrap">since last week </span>
              </div>
            </el-card>
          </el-col>
          <el-col :lg="12">
            <el-card shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Growth</h5>
                <i class="widget-icon"><DataLine /></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>+ 20.48%</h3>
              </div>
              <div class="card-footer text-muted">
                <span class="text-success margin-right-1"><Top />5.28%</span>
                <span class="text-nowrap">since last week </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xl="14">
        <el-card shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">products</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div style="height: 300px" class="e-chart">
            <div ref="refProduct" style="width: inherit; height: inherit"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-card shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">Revene</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div class="chart-bg padding-top-1 padding-bottom-1">
            <el-row>
              <el-col :md="12">
                <p class="text-muted">current week</p>
                <h2 class="font-nomal text-center">
                  <small class="text-primary dot bg-primary"></small>
                  <span>￥23.976</span>
                </h2>
              </el-col>
              <el-col :md="12">
                <p class="text-muted">previous week</p>
                <h2 class="font-nomal text-center">
                  <small class="text-primary dot bg-green"></small>
                  <span>￥23.976</span>
                </h2>
              </el-col>
            </el-row>
          </div>
          <div class="e-chart" style="height: 364px">
            <div ref="refLineChart" style="width: inherit; height: inherit"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">Revene by Location</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div class="margin-top-2 margin-bottom-2">
            <div id="world-map-markers" style="height: 224px">
              <WorldMap></WorldMap>
            </div>
            <h5 class="font-nomal margin-bottom- text-left">New York</h5>
            <el-progress class="margin-bottom-pro" :percentage="70"><span>70k</span></el-progress>
            <h5 class="font-nomal margin-bottom text-left">San Francisco</h5>
            <el-progress class="margin-bottom-pro" :percentage="60"><span>60k</span></el-progress>
            <h5 class="font-nomal margin-bottom text-left">Sydney</h5>
            <el-progress class="margin-bottom-pro" :percentage="50"><span>50k</span></el-progress>
            <h5 class="font-nomal margin-bottom text-left">Singapore</h5>
            <el-progress class="margin-bottom-pro" :percentage="30"><span>30k</span></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xl="12">
        <el-card shadow="hover" class="card">
          <div class="header-title" style="margin-bottom: 32px">
            <h4 class="text-muted">TOP SELLING PRODUCTS</h4>
            <div class="btn-link" @click="handleExportExcel"><span style="margin-right: 5px; display: inline-block">Export</span><i class="el-icon-download"></i></div>
          </div>
          <el-table id="tableId" ref="tableRef" :data="state.tableData" highlight-current-row style="width: 100%">
            <el-table-column v-for="item in tableColumn" :key="item.prop" :fixed="item.fixed" :prop="item.prop" :label="item.label" :width="item.width"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :xl="6">
        <el-card shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">TOTAL SALES</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div class="e-chart" style="height: 201px; width: 100%">
            <!-- <div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;">
              </div> -->
            <div ref="refAverageSales" style="width: inherit; height: inherit"></div>
          </div>
          <div class="chart-widget-list">
            <p>
              <span><i class="icon-square yellow"></i> Union Ads </span><span>￥26000</span>
            </p>
            <p>
              <span><i class="icon-square green"></i> Direct </span><span>￥26000</span>
            </p>
            <p>
              <span><i class="icon-square deep-blue"></i> Search Engine</span> <span>￥26000</span>
            </p>
            <p>
              <span><i class="icon-square red"></i> Video Ads </span><span>￥26000</span>
            </p>
          </div>
        </el-card></el-col
      >
      <el-col :xl="6">
        <el-card shadow="hover" class="card bg-primary">
          <div class="header-title">
            <h4 class="text-white">AVERAGE SALE SIZE</h4>
            <div class="dropdown"><MoreFilled class="text-white" style="color: whilte" /></div>
          </div>
          <div>
            <div class="text-badge"><span class="badge badge-danger">-23.47%</span></div>
            <h3 class="font-nomal text-white">￥156.37</h3>
            <p class="text-light font-13">Per sale</p>
            <el-button type="primary" plain>more <i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </div>
        </el-card>
        <el-card shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">RECENT ACTIVITY</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div style="height: 128px; overflow: scroll; padding: 5px">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { Top, MoreFilled, ShoppingCartFull, Refresh, Search, GoodsFilled, Coin, DataLine } from '@element-plus/icons-vue'

import XLSX from 'xlsx'
import { useInitChart } from './useInitEcharts'
import { useInitLineChart } from './useInitLineCharts'
import { useInitPieChart } from './useInitPieCharts'

import WorldMap from '@/components/WorldMap.vue'

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

const pickDate = ref('')
const refProduct = ref<HTMLElement | undefined>()
const refLineChart = ref<HTMLElement | undefined>()
const refAverageSales = ref<HTMLElement | undefined>()
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
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
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
const activities = [
  {
    content: '支持使用图标',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: 'el-icon-more'
  },
  {
    content: '支持自定义颜色',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  },
  {
    content: '支持自定义尺寸',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  },
  {
    content: '默认样式的节点',
    timestamp: '2018-04-03 20:46'
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
  const tempArray = []
  for (let i = 0; i < arrayObj.length; i++) {
    tempArray.push(arrayObj[i][prop])
  }
  return tempArray
}
const handleExportExcel = () => {
  import('../../hooks/useExportExcel').then((excel) => {
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

onMounted(() => {
  useInitChart(refProduct.value)
  useInitLineChart(refLineChart.value)
  useInitPieChart(refAverageSales.value)
})
</script>
<style lang="stylus" scoped>
.analysis-info{
  color black
  padding 0px 20px
  background-color #fafbfe

  .page-title-box{
    box-sizing border-box
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    color #6c757d
    .page-title{
      font-size  18px
      margin  0
      line-height  85px
      overflow  hidden
      white-space: nowrap
      text-overflow  ellipsis
      color  inherit
      font-weight 700
    }
    .page-title-right{
      display flex
      flex-direction row
      justify-content space-around
      align-items center
    }
  }
  :deep(.el-card){
    margin-bottom 30px
    margin-right 20px
  }
  :deep(.el-card.bg-primary){
    background-color #46a0fc
  }
  :deep(.text-white.el-icon-more){
    color white
  }
  .card {
    .padding-top-1{
      padding-top  10px
    }
    .padding-bottom-1{
      padding-bottom  10px
    }
    .margin-bottom-pro{
      margin-bottom 15px
    }
    .margin-right-1{
      margin-right 10px
    }
    .margin-top-2{
      margin-top 20px
    }
     .margin-bottom-1{
      margin-bottom 10px
    }
    .margin-bottom-2{
      margin-bottom 20px
    }
    .font-nomal{
      font-weight 400
    }
    .icon{
      width 14px
      height 14px
      display inline-block
      border-radius 50%
    }
    .text-muted{
        color #98a6ad
      }
      .text-left{
        text-align left
      }
      .text-nowrap{
        white-space nowrap
      }
      .text-success{
        color #0acf97
      }
      .text-danger{
        color #fa5c7c
      }
      .text-primary{
        color #409eff
      }
      .text-light{
        color #e3eaef
      }
      .text-white{
        color white
      }
      .text-center{
        display flex
        flex-direction row
        justify-content center
        align-items center
      }
      .text-badge{
        margin-top 20px
        margin-bottom  10px
      }
      .font-13{
        font-size 13px
      }
      .badge{
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
        -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
      }
      .badge-danger{
        color #fff
        background-color #fa5c7c
      }
      .btn-link{
        font-weight 400
        color #409eff
        text-decoration none
        cursor pointer
      }
      .bg-primary{
        background-color #409eff
      }
      .bg-green{
        background-color green
      }
      .icon-square{
        width 12px
        height 12px
        display inline-block
      }
      .red{
        background-color #ec6769
      }
      .green{
        background-color  #93cb79
      }
      .yellow {
        background-color #f9c761
      }
      .deep-blue{
        background-color #5572c3
      }
      .dot{
        width 12px
        height 12px
        display inline-block
        border-radius 50%
      }
      .chart-widget-list p{
        border-bottom 1px solid #f1f3fa
        margin-bottom 0.5rem
        padding-bottom 0.5rem
        display flex
        flex-direction row
        justify-content space-between
        align-items center
      }
    .header-title{
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      margin-bottom 5px
      .dropdown{
        cursor pointer
      }
    }
    .chart-bg{
      background-color #f9f9fd
    }
    .card-header{
      display flex
      flex-direction row
      justify-content space-between
      align-items flex-start

      .widget-icon{
        color #248fed
        font-size 20px
        background-color #7fbdf33b
        height 40px
        width 40px
        text-align: center
        line-height 40px
        border-radius 3px
        display flex
        flex-direction column
        justify-content center
        align-items center
        .icon{
          width 20px
          height 20px
        }
      }
    }
    .card-middle{
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      color #6c757d
    }
    .card-footer{
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
    }

    .e-chart{
      margin auto
      position relative
      width 100%
    }
  }

}
</style>
