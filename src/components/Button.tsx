import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  title: string;
  color: string;
  textColor:string;
  onPress: () => void;
}
export const Button = ({title, color,  textColor, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: color}]}>
      <Text style={[styles.textButton, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop:5,
    width: 200,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 18,
  },
});
