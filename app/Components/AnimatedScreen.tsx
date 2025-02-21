// @ts-ignore-next-line
import { Animated } from "react-native";
import React, {
  FunctionComponent,
  ReactNode,
  useRef,
} from "react";
import { easeOutBack } from "../Components";

type AnimatedScreenProps = {
  children: ReactNode;
};

export const AnimatedScreen: FunctionComponent<AnimatedScreenProps> = ({
  children,
}) => {
  const animatedTop = useRef(
    new Animated.Value(150)
  ).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  //animate in the screen when the user navigates to it
  React.useEffect(() => {
    // fade in
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 850,
        useNativeDriver: false,
      }),
      // slide up
      Animated.timing(animatedTop, {
        toValue: 0,
        easing: easeOutBack,
        duration: 850,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ flex: 1, top: animatedTop, opacity: animatedOpacity }}
    >
      {children}
    </Animated.View>
  );
};
