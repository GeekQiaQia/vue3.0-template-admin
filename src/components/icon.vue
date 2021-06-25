<template>
  <div class="icon-panel">
    <el-input v-model="key" placeholder="搜索图标" @input="search">
      <el-button icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <br />
    <br />
    <section>
      <span v-for="ic in data" :key="ic" class="icon-items" @click="selected(ic)"> <i :class="ic"></i><br /> </span>
    </section>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    msg: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['success'],
  setup: (props, { emit }) => {
    const state = reactive({
      icons: [
        'ic ic-accessory',
        'ic ic-activity',
        'ic ic-activity-fill',
        'ic ic-add',
        'ic ic-addition-fill',
        'ic ic-addition',
        'ic ic-addpeople-fill',
        'ic ic-addpeople',
        'ic ic-addressbook-fill',
        'ic ic-addressbook',
        'ic ic-barrage-fill',
        'ic ic-barrage',
        'ic ic-browse-fill',
        'ic ic-browse',
        'ic ic-brush',
        'ic ic-brush-fill',
        'ic ic-businesscard-fill',
        'ic ic-businesscard',
        'ic ic-camera-fill',
        'ic ic-camera',
        'ic ic-clock-fill',
        'ic ic-clock',
        'ic ic-close',
        'ic ic-collection-fill',
        'ic ic-collection',
        'ic ic-computer-fill',
        'ic ic-computer',
        'ic ic-coordinates-fill',
        'ic ic-coordinates',
        'ic ic-coupons-fill',
        'ic ic-coupons',
        'ic ic-createtask-fill',
        'ic ic-createtask',
        'ic ic-customerservice-fill',
        'ic ic-customerservice',
        'ic ic-delete-fill',
        'ic ic-delete',
        'ic ic-document',
        'ic ic-document-fill',
        'ic ic-dynamic ic-fill',
        'ic ic-dynamic',
        'ic ic-editor',
        'ic ic-eit',
        'ic ic-emoji-fill',
        'ic ic-emoji',
        'ic ic-empty',
        'ic ic-empty-fill',
        'ic ic-enter',
        'ic ic-enterinto',
        'ic ic-enterinto-fill',
        'ic ic-feedback-fill',
        'ic ic-feedback',
        'ic ic-flag-fill',
        'ic ic-flag',
        'ic ic-flashlight',
        'ic ic-flashlight-fill',
        'ic ic-flip',
        'ic ic-flip-fill',
        'ic ic-fullscreen',
        'ic ic-group',
        'ic ic-group-fill',
        'ic ic-headlines-fill',
        'ic ic-headlines',
        'ic ic-homepage-fill',
        'ic ic-homepage',
        'ic ic-integral-fill',
        'ic ic-integral',
        'ic ic-interactive-fill',
        'ic ic-interactive',
        'ic ic-keyboard',
        'ic ic-label',
        'ic ic-label-fill',
        'ic ic-like-fill',
        'ic ic-like',
        'ic ic-live-fill',
        'ic ic-live',
        'ic ic-lock-fill',
        'ic ic-lock',
        'ic ic-mail',
        'ic ic-mail-fill',
        'ic ic-manage-fill',
        'ic ic-manage',
        'ic ic-message',
        'ic ic-message-fill',
        'ic ic-mine',
        'ic ic-mine-fill',
        'ic ic-mobilephone-fill',
        'ic ic-mobilephone',
        'ic ic-more',
        'ic ic-narrow',
        'ic ic-offline-fill',
        'ic ic-offline',
        'ic ic-order-fill',
        'ic ic-order',
        'ic ic-other',
        'ic ic-people-fill',
        'ic ic-people',
        'ic ic-picture-fill',
        'ic ic-picture',
        'ic ic-play',
        'ic ic-play-fill',
        'ic ic-playon-fill',
        'ic ic-playon',
        'ic ic-praise-fill',
        'ic ic-praise',
        'ic ic-prompt-fill',
        'ic ic-prompt',
        'ic ic-qrcode-fill',
        'ic ic-qrcode',
        'ic ic-redpacket-fill',
        'ic ic-redpacket',
        'ic ic-refresh',
        'ic ic-remind-fill',
        'ic ic-remind',
        'ic ic-return',
        'ic ic-right',
        'ic ic-scan',
        'ic ic-select-fill',
        'ic ic-select',
        'ic ic-send',
        'ic ic-service-fill',
        'ic ic-service',
        'ic ic-setup-fill',
        'ic ic-setup',
        'ic ic-share-fill',
        'ic ic-share',
        'ic ic-shielding-fill',
        'ic ic-shielding',
        'ic ic-smallscreen-fill',
        'ic ic-smallscreen',
        'ic ic-stealth-fill',
        'ic ic-stealth',
        'ic ic-success-fill',
        'ic ic-success',
        'ic ic-suspend',
        'ic ic-switch',
        'ic ic-systemprompt-fill',
        'ic ic-systemprompt',
        'ic ic-tailor',
        'ic ic-task',
        'ic ic-task-fill',
        'ic ic-tasklist-fill',
        'ic ic-tasklist',
        'ic ic-text',
        'ic ic-time-fill',
        'ic ic-time',
        'ic ic-translation-fill',
        'ic ic-translation',
        'ic ic-trash',
        'ic ic-trash-fill',
        'ic ic-undo',
        'ic ic-unlock-fill',
        'ic ic-unlock',
        'ic ic-video',
        'ic ic-video-fill',
        'ic ic-warning-fill',
        'ic ic-warning',
        'ic ic-workbench-fill',
        'ic ic-workbench',
        'ic ic-search',
        'ic ic-searchfill',
        'ic ic-publishgoods-fill',
        'ic ic-shop-fill',
        'ic ic-transaction-fill',
        'ic ic-packup',
        'ic ic-unfold',
        'ic ic-wangwang',
        'ic ic-financial-fill',
        'ic ic-marketing-fill',
        'ic ic-shake',
        'ic ic-decoration-fill',
        'ic ic-questions',
        'ic ic-supply',
        'ic ic-tools',
        'ic ic-int',
        'ic ic-commodity',
        'ic ic-zhtn'
      ],
      data: [''],
      key: ''
    })
    const count = ref(0)

    const createFilter = (key: string) => (icon: string) => icon.toLowerCase().indexOf(key.toLowerCase()) > 0
    const search = () => {
      const { key } = state
      const { icons } = state
      state.data = key ? icons.filter(createFilter(key)) : icons
    }
    const loadAll = () => state.icons
    const selected = (icon: any) => {
      emit('success', icon)
    }
    onMounted(() => {
      state.data = loadAll()
    })

    return { count, ...toRefs(state), search, selected }
  }
})
</script>

<style lang="stylus" scoped>

.icon-panel {
  padding: 1rem;
  user-select: none;
}

.icon-items {
  display: inline-block;
  padding: 0.2rem 0.2rem;
  border: 1px solid #efefef;
  margin: 0.01rem;
  color: #6f7180;
  border-radius: 0.3rem;
  transition: all 0.3s;
  &:hover {
    background: #1daaef;
    color: white;
  }
  i {
    font-size: 1.3rem;
  }
}
</style>
