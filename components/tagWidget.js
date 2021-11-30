import React from 'react'

function tagWidget({ tags }) {

  const [ activeTags, setActiveTags ] = React.useState([])

  React.useEffect(() => {
    setActiveTags(tags)
  }, [tags])

  return(
    <>
      <div style={{"width": "220px"}}><input className="input is-primary" type="text" placeholder="Recipe, Cuisine, Ingredient" style={{"max-width":"100%"}}/></div>
      <span>
        <div className="tags are-medium has-addons">
          {activeTags && activeTags.map(tag => (
            <>
              <span className="tag has-background-link-light">{tag}</span>
              <a className="tag is-delete"></a>&nbsp;&nbsp;
            </>
          ))}
        </div>
      </span>

      <style jsx>{`
        .tag {
          margin-right: 8px;
        }
      `}</style>
    </>
  )
}

export default tagWidget;
