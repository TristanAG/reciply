import React from 'react'

function tagWidget({ tags, handleRemoveTag, updateTags }) {

  const [ activeTags, setActiveTags ] = React.useState([])
  const [ hasInput, setHasInput ] = React.useState(false)
  const [ inputText, setInputText ] = React.useState('')

  React.useEffect(() => {
    setActiveTags(tags)
  }, [tags])

  function handleInput(event) {
    setInputText(event.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    let tagGroup = inputText.split(' ')
    if (tagGroup.length >= 2) {
      updateTags(null, tagGroup)
    } else {
      updateTags(inputText)
    }

    setInputText('')
  }


  return(
    <div className="tag-widget">
      <form onSubmit={handleSubmit}>
        <div className="text-input control">
          <input
            className="input is-primary"
            type="text"
            onChange={handleInput}
            value={inputText}
            placeholder="Add Tag, Recipe Name, Type of Cuisine or Ingredient"

          />
        </div>

        <button className={inputText.length >= 1 ? "button is-primary" : "button disabled" } disabled={inputText.length >= 1 ? false : true} >Search</button>
      </form>



      <div className="tags are-medium has-addons">
        {activeTags && activeTags.map(tag => (
          <React.Fragment key={tag}>
            <span className="tag has-background-link-light">{tag}</span>
            <a className="tag is-delete" onClick={() => handleRemoveTag(tag)}></a>&nbsp;&nbsp;
          </React.Fragment>
        ))}
      </div>

      <style jsx>{`

        .tag-widget {

          width: 464px;
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .text-input {
          width: 270px;
          max-width: 100%;
          display: inline-block;
        }

        button {
          margin-left: 12px;
        }
      `}</style>
    </div>
  )
}

export default tagWidget;
