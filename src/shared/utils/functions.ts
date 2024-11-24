import { StatusBar } from "react-native";

interface StatusBarOptions {
  style?: "default" | "light-content" | "dark-content";
  backgroundColor?: string;
  hidden?: boolean;
  translucent?: boolean;
}

export const setStatusBarStyle = ({
  style = "default", // Default style
  backgroundColor = "#FFFFFF", // Default background color
  hidden = false, // Default visibility
  translucent = false, // Default translucency
}: StatusBarOptions) => {
  StatusBar.setBarStyle(style);
  StatusBar.setBackgroundColor?.(backgroundColor); // Only works on Android
  StatusBar.setHidden(hidden, "fade"); // Optionally, you can use 'slide' for animation
  StatusBar.setTranslucent?.(translucent); // Only works on Android
};
