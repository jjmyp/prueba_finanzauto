import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import userService from '../services/userService';

import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import ButtonFab from '../components/ButtonFab';
import ItemList from '../components/user/ItemList';
import { User } from '../interfaces/User';

type UserProps = StackScreenProps<RootStackParamList, 'UserPage'>;

export const UserPage = ({navigation}: UserProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
      console.log(fetchedUsers, 'FETCHED USERS');
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Llama a la función deleteUserById con el userId
      await userService.deleteUserById(userId);
      // Volver a cargar los usuarios después de eliminar uno
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      // Mostrar una notificación de error
      Alert.alert('Error', 'Hubo un problema al eliminar el usuario');
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ItemList
            user={item}
            onPress={() => navigation.navigate('DetailUserPage', { id: item.id })}
            onDelete={() => handleDeleteUser(item.id)}
            onEdit={() => navigation.navigate('AddUserPage', { id: item.id})}  />

        )}
      />
      <ButtonFab title="+" position="right" onPress={() => navigation.navigate('AddUserPage', {id: '0'})} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  buttonFab: {
    position: 'absolute',
  },
});
