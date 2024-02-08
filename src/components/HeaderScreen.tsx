import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colores } from '../styles/colores';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface Props {
  title: string;
  color: string;
}

const HeaderScreen = ({title, color}: Props) => {
  return (
    <View style={[styles.header, {backgroundColor: color}]}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
      <Icon name="account" size={30} color={colores.header} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    color: colores.green,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HeaderScreen;
