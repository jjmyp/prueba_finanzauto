import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';

interface InputTextFieldProps extends TextInputProps {
  placeholder: string;
}

const InputTextField: React.FC<InputTextFieldProps> = ({ placeholder, ...rest }) => {
  return (
    <View style={styles.inputContainer}>  
        <Text style={styles.icon}>Hola</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          {...rest}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%'
  },
  icon: {
    marginLeft:50,
    padding: 10,
  },
  inputContainer:{
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center',
    borderColor: 'gray',
    borderWidth: 1,
  }
});

export default InputTextField;
