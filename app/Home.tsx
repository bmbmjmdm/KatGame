import React, {FunctionComponent} from 'react';
import {Flex} from './Components';
import {QuestionGame} from './Games';
import {Image, View} from 'react-native';
import Border2 from '../assets/border2.png';
import Border5 from '../assets/border5.png';
import Border6 from '../assets/border6.png';
import Border7 from '../assets/border7.png';
import Border3 from '../assets/border3.png';
import Border8 from '../assets/border8.png';

export const Home: FunctionComponent<{}> = () => {
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
    <Flex full style={{backgroundColor: '#000000'}}>
      <QuestionGame />
      <View
        pointerEvents="none"
        style={{position: 'absolute', width: '100%', height: '100%'}}>
        <Image
          source={borderImage()}
          style={{
            resizeMode: 'stretch',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    </Flex>
  );
};
