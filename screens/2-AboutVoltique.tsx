import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../types';

import { ImageBackgroundContainer } from '../components/block/Containers/ImageBackgroundContainer';
import { CentredContainer } from '../components/block/Containers/Centred';
import { PaddedContainer } from '../components/block/Containers/Padded';
import { ButtonContained } from '../components/block/Button/Contained';
import { TypographyParagraph } from '../components/block/Typography/Paragraph';
import { TypographyTitle } from '../components/block/Typography/Title';


export default function AboutVoltique({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <ImageBackgroundContainer>
      <CentredContainer>
        <PaddedContainer>
          <Image style={styles.logo} source={require('../assets/images/voltique-large.png')} />
          <TypographyTitle>What is Voltique?</TypographyTitle>
          <TypographyParagraph>A unique cost-effective formula that achieves a high level of disinfection, targeting and incessantly killing all strains of pathogens including Coronavirus.</TypographyParagraph>
          <TypographyParagraph>The barrier coating provides a protective nanoscale seam, ensuring any transmissible pathogens are killed instantly without the need of persistent disinfecting or deep-cleaning.</TypographyParagraph>
          <TypographyParagraph >Tests have proven efficient reduction in rate of transmission and the ability to eradicate potential biofilms.</TypographyParagraph>
          {/* <ButtonContained icon="email" onPress={() => console.log('Pressed')}>
            Contact us
          </ButtonContained> */}
        </PaddedContainer>
      </CentredContainer>
    </ImageBackgroundContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    aspectRatio: 686  / 127,
    height: undefined,
    marginBottom: 40,
    width: '100%',
  },
});
