import * as React from 'react';
import { Paragraph } from 'react-native-paper';
import {
  StyleSheet,
} from 'react-native';

interface IProps {
  children: string;
}

export function TypographyText({children}: IProps) {
  return (
    <Paragraph
      style={styles.TypographyText}
    >
      {children}
    </Paragraph>
  )
}

const styles = StyleSheet.create({
  TypographyText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 16
  },
});

      