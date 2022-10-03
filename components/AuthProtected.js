import { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export function authProtected(Comp) {
  return function AuthProtected(props) {
    const router = useRouter()
    const { session, user } = useAuth()

    useEffect(() => {
      console.log("session", session)
      if (!session) {
        router.push('/auth/signin')
      }
    }, [router, session])

    return <Comp {...props} />
  }
}