import React from 'react'

function tagWidget({ tags, handleRemoveTag }) {

  const [ activeTags, setActiveTags ] = React.useState([])

  React.useEffect(() => {
    setActiveTags(tags)
  }, [tags])


  return(
    <div className="tag-widget">
      <div className="text-input control has-icons-right">
        <input className="input is-primary" type="text" placeholder="Add Tag, Recipe Name, Type of Cuisine or Ingredient" style={{"maxWidth":"100%"}}/>
        <span className="icon is-small is-right">
          <i className="fas fa-check"></i>
        </span>
      </div>

      {/* alright, so search can work as follows: when text input is empty state is noText === true or something like that
        and as soon as you enter some text, set noText to false (whatever i call it) and then we will add the class is-primary to make the button appear to be searchable

        and also building that sorta text slider that shows examples of queries... cycles through them
        how can i truly do that in a clever way that makes it really stand out?

         */}

      <button className="button is-primary">Search</button>


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
