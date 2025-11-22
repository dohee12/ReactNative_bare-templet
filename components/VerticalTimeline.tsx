import {
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { ISampleData, sampleData } from "../assets/sampleData";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { limitText } from "../utiliy/utils";
import { act } from "react";
import { useNavigation } from "@react-navigation/native";

const { height: HEIGHT } = Dimensions.get("window");
const _spacing = 8;
const _borderRadius = 12;
const _itemSize = HEIGHT * 0.6;
const _itemFullSize = _itemSize + _spacing * 2;

const Container = styled(Animated.View)`
  height: ${_itemSize}px;
  padding: ${_spacing * 2}px;
  gap: ${_spacing}px;
`;
const BackgroundImg = styled(Image)`
  border-radius: ${_borderRadius}px;
`;
const PosterImg = styled(Image)`
  height: ${_itemSize * 0.6}px;
`;
const Info = styled(View)``;
const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;
const Desc = styled(Text)`
  color: #000000;
`;
const Author = styled(View)`
  flex-direction: row;
  gap: ${_spacing}px;
  align-items: center;
`;
const Name = styled(Text)`
  color: #4e4e4e;
  font-size: 17px;
`;
const ProfileImg = styled(Image)`
  width: 25px;
  aspect-ratio: 1;
  border-radius: ${_borderRadius}px;
`;

type CardProps = ISampleData & {
  index: number;
  scrollY: SharedValue<number>;
} ;

// 스크롤 할 애니메이션 Card
function AnimatedCard({ index, scrollY, id, author, description, image, title }: CardProps) {

  // Animation 스타일
  const animStyle = useAnimatedStyle(() => {
    // 투명도 조절 애니메이션 prop
    const opacity = interpolate(scrollY.value, [index-1, index, index+1],[0.3, 1, 0.3]);
    if(index == 0 ) {
      console.log("index 0:", opacity);
};
    // 크기 조절 애니메이션 prop
    const scale = interpolate(scrollY.value, [index-1, index, index+1],[0.9, 1, 0.9]);
    // 실제 애니메이션 처리 된 StyLeProps를 반환 
    const borderRadius = interpolate(
      scrollY.value,
      [index - 1, index, index + 1],
      [0, _borderRadius, 0]
    )
    return {
      opacity: opacity,
      transform: [{ scale: scale }],
      borderRadius: borderRadius
      
    };
  });

  

  const navi = useNavigation();
  // 전달할 데이터
  const item : ISampleData = {
    id,author,description,image,title
  }
  const goToDetail = () => navi.navigate("HomeDetail", {item});

  return (
    <TouchableOpacity onPress={goToDetail} activeOpacity={0.8}>
    <Container style={animStyle}>
      <BackgroundImg
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
        source={{ uri: image }}
      />
      <PosterImg source={{ uri: image }} />
      <Info>
        <Title>{title}asdfsadjklflaksdjfsladfkjasldkfj</Title>
        <Desc> {limitText(description, 200)} </Desc>
      </Info>
      <Author>
        <Name>{author.name}</Name>
        <ProfileImg source={{ uri: author.profileUrl }} />
      </Author>
    </Container>
    </TouchableOpacity>
  );
};

type Props = {
  data: ISampleData[] | undefined;
};

// 세로 스크롤이 가능한 애니메이션 Timeline
function VerticalTimeline({ data }: Props) {
  // Animation 공유 값
  const scrollY = useSharedValue(0);
  // Scroll Handler : 스크롤 이동 포지션 값을 가져오기 위해(애니메이션)
  const onScroll = useAnimatedScrollHandler((event) => {
    // event를 활용해서 스크롤 시 변동된은 변위값
    const offset = event.contentOffset.y;
    // 현재 스크롤 위치에서 보여지는 Item의 Index번호
    const itemIndex = offset / _itemFullSize;
    // Animation Value에 index값 전달
    scrollY.value = itemIndex;
    
  });
  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => <AnimatedCard {...item} index={index} scrollY={scrollY}/>}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: _spacing * 2,
        paddingHorizontal: _spacing * 3,
        paddingVertical: (HEIGHT - _itemFullSize) * 0.25,
      }}
      // 자석 스크롤을 위한 Options
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"}
      // Scroll Handleing 위해 Event받아오기
      onScroll={onScroll}
    />
  );
}
export default VerticalTimeline;
