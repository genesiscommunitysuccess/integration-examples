import {
  createContext,
  useState,
  useContext,
  ReactNode,
  FunctionComponent,
} from 'react'
import { authService } from '../services/auth.service'
import { connectService } from '../services/connect.service'
import { USE_FOUNDATION_AUTH } from '../config'

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  checkAuthStatus: () => Promise<void>
  logout: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  authorized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  const checkAuthStatus = async () => {
    const isUserAuthenticated = await authService.isUserAuthenticated()

    if (isUserAuthenticated) {
      if (!USE_FOUNDATION_AUTH) {
        const connect = connectService.getConnect()
        if (!connect.isConnected) {
          return
        }
      }
      const user = {
        authorized: isUserAuthenticated,
      }

      setUser(user)
    }
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const value = { user, setUser, checkAuthStatus, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
