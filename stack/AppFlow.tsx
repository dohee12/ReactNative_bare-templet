import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { useEffect, useReducer } from "react";

//* 분기 = Authentication 인증 흐름 */
// 분기 종류에 따른 state 정보
type State = {
  isSignOut: boolean;
  isLoading: boolean;
  userToken: string | null;
};
// 분기 종류
type Action =
  | { type: "RESTORE_TOKEN"; token: string }
  | { type: "SIGN_IN"; token: string | null }
  | { type: "SIGN_OUT" };

const AppFlow = () => {
  const [state, dispatch] = useReducer(
    (prevState: State, action: Action): State => {
      switch (action.type) {
        // 1st 분기 : 앱 실행 시 가장 처음 실행되어 현재 상태 갱신
        // - 현재 로그인 인증 후, 토큰 보유 여부 확인
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
          };
        // 2nd 분기 : 로그인 실행 시, 로그인 정보 받고 상태 변경
        case "SIGN_IN":
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          };
        // 3nd 분기 : 로그아웃 실행 시, 모든 정보 폐기 후 상태 변경
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
          };
      }
    },
    // 초기값
    {
      isLoading: true,
      isSignOut: false,
      userToken: null,
    }
  );

  // 앱 실행 시, 한 번 실행
  // (RESTORE_TOKEN 상태로 변경하고, 로그인 인증 여부 검사)
  useEffect(() => {
    const retoreAsync = async() => {
        // 1. userToken (로그인토큰)
        let userToke;
        // 2. 내 장치에 저장된 토큰 정보 불러오기(Load)
        try {
            // 내 장치에서 불러오기
            // userToken = await SecureStore.getItem("KEY");
        }catch(e) {
            console.log(e);
        }
    }

    //Token 불러오고 나면, Restore_Token 상태로 변경 후, Token 값 넣기
    dispatch({type: "RESTORE_TOKEN", token: "dummy"});

    retoreAsync();
  }, [])

  return (
    <NavigationContainer>
      {/* 로그인 인증 성공 */}
      {/* 로그인 인증 실패 */}
      <MainStack />
    </NavigationContainer>
  );
};

export default AppFlow;
