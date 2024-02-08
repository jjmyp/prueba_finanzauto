import React from 'react';
import {Image, StyleSheet} from 'react-native';

interface AvatarI {
  picture: string;
}

export const Avatar = ({picture}: AvatarI) => {
  return <Image source={{uri: picture}} style={styles.avatar} />;
};

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 20,
  },
});
