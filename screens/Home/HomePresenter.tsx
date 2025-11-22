import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import styled from "styled-components";
import VerticalTimeline from "../../components/VerticalTimeline";
import { ISampleData } from "../../assets/sampleData";
import LoadingScreen from "../Loading/LoadingScreen";

const Container = styled(View)`
  background-color: black;
`;
const Title = styled(Text)``;

type Props = {
  loading: boolean;
  data: ISampleData[] | undefined;
};

const HomePresenter = ({ data, loading }: Props) => {
  // Logic xxxx
  if (loading) {
    return <LoadingScreen />;
  }
  // Rendering
  return (
    <Container>
      <VerticalTimeline data={data} />
    </Container>
  );
};

export default HomePresenter;
