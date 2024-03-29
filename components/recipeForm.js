import useFormValidation from '../components/auth/useFormValidation'
import validateCreateRecipe from '../components/auth/validateCreateRecipe'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const INITIAL_STATE = {
  name: "",
  steps: "",
  ingredientFields: []
}

export default function RecipeForm({ mode, recipe, id }) {

  const { firebase, user } = React.useContext(FirebaseContext)



  const router = useRouter()

  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateRecipe, handleCreateRecipe)

  const [activeTab, setActiveTab] = useState('recipe')

  const [ ingredientFields, setIngredientFields ] = useState([{ ingredientName: '', ingredientQuantity: '' }])
  const [ stepFields, setStepFields ] = useState([{ stepContent: '' }])
  const [ tags, setTags ] = useState([])
  const [ hasInput, setHasInput ] = React.useState(false)
  const [ inputText, setInputText ] = React.useState('')

  const [ mainImage, setMainImage ] = useState(null)

  useEffect(() => {

    if (mode === 'edit' && recipe) {
      console.log('edit mode')
      console.log(recipe)
      values.name = recipe.name
      values.steps = recipe.steps
      values.source = recipe.source
      values.sourceUrl = recipe.sourceUrl
      values.imageSource = recipe.imageSource
      values.imageSourceUrl = recipe.imageSourceUrl
      values.description = recipe.description
      // values.mainImage = recipe.mainImage
      setMainImage(recipe.mainImage)
      setIngredientFields(recipe.ingredients)
      setStepFields(recipe.steps)
      setTags(recipe.tags)
    }
  }, [mode, recipe])

  const handleAddIngredientFields = () => {
    const values = [...ingredientFields];
    values.push({ ingredientName: '', ingredientQuantity: '' });
    setIngredientFields(values);
    console.log('added ingredient field')
  }

  const handleAddStepFields = () => {
    const values = [...stepFields];
    values.push({ stepContent: '' });
    setStepFields(values);
  }

  const handleRemoveIngredientFields = index => {
    const values = [...ingredientFields];
    values.splice(index, 1);
    setIngredientFields(values);
  }

  const handleIngredientChange = (index, event) => {
    const values = [...ingredientFields];
    if (event.target.name === "ingredientName") {
      values[index].ingredientName = event.target.value;
    } else {
      values[index].ingredientQuantity = event.target.value;
    }

    setIngredientFields(values);
  };

  const handleStepChange = (index, event) => {
    const values = [...stepFields];
    if (event.target.name === "stepContent") {
      values[index].stepContent = event.target.value;
    } else {
      values[index].stepCount = event.target.value;
    }

    setStepFields(values);
  };

  function handleCreateRecipe() {
    const { name, source, sourceUrl, imageSource, imageSourceUrl, description } = values

    const recipe = {
      name,
      source,
      sourceUrl,
      imageSource,
      imageSourceUrl,
      description,
      steps: stepFields,
      ingredients: ingredientFields,
      tags: tags,
      postedBy: {
        id: user.uid,
        name: user.displayName
      },
      mainImage,
      likes: [],
      slug: name.split(' ').join('-').toLowerCase(),
      created: Date.now()
    }

    if (mode === 'add') {
      AddNewRecipe(recipe)
    } else {
      UpdateRecipe(recipe)
    }

  }

  function AddNewRecipe(recipe) {
    firebase.db.collection('recipes').add(recipe)
    router.push('/')
  }

  function UpdateRecipe(recipe) {
    firebase.db.collection('recipes').doc(id).update(recipe);
    router.push('/')
  }

  function onFileChange(e) {
    const file = e.target.files[0]
    const storageRef = firebase.storage.ref()
    const fileRef = storageRef.child(file.name)
    fileRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log("File available at", downloadURL);
        setMainImage(downloadURL)
      });
    })

    // const fileRef = firebase.getStorageRef(file.name)
    // fileRef.put(file).then(() => {
    //   console.log('uploaded file')
    // })
  }

  function handleInput(event) {
    setInputText(event.target.value)
  }

  function handleAddTag(x) {
    // alert(inputText)
    // let currentTags = tags
    // // const result = currentTags.concat(tagGroup)
    // // console.log(result)


    let tagGroup = inputText.split(' ')
    if (tagGroup.length >= 2) {
      updateTags(null, tagGroup)
    } else {
      updateTags(inputText)
    }

    setInputText('')
  }

  function updateTags(tag, tagGroup) {
    console.log('TEST')
    console.log('here is the tag in updateTags:')
    console.log(tag)
    console.log('here is the taggroup in updateTags:')
    console.log(tagGroup)
    if (tagGroup === undefined) {
      if (!tags.includes(tag)) {
        setTags([...tags, tag.toLowerCase()])
        // updateRecipeList([...tags, tag])
      } else {
        alert('you already have that tag')
      }
    } else {

      let currentTags = tags

      let formattedTags = []

      tagGroup.forEach((t) => {
        if (t.length !== 0) {
          formattedTags.push(t.toLowerCase())
        }
      })

      console.log(formattedTags)

      const result = currentTags.concat(formattedTags)
      setTags(result)
      // updateRecipeList(result)
    }
  }

  function handleRemoveTag(tag) {

    let filteredTags = []
    tags.forEach((t) => {
      if (t !== tag) {
        filteredTags.push(t)
      }
    })

    setTags(filteredTags)
  }

  function convertToTags(e) {
    let tagGroup = e.target.value.split(' ')
    console.log('in convert tags')
    console.log(tagGroup)
    if (tagGroup.length >= 2) {
      updateTags(null, tagGroup)
    } else {
      console.log('single update')
      console.log(tagGroup.length)
      e.target.value.length !== 0 && updateTags(e.target.value)
    }
  }

  return (
    <>
      {/* <div className="columns">
        <div className="column">
          <div className="card has-background-info-light">
            <div className="card-content">
              <div className="content">
                <b className="has-text-info">Recipe Context Info</b>
                <ul>
                  <li>MODE /// {mode && <b className="has-text-success">{mode}</b>}</li>
                  <li>S L U G /// {recipe && <b className="has-text-success">{recipe.slug}</b>}</li>
                  <li>ID /// <b className="has-text-success">{id}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="columns">
        <div className="column is-three-fifths col-mod">
          <div className="content">
            {mode === 'edit' ? <h2>Edit Recipe</h2> : <h2>New Recipe</h2>}
            <small><i>recipe url:</i> reciply.app/{values.name.split(' ').join('-').toLowerCase()}</small>
          </div>

          {!user && <p className="has-text-danger">must be logged in to post a recipe</p>}

          {user &&
            <>
              <div className="tabs">
                <ul>
                  <li className={activeTab === 'recipe' && 'is-active'} onClick={() => setActiveTab('recipe')}><a>recipe</a></li>
                  <li className={activeTab === 'ingredients' && 'is-active'} onClick={() => setActiveTab('ingredients')}><a>ingredients</a></li>
                  <li className={activeTab === 'steps' && 'is-active'} onClick={() => setActiveTab('steps')}><a>steps</a></li>
                  <li className={activeTab === 'tags' && 'is-active'} onClick={() => setActiveTab('tags')}><a>tags</a></li>
                </ul>
              </div>

              <form onSubmit={handleSubmit}>
                {activeTab === 'recipe' &&
                <>
                  <label className="label">Recipe Name</label>
                  <input
                    onChange={handleChange}
                    onBlur={convertToTags}
                    value={values.name}
                    name="name"
                    type="text"
                    placeholder="Recipe Name"
                    className="input"
                    autoComplete="off"
                  />
                  {errors.name && <p className="has-text-danger">{errors.name}</p>}

                  <label className="label">Recipe Source</label>
                  <input
                    onChange={handleChange}
                    value={values.source}
                    name="source"
                    type="text"
                    placeholder="Recipe Source"
                    className="input"
                    autoComplete="off"
                  />
                  {errors.source && <p className="has-text-danger">{errors.source}</p>}

                  <label className="label">Recipe Source URL</label>
                  <input
                    onChange={handleChange}
                    value={values.sourceUrl}
                    name="sourceUrl"
                    type="text"
                    placeholder="Recipe Source URL"
                    className="input"
                    autoComplete="off"
                  />
                  {errors.sourceUrl && <p className="has-text-danger">{errors.sourceUrl}</p>}



                  <div className="file">
                    <label className="file-label">
                      <input className="file-input" type="file" onChange={onFileChange} />
                      <span className="file-cta">
                        <span className="file-icon">
                          {/* <i className="fas fa-upload"></i> */}
                          📷
                        </span>
                        <span className="file-label">
                          Upload Image
                        </span>
                      </span>
                    </label>
                  </div>
                  {mainImage && <img src={mainImage} alt={name} className="main-image"/>}

                  <label className="label">Image Source</label>
                  <input
                    onChange={handleChange}
                    value={values.imageSource}
                    name="imageSource"
                    type="text"
                    placeholder="Image Source"
                    className="input"
                    autoComplete="off"
                  />
                  {errors.imageSource && <p className="has-text-danger">{errors.imageSource}</p>}


                  <label className="label">Image Source URL</label>
                  <input
                    onChange={handleChange}
                    value={values.imageSourceUrl}
                    name="imageSourceUrl"
                    type="text"
                    placeholder="Image Source"
                    className="input"
                    autoComplete="off"
                  />
                  {errors.imageSourceUrl && <p className="has-text-danger">{errors.imageSourceUrl}</p>}

                  <label className="label">Description</label>
                  <textarea
                    className="textarea"
                    placeholder="Description"
                    onChange={handleChange}
                    value={values.description}
                    id="description"
                    name="description"
                    type="text"
                  />
                  {errors.description && <p className="has-text-danger">{errors.description}</p>}
                </>
                }

                {/* <div className="tabs">
                  <ul>
                    <li className={activeTab === 'ingredients' && 'is-active'} onClick={() => setActiveTab('recipe')}><a>recipe</a></li>
                    <li className={activeTab === 'ingredients' && 'is-active'} onClick={() => setActiveTab('ingredients')}><a>ingredients</a></li>
                    <li className={activeTab === 'steps' && 'is-active'} onClick={() => setActiveTab('steps')}><a>steps</a></li>
                  </ul>
                </div> */}


                {activeTab === 'ingredients' &&
                  <>
                    <div className="content">
                      <h4>Ingredients</h4>
                    </div>

                    <div>
                      {ingredientFields.map((ingredientField, index) => (
                        <div key={`${ingredientField}~${index}`} >
                          <div className="ingredient-item">
                            <div className="columns">
                              <div className="column is-two-fifths">
                                <input
                                  className="input"
                                  placeholder="Ingredient"
                                  id="ingredientName"
                                  name="ingredientName"
                                  value={ingredientField.ingredientName}
                                  onChange={event => handleIngredientChange(index, event)}
                                  onBlur={convertToTags}
                                />
                              </div>
                              <div className="column">
                                <input
                                  className="input"
                                  placeholder="Amount / Quantity"
                                  type="text"
                                  id="ingredientQuantity"
                                  name="ingredientQuantity"
                                  value={ingredientField.ingredientQuantity}
                                  onChange={event => handleIngredientChange(index, event)}
                                />
                                <div className="has-text-right">
                                  <a className="has-text-danger" onClick={() => handleRemoveIngredientFields(index)}><b>x</b></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="has-text-right">
                      <div className="button add-ingredient-button is-primary" onClick={() => handleAddIngredientFields()}>Add Ingredient</div>
                    </div>
                  </>
                }

                {activeTab === 'steps' &&
                  <>
                    <div className="content">
                      <h4>Steps</h4>
                    </div>
                    {/* <input
                      onChange={handleChange}
                      value={values.steps}
                      name="steps"
                      type="text"
                      placeholder="Recipe Steps"
                      className="input"
                      autoComplete="off"
                    /> */}
                    {/* <textarea
                      className="textarea"
                      placeholder="e.g. Hello world"
                      onChange={handleChange}
                      value={values.steps}
                      name="steps"
                      type="text"
                    >
                    </textarea> */}




                    <div>
                      <p><small>steps: {stepFields.length}</small></p>
                      {stepFields.map((stepField, index) => (
                        <div key={`${stepField}~${index}`} >
                          <div className="step-item">
                            <div className="columns">
                              <div className="column">
                                <textarea
                                  className="textarea"
                                  placeholder="boil water..."
                                  onChange={handleChange}
                                  value={stepField.stepContent}
                                  id="stepContent"
                                  name="stepContent"
                                  onChange={event => handleStepChange(index, event)}
                                  type="text"
                                >
                                </textarea>

                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* {errors.steps && <p className="has-text-danger">{errors.steps}</p>} */}
                    <div className="has-text-right">
                      <div className="button add-ingredient-button is-primary" onClick={() => handleAddStepFields()}>Add Step</div>
                    </div>
                  </>
                }

                {activeTab === 'tags' &&
                  <>
                    <div className="content">
                      <h4>Tags</h4>
                    </div>
                    <p><i>Note: Add relevant tags to help your recipe get discovered</i></p>
                    <div className="text-input control has-icons-right" style={{"width":"300px","maxWidth":"100%"}}>
                      <input
                        className="input is-primary"
                        type="text"
                        onChange={handleInput}
                        value={inputText}
                        placeholder="Add Tag, Recipe Name, Type of Cuisine or Ingredient"
                      />
                      <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                      </span>
                    </div>

                    <button
                      className={inputText.length >= 1 ? "button is-primary" : "button disabled" }
                      disabled={inputText.length >= 1 ? false : true}
                      onClick={handleAddTag}
                      style={{"marginLeft":"27px"}}>
                        Add Tag
                    </button>

                    {/* <div>
                      {tags.map(tag => (
                        <div key={`${tag}`} >
                          <p>{tag}</p>
                        </div>
                      ))}
                    </div> */}

                    <div className="tags are-medium has-addons">
                      {tags && tags.map(tag => (
                        <React.Fragment key={tag}>
                          <span className="tag has-background-link-light">{tag}</span>
                          <a className="tag is-delete" onClick={() => handleRemoveTag(tag)}></a>&nbsp;&nbsp;
                        </React.Fragment>
                      ))}
                    </div>

                    {/* <div className="has-text-right">
                      <div className="button add-tag-button is-primary" onClick={() => handleAddTag()}>Add Tag</div>
                    </div> */}
                  </>
                }



                <br/>

                <hr />

                <div className="add-button">
                  {mode === 'edit' ? <button className="button">Edit Recipe</button> : <button className="button">Add Recipe</button>}
                </div>
              </form>
            </>
          }
        </div>
        <div className="column">
          {/* <pre>
            {JSON.stringify(ingredientFields, null, 2)}
          </pre> */}
          {ingredientFields && ingredientFields.map((ingredient => {
            return ingredient.ingredientName && <p>{ingredient.ingredientName} | {ingredient.ingredientQuantity}</p>
          }))}
        </div>
      </div>

      <style jsx>{`
        .add-button {
          margin-top: 20px;
        }
        .add-ingredient-button {
          margin-top: 12px;
          margin-bottom: 12px;
        }
        .main-image {
          width: 300px;
          max-width: 100%;
        }

        .text-input {
          width: 343px;
          display: inline-block;
        }
      `}</style>
    </>
  )
}
