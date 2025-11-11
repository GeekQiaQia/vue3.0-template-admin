/**
 * 日志工具类
 * 提供环境感知的日志输出功能
 */
const isDevelopment = import.meta.env.DEV

class Logger {
  /**
   * 输出普通日志
   */
  // eslint-disable-next-line class-methods-use-this
  log(...args: any[]) {
    if (isDevelopment) {
      console.log('[LOG]', ...args)
    }
  }

  /**
   * 输出信息日志
   */
  // eslint-disable-next-line class-methods-use-this
  info(...args: any[]) {
    if (isDevelopment) {
      console.info('[INFO]', ...args)
    }
  }

  /**
   * 输出警告日志
   */
  // eslint-disable-next-line class-methods-use-this
  warn(...args: any[]) {
    if (isDevelopment) {
      console.warn('[WARN]', ...args)
    }
  }

  /**
   * 输出错误日志
   */
  // eslint-disable-next-line class-methods-use-this
  error(...args: any[]) {
    console.error('[ERROR]', ...args)
  }

  /**
   * 输出调试日志
   */
  // eslint-disable-next-line class-methods-use-this
  debug(...args: any[]) {
    if (isDevelopment) {
      console.debug('[DEBUG]', ...args)
    }
  }

  /**
   * 输出表格日志
   */
  // eslint-disable-next-line class-methods-use-this
  table(data: any) {
    if (isDevelopment) {
      console.table(data)
    }
  }

  /**
   * 开始分组
   */
  // eslint-disable-next-line class-methods-use-this
  group(label: string) {
    if (isDevelopment) {
      console.group(label)
    }
  }

  /**
   * 结束分组
   */
  // eslint-disable-next-line class-methods-use-this
  groupEnd() {
    if (isDevelopment) {
      console.groupEnd()
    }
  }

  /**
   * 开始计时
   */
  // eslint-disable-next-line class-methods-use-this
  time(label: string) {
    if (isDevelopment) {
      console.time(label)
    }
  }

  /**
   * 结束计时
   */
  // eslint-disable-next-line class-methods-use-this
  timeEnd(label: string) {
    if (isDevelopment) {
      console.timeEnd(label)
    }
  }
}

export const logger = new Logger()
export default logger
