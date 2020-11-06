import FirebaseContext from '../../firebase/context'

export default function ForgotPasswordForm() {
  const { firebase } = React.useContext(FirebaseContext)
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState('')
  const [isPasswordReset, setIsPasswordReset] = React.useState(false)
  const [passwordResetError, setIsPasswordResetError] = React.useState(null)

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail)
      setIsPasswordReset(true)
      setIsPasswordResetError(null)
    } catch (err) {
      console.error("Error sending email", err)
      setIsPasswordResetError(err.message)
      setIsPasswordReset(false)
    }
  }

  return (
    <div className="columns">
      <div className="column is-three-fifths">
        <div className="content">
          <h2>Forgot password?</h2>
          <p>No problem - Enter your email address to reset your password</p>
        </div>
        <input
          type="email"
          placeholder="Provide your email address"
          className="input"
          onChange={event => setResetPasswordEmail(event.target.value) }
        />

        <div>
          <button onClick={handleResetPassword} className="button">Reset Password</button>
        </div>
        <br />
        {isPasswordReset && <p className="has-text-success">Check email to reset password 👍</p>}
        {passwordResetError && <p className="has-text-danger">{passwordResetError}</p>}
      </div>
    </div>
  )
}
