import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
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
    this.db = app.firestore()
    this.storage = app.storage()




  }


  async register(name, email, password) {

    //what if i do it firebase style here from the basic docs...


    this.auth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        // Signed in
        var user = newUser.user;
        // ...

        this.db.collection('users').doc(user.uid).set({
          name: name,
          email: email
        });

        newUser.user.updateProfile({
          displayName: name
        })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });






    // const newUser = await this.auth.createUserWithEmailAndPassword(
    //   email,
    //   password
    // )

    // console.log('look at the new user ID')
    // console.log(newUser.user.uid)

    // console.log('check the user here in the firebase class')
    // console.log(user.uid)
    //
    // this.db.collection('users').doc(newUser.user.uid).update({
    //   'userId': newUser.use.uid
    // });

    // await this.db.collection('users').doc(user.uid).update({
    //   'savedRecipes': recipe.name
    // });


    // return await newUser.user.updateProfile({
    //   displayName: name
    // })
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }

  async getStorageRef() {
    return await this.storage.ref()
  }

  async resetPassword(email) {
    console.log('hello?')
    await this.auth.sendPasswordResetEmail(email)
  }
}

const firebase = new Firebase()
export default firebase
