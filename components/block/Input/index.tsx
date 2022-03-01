import * as React from 'react';
import { TextInput } from 'react-native-paper';
import {
  StyleSheet,
} from 'react-native';

interface IProps {
  blurOnSubmit: boolean,
  error: boolean,
  keyboardType: string, 
  label: string,
  onChangeText: any,
  onSubmitEditing: any,
  refs: any,
  returnKeyType: any,
  secureTextEntry: boolean,
  value: string;
}

export function Input({blurOnSubmit, error, keyboardType, label, onChangeText, onSubmitEditing, refs, returnKeyType, secureTextEntry, value}: IProps) {
  return (
    <TextInput
      blurOnSubmit={blurOnSubmit}
      keyboardType={keyboardType}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      error={error}
      label={label}
      value={value}
      onChangeText={onChangeText}
      ref={refs}
      style={styles.Input}
      theme={{ colors: {
        placeholder: '#fff',
        text: '#fff',
        error: '#ff7373',
        primary: '#d2ba71',
      }}}
      secureTextEntry={secureTextEntry}
    />
  )
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: 'rgba(255,255,255,.15)',
    color: '#fff',
    fontSize: 16,
  },
});

      