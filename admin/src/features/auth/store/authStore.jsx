import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setCredentials: ({ user, accessToken }) =>
        set({ user, accessToken, isAuthenticated: true }),
      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)

// use demo
// import { useAuthStore } from '@/features/auth/store/authStore'

// export default function Profile() {
//   const user = useAuthStore((state) => state.user)
//   const logout = useAuthStore((state) => state.logout)

//   return (
//     <div>
//       <h1>{user?.name}</h1>
//       <button onClick={logout}>Đăng xuất</button>
//     </div>
//   )
// }

// check sau khi refresh trang
// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuthStore } from '@/features/auth/store/authStore'

// export default function ProtectedRoute() {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
// }