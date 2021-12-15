import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'
import Link from 'next/link'
import TagWidget from './tagWidget'

export default function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])
  const [tags, setTags] = React.useState([])
  const [baseResults, setBaseResults] = React.useState([])
  const [baseQuery, setBaseQuery] = React.useState(null)
  const [modal, setModal] = React.useState(false)

  React.useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes() {
    const theRecipes = firebase.db.collection('recipes').orderBy('created', 'desc').onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const recipes = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setRecipes(recipes)

    if (baseResults.length === 0) {
      setBaseResults(recipes)
    }
  }

  function updateTags(tag, tagGroup) {
    if (tagGroup === undefined) {
      if (!tags.includes(tag)) {
        setTags([...tags, tag])
        updateRecipeList([...tags, tag])
      } else {
        alert('you already have that tag')
      }
    } else {

      let currentTags = tags
      const result = currentTags.concat(tagGroup)
      setTags(result)
      updateRecipeList(result)
    }
  }

  function updateRecipeList(activeTags) {
    switch (activeTags.length) {
      case 0: //init
        setRecipes(baseResults)
        setBaseQuery(null)
        setRecipes(baseResults)
        break;
      case 1: //initial query
        if (baseQuery === null) {
          setBaseQuery(activeTags[0])
        }
        firebase.db.collection('recipes').where("tags", "array-contains", activeTags[0]).orderBy('created', 'desc').onSnapshot(handleSnapshot)
        break;
      default: //every other query > 1
        if (baseQuery === null) {
          setBaseQuery(activeTags[0])
          firebase.db.collection('recipes').where("tags", "array-contains-any", activeTags).orderBy('created', 'desc').onSnapshot(handleSnapshot)
        } else {
          let filteredRecipes = []
          recipes.forEach(recipe => {
            if (recipe.tags.includes(activeTags[activeTags.length - 1])) {
              filteredRecipes.push(recipe)
            }
          })
          setRecipes(filteredRecipes)
        }
    }
    window.scrollTo(0,0)
  }


  function handleRemoveTag(tag) {

    let filteredTags = []
    tags.forEach((t) => {
      if (t !== tag) {
        filteredTags.push(t)
      }
    })

    setTags(filteredTags)
    updateRecipeList(filteredTags)
  }

  return (
    <>
      {/* <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
          <p class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="" />
          </p>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>

      <article className="message is-warning">
        <div className="message-header">
          <p>Warning</p>
          <button className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
        </div>
      </article> */}
      <TagWidget tags={tags} handleRemoveTag={handleRemoveTag} updateTags={updateTags}/>
      <div>
        {recipes && recipes.map((recipe, index) => (
          <RecipeItem
            key={recipe.id}
            showCount={true}
            recipe={recipe}
            index={index + 1}
            firebase={firebase}
            updateTags={updateTags}
          />
        ))}
      </div>
    </>
  )
}
