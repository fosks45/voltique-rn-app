// import * as React from 'react';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { app, firebase } from '../firebase/config'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { ImageBackgroundContainer } from '../components/block/Containers/ImageBackgroundContainer';
import { CentredContainer } from '../components/block/Containers/Centred';
import { PaddedContainer } from '../components/block/Containers/Padded';
import { Input } from '../components/block/Input';
import { ButtonContained } from '../components/block/Button/Contained';
import { ButtonText } from '../components/block/Button/Text';
import { TypographyParagraph } from '../components/block/Typography/Paragraph';

import { Formik } from 'formik';
import * as yup from 'yup'

export default function ForgottenPassword({ navigation }) {
  const ForgottenPasswordValidationSchema = yup.object().shape({
    email: yup
    .string()
    .email("Please enter a valid email address")
    .required('Email Address is Required'),
  })
  return (
    <ImageBackgroundContainer>
      <PaddedContainer>
        <CentredContainer>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(values) => {
              const auth = getAuth();
              sendPasswordResetEmail(auth, values.email)
              .then(function() {
                alert('Please check your email for a password reset link')
                navigation.navigate('Login')
              }).catch(function(error) {
                alert(error.message)
              });
            }}
            validationSchema={ForgottenPasswordValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
              <>
                <Image style={styles.logo} source={require('../assets/images/voltique-large.png')} />
                <View
                  style={{
                    marginBottom: 20
                  }}
                >

                <Input
                  blurOnSubmit={false}
                  error={touched.email && errors.email}
                  keyboardType="email-address"
                  label="Email address"
                  onChangeText={handleChange('email')}
                  returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                  value={values.email}
                  />
                  </View>
                {touched.email && errors.email ? (
                  <TypographyParagraph style={styles.error}>{errors.email}</TypographyParagraph>
                ) : null}
                <ButtonContained onPress={handleSubmit}>
                  Submit
                </ButtonContained>
                <ButtonText onPress={() => navigation.navigate('Login')}>Login</ButtonText>
              </>
            )}
          </Formik>
        </CentredContainer>
      </PaddedContainer>
    </ImageBackgroundContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    aspectRatio: 686  / 127,
    height: undefined,
    marginBottom: 40,
    width: '100%',
  }
});

      