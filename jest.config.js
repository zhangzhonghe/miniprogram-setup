module.exports = {
  preset: 'ts-jest',
  globals: {
    __DEV__: true,
  },
  testEnvironment: 'jsdom',
  // 配置 jest-snapshot-plugin 从而在使用 jest 的 snapshot 功能时获得更加适合肉眼阅读的结构
  snapshotSerializers: ['miniprogram-simulate/jest-snapshot-plugin'],
  watchPathIgnorePatterns: ['/node_modules/', '/esm/', '/.git/'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/__tests__/**/*test.[jt]s'],
};
