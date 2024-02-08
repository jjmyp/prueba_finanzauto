import React, {useState} from 'react';
import {TextInput, View, Text, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {colores} from '../styles/colores';

interface InputTextFieldProps extends TextInputProps {
  placeholder: string;
  icon: string;
}
const FloatingLabelInput: React.FC<InputTextFieldProps> = ({
  placeholder,
  icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>
          <Icon name={icon} size={25} color={colores.header} />
        </Text>
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            top: isFocused || rest.value ? -24 : 18,
            left: 80,
            position: 'absolute',
          }}>
          <Text style={[styles.label]}>{placeholder}</Text>
        </View>
        <TextInput
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 50,
    padding: 10,
  },
  container: {
    marginTop: 20,
  },
  labelContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 50,
    top: 50,
    fontSize: 16,
  },
  label: {
    color: '#666',
  },
  input: {
    // marginTop: 10,
    // padding: 10,
    // paddingLeft: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // fontSize: 18,
    width: '100%',
  },
  inputContainer: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default FloatingLabelInput;
