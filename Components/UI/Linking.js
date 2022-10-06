import React, { useRef } from 'react';
import { StyleSheet, Linking, Text, Platform, View } from 'react-native';

import { useHover, useFocus, useActive } from 'react-native-web-hooks';


const Link = ({ children, style, href = '#' }) =>{
  const ref = useRef(null);

  const isHovered = useHover(ref);
  const isFocused = useFocus(ref);
  const isActive = useActive(ref);

  return (
    <Text
      accessibilityRole="link"
      href={href}
      draggable={false}
      onPress={() => Linking.openURL(href)}
      tabIndex={0}
      ref={ref}
      style={[
        styles.text,
        style,
        isHovered && styles.hover,
        isFocused && styles.focused,
        isActive && styles.active,
      ]}>
      {children}
    </Text>
  );
}
export default Link;
const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
        outlineStyle: 'none',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        transitionDuration: '200ms',
      },
      default: {},
    }),
  },
  active: {
    color: 'blue',
    borderBottomColor: 'blue',
    opacity: 1.0,
  },
  hover: {
    opacity: 0.6,
  },
  focused: {
    borderBottomColor: 'black',
  },
});
