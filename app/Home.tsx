import React, {FunctionComponent, memo} from 'react';
import {Flex} from './Components';
import {QuestionGame} from './Games';
import {Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from './Theme';
import Border2 from '../assets/border2.png';
import Border5 from '../assets/border5.png';
import Border6 from '../assets/border6.png';
import Border7 from '../assets/border7.png';
import Border3 from '../assets/border3.png';
import Border8 from '../assets/border8.png';

export const Home: FunctionComponent<{}> = memo(() => {
  const border = Math.floor(Math.random() * 6) + 1;
  const borderImage = () => {
    switch (border) {
      case 1:
        return Border7;
      case 2:
        return Border2;
      case 3:
        return Border3;
      case 4:
        return Border8;
      case 5:
        return Border5;
      case 6:
        return Border6;
    }
  };
  return (
    <Flex full style={stylesHome.root}>
      <LinearGradient
        colors={[colors.backgroundStart, colors.backgroundMid, colors.backgroundEnd]}
        style={stylesHome.absoluteFill}
      />
      <View pointerEvents="none" style={stylesHome.glowContainer}>
        <View style={stylesHome.glow} />
      </View>
      <QuestionGame />
      <View pointerEvents="none" style={stylesHome.borderContainer}>
        <Image source={borderImage()} style={stylesHome.borderImage} />
      </View>
    </Flex>
  );
});

const stylesHome = StyleSheet.create({
  root: {backgroundColor: colors.backgroundEnd},
  absoluteFill: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  glowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: colors.glow,
  },
  borderContainer: {position: 'absolute', width: '100%', height: '100%'},
  borderImage: {
    resizeMode: 'stretch',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.65,
    position: 'absolute',
  },
});

