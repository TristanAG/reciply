import React from 'react'

function tagWidget({ tag, updateRecipeListMulti }) {

  const [ tags, setTags ] = React.useState([])

  React.useEffect(() => {
    let newTags = []
    newTags.push(tag)
    let fixedTags = newTags.concat(tags)

    //for initial element
    if (fixedTags[0] === 'default') {
      fixedTags.shift()
    } else {
      updateRecipeListMulti(fixedTags)
    }

    if (newTags.length >= 1) {
      setTags(fixedTags)
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
