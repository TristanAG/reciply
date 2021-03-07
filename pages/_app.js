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

  const [userInfo, setUserInfo] = useState({})

  React.useEffect(() => {
    if (user) {
      checkUser()
    }
  }, [user])


  function checkUser() {
    console.log('CHECKING USER')
    if (user) {
      // var docRef = firebase.db.collection('users').doc(user.uid).collection('savedRecipes');
      // docRef.get().then((docs) => {
      //   console.log('docs')
      //   console.log(docs)
      // })

      let savedRecipes = []

      firebase.db.collection('users').doc(user.uid).collection('savedRecipes').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(doc.id, " => ", doc.data());
            // console.log(doc.data().name);
            // setUserInfo({
            savedRecipes.push({
              name: doc.data().name
            })

            // })
          });
          setUserInfo(savedRecipes)
        });



      // docRef.get().then((doc) => {
      //   if (doc.exists) {
      //     const userData = doc.data()
      //     console.log('potato man')
      //     console.log(userData)
      //     setUserInfo(userData)
      //   } else {
      //     console.log("No such document!");
      //   }
      //   }).catch((error) => {
      //     console.log("Error getting document:", error);
      //   });
    }

  }


  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      {/* it's working here... how do i populate the context? */}
      {/* {userInfo.name} */}
      <UserContext.Provider value={{ userInfo, setUserInfo}} >
        <Component {...pageProps} />
      </UserContext.Provider>
    </FirebaseContext.Provider>
  )
}
