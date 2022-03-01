import * as React from 'react';
import { Button } from 'react-native-paper';
import {
  StyleSheet,
} from 'react-native';

interface IProps {
  children: string,
  onPress: any;
}

export function ButtonText({children, onPress}: IProps) {
  return (
    <Button
      color="#fad482"
      contentStyle={styles.ButtonTextContent}
      mode="text"
      onPress={onPress}
    >
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  ButtonTextContent: {
    padding: 12
  },
});

      