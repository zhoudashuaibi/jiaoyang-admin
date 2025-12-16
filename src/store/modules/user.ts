import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { UserInfo } from '@/types/user'
import { redirect } from 'react-router-dom'



interface UserState {
  userInfo: UserInfo
  token: string
}

interface UserActions {
  setUserInfo: (userInfo: UserInfo) => void
  setToken: (token: string) => void
  logout: () => void
}

const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          id: 0,
          username: '',
          role: [],
          avatar: '',
        },
        token: '123123',
        setUserInfo: (userInfo) => set({ userInfo }),
        setToken: (token) => set({ token }),
        logout: () => {
          set({
            userInfo: {
              id: 0,
              username: '',
              role: [],
              avatar: '',
            },
            token: ''
          })
          window.location.href = '/login'
        }
      }),
      {
        name: 'user-storage',
      }
    ),
    { name: 'UserStore' }
  )
)

export default useUserStore
