import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputTextFieldProps extends TextInputProps {
  placeholder: string;
}

const InputTextField: React.FC<InputTextFieldProps> = ({ placeholder, ...rest }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default InputTextField;
