import React, {useEffect, useState, useCallback} from 'react';
import {View, Alert, StyleSheet, ScrollView} from 'react-native';
import {RootStackParamList} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import userService from '../../services/userService';
import {
  isValidEmail,
  isValidGender,
  isValidName,
  isValidPhone,
} from '../../functions/validateData';
import {Loading} from '../../components/Loading';
import {Avatar} from '../../components/Avatar';
import {colores} from '../../styles/colores';
import {Button} from '../../components/Button';
import {Header} from '../../components/Header';
import FloatingLabelInput from '../../components/InputFlotante';

type UserAddPage = StackScreenProps<RootStackParamList, 'AddUserPage'>;

export const AddUserPage = ({navigation, route}: UserAddPage) => {
  const {id} = route.params;

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [picture, setPicture] = useState<string>('https://i.pravatar.cc/300');

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
      setGender(fetchedUser?.gender ?? '');
      setDateOfBirth(fetchedUser?.dateOfBirth ?? '');
      setPhone(fetchedUser?.phone ?? '');
      setPicture(fetchedUser?.picture ?? '');
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
    if (!isValidGender(gender)) {
      msg = 'El genero debe ser ingresado como (masculino o femenino)';
    }

    if (!isValidPhone(phone)) {
      msg = 'Por favor ingresa un numero te telefono valido';
    }

    if (!isValidEmail(email)) {
      msg = 'Por favor ingrese un correo electrónico válido';
    }

    if (msg !== '') {
      Alert.alert('Información', msg);
      return;
    }

    try {
      if (id !== '0') {
        await userService.updateUser(id, {
          firstName,
          lastName,
          email,
          picture,
          gender,
          dateOfBirth,
          phone,
        });
      } else {
        await userService.addUser({
          firstName,
          lastName,
          email,
          picture,
          gender,
          dateOfBirth,
          phone,
        });
      }
      navigation.navigate('UserPage');
    } catch (error) {
      Alert.alert(
        `Error al ${id ? 'editar' : 'agregar'} el usuario. Inténtalo de nuevo.`,
      );
    }
  };

  if (loading || !id) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.leftView, {backgroundColor: colores.yellow}]} />
      <View style={[styles.rightView, {backgroundColor: 'white'}]} />
      <View style={styles.formContainer}>
        <Header title="Información del usuario" />
        <Avatar picture={picture} />
        <ScrollView
          >
            <View style={{
            backgroundColor: 'white',
            marginHorizontal: 150,
            padding: 20,
            borderRadius: 20,
            flexDirection: 'column',
          }}>

              <FloatingLabelInput
                placeholder="Nombre"
                value={firstName}
                onChangeText={setFirstName}
                icon="account"
              />

              <FloatingLabelInput
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
                icon="account"
              />
              <FloatingLabelInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                icon="email"
              />
              <FloatingLabelInput
                placeholder="Genero"
                value={gender}
                onChangeText={setGender}
                icon="gender-male-female"
              />
              <FloatingLabelInput
                placeholder="Fecha nacimiento"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                icon="calendar"
              />
              <FloatingLabelInput
                placeholder="Telefono"
                value={phone}
                onChangeText={setPhone}
                icon="phone"
              />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>

                <Button
                  onPress={handleAddUser}
                  title={id !== '0' ? 'Editar' : 'Agregar'}
                  color={colores.green}
                  textColor="white"
                />
                <Button
                  onPress={() => navigation.navigate('UserPage')}
                  title="Cancelar"
                  color={colores.grayLight}
                  textColor={colores.gray}
                />
              </View>
            </View>

        </ScrollView>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Para colocar las vistas una al lado de la otra
  },
  formContainer: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    flex: 1,
  },


});

export default AddUserPage;
