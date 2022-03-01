import * as React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function ImageBackgroundContainer({ children }: { children: any }) {
  return (
    <ImageBackground source={require('./../../../../assets/images/voltique-wave-bg.jpg')} style={styles.bgImage} imageStyle={styles.backgroundStyle}>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{ flex: 1, width: '100%' }}
          >
          {children}
        </KeyboardAwareScrollView>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
  },
  backgroundStyle: {
    resizeMode: "cover",
    position: 'absolute',
  }
  
});