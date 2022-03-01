// import * as React from 'react';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { ImageBackgroundContainer } from '../components/block/Containers/ImageBackgroundContainer';
import { CentredContainer } from '../components/block/Containers/Centred';
import { PaddedContainer } from '../components/block/Containers/Padded';
import { Input } from '../components/block/Input';
import { ButtonContained } from '../components/block/Button/Contained';
import { ButtonText } from '../components/block/Button/Text';
import { TypographyParagraph } from '../components/block/Typography/Paragraph';

import { Formik } from 'formik';
import * as yup from 'yup'


export default function Login({ navigation }) {
  const loginValidationSchema = yup.object().shape({
    email: yup
    .string()
    .email("Please enter a valid email address")
    .required('Email Address is Required'),
    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is Required'),
  })
  const passwordInput = useRef(null);
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
              signInWithEmailAndPassword(auth, values.email, values.password)
              .then(() => {
                onAuthStateChanged(auth, (user) => {
                  if (user) {
                    navigation.navigate('About Voltique', user)
                  } else {
                  }
                })
              })
              .catch(error => {
                alert(error)
              })
            }}
            validationSchema={loginValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
              <>
                <Image style={styles.logo} source={require('../assets/images/voltique-large.png')} />
                <View
                  style={{
                    marginBottom: 10
                  }}
                >

                <Input
                  blurOnSubmit={false}
                  error={touched.email && errors.email}
                  keyboardType="email-address"
                  label="Email address"
                  onChangeText={handleChange('email')}
                  onSubmitEditing={() => { passwordInput.current.focus(); }}
                  returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                  value={values.email}
                  />
                {touched.email && errors.email ? (
                  <TypographyParagraph style={styles.error}>{errors.email}</TypographyParagraph>
                  ) : null}
                  </View>
                <>
                <View
                  style={{
                    marginBottom: 20
                  }}
                >

                  <Input
                    blurOnSubmit={false}
                    error={touched.password && errors.password}
                    label="Password"
                    onChangeText={handleChange('password')}
                    ref={passwordInput}
                    returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                    secureTextEntry
                    value={values.password}
                    />
                  {touched.password && errors.password ? (
                    <TypographyParagraph style={styles.error}>{errors.password}</TypographyParagraph>
                    ) : null}
                    </View>
                </>
                <ButtonContained onPress={handleSubmit}>
                  Login
                </ButtonContained>
                <ButtonText onPress={() => navigation.navigate('Forgotten Password')}>Forgotten password?</ButtonText>
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

      