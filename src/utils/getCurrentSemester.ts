// 현재 연월로 학기 계산 (3~8월: 1학기, 9~2월: 2학기)
const getCurrentSemester = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  return month >= 3 && month <= 8 ? 1 : 2;
};

export default getCurrentSemester;
