import { useEffect, useState } from 'react'
import {
  auth,
  firebaseConfig,
  provider,
  signInWithPopup,
  signOut,
} from '@/services/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import toast from 'react-hot-toast'
import { useAtom } from 'jotai'
import { currentUserAtom } from '@/atoms/global-atoms'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const isFirebaseAvailable = () => {
  try {
    if (!getApps().length) {
      initializeApp(firebaseConfig) // Try initializing Firebase
    }
    getAuth() // Try accessing a Firebase service
    return true
  } catch (error) {
    console.warn('Firebase no available. Running in Guest mode...', { error })
    return false
  }
}

export function useAuth() {
  const [user, setUser] = useAtom<User | null>(currentUserAtom)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = () => {}

    if (auth) {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
      })
    }
    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    try {
      if (auth && provider) {
        const result = await signInWithPopup(auth, provider)
        setUser(result.user)
      }
    } catch (error) {
      toast.error('Sign-in failed')
      console.error('Sign-in failed', error)
    }
  }

  const logOut = async () => {
    if (auth) {
      await signOut(auth)
      setUser(null)
    }
  }

  return { user, loading, signIn, logOut, isFirebaseAvailable }
}
