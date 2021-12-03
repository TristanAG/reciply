import React from 'react'

function tagWidget({ tags, handleRemoveTag }) {

  const [ activeTags, setActiveTags ] = React.useState([])

  React.useEffect(() => {
    setActiveTags(tags)
  }, [tags])


  return(
    <div className="tag-widget">
      <div className="text-input">
        <input className="input is-primary" type="text" placeholder="Add Tag, Recipe Name, Type of Cuisine or Ingredient" style={{"maxWidth":"100%"}}/>
      </div>

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
      `}</style>
    </div>
  )
}

export default tagWidget;
