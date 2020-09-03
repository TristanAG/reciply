import firebase from '../../firebase'
import React from 'react'

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null)

  React.useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return authUser
}

export default useAuth
