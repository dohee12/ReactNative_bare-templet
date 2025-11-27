# Create Expo Bare Project

npx create-expo-app myproject --template bare-minimum

## 1. Install React Navi,gator

url : https://reactnavigation.org/docs/getting-started
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context (for bare project)

## 2. Add Native Stack

npm install @react-navigation/native-stack

## 3. Add Bottom Tab Bar

npm install @react-navigation/bottom-tabs

# Install Library

in case npm install fail ... -> add command "--force"

1. Styled-components for RN
   npm install @types/styled-components-react-native

# Install Extension

- Prettier (file-preferences-VS Code Settings : "Default formatter", "Format on Save")
- styled-components (by styled-componets)

## ReactNative 애니메이션 관련 기본 라이브러리

> > > 1번째 설치
> > > npx expo install react-native-gesture-handler force
> > > npx expo install react-native-reanimated force
> > > 1번째 설치로도 Error 발생 시, 아래 라이브러리 설치
> > > npx expo install react-native-screens force
> > > npx expo install react-native-safe-area-context force
> > > npx expo install @react-native-community/masked-view force

### ReactNative easy 애니메이션 라이브러리 설치

- npm install @animatereactnative/marquee
- npm install @animatereactnative/stagger

## Expo Icon Library

npm install @expo/vector-icons

## Use React Compiler 1.0

# installation react compiler & eslinter

npm install -D babel-plugin-react-compiler@rc eslint-plugin-react-hooks@^6.0.0-rc.1

# enable react compiler with expo

npx expo install babel-plugin-react-compiler@beta

# add command line in app.json

{
"expo": {
"experiments": {
"reactCompiler": true
}
}
}

# enable eslint with expo

npx expo install eslint-plugin-react-compiler -- -D
