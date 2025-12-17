import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { UserInfo } from "@/types/user";

interface UserState {
  userInfo: UserInfo;
  token: string;
}

interface UserActions {
  setUserInfo: (userInfo: UserInfo) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          id: 0,
          name: "",
          account: "",
          avatar: "",
          phone: "",
          email: "",
          create_time: "",
          update_time: "",
        },
        token: "",
        setUserInfo: (userInfo) => set({ userInfo }),
        setToken: (token) => set({ token }),
        logout: () => {
          set({
            userInfo: {
              id: 0,
              name: "",
              account: "",
              avatar: "",
              phone: "",
              email: "",
              create_time: "",
              update_time: "",
            },
            token: "",
          });

        },
      }),
      {
        name: "user-storage",
      }
    )
  )
);

export default useUserStore;
