import React from 'react'
import format from 'date-fns/format'
import Link from 'next/link'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'


function RecipeItem({ recipe, index, showCount, firebase, updateTags }) {
  const router = useRouter()
  const { user } = React.useContext(FirebaseContext)

  function deleteRecipe(recipe) {
    firebase.db.collection('recipes').doc(recipe.id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  function goToTag(tag) {
    updateTags(tag)
  }

  return(
    <div className="test">
      <div className="card">
        <div className="card-content">
          <p className="title is-4">{recipe.name}</p>
          <p className="subtitle is-6">
            <Link href={'/' + recipe.slug} >
              <a className="link">@{recipe.postedBy.name.split(' ').join('').toLowerCase()}</a>
            </Link>
            <br/><small><time datetime="2016-1-1">{format(recipe.created, 'MMMM do yyyy')}</time></small>
          </p>

        </div>
        {recipe.mainImage &&
          <div class="card-image">
            <figure class="image is-4by3" style={{ 'textAlign' : 'center' }}>
               <img src={recipe.mainImage} alt="Placeholder image" />
            </figure>
          </div>
        }
        <div className="card-content">
          <div className="content">
            {recipe.description &&
              <div className="media">
                <div className="media-content">
                  <p>{recipe.description}</p>
                </div>
              </div>
            }
            {recipe.tags && recipe.tags.map(tag => (
              <span className="tag has-background-link-light" onClick={() => goToTag(tag)}>{'#' + tag}</span>
            ))}
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

        .tag {
          margin-right: 8px;
        }
        .tag:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default RecipeItem;
