import Layout from '../components/layout'

export default function CreateRecipe() {
  return (
    <Layout>
      <div className="columns">
        <div className="column is-three-fifths">
          <div className="content">
            <h3>create recipe page</h3>
          </div>
          <input
            type="text"
            placeholder="Recipe Name"
            className="input"
          />

          <div>
            <button className="button">Add Recipe</button>
          </div>
          <br />
          {/* {isPasswordReset && <p className="has-text-success">Check email to reset password 👍</p>}
          {passwordResetError && <p className="has-text-danger">{passwordResetError}</p>} */}
        </div>
      </div>
    </Layout>
  )
}
