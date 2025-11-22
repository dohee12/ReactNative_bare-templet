import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import styled from "styled-components";
import { useMyTheme } from "../../context/ThemeProvider";

const Container = styled(View)``;
const Title = styled(Text)``;
const ThemeBtn = styled(TouchableOpacity)``;
const ThemeBtnTitle = styled(Text)``;

const MyInfoPresenter = () => {
  // Provider Theme Context 불러오기
  const { isDark, theme, toggleTheme } = useMyTheme();
  const { backgroundColor, primary, color } = theme;

  return (
    <Container style={{ backgroundColor }}>
      <Title style={{ color }}>Myinfo 화면입니다</Title>
      {/* 테마 변경 (light<>dark) 버튼 */}
      <ThemeBtn style={{ backgroundColor: primary }} onPress={toggleTheme}>
        <ThemeBtnTitle style={{ color }}>{`현재 테마 : ${
          isDark ? "다크" : "라이트"
        }`}</ThemeBtnTitle>
        <ThemeBtnTitle style={{ color }}>테마 변경</ThemeBtnTitle>
      </ThemeBtn>
    </Container>
  );
};
export default MyInfoPresenter;
