// lignt Theme 스타일
const lightTheme: ITheme = {
  backgroundColor: "#f8f8f8",
  color: "#080808",
  primary: "#fca523",
  secondary: "#000e35",
  accent: "#6d6d6d",
  invert: "#1a1a1a",
};
// Dark Theme 스타일
const darkTheme = {
  backgroundColor: "#333333",
  color: "#fafafa",
  primary: "#fca523",
  secondary: "#000e35",
  accent: "#8a8a8a",
  invert: "#f8f8f8",
};

// theme style interface
export interface ITheme {
  backgroundColor: string;
  color: string;
  primary: string;
  secondary: string;
  accent: string;
  invert: string;
}

// 테마 관련된 스타일
export const themeStyle = {
  lightTheme,
  darkTheme,
};
