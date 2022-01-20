import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import DetailPage from "./pages/DetailPage";
import { StatusBar } from "expo-status-bar";

// yarn add @react-navigation/native
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  // return <DetailPage />;
  // return <AboutPage />;
  // return <MainPage />;
  return (
    <NavigationContainer>
      {/* 상단 상태바 */}
      {/* MainPage에 이게 정의되어 있으면 여기서 조정안됨 */}
      <StatusBar style="black" />
      <StackNavigator />
    </NavigationContainer>
  );
}
