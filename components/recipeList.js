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
    alert('snapshot executes')
    const recipes = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setRecipes(recipes)
    setBaseResults(recipes)
  }

  function updateTags(tag) {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
      updateRecipeList([...tags, tag])
    } else {
      alert('you already have that tag')
    }
  }

  function updateRecipeList(activeTags) {
    // console.log('in updaterecipelist, activeTags: ')
    // console.log(activeTags)
    if (activeTags.length === 1) {
      if (baseQuery === null) {
        //set baseQuery
        setBaseQuery(activeTags[0])
      } else if (activeTags[0] === baseQuery) {
        //its the same ... so don't do anything
      }
      firebase.db.collection('recipes').where("tags", "array-contains", activeTags[0]).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    } else if (activeTags.length === 0) {
      alert('no tags dawg')
      setRecipes([...baseResults])
      setBaseQuery(null)
    } else {
      alert('im running right?')
      let filteredRecipes = []
      baseResults.forEach(recipe => {
        if (recipe.tags.includes(activeTags[activeTags.length - 1])) {
          filteredRecipes.push(recipe)
        }
      })
      setRecipes(filteredRecipes)
    }
    window.scrollTo(0,0)
  }

  function handleRemoveTag(tag) {
    // console.log(tags)

    let filteredTags = []
    tags.forEach((t) => {
      if (t !== tag) {
        filteredTags.push(t)
      }
    })

    // console.log(filteredTags)

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
      {console.log('baseResults: ')}
      {console.log(baseResults)}
      <TagWidget tags={tags} handleRemoveTag={handleRemoveTag} />
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
