import {
  Text,
  TextStyle,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import React, {FunctionComponent, ReactNode, memo} from 'react';

// Public props for StyledText. Keep intentionally minimal.
export type TextProps = {
  style?: TextStyle | TextStyle[]; // caller can still pass an array
  children?: ReactNode;
  onPress?: () => void;
  type?: 'header' | 'body' | 'caption' | 'subscript' | 'button';
  animated?: boolean; // if true uses Animated.Text for animated style interpolation
  centered?: boolean; // quick horizontal centering helper
  onLayout?: (event: LayoutChangeEvent) => void;
};

// Single theme namespace (expandable later if multiple screens/themes emerge)
// Keeping naming simple for readability.
type VariantKey = 'header' | 'body' | 'caption' | 'subscript' | 'buttonText';

// Readable, memo-friendly component. No functional changes from previous version.
export const StyledText: FunctionComponent<TextProps> = memo(
  ({style, type, animated, centered, children, ...rest}) => {
    const theme = styles.Home; // placeholder for multi-page theming

    // Map public 'button' to internal 'buttonText'
    const internalKey: VariantKey | undefined = type
      ? type === 'button'
        ? 'buttonText'
        : (type as VariantKey)
      : undefined;
    const variantStyle = internalKey ? (theme as any)[internalKey] : undefined;
    const centeredStyle: TextStyle | undefined = centered
      ? stylesCommon.centered
      : undefined;

    // Normalize user style into array for easier merging & performance
    const userStyles = Array.isArray(style) ? style : style ? [style] : [];
    const combined = [
      theme.text,
      variantStyle,
      centeredStyle,
      ...userStyles,
    ].filter(Boolean);

    if (animated) {
      return (
        <Animated.Text {...rest} style={combined}>
          {children}
        </Animated.Text>
      );
    }
    return (
      <Text {...rest} style={combined}>
        {children}
      </Text>
    );
  },
);

const styles = {
  Home: StyleSheet.create({
    text: {
      color: '#FFFFFF',
    },
    subscript: {
      fontSize: 14,
      paddingTop: 10,
      color: '#FFFFFF',
    },
    header: {
      fontSize: 45,
      fontWeight: 'bold' as 'bold',
    },
    body: {
      fontSize: 26,
    },
    caption: {
      fontSize: 20,
    },
    buttonText: {
      fontSize: 14,
      paddingBottom: 2,
    },
  }),
};

const stylesCommon = StyleSheet.create({
  centered: {textAlign: 'center'},
});
