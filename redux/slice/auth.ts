import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthSlice } from '../../utils/types'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    token: '',
    loggedIn: false,
    loading: true,
    loadingLogout: false,
  } as AuthSlice,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<
        Omit<AuthSlice, 'loggedIn' | 'loading' | 'loadingLogout'>
      >
    ) => {
      state.username = action.payload.username
      state.token = action.payload.token
    },

    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setLoadingLogout: (state, action: PayloadAction<boolean>) => {
      state.loadingLogout = action.payload
    },
  },
})

export const { setUser, setLoginState, setLoading, setLoadingLogout } =
  authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
