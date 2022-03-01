import * as React from 'react';
import { Paragraph } from 'react-native-paper';
import {
  StyleSheet,
} from 'react-native';

interface IProps {
  children: string;
}

export function TypographyParagraph({children}: IProps) {
  return (
    <Paragraph
      style={styles.TypographyParagraph}
    >
      {children}
    </Paragraph>
  )
}

const styles = StyleSheet.create({
  TypographyParagraph: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 16
  },
});

      