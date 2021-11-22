import React from 'react'

function tagWidget({ tag }) {

  React.useEffect(() => {
    setActiveTag(tag)
  }, [tag])

  const [ activeTag, setActiveTag ] = React.useState('')

  return(
    <>
      <div style={{"width": "220px"}}><input className="input is-primary" type="text" placeholder="Primary input" style={{"max-width":"100%"}}/></div>

      <span>
        {activeTag !== '' &&
          <>
            <div className="tags are-medium has-addons">
              <span className="tag has-background-link-light">#{activeTag}</span>
              <a className="tag is-delete"></a>
            </div>
          </>
        }
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
