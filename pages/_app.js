import '../styles/global.css'
import 'bulma/css/bulma.min.css'
import useAuth from '../components/auth/useAuth'
import firebase, { FirebaseContext } from '../firebase'
import UserContext from '../contexts/UserContext'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const user = useAuth()
  // const userInfo = null
  // const UserContext = React.createContext({})

  // const [userInfo, setUserInfo] = useState("cool guy")

  React.useEffect(() => {
    if (user) {
      checkUser()
    }
  }, [user])


  function checkUser() {
    console.log('CHECKING USER')
    if (user) {
      var docRef = firebase.db.collection('users').doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data()
          // setUserInfo(userData)
        } else {
          console.log("No such document!");
        }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
    }

  }


  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      {/* it's working here... how do i populate the context? */}
      {/* {userInfo.name} */}
      <UserContext.Provider>
        <Component {...pageProps} />
      </UserContext.Provider>
    </FirebaseContext.Provider>
  )
}
