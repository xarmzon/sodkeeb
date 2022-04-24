import { UserState } from '@utils/types'
import { createContext, Dispatch, ReactNode, Reducer, useReducer } from 'react'

export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
}

const initialState: UserState = {
  token: '',
  username: '',
  loggedIn: false,
  loading: false,
}
type TAuthContext = {
  userState: UserState
  dispatch: Dispatch<any>
}
const AuthContext = createContext<TAuthContext>({
  userState: initialState,
  dispatch: () => null,
})

interface IAuthProvider {
  children: ReactNode
}
interface AuthAction {
  type: string
  payload?: Partial<UserState>
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [userState, dispatch] = useReducer<Reducer<UserState, AuthAction>>(
    (userState, action) => {
      switch (action.type) {
        case ACTIONS.SET_USER:
          return {
            ...userState,
            username: action.payload?.username || '',
            token: action.payload?.token || '',
            loggedIn: Boolean(
              action.payload?.username && action?.payload?.token
            ),
          }

        case ACTIONS.SET_LOADING:
          return {
            ...userState,
            loading: action.payload?.loading || false,
          }

        default:
          return userState
      }
    },
    initialState
  )

  return (
    <AuthContext.Provider value={{ userState, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
