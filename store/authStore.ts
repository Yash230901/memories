import create from "zustand"
import { persist } from "zustand/middleware"//it uses for changes remain in the page.
import { BASE_URL } from "../utils"
import axios from "axios"

const authStore = (set: any) => ({
    userProfile: null,
    allUsers: [],
    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),

    fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);

        set({ allUsers: response.data });//this function is provided by zustand
    },
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;
//any is used when type is not kmnown and it set it to any type.