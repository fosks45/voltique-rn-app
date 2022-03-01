import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

export function PaddedContainer({ children }: { children: any }) {
  return (
    <View style={styles.PaddedContainer}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
  PaddedContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 30,
  },
});