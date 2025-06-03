module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // 혹은 babel-jest 사용 중이라면 babel-jest
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // 스타일 파일 무시
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js", // 이미지 파일 mock 처리
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/jest.setup.ts",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFiles: ["<rootDir>/jest.setup.ts"],
};
