import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'
import firebase from '../../firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

export default function LoginForm() {
  const router = useRouter()
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)

  const [login, setLogin] = React.useState(true)
  const [firebaseError, setFirebaseError] = React.useState(null)

  async function authenticateUser() {
    const { name, email, password} = values
    try {

      // login
      //   ? await firebase.login(email, password)
      //   : await firebase.register(name, email, password)

      if (login) {
        await firebase.login(email, password)
      } else {
        // await firebase.register(name, email, password)
        let result = await firebase.register(name, email, password); // wait until the promise resolves (*)

        console.log('R E S U L T')
        console.log(result)

        firebase.db.collection('users').add({
          name: name,
          email: email
        })

        // let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 2000)
        // });


      }

      router.push('/')
    } catch(err) {
      console.error('Authentication Error', err)
      setFirebaseError('[' + err.code + '] ' + err.message)
    }

  }

  return (
      <div>
        <form onSubmit={handleSubmit}>

          <div className="content">
            <h2>{login ? "login page" : "create account"}</h2>
          </div>

          <div className="columns">
            <div className="column is-three-fifths">
              {!login &&
                <>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    value={values.name}
                    type="text"
                    placeholder="Your name"
                    autoComplete="off"
                    className="input"
                  />
                  <br />
                </>
              }
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                type="email"
                value={values.email}
                placeholder="Your email"
                autoComplete="off"
                className={errors.email ? "input is-danger" : "input"}
              />
              {errors.email && <p className="help is-danger">{errors.email}</p>}
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                value={values.password}
                placeholder="Choose a secure password"
                autoComplete="off"
                className={errors.password ? "input is-danger" : "input"}
              />
              {errors.password && <p className="help is-danger">{errors.password}</p>}
              {firebaseError &&  <p className="help is-danger">{firebaseError}</p>}
              <div>
                <button
                  type="submit"

                  className={ isSubmitting ? 'button is-primary is-light' : 'button is-primary'}
                  disabled={isSubmitting}

                >
                  submit
                </button>
                <br />
                <button type="button" className="button" onClick={() => setLogin(prevLogin => !prevLogin)}> {login ? "need to create an account?" : "already have an account?"}</button>
              </div>
            </div>
          </div>
        </form>

        <div>
          <Link href="/forgot-password"><a>Forgot Password?</a></Link>
        </div>

        <style jsx>{`
          .input, button {
            margin-bottom: 8px;
          }
        `}</style>
      </div>
  )
}
