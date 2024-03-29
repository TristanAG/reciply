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
    <div className="test">

      {/* <p className="has-text-dark">@{recipe.postedBy.name.split(' ').join('').toLowerCase()}</p>
      <p>{recipe.mainImage && <img src={recipe.mainImage} alt={recipe.name} className="thumbnail" />}</p>
      <p>
        <Link href={'/' + recipe.slug} >
          <a className="link">{recipe.name}</a>
        </Link>
      </p>

      <small>{format(recipe.created, 'MMMM Mo yyyy')}</small> */}



      <div className="card">
        <div className="card-content">
          <p className="title is-4">{recipe.name}</p>
          <p className="subtitle is-6">
            <Link href={'/' + recipe.slug} >
              <a className="link">@{recipe.postedBy.name.split(' ').join('').toLowerCase()}</a>
            </Link>
            {/* @{recipe.postedBy.name.split(' ').join('').toLowerCase()} */}
          </p>
        </div>
        <div class="card-image">
          <figure class="image is-4by3">
            {recipe.mainImage && <img src={recipe.mainImage} alt="Placeholder image" />}
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            {/* <div clclassNameass="media-left">
              <figure className="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>
            </div> */}
            <div className="media-content">
              {/* <p className="title is-4">{recipe.name}</p> */}
              {/* <p className="subtitle is-6">@{recipe.postedBy.name.split(' ').join('').toLowerCase()}</p> */}
              the content goes here...
            </div>
          </div>

          <div clasclassNames="content">
            <Link href={'/' + recipe.slug} >
              <a className="link">{recipe.name}</a>
            </Link>
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br />
            <small><time datetime="2016-1-1">{format(recipe.created, 'MMMM Mo yyyy')}</time></small>
          </div>
        </div>
      </div>



      <style jsx>{`
        .edit-button:hover {
          cursor: pointer;
        }

        .card {
          margin-top: 30px;
          margin-bottom: 30px;
          width: 500px;
          margin-right: auto;
          margin-left: auto;
        }

        .thumbnail {
          width: 220px;

        }





      `}</style>
    </div>
  )
}

export default RecipeItem;
