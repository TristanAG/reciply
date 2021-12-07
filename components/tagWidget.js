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

  function handleQuery() {

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
      <div className="text-input control has-icons-right">
        <input
          className="input is-primary"
          type="text"
          onChange={handleInput}
          value={inputText}
          placeholder="Add Tag, Recipe Name, Type of Cuisine or Ingredient"
          style={{"maxWidth":"100%"}}
        />
        <span className="icon is-small is-right">
          <i className="fas fa-check"></i>
        </span>
      </div>

      <button className={inputText.length >= 1 ? "button is-primary" : "button disabled" } disabled={inputText.length >= 1 ? false : true} onClick={() => handleQuery()}>Search</button>

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
          margin-left: auto;
          margin-right: auto;
        }

        .text-input {
          width: 343px;
          display: inline-block;
        }

        button {
          margin-left: 27px;
        }
      `}</style>
    </div>
  )
}

export default tagWidget;
