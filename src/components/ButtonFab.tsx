import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Text } from 'react-native';


interface ButtonFabProps {
    title: string;
    onPress: () => void;
    position: 'left' | 'right';
    color?: string;
    containerStyle?: ViewStyle;
}

const ButtonFab: React.FC<ButtonFabProps> = ({ title, color = 'red', position = 'right', onPress, containerStyle }) => {
    let position_button = null;
    if (position === 'right') {
        position_button = {
            bottom: 20,
            right: 20,
        };
    } else  {
        position_button = {
            bottom: 20,
            left: 20,
        };
    }
  return (
    <TouchableOpacity style={[styles.container, containerStyle, {backgroundColor: color}, position_button]} onPress={onPress}>
        <Text style={styles.text}>
            {title}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // bottom: 20,
    // right: 20,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ButtonFab;
