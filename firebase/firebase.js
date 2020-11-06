import app from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './config'



class Firebase {
  constructor() {
    // Initialize Firebase
    // Next needs this check it looks like? https://github.com/vercel/next.js/issues/1999
    try {
      app.initializeApp(firebaseConfig)
    } catch (err) {
      if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
      }
    }
    // firebase.analytics();
    this.auth = app.auth()
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )
    return await newUser.user.updateProfile({
      displayName: name
    })
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }

  async resetPassword(email) {
    console.log('hello?')
    await this.auth.sendPasswordResetEmail(email)
  }
}

const firebase = new Firebase()
export default firebase
