import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

export default function LoginForm() {
  // const { handleSubmit, handleChange, values } = useFormValidation(INITIAL_STATE)
  const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(
    INITIAL_STATE,
    validateLogin
  )
  const [login, setLogin] = React.useState(true)

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

        <style jsx>{`
          .input, button {
            margin-bottom: 8px;
          }
        `}</style>
      </div>
  )
}
