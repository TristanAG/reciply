import useFormValidation from './useFormValidation'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

export default function LoginForm() {
  // const { handleSubmit, handleChange, values } = useFormValidation(INITIAL_STATE)
  const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE)
  const [login, setLogin] = React.useState(true)

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="content">
            <h2>{login ? "login page" : "create account"}</h2>
          </div>

          <div class="columns">
            <div class="column is-three-fifths">
              {!login &&
                <>
                  <input
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    type="text"
                    placeholder="Your name"
                    autocomplete="off"
                    className="input"
                  />
                  <br />
                </>
              }
              <input
                onChange={handleChange}
                name="email"
                type="email"
                value={values.email}
                placeholder="Your email"
                autocomplete="off"
                className="input"
              />
              <input
                onChange={handleChange}
                name="password"
                type="password"
                value={values.password}
                placeholder="Choose a secure password"
                autocomplete="off"
                className="input"
              />
              <div>
                <button type="submit" className="button test">submit</button><br />
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
