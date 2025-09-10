import {View} from 'react-native';
import React, {FunctionComponent, memo} from 'react';


// A component that is simple a blank space with a given height and/or width
type SpacerProps = {
  width?: number;
  height?: number;
};

export const Spacer: FunctionComponent<SpacerProps> = memo(({width = 0, height = 0}) => (
  <View style={{width, height}} />
));

