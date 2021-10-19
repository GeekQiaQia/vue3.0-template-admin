<template>
  <div class="task-table">
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="taskName" label="任务名称">
        <template #default="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.taskName"></el-input>
          <span v-else>{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="developTime" label="开发工时">
        <template #default="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.developTime"></el-input>
          <span v-else>{{ scope.row.developTime }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="developMember" label="开发人">
        <template #default="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.developMember"></el-input>
          <span v-else>{{ scope.row.developMember }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="taskStatus" label="任务状态">
        <template #default="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.taskStatus"></el-input>
          <el-tag
            v-else
            :type="status.get(`${scope.row.taskStatus}`)?.type"
          >{{ status.get(`${scope.row.taskStatus}`)?.text }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button
            v-if="scope.row.edit"
            size="mini"
            type="success"
            icon="el-icon-check"
            @click="handleSave()"
          >保存</el-button>

          <el-button
            v-else
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit()"
          >编辑</el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除该条记录吗？"
            @confirm="handleDelete()"
          >
            <template #reference>
              <el-button size="mini" icon="el-icon-delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { computed } from 'vue'
import { TaskListData } from './store/index'

defineProps<{
  data: Array<TaskListData>
  status: Map<string, {text: string, type: string}>
}>()

function handleSave() {

}

function handleEdit() {

}

function handleDelete() {

}
</script>

<style lang="stylus" scoped>
.task-table {
  margin-top: 36px;
}
</style>
