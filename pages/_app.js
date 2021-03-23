import '../styles/global.css'
import 'bulma/css/bulma.min.css'
import useAuth from '../components/auth/useAuth'
import firebase, { FirebaseContext } from '../firebase'

import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const user = useAuth()
  // const userInfo = null
  // const UserContext = React.createContext({})



  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      {/* it's working here... how do i populate the context? */}
      {/* {userInfo.name} */}

        <Component {...pageProps} />
  
    </FirebaseContext.Provider>
  )
}
