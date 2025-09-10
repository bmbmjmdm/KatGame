// @ts-ignore-next-line
import {Animated} from 'react-native';
import React, {FunctionComponent, ReactNode, useRef} from 'react';
import {easeOutBack} from '../Components';

type AnimatedScreenProps = {
  children: ReactNode;
};

export const AnimatedScreen: FunctionComponent<AnimatedScreenProps> = ({
  children,
}) => {
  const animatedTranslate = useRef(new Animated.Value(150)).current; // vertical slide distance
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedScale = useRef(new Animated.Value(0.97)).current;

  //animate in the screen when the user navigates to it
  React.useEffect(() => {
    // fade in
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslate, {
        toValue: 0,
        easing: easeOutBack,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.spring(animatedScale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
        mass: 0.7,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [
          {translateY: animatedTranslate},
          {scale: animatedScale},
        ],
        opacity: animatedOpacity,
      }}>
      {children}
    </Animated.View>
  );
};
