import { defineStore } from 'pinia';
import axios from 'axios';

export const useAccountStore = defineStore('account', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {},
  }),
  getters: {
    getFullName(state) {
      return state.user.firstName + ' ' + state.user.lastName;
    },
  },
  actions: {
    async login(formData) {
      try {
        const { email, password } = formData;
        console.log(email, password);
        // const response = await axios.post(
        //   'https://30e6-158-108-229-150.ngrok-free.app/login',
        //   formData,
        //   {
        //     headers: {
        //       'ngrok-skip-browser-warning': '69420',
        //       'Content-type': 'application/json',
        //       Accept: 'application/json',
        //     },
        //     withCredentials: true,
        //   }
        // );

        const response = await axios.post(
          'https://30e6-158-108-229-150.ngrok-free.app/api/test/login',
          formData,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
            withCredentials: true,
          }
        );

        // if (response.data.loginMessage === 'success') {
        //   console.log('Login success', response.data);
        //   sessionStorage.setItem('user', JSON.stringify(response.data.user));
        //   return -1;
        // }

        // const response = await axios.post(
        //   'https://16e1-223-24-158-211.ngrok-free.app/api/auth/signin',
        //   formData,
        //   { withCredentials: true }
        // );
        // if (response.data.loginMessage === 'fail') {
        //   throw new Error('Login failed');
        // }

        localStorage.setItem('token', response.data.token);

        console.log(response.data);
        this.user = response.data.user;
        this.isLoggedIn = true;
        this.isAdmin = false;
      } catch (error) {
        console.log('error login', error);
        throw { msg: 'Login failed' };
      }
      // this.isLoggedIn = true;
      // this.user = {
      //   id: 'ea77',
      //   username: 'prxsss',
      //   firstName: 'Phuriphat',
      //   lastName: 'Kittikun',
      //   email: '9phuriphat.k@gmail.com',
      //   phone: '0998787404',
      // };
    },
    async register(formData) {
      try {
        // console.log(formData);
        // const { username, firstName, lastName, email, password, phone } =
        //   formData;

        // const response = await axios.post(
        //   `http://localhost:3000/users`,
        //   formData
        // );

        const response = await axios.post(
          'https://30e6-158-108-229-150.ngrok-free.app/api/test/register',
          formData,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
            withCredentials: true,
          }
        );

        localStorage.setItem('token', response.data.token);

        console.log(response.data);
        this.isLoggedIn = true;
        this.user = response.data.user;
        this.isAdmin = false;
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.user = {};
      console.log('Loged out successfully');
    },
    async checkAuth() {
      // try {
      //   const response = await axios.get(
      //     `https://30e6-158-108-229-150.ngrok-free.app/session/user`,
      //     {
      //       headers: {
      //         'ngrok-skip-browser-warning': '69420',
      //         'Content-type': 'application/json',
      //         Accept: 'application/json',
      //       },
      //       withCredentials: true,
      //     }
      //   );
      //   console.log('Session response:', response.data);
      //   // if (res.data && res.data.admin) {
      //   //   this.username = res.data.admin.userName;
      //   //   sessionStorage.setItem('username', this.username); // Store the actual username
      //   // } else {
      //   //   console.error('No admin data in response');
      //   // }
      // } catch (err) {
      //   console.error('Session check failed:', err);
      // }
      try {
        const response = await axios.get(
          'https://30e6-158-108-229-150.ngrok-free.app/api/test/verify-token',
          {
            withCredentials: true,
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        // const response = await axios.get(
        //   'https://16e1-223-24-158-211.ngrok-free.app/api/auth/verify-token',
        //   {
        //     withCredentials: true,
        //   }
        // );
        console.log('response:', response.data);
        // if (response.data.isLoggedIn === false) {
        //   return -1;
        // }
        this.user = response.data.user;
        this.isLoggedIn = true;
        this.isAdmin = false;
        console.log('after check auth:', this.user);
        // this.isAdmin = response.data.user.isAdmin;
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
