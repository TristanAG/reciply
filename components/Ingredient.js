import React from 'react'
import { useEffect, useState } from 'react'

function Ingredient(props) {

  //define the fields
  const [inputFields, setInputFields] = useState([
    { firstName: '', lastName: '' }
  ]);

  //handleAddFields will place the new entries on to the values array, at index
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: '', lastName: '' });
    setInputFields(values);
  };

  //just like handleAdd, it will delete at index... so it is attached to the button, and whenever you need to delete a single ingredient it's super easy to do so
  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  //makes it a controlled field, basically, at the specific index (the field you are on) it will edit that one, this one accounts for only 2 fields
  //i bet this can be refined.... there is this syntax that just takes the name of the field and lets you use it event.target.name]: event.target.value
  //well im not certain, this is fine for now...
  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "firstName") {
      values[index].firstName = event.target.value;
    } else {
      values[index].lastName = event.target.value;
    }

    //use the hook to update the value
    setInputFields(values);
  };

  // just does a console out now
  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  return (
    <>
        <h1>Dynamic Form Fields in React</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {inputFields.map((inputField, index) => (
              <div key={`${inputField}~${index}`} >
                <div className="form-group col-sm-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={inputField.firstName}
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={inputField.lastName}
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
                <div className="form-group col-sm-2">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                  {/* <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleAddFields()}
                  >
                    +
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="submit-button">
            <button
              className="btn btn-primary mr-2"
              type="submit"
              onSubmit={handleSubmit}
            >
              Save
            </button>
          </div> */}
          <br/>
          <pre>
            {JSON.stringify(inputFields, null, 2)}
          </pre>
        </form>
      </>
  )




//   return (
//     <div className="ingredient">
//       <div className="columns">
//         <div className="column is-two-fifths">
//           <input className="input" placeholder="Amount / Quantity of ingredient" />
//         </div>
//         <div className="column">
//           <input className="input" placeholder="Ingredient" />
//         </div>
//       </div>
//
//
//
//       <style jsx>{`
//
//       `}</style>
//     </div>
//   )
// }

}

export default Ingredient
