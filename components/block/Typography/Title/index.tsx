import * as React from 'react';
import { Title } from 'react-native-paper';
import {
  StyleSheet,
} from 'react-native';

interface IProps {
  children: string;
}

export function TypographyTitle({children}: IProps) {
  return (
    <Title
      style={styles.TypographyTitle}
    >
      {children}
    </Title>
  )
}

const styles = StyleSheet.create({
  TypographyTitle: {
    color: '#d5c484',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
});

      