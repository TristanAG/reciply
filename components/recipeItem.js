import React from 'react'
import format from 'date-fns/format'
import Link from 'next/link'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'


function RecipeItem({ recipe, index, showCount, firebase }) {
  const router = useRouter()
  const { user } = React.useContext(FirebaseContext)

  function deleteRecipe(recipe) {
    firebase.db.collection('recipes').doc(recipe.id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  return(
    <div>
      <hr />
      <p>
        <Link href={'/' + recipe.slug} >
          <a><b>{recipe.name}</b></a>
        </Link>
        {/* <b>{recipe.name}</b> */}
      </p>
      <p className="has-text-dark">@{recipe.postedBy.name.split(' ').join('').toLowerCase()}</p>
      <small>{format(recipe.created, 'MMMM Mo yyyy')}</small>
      {/* {user.displayName === recipe.postedBy.name ?


        <p>
          <Link href={'/' + recipe.slug + '/edit'}>
            <a className="has-text-grey link">edit</a>
          </Link>
          &nbsp;|&nbsp;
          <span className="has-text-danger edit-button link" onClick={() => deleteRecipe(recipe)}>delete</span>
        </p>
        :
        <>
        </>

      } */}
      <style jsx>{`
        .edit-button:hover {
          cursor: pointer;
        }

        .link {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default RecipeItem;
