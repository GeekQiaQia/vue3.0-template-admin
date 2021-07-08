import { EventInput } from '@fullcalendar/vue3'

// 事件Uid初始化
let eventGuid = 0
/**
 * @description 日期字符串格式化
*/
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
/**
 * @description 事件Uid
*/
export function createEventId() {
  return String(eventGuid++)
}
/**
 * @description 初始化事件对象
*/
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: '全天安排',
    start: todayStr
  },
  {
    id: createEventId(),
    title: '算法专训',
    start: `${todayStr  }T12:00:00`
  }
]

