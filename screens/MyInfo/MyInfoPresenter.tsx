import { Text, View } from "react-native";
import styled from "styled-components";

const Container = styled(View)``;
const Title = styled(Text)``;

const MyInfoPresenter = () => {
  return (
    <Container>
      <Title>MyInfo 화면 입니다</Title>
    </Container>
  );
};

export default MyInfoPresenter;
