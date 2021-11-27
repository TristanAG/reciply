import React from 'react'

function tagWidget({ tag, updateRecipeList }) {

  const [ tags, setTags ] = React.useState([])

  React.useEffect(() => {
    let newTags = tags
    newTags.push(tag)

    //for initial element
    if (newTags[0] === 'default') {
      newTags.shift()
    } else {
      updateRecipeList(newTags)
    }

    if (newTags.length >= 1) {
      setTags(newTags)
    }
    
  }, [tag])


  return(
    <>
      <div style={{"width": "220px"}}><input className="input is-primary" type="text" placeholder="Primary input" style={{"max-width":"100%"}}/></div>
      <span>
        <div className="tags are-medium has-addons">
          {tags && tags.map(tag => (
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
