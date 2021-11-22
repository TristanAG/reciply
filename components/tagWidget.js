import React from 'react'

function tagWidget({ tag }) {

  const [ tags, setTags ] = React.useState([])

  React.useEffect(() => {
    // setActiveTag(tag)

    console.log('running...')
    let newTags = tags
    newTags.push(tag)
    // console.log(newTags)

    //ok i gotta filter out all the empty values... that's the issue here
    //im pushing on a blank value, so nothing is outputting
    newTags.forEach(elem => {
      console.log('elem: ' + elem)
    })

    // console.log('newTags: ' + newTags)

    // newTags.push(tag)
    setTags(newTags)
    // setTags()
    // console.log(newTags)
  }, [tag])


  return(
    <>
      <div style={{"width": "220px"}}><input className="input is-primary" type="text" placeholder="Primary input" style={{"max-width":"100%"}}/></div>

      <span>
        <div className="tags are-medium has-addons">
          {tags && tags.map(tag => {
            <>
              {/* {console.log(tag)} */}
              <p>{tag}</p>
              <span className="tag has-background-link-light">#{tag}</span>
              <a className="tag is-delete"></a>
            </>
          })}
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
