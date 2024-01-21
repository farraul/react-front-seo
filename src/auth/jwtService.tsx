import axios from 'axios';
import Cookies from 'js-cookie';
import { encriptAdapter } from 'src/adapters/encriptAdapter';
import jwtServiceConfig from 'src/auth/configs/jwtServiceConfig';
import AppUtils from 'src/utilities/utils';

class JwtService extends AppUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      },
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (user: any, queryParams = new URLSearchParams()) => {
    return new Promise((resolve, reject) => {
      axios.post(`${jwtServiceConfig.signUp}?${queryParams}`, user).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.token);
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email: string, password: string, remember = true) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.data) {
            this.setSession(response.data.data.token, remember);
            resolve(response.data.data);
            this.emit('onLogin', response.data.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  signInWithToken = () => {
    console.log('SignInWithToken jwtService');
    return new Promise((resolve, reject) => {
      this.getMe()
        .then((response) => {
          if (response.data) {
            this.setSession(this.getAccessToken());
            resolve(response.data);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  getMe = () => {
    return axios.get(jwtServiceConfig.getMe);
  };

  setSession = (access_token: string | null, remember = true) => {
    // const storage = remember ? localStorage : sessionStorage;
    if (access_token) {
      Cookies.set('jwt_access_token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    } else {
      Cookies.remove('jwt_access_token');
      localStorage.removeItem('jwt_access_token');
      sessionStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token: string) => {
    if (!access_token) {
      return false;
    }
    const decoded: any = encriptAdapter(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return Cookies.get('jwt_access_token') || '';
  };
}

const instance = new JwtService();

export default instance;
