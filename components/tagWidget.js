import React from 'react'

function tagWidget({ tags, handleRemoveTag }) {

  const [ activeTags, setActiveTags ] = React.useState([])

  React.useEffect(() => {
    setActiveTags(tags)
  }, [tags])


  return(
    <div className="tag-widget">
      <div style={{"width": "220px"}}><input className="input is-primary" type="text" placeholder="Recipe, Cuisine, Ingredient" style={{"maxWidth":"100%"}}/></div>
      <span>
        <div className="tags are-medium has-addons">
          {activeTags && activeTags.map(tag => (
            <React.Fragment key={tag}>
              <span className="tag has-background-link-light">{tag}</span>
              <a className="tag is-delete" onClick={() => handleRemoveTag(tag)}></a>&nbsp;&nbsp;
            </React.Fragment>
          ))}
        </div>
      </span>

      <style jsx>{`

        .tag-widget {

        }
      `}</style>
    </div>
  )
}

export default tagWidget;
