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
          <el-select v-if="scope.row.edit" v-model="scope.row.taskStatus" placeholder="选择任务状态">
            <el-option label="准备阶段" :value="1"></el-option>
            <el-option label="开发中" :value="2"></el-option>
            <el-option label="开发完成" :value="3"></el-option>
            <el-option label="测试阶段" :value="4"></el-option>
            <el-option label="待发布" :value="5"></el-option>
          </el-select>

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
            @click="handleSave(scope.$index, scope.row)"
          >保存</el-button>

          <el-button
            v-else
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除该条记录吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="mini" icon="el-icon-delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="task-table__add">
      <el-button @click="handleAddRecord">+ 新增任务</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { computed } from 'vue'
import { TaskListData } from './store/index'
import { key } from '../../store/index';

/*
* @param data 表格的数据
* @param status 任务的状态
*/
defineProps<{
  data: Array<TaskListData>
  status: Map<string, {text: string, type: string}>
}>()

const emit = defineEmits(['updateTask', 'modifyTaskEdit', 'addProjectTask', 'deleteProjectTask'])

// 将任务修改为可编辑
function handleEdit(index: number, row: TaskListData) {
  // eslint-disable-next-line no-console
  console.log(index, row)

  emit('modifyTaskEdit', index, true)
}

// 修改任务后，保存
function handleSave(index: number, row: TaskListData) {
  // eslint-disable-next-line no-console
  console.log(index, row)

   emit('updateTask', index, row)

   emit('modifyTaskEdit', index, false)
}

// 删除任务
function handleDelete(index: number, row: TaskListData) {
  emit('deleteProjectTask', index)
}

// 新增一条空的任务
function handleAddRecord() {
  emit('addProjectTask')
}
</script>

<style lang="stylus" scoped>
.task-table {
  margin-top: 16px;

  &__add {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
