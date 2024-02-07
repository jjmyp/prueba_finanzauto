import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/StackNavigator';
import userService from '../../services/userService';
import { UserDetail } from '../../interfaces/User';
import { Loading } from '../../components/Loading';
import ButtonFab from '../../components/ButtonFab';

type Props = StackScreenProps<RootStackParamList, 'DetailUserPage'>;

export const DetailUserPage: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDetail | null>();

  const fetchUser = async () => {
    try {
      const fetchedUser = await userService.getUserById(id);
      setUser(fetchedUser);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading || !user) {
    return (
      <Loading/>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.picture }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {
            user.gender && (
                <>
                    <Text style={styles.detail}>{`Gender: ${user.gender}`}</Text>
                    <Text style={styles.detail}>{`Date of Birth: ${user.dateOfBirth}`}</Text>
                    <Text style={styles.detail}>{`Phone: ${user.phone}`}</Text>
                    <Text style={styles.detail}>{`Location: ${user.location.street}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.timezone}`}</Text>
                </>
            )
        }
      </View>
      <ButtonFab title="<" position="left" color="blue" onPress={() => navigation.navigate('UserPage')} />
      <ButtonFab title="Edit" position="right" onPress={() => navigation.navigate('AddUserPage', {id: user.id})} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },

  detail: {
    fontSize: 16,
    marginTop: 5,
  },
});
