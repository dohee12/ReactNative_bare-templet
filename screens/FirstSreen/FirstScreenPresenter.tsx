import { Marquee } from "@animatereactnative/marquee";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import styled from "styled-components";
import LoadingScreen from "../Loading/LoadingScreen";
import { Stagger } from "@animatereactnative/stagger";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// DesignSystem..
const { width: WIDTH } = Dimensions.get("screen");
const _spacing = 16;
const _borderRadius = 16;
const _itemWidth = WIDTH * 0.6;
const _itemHeigt = _itemWidth * 1.6;
const _itemFullSize = _itemWidth + _spacing;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;
const HorinzontalView = styled(Animated.View)`
  flex-direction: row;
  gap: ${_spacing}px;
`;
const BackgroundView = styled(View)`
  opacity: 0.4;
`;
const StyleText = styled(Text)<{ size: number }>`
  font-size: ${(props) => props.size}px;
  color: white;
  font-weight: 700;
`;
const SigninBtn = styled(TouchableOpacity)`
  border-radius: ${_borderRadius}px;
  justify-content: center;
  align-items: center;
  padding: ${_spacing * 0.5}px;
  background-color: #fff;
  margin-top: ${_spacing}px;
`;

type Props = {
  images: string[] | undefined;
  loading: boolean;
};

const FirstScreenPresenter = ({ images, loading }: Props) => {
  // 애니메이션 Component에서 공유되는 변환 값
  const offset = useSharedValue(0);

  const navi = useNavigation();
  const goToScreen = () => navi.navigate("Tabs", { screen: "Home" });

  // 현재 포커싱된 Marquee 애니메이션 이미지의 Index
  const [activeIndex, setActiveIndex] = useState(0);
  // 화면 상에서 가운데에 위치한 이미지의 Index 번호 가져오기
  // useAnimatedReaction :
  // 1번 parameter : 스크롤 진행됨에 따라 Index 계산
  // 2번 parameter : 계산한 Index를 Javascript Code에 할당
  useAnimatedReaction(
    () => {
      if (!images) return 0;
      // 1. 현재 스크롤이 진행되는 시점의 Item(img) index 구하기
      // - 현재 스크롤 진행 위치 : offset.value
      // - 간격을 포함한 전체 아이템 너비 : _itemFullSize
      // - 현재 스크롤 진행 위치의 index
      // + 화면의 정중앙에서 카운트가 되도록 -> 오른쪽으로 화면너비의 1/2 만큼 이동 : width*0.5
      const currentIndex = (offset.value + WIDTH * 0.5) / _itemFullSize;
      // - images의 최대개수를 넘어가지 않고, 반복되는 index로 convert
      const repeatIndex = currentIndex % images.length;
      // - 최종 정수 값 Index 로 convert
      const finalIndex = Math.abs(Math.floor(repeatIndex));
      // 2. 내가 구한 index 값 return 해서 2번 parameter에 전달
      return finalIndex;
    },
    (value) => {
      // UIThread에서 구한 값을 JSThread에서 실행
      runOnJS(setActiveIndex)(value);
    }
  );

  // A.로딩 중인 경우에는 로딩 화면 띄워주기
  if (loading) {
    return <LoadingScreen />;
  }

  // B.로딩이 끝나면 보여질 화면
  return (
    <Container>
      {/* 스크롤 이미지의 배경화면 */}
      <BackgroundView style={StyleSheet.absoluteFillObject}>
        <Animated.Image
          style={{
            flex: 1,
          }}
          blurRadius={5}
          // key 값 필수(*requirement) - entering&exiting
          key={`img-${activeIndex}`}
          // 컴포넌트 등장 시, or 새로운 데이터 입력 시
          entering={FadeIn.duration(1000)}
          // 컴포넌트 파괴 시, or 새로운 데이터 입력 시시
          exiting={FadeOut.duration(1000)}
          source={{ uri: images && images[activeIndex] }}
        />
      </BackgroundView>
      {/* 자동 순환 스크롤 애니메이션 영역 */}
      <Marquee spacing={_spacing} position={offset} reverse={false}>
        <HorinzontalView
          key={`hortizontal-anim`}
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({
              transform: [{ translateY: -_itemHeigt * 0.5 }],
            })}
        >
          {images?.map((image, _index) => (
            <Item
              key={_index}
              image={image}
              index={_index}
              offset={offset}
              itemLength={image.length}
            />
          ))}
        </HorinzontalView>
      </Marquee>
      <Stagger
        initialEnteringDelay={1000}
        duration={1000}
        stagger={80}
        style={{
          marginTop: 30,
          padding: 50,
        }}
      >
        <StyleText size={20}>Title XXXX</StyleText>
        <StyleText size={13}>
          Welcome to my project. Glad to meet you!
        </StyleText>
        <SigninBtn onPress={goToScreen}>
          <StyleText style={{ color: "black" }} size={20}>
            Google Sign in
          </StyleText>
        </SigninBtn>
      </Stagger>
    </Container>
  );
};

// 이미지를 화면에 하나씩 띄어서 보여줄 컴포넌트
const ItemBox = styled(Animated.View)`
  width: ${_itemWidth}px;
  height: ${_itemHeigt}px;
  border-radius: ${_borderRadius}px;
`;
const ItemImg = styled(Image)`
  flex: 1;
  border-radius: ${_borderRadius}px;
`;
function Item({
  image,
  index,
  offset,
  itemLength,
}: {
  image: string;
  index: number;
  offset: SharedValue<number>;
  itemLength: number;
}) {
  // 0. Animated 컴포넌트 생성
  // 1. 0번 컴포넌트에 Animation용 style 생성
  // 2. Animation용 스타일 적용
  // const animStyle = useAnimatedStyle(() => {
  //   const itemPosition = _itemFullSize * index - WIDTH - _itemFullSize / 2;
  //   const totalSize = itemLength * _itemFullSize;
  //   const range =
  //     ((itemPosition - (offset.value + totalSize * 1000)) % totalSize) +
  //     WIDTH +
  //     _itemFullSize / 2;
  //   return {
  //     transform: [
  //       {
  //         scale: interpolate(
  //           range,
  //           [-_itemFullSize, (WIDTH - _itemFullSize) / 2, WIDTH],
  //           [1, 1.1, 1]
  //         ),
  //       },
  //     ],
  //   };
  // });
  return (
    <ItemBox>
      <ItemImg source={{ uri: image }} />
    </ItemBox>
  );
}

export default FirstScreenPresenter;
