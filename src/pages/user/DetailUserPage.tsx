// import { StackScreenProps } from '@react-navigation/stack';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { RootStackParamList } from '../../navigation/StackNavigator';
// import userService from '../../services/userService';
// import { UserDetail } from '../../interfaces/User';
// import { Loading } from '../../components/Loading';
// import ButtonFab from '../../components/ButtonFab';
// import { Avatar } from '../../components/Avatar';

// type Props = StackScreenProps<RootStackParamList, 'DetailUserPage'>;

// export const DetailUserPage: React.FC<Props> = ({ route, navigation }) => {
//   const { id } = route.params;
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<UserDetail | null>();

//   const fetchUser = async () => {
//     try {
//       const fetchedUser = await userService.getUserById(id);
//       setUser(fetchedUser);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   if (loading || !user) {
//     return (
//       <Loading/>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Avatar picture={user.picture}/>
//       <View style={styles.userInfo}>
//         <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
//         <Text style={styles.email}>{user.email}</Text>
//         {
//             user.gender && (
//                 <>
//                     <Text style={styles.detail}>{`Gender: ${user.gender}`}</Text>
//                     <Text style={styles.detail}>{`Date of Birth: ${user.dateOfBirth}`}</Text>
//                     <Text style={styles.detail}>{`Phone: ${user.phone}`}</Text>
//                 </>
//             )
//         }
//       </View>
      
//       <ButtonFab title="<" position="left" color="blue" onPress={() => navigation.navigate('UserPage')} />
//       <ButtonFab title="Edit" position="right" onPress={() => navigation.navigate('AddUserPage', {id: user.id})} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//   },
//   userInfo: {
//     alignItems: 'center',
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   email: {
//     fontSize: 16,
//     color: 'gray',
//   },

//   detail: {
//     fontSize: 16,
//     marginTop: 5,
//   },
// });


import React, {useEffect, useState, useCallback} from 'react';
import {View, Alert, StyleSheet, ScrollView} from 'react-native';
import {RootStackParamList} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import userService from '../../services/userService';
import {isValidEmail, isValidGender, isValidName, isValidPhone} from '../../functions/validateData';
import {Loading} from '../../components/Loading';
import {Avatar} from '../../components/Avatar';
import {colores} from '../../styles/colores';
import {Button} from '../../components/Button';
import {Header} from '../../components/Header';
import FloatingLabelInput from '../../components/InputFlotante';

type Props = StackScreenProps<RootStackParamList, 'DetailUserPage'>;

export const DetailUserPage: React.FC<Props> = ({ route, navigation }) => {
  const {id} = route.params;

  const [firstName, setFirstName] = useState<string>('Carlos');
  const [lastName, setLastName] = useState<string>('Rivera');
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('carlo@gmail.com');
  const [gender, setGender] = useState<string>('male');
  const [dateOfBirth, setDateOfBirth] = useState<string>('1999-12-23');
  const [phone, setPhone] = useState<string>('3166429822');
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
          style={{
            backgroundColor: 'white',
            marginHorizontal: 150,
            padding: 50,
            borderRadius: 20,
            width: 'auto'
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    flex: 1,
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
});

export default DetailUserPage;
