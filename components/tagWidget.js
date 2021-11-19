import React from 'react'

function tagWidget({ tag }) {

  React.useEffect(() => {
    console.log('hello')
    setActiveTag(tag)
  }, [tag])

  const [ activeTag, setActiveTag ] = React.useState('')

  return(
    <>
      {/* {activeTag && <p>{activeTag}</p>} */}
      {/* <p>tag widget</p> */}

      <span>
        {activeTag !== 'hello' &&

          // <span className="tag is-warning is-medium">
          //   #{activeTag}
          //   <button className="delete is-small"></button>
          // </span>

          <div className="tags are-medium has-addons">
            <span className="tag is-info">#{activeTag}</span>
            <a className="tag is-delete"></a>
          </div>
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
