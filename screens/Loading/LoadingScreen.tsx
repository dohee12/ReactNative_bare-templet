import { ActivityIndicator, Text, View } from "react-native";
import styled from "styled-components";
import { useMyTheme } from "../../context/ThemeProvider";
import { ITheme } from "../../styles/theme-style";

const Container = styled(View)<{ theme: ITheme }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`;
const Title = styled(Text)<{ theme: ITheme }>`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.invert};
`;

export default function LoadingScreen() {
  const { theme } = useMyTheme();

  return (
    <Container theme={theme}>
      <ActivityIndicator size="large" />
      <Title theme={theme}>Loading...</Title>
    </Container>
  );
}
