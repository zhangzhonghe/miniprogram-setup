module.exports = {
  preset: 'ts-jest',
  globals: {
    __DEV__: true,
    __TEST__: true,
  },
  setupFiles: ['./scripts/setupTests.ts'],
  testEnvironment: 'jsdom',
  // 配置 jest-snapshot-plugin 从而在使用 jest 的 snapshot 功能时获得更加适合肉眼阅读的结构
  snapshotSerializers: ['miniprogram-simulate/jest-snapshot-plugin'],
  watchPathIgnorePatterns: ['/node_modules/', '/esm/', '/.git/'],
  rootDir: __dirname,
  moduleNameMapper: {
    '^@/(.*?)$': '<rootDir>/src/$1',
    '^@tests/(.*?)$': '<rootDir>/__tests__/$1',
  },
  testMatch: ['<rootDir>/__tests__/**/*.test.[jt]s'],
}
