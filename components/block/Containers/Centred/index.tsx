import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

export function CentredContainer({ children }: { children: any }) {
  return (
    <View style={styles.CentredContainer}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
  CentredContainer: {
    justifyContent: 'center',
    flex: 1,
    height: '100%'
  },
});