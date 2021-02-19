import Layout from '../components/layout'
import RecipeForm from '../components/RecipeForm'

export default function CreateRecipe() {

  return (
    <Layout>
      <RecipeForm mode="add" recipe={null} id={null}/>
    </Layout>
  )
}
