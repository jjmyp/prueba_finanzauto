import React from 'react';
import {Text, View} from 'react-native';
import {colores} from '../styles/colores';

interface Props {
    title: string;
}

export const Header = ({title}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 250,
        marginHorizontal: 200,
        marginVertical: 20,
      }}>
      <View>
        <Text style={{color: colores.header, fontSize: 40, fontWeight: 'bold'}}>
          {title}
        </Text>
      </View>
      <View>
        <Text>Lapiz</Text>
      </View>
    </View>
  );
};
