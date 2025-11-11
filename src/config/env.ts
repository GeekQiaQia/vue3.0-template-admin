/**
 * 环境配置文件
 * 根据不同环境提供不同的配置
 */

interface EnvConfig {
  // API 基础路径
  apiBaseUrl: string
  // Mock 开关
  mockEnabled: boolean
  // 应用标题
  appTitle: string
  // 超时时间
  timeout: number
  // 是否启用日志
  enableLog: boolean
}

const env = import.meta.env

/**
 * 开发环境配置
 */
const devConfig: EnvConfig = {
  apiBaseUrl: env.VITE_API_BASE_URL || '/api',
  mockEnabled: true,
  appTitle: 'Vue3 Admin (Dev)',
  timeout: 20000,
  enableLog: true
}

/**
 * 生产环境配置
 */
const prodConfig: EnvConfig = {
  apiBaseUrl: env.VITE_API_BASE_URL || 'https://api.production.com',
  mockEnabled: false,
  appTitle: 'Vue3 Admin',
  timeout: 10000,
  enableLog: false
}

/**
 * 测试环境配置
 */
const testConfig: EnvConfig = {
  apiBaseUrl: env.VITE_API_BASE_URL || 'https://api.test.com',
  mockEnabled: false,
  appTitle: 'Vue3 Admin (Test)',
  timeout: 15000,
  enableLog: true
}

/**
 * 根据环境获取配置
 */
function getEnvConfig(): EnvConfig {
  const mode = env.MODE

  switch (mode) {
    case 'production':
      return prodConfig
    case 'test':
      return testConfig
    case 'development':
    default:
      return devConfig
  }
}

export const config = getEnvConfig()

export default config
