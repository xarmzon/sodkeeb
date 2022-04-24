import { UserState } from '@utils/types'
import { createContext, Dispatch, ReactNode, Reducer, useReducer } from 'react'

type ACTIONS = {
  SET_USER: 'SET_USER'
  SET_LOADING: 'SET_LOADING'
}
interface AuthAction {
  type: keyof ACTIONS
  payload?: Partial<UserState>
}
type TAuthContext = {
  userState: UserState
  dispatch: Dispatch<AuthAction>
}

interface IAuthProvider {
  children: ReactNode
}

export const ACTIONS: ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
}

const initialState: UserState = {
  token: '',
  username: '',
  loggedIn: false,
  loading: false,
}

const AuthContext = createContext<TAuthContext>({
  userState: initialState,
  dispatch: () => null,
})
AuthContext.displayName = 'AuthContext'

const authReducer = (userState: UserState, action: AuthAction): UserState => {
  console.log(action.type)
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...userState,
        username: action.payload?.username || '',
        token: action.payload?.token || '',
        loggedIn: Boolean(action.payload?.username && action?.payload?.token),
      }
    case ACTIONS.SET_LOADING:
      return {
        ...userState,
        loading: action.payload?.loading || false,
      }
    default:
      return userState
  }
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [userState, dispatch] = useReducer<Reducer<UserState, AuthAction>>(
    authReducer,
    initialState
  )

  return (
    <AuthContext.Provider value={{ userState, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
