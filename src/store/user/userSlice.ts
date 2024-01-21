import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { userRegister, signIn } from './userActions';
import Cookies from 'js-cookie';
import { Company } from 'src/models/user/user';
import { User } from 'src/models/user/user';
import profileLifeguard from 'src/stub/profileLifeguardStub.json';

// const infoDefault = profileLifeguard;
const infoDefaultNull = {
  name: '',
  namePersonContact: '',
  email: '',
  phone: '',
  whatsApp: '',
  website: '',
  availability: '',
  yearsActive: '',
  priceHour: '',
  community: '',
  province: '',
  location: '',
  id: '',
  token: '',
  servicesAditionals: [],
};

const tokenDefault = '';
const token = Cookies.get('jwt_access_token') || '';

const userEmptyState: User = {
  loading: false,
  userInfo: { ...infoDefaultNull, token },
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userEmptyState,
  reducers: {
    logout: (state) => {
      Cookies.remove('jwt_access_token');
      state.loading = false;
      state.userInfo = { ...infoDefaultNull, token: tokenDefault };
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<Company>) => {
      state.userInfo = action.payload;
    },
  },
  // extraReducers: (builder) => {
  // login user
  // builder
  //   .addCase(signIn.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   })
  //   .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
  //     state.loading = false;
  //     state.userInfo = action.payload as unknown as UserInfo;
  //   })
  //   .addCase(signIn.rejected, (state, { payload }) => {
  //     state.loading = false;
  //     state.error = payload as string;
  //   })
  // register user
  // .addCase(userRegister.pending, (state) => {
  //   state.loading = true;
  //   state.error = null;
  // })
  // .addCase(userRegister.fulfilled, (state) => {
  //   state.loading = false;
  //   state.success = true;
  // })
  // .addCase(userRegister.rejected, (state, { payload }) => {
  //   state.loading = false;
  //   state.error = payload as string;
  // });
  // },
});

export const { logout, setCredentials } = userSlice.actions;

export default userSlice.reducer;
