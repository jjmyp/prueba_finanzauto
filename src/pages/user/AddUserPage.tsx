import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import InputField from '../../components/InputTextField';
import {RootStackParamList} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import userService from '../../services/userService';
import { isValidEmail, isValidName } from '../../functions/validateData';
import { Loading } from '../../components/Loading';

type UserAddPage = StackScreenProps<RootStackParamList, 'AddUserPage'>;

export const AddUserPage = ({navigation, route}: UserAddPage) => {
  const {id} = route.params;
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const picture = 'https://i.pravatar.cc/300';

  const cargarDatosCallback = useCallback(async () => {
    if (id !== '0') {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    cargarDatosCallback();
  }, [cargarDatosCallback]);


  const fetchUser = async () => {
    try {
      const fetchedUser = await userService.getUserById(id);
      setFirstName(fetchedUser?.firstName ?? '');
      setLastName(fetchedUser?.lastName ?? '');
      setEmail(fetchedUser?.email ?? '');

    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    let msg = '';
    if (!isValidName(firstName)) {
      msg = 'Por favor ingrese un nombre válido';
    }

    if (!isValidName(lastName)) {
      msg = 'Por favor ingrese un apellido válido';
    }

    if (!isValidEmail(email)) {
      msg = 'Por favor ingrese un correo electrónico válido';
    }

    if (msg !== '') {
      Alert.alert('Información', msg);
      return;
    }

    try {
      if (id) {
        await userService.updateUser(id, {
          firstName,
          lastName,
          email,
          picture,
        });
      } else {
        await userService.addUser({
          firstName,
          lastName,
          email,
          picture,
        });
      }
      navigation.navigate('UserPage');
    } catch (error) {
      Alert.alert(
        `Error al ${
          id ? 'editar' : 'agregar'
        } el usuario. Inténtalo de nuevo.`,
      );
    }
  };

  if (loading || !id) {
    return (
      <Loading/>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id ? 'Editar' : 'Agregar'} usuario</Text>
      <InputField
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
      />
      <InputField
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <InputField
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity onPress={handleAddUser} style={styles.button}>
        <Text style={styles.textButton}>{id ? 'Editar' : 'Agregar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'red',
    width: 200,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 12,
  },
});

export default AddUserPage;
