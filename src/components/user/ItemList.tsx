import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {User} from '../../interfaces/User';

interface ItemListProps {
  user: User;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onPress:  () => void;
}

const ItemList: React.FC<ItemListProps> = ({user, onDelete, onEdit, onPress}) => {
  const renderRightActions = () => (
    <TouchableOpacity
      onPress={() => onDelete(user.id)}
      style={styles.deleteButton}>
      <Text style={styles.deleteText}>Eliminar</Text>
    </TouchableOpacity>
  );
  const renderLeftActions = () => (
    <TouchableOpacity
      onPress={() => onEdit(user.id)}
      style={styles.editButton}>
      <Text style={styles.deleteText}>Editar</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={{uri: user.picture}} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text
            style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ItemList;
