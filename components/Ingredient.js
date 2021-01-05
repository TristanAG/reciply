import React from 'react'

function Ingredient(props) {
  return (
    <div className="ingredient">
      <div className="columns">
        <div className="column is-two-fifths">
          <input className="input" placeholder="Amount / Quantity of ingredient" />
        </div>
        <div className="column">
          <input className="input" placeholder="Ingredient" />
        </div>
      </div>



      <style jsx>{`

      `}</style>
    </div>
  )
}



export default Ingredient
