import { useFonts } from "expo-font";
import Router from "router";

function App() {
  const [loaded] = useFonts({
    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <Router />;
}

export default App;
