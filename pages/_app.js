import '../styles/global.css'
import 'bulma/css/bulma.min.css'
import useAuth from '../components/auth/useAuth'
import firebase, { FirebaseContext } from '../firebase'

export default function App({ Component, pageProps }) {
  const user = useAuth()
  // console.log({ user })
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}
