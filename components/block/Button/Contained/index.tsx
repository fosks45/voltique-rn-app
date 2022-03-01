import * as React from 'react';
import { Button } from 'react-native-paper';
import {
  StyleSheet,
} from 'react-native';

interface IProps {
  children: string,
  icon: string,
  onPress: any;
}

export function ButtonContained({children, icon, onPress}: IProps) {
  return (
    <Button
      color="#fad482"
      contentStyle={styles.ButtonContainedContent}
      icon={icon}
      labelStyle={styles.ButtonContainedLabel}
      mode="contained"
      onPress={onPress}
      style={styles.ButtonContained}
    >
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  ButtonContained: {
    borderRadius: 50
  },
  ButtonContainedContent: {
    padding: 12
  },
  ButtonContainedLabel: {
    color: '#fff',
    fontSize: 18
  }
});

      