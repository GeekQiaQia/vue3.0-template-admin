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
        <div class="board__project-item">
          <el-card>
            <el-row>
              <el-col :span="5">
                <el-avatar
                  class="board__project-avatar"
                  :size="90">
                  user
                </el-avatar>
              </el-col>

              <el-col
                :span="18"
                style="margin-left: 6px; color: #7a848d">
                <p>项目名称：后台管理系统</p>
                <p>总负责人：xxx</p>
                <p>开发耗时：16h</p>
                <p>项目状态：发布</p>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <div class="board__project-item">
          <el-card>
            <el-row>
              <el-col :span="5">
                <el-avatar
                  class="board__project-avatar"
                  :size="90">
                  user
                </el-avatar>
              </el-col>

              <el-col
                :span="18"
                style="margin-left: 6px; color: #7a848d">
                <p>项目名称：后台管理系统</p>
                <p>总负责人：xxx</p>
                <p>开发耗时：16h</p>
                <p>项目状态：发布</p>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <div class="board__project-item">
          <el-card>
            <el-row>
              <el-col :span="5">
                <el-avatar
                  class="board__project-avatar"
                  :size="90">
                  user
                </el-avatar>
              </el-col>

              <el-col
                :span="18"
                style="margin-left: 6px; color: #7a848d">
                <p>项目名称：后台管理系统</p>
                <p>总负责人：xxx</p>
                <p>开发耗时：16h</p>
                <p>项目状态：发布</p>
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

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
      width: calc(50% - 60px);
      margin-bottom: 30px;
      margin-left: 30px;
      cursor: pointer;

      &--active {
        border: 1px solid #2799c1;
        border-radius: 4px;
      }
    }

    &-avatar {
      font-size: 20px;
      background: #7d9fe3;
    }
  }

  &__detail {
    text-align: left;

    &-title {
      font-size: 18px;
      font-weight: bold;
    }
  }
}

</style>
