import { createContext, useContext, useState } from "react";
import { themeStyle } from "../styles/theme-style";

// Theme 관련 props 관리 Context
const MyThemeContext = createContext({
  theme: themeStyle.darkTheme,
  isDark: true,
  toggleTheme: () => {},
});

// Theme 관련 props 전달 관련 Provider
export const MyThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Context에서 관리하는 데이터 세부내역
  // 1. Theme Dark인지 아닌지?
  const [isDark, setIsDark] = useState<boolean>(true);
  // 2. Theme 종류에 따른 Theme 스타일
  const theme = isDark ? themeStyle.darkTheme : themeStyle.lightTheme;
  // 3. Toggle 버튼 눌렀을 때, Theme Change
  const toggleTheme = () => {
    setIsDark(!isDark);
    // add Event...
  };
  return (
    <MyThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </MyThemeContext.Provider>
  );
};

// [중요!] Provider에서 제공하는 Props 사용법 : Custom Hook
// Hook 생성 규칙 : useXXX 뭐시기로 시작할 것
// useContext : 내가 만든 Context들 안의 Props를 꺼내 쓸 수 있도록
// ㄴ 전체조건 : Provider로 만든 Playground가 적용되어있어야 함.
export const useMyTheme = () => useContext(MyThemeContext);
