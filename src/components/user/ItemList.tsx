import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {User} from '../../interfaces/User';
import {colores} from '../../styles/colores';

interface ItemListProps {
  user: User;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onPress: () => void;
}

const ItemList: React.FC<ItemListProps> = ({
  user,
  onDelete,
  onEdit,
  onPress,
}) => {
  const renderRightActions = () => (
    <TouchableOpacity
      onPress={() => onDelete(user.id)}
      style={styles.deleteButton}>
      <Text style={styles.deleteText}>Eliminar</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View
            style={[
              styles.userInfo,
              {
                backgroundColor: colores.sgundary,
                height: 150,
                borderRadius: 20,
              },
            ]}>
            <Text
              style={[
                styles.name,
                styles.textMargin,
              ]}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={[styles.email, styles.textMargin]}>ID: {user.id}</Text>
          </View>
          <View style={[{height: 60, width:'100%',  justifyContent: 'space-between',alignItems: 'center', flexDirection: 'row'}]}>
            <View>
              <Text style={[styles.name, styles.textMargin]}>Ver detalle</Text>
            </View>
            <View>
              <Text style={{paddingRight: 20}}>{'>'}</Text>
            </View>
          </View>
        </View>
        <Image source={{uri: user.picture}} style={styles.avatar} />
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 210,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  editButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: colores.redLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: colores.red,
  },
  avatar: {
    position: 'absolute',
    width: 150,
    height: 150,
    padding: 20,
    left: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
  },
  textMargin: {
    marginLeft: 200,
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.primary,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ItemList;
