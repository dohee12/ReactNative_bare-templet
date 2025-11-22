import { useRoute } from "@react-navigation/native";
import { ISampleData } from "../../assets/sampleData";
import { Dimensions, View } from "react-native";
import styled from "styled-components";
import { Image } from "react-native";
import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { LightSpeedInLeft, LightSpeedOutLeft, RotateInDownLeft, RotateInDownRight, RotateInUpLeft, RotateOutDownLeft, runOnJS } from "react-native-reanimated";
import { useState } from "react";
import { Stagger } from "@animatereactnative/stagger";



const {height:HEIGHT} = Dimensions.get("window");
const _spacing = 8;
const _borderRadius = 12;

const Container = styled(Animated.View)`
    flex: 1;
    `;
const BG = styled(Image)``;
const BG_Shadow = styled(View)`
    background-color: #000;
    opacity: 0.3;
    `;
const Informaion = styled(Animated.View)`
    background-color: #fff;
    position: absolute;
    top: ${HEIGHT*0.55}px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: ${_spacing * 2}px;
    border-top-left-radius: ${_borderRadius}px;
    border-top-right-radius: ${_borderRadius}px;
    gap: ${_spacing*2}px;

    `;
const Title = styled(Text)`
    font-size: 30px;
    font-weight: bold;
    `;
const Desc = styled(Text)``;
const Author = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: ${_spacing}px;
    `;
const Name = styled(Text)`
    color: #6b6b6b;
    `;
const ProfileImg = styled(Image)`
    height: 20px;
    width: 20px;
    border-radius: 50px;
    border-width: 1px;
`;
// const Profile = () => <ProfileImg source={{uri: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4'}}></ProfileImg>; --> 교수님코드이지만 이렇게 하면 밑에 source 속성 못넘겨줌
    const Profile = ({source}: {source: {uri: string}}) => <ProfileImg source={source} />; // 그래서 이렇게 바꿔줌

const HomeDetailScreen = () => {
    // 페이지 닫힘 여부
    const [close,setClose] = useState(false);
    const navi = useNavigation();
    // Route Hook을 사용하면 navigation 함수를통해 전달한 params 확인가능
    const route = useRoute();
    // parmas 전달한 데이터를 꺼내쓰는 법 (*TypeScript에게 param의 타입을 알려줘야함)
    const item = route.params?.item as ISampleData;

    // 다른 페이지에서 전달한 데이터를 확인(*navigation)

    return !close &&  (
            <Container
                entering={RotateInUpLeft.duration(500).delay(100)}
                exiting={LightSpeedOutLeft.duration(500).delay(100).withCallback((finished) => {
                    // 애니메이션이 끝나면 실행
                    if (finished) {
                        // 뒤로가기
                        runOnJS(navi.goBack)();
                    }
                })}
                >
        {/* 배경 이미지 */}
        <BG style={StyleSheet.absoluteFillObject} source={{uri: item.image}} ></BG>
        <BG_Shadow style={StyleSheet.absoluteFillObject} />
        {/* 커스텀 뒤로가기 아이콘 */}
        <AntDesign
            name="close"
            size={30}
            color="#fff"
            style={{
                position: "absolute",
                top: HEIGHT * 0.05,
                right: _spacing * 2,
            }}
            onPress={() => setClose(true)}
        />
          
        {/* 실제 콘텐츠 데이터 정보 */}
          
        <Informaion entering={RotateInDownLeft.delay(100).duration(500)}>

        
            <Stagger
                stagger={150}
                entering={() => RotateInDownRight.duration(500).stiffness(200).damping(80)}
                exiting={() => RotateOutDownLeft.duration(500).stiffness(200).damping(80)}
            >
        <Title>{item.title}</Title>
        <Desc>{item.description}</Desc> 
        <Author>
            <Profile source={{uri: item.author.profileUrl}}/>
                            <Name>{item.author.name}</Name>

            </Author>
        </Stagger>
    </Informaion>
</Container> 
    );
}

export default HomeDetailScreen;