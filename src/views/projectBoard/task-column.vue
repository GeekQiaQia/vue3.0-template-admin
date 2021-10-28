<template>
  <div class="task-column">
    <div ref="column">
      <template v-for="item in dataList">
        <!-- content -->
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { ref, Ref } from 'vue'

defineProps()

const emit = defineEmits()

const column: Ref<HTMLDivElement> = ref()

const dataList = ref([])

</script>

<style lang="stylus" scoped>
.task-column {

}
</style>
