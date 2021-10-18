<template>
  <div class="board">
    <div class="board__info">
      <el-divider content-position="left">项目看板</el-divider>
      <span>项目看板主要应用场景：项目的任务管理，任务进度管理等。</span>
    </div>

    <div class="board__project">
      <div class="board__project-title">
        项目概览
      </div>

      <div class="board__project-list">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="board__project-item"
          :class="{ 'board__project-item--active': target.projectId === item.projectId}"
          @click="onClickProject(item)">
          <el-card>
            <el-row>
              <el-col :span="5">
                <el-avatar
                  class="board__project-avatar"
                  :size="90">
                  {{ item.projectName.substr(0, 1)}}
                </el-avatar>
              </el-col>

              <el-col
                :span="18"
                style="margin-left: 6px; color: #7a848d">
                <p>项目名称：{{ item.projectName }}</p>
                <p>总负责人：{{ item.principal }}</p>
                <p>开发耗时：{{ item.timeConsuming }}</p>
                <p>项目状态: {{ item.status }}</p>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
    </div>

    <div class="board__detail">
      <div class="board__detail-title">
        项目详情
      </div>

      <el-card class="board__detail-content">
        <div
          v-if="!target.projectId"
          class="board__detail-empty">
          请选择项目
        </div>

        <div
          v-else>
          项目名称：{{ target.projectName }}
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import ProjectStore from './store/index'

  const target = ref({})

  const {
    getProjectInfo,
    data
  } = ProjectStore()

  // 数据初始化
  getProjectInfo()

  function onClickProject(project: any) {
    target.value = project
  }

</script>

<style lang="stylus" scoped>
.board {
  padding: 0 20px;

  &__info {
    text-align: left;

    > span {
      font-size: 12px;
      margin-bottom: 20px;
      display: inline-block;
    }
  }

  &__project {
    text-align: left;

    &-title {
      font-size: 18px;
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    &-item {
      width: 50%;
      width: calc(50% - 200px);
      margin-bottom: 30px;
      margin-left: 100px;
      cursor: pointer;
      border: 1px solid transparent;

      &--active {
        border-color: #2799c1;
        border-radius: 4px;
      }
    }

    &-avatar {
      font-size: 20px;
      background: #7d9fe3;
      font-weight: bold;
    }
  }

  &__detail {
    text-align: left;

    &-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    &-empty {
      color: #d3d0d0;
      min-height: 200px;
      line-height: 200px;
      text-align: center;
    }

    &-content {
      min-height: 60px;
    }
  }
}

</style>
