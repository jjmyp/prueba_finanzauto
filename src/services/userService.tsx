import {API_KEY, API_URL} from '../constants/config';
import {User, UserDetail} from '../interfaces/User';

interface UserWithoutId extends Omit<User, 'id'> {}

const userService = {
  addUser: async (userData: UserWithoutId): Promise<void> => {
    try {
      const response = await fetch(API_URL + '/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'app-id': API_KEY,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el usuario');
      }

      await response.json();
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await fetch(API_URL , {
        headers: {
          'app-id': API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (userId: string): Promise<UserDetail | null> => {
    try {
      const response = await fetch(API_URL + `/${userId}`, {
        headers: {
          'app-id': API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener el usuario');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

   updateUser: async (userId: string, updatedUserData: Partial<User>): Promise<void> => {
    try {
      const response = await fetch(API_URL + `/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'app-id': API_KEY,
        },
        body: JSON.stringify(updatedUserData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      // Si necesitas procesar la respuesta, puedes hacerlo aquí
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Error updating user');
    }
  },

  deleteUserById: async (userId: string): Promise<void> => {
    try {
      const response = await fetch(
        API_URL + `/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'app-id': API_KEY,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      // Si necesitas procesar la respuesta, puedes hacerlo aquí
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Error deleting user');
    }
  },
};

export default userService;
