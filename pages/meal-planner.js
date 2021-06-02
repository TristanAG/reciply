import Layout from '../components/layout'
import Firebase from '../firebase/firebase'
import { FirebaseContext } from '../firebase'
import Link from 'next/link'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function MealPlanner() {

  const { user, firebase } = React.useContext(FirebaseContext)

  const today = new Date()
  const day = today.getDay()
  const currentMonth = today.getMonth() + 1

  let currentDay = ''
  for (let i in WEEKDAYS) {
    if (i == day) {
      currentDay = WEEKDAYS[i]
    }
  }

  const [ dayOfWeekText, setDayOfWeekText ] = React.useState(currentDay + ' ' + currentMonth + ' / ' + String(today.getDate()).padStart(2, '0'))
  const [ currentWeekDatesArray, setCurrentWeekDatesArray ] = React.useState([])
  const [ dayOfWeekInt, setDayOfWeek ] = React.useState(day)
  const [ selected, setSelected ] = React.useState(day)
  const [ mealPlanWeekRef, setMealPlanWeekRef ] = React.useState('')
  const [ savedMealsByDay, setSavedMealsByDay ] = React.useState(null)
  const [ displayModal, setDisplayModal ] = React.useState(false)
  const [ recipes, setRecipes ] = React.useState(false)
  const [ savedRecipes, setSavedRecipes ] = React.useState(null)
  const [ weekPreview, setWeekPreview ] = React.useState([0,0,0,0,0,0,0])

  // React.useEffect(() => {
  //   savedMealsByDay && console.log(savedMealsByDay)
  // },[savedMealsByDay])

  // React.useEffect(() => {
  //   setSelected(selected)
  // },[selected])

  React.useEffect(() => {
    let diff = dayOfWeekInt - selected
    setDayOfWeekText(WEEKDAYS[selected])
  },[selected])

  React.useEffect(() => {

    //generate calendar current week view based on today
    let arr = []
    const startWeekIndex = day * -1
    let beginningOfWeekRef = null
    let endOfWeekRef = null

    for (let i = startWeekIndex; i <= startWeekIndex + 6; i++) {
      const currentDate = new Date()
      const newDate = currentDate.setDate(currentDate.getDate() + i)

      let indexRef = new Date(newDate)

      arr.push(indexRef)

      if (i === startWeekIndex) {
        beginningOfWeekRef = buildMealPlanWeekRef(indexRef)
      } else if (i === startWeekIndex + 6) {
        endOfWeekRef = buildMealPlanWeekRef(indexRef)
      }
    }

    setMealPlanWeekRef(beginningOfWeekRef + '-' + endOfWeekRef)
    setCurrentWeekDatesArray(arr)
  },[dayOfWeekInt])

  React.useEffect(() => {
    if (mealPlanWeekRef && user) {
      let savedMealsByDay = []
      firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').where('ref', '==', mealPlanWeekRef).get().then((querySnapshot) => {
        let i = 0
        querySnapshot.forEach((doc) => {
          setSavedMealsByDay(doc.data())
        })
      })

      //INIT SETUP
      //1345234524352345234523452345234523452346235462345
      //1345234524352345234523452345234523452346235462345
      //1345234524352345234523452345234523452346235462345
      getMealPlanWeekRef(mealPlanWeekRef)
    }
  }, [mealPlanWeekRef, user])

  function buildMealPlanWeekRef(ref) {
    ref = ref.toString().split(' ')
    ref = ref[1] + ref[2] + ref[3]

    return ref
  }

  //Modal -------------------------------------------------------------------------------------------------------------------

  function openAddModal(selected) {
    getRecipes()
    getSavedRecipes()
    setDisplayModal(true)
  }

  function getRecipes() {

    let myRecipes = []
    firebase.db.collection('recipes').where("postedBy.id", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          myRecipes.push(doc.data())
        });
        setRecipes(myRecipes)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  function getSavedRecipes() {
    let recipes = []
    firebase.db.collection('users').doc(user.uid).collection('savedRecipes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          recipes.push({
            name: doc.data().name,
            id: doc.id,
            slug: doc.data().slug,
            ingredients: doc.data().ingredients
          })
        });
        setSavedRecipes(recipes)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

  }

  function addToMealPlanWeekRef(savedRecipe) {
    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef);
    docRef.get().then((doc) => {
      if (doc.exists) {
        //UPDATE IF EXISTS
        updateMealPlanRef(savedRecipe)
      } else {
        //ADD NEW mealPlanWeekRef if no doc exists
        addNewMealPlanWeekRef(savedRecipe)
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  function addNewMealPlanWeekRef(savedRecipe) {
    firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef).set({
      ref: mealPlanWeekRef
    }).then(() => {
      console.log("Document successfully written!");
      updateMealPlanRef(savedRecipe)
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  function updateMealPlanRef(savedRecipe) {
    console.log('updateMealPlanRef')
    console.log(savedRecipe)

    firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef).collection('recipes').add({
      name: savedRecipe.name,
      slug: savedRecipe.slug,
      ingredients: savedRecipe.ingredients,
      dayInt: selected
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }

  function getMealPlanWeekRef(mealPlanWeekRef) {
    // TODO get the mealPlanWeekRef to get all your high level week snapshot stuff...
    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef);
    docRef.get().then((doc) => {
      if (doc.exists) {
        //UPDATE IF EXISTS
        // updateMealPlanRef(savedRecipe)

        console.log('skrrt')
        console.log(doc.data())
        //ok, so here now i need to fetch the recipes, right?
        // getSavedRecipes(doc.data())
        getRecipesInMealPlan(mealPlanWeekRef)
      } else {
        //ADD NEW mealPlanWeekRef if no doc exists
        // addNewMealPlanWeekRef(savedRecipe)
        alert('no hit!')
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

  }

  function getRecipesInMealPlan(mealPlanWeekRef) {

    let arr = [0,0,0,0,0,0,0]

    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef).collection('recipes');
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data().dayInt)
        var temp = arr[doc.data().dayInt]
        arr[doc.data().dayInt] = temp + 1



        //the loop needs to go through and sort the data, and it can be done in a single for loop or map
        //just 1 pass
        //the structure is like [0,0,0,0,0,0]
        //you know where you're at based on the index of the loop
        //and if that day corresponds to the dayInt, then that number gets placed there in an increment

        //something feels so amazing about this right now, listening to joseph jacobs 'beneath stars'
        //i first check
      });

      // console.log(arr)
      setWeekPreview(arr)

    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });


  }



  // End Modal -----------------------------------------------------------------------------------------------------------





  return (
    <Layout>
      <>
        <div className="content">
          <h3>Meal Planner</h3>

          <div className="container">
            <div className="is-pulled-left"><a>prevWeek</a></div>
            <div className="is-pulled-right"><a>nextWeek</a></div>
            <div className="is-clearfix" />
          </div>

          <div className="table-container">
            <table className="table is-bordered">
              <tbody>
                <tr>
                  {currentWeekDatesArray.length !== 0 && WEEKDAYS.map((day, i) => (
                    <td className={ dayOfWeekInt === i && "has-background-info-light is-active" || selected === i && "has-background-light" }
                      onClick={() => setSelected(i)} >
                        {WEEKDAYS[i]} <br />
                        <small>{currentWeekDatesArray[i].getMonth() + 1}/{currentWeekDatesArray[i].getDate()}</small>
                        {/* <small><span className="tag is-info is-light is-pulled-right">{weekPreview[i] > 0 && weekPreview[i]}</span></small> */}
                        <small>
                          {weekPreview[i] > 0 && <span className="tag is-info is-light is-pulled-right">{weekPreview[i]}</span>}
                        </small>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>


          <div className="day-view">
            <h4>{dayOfWeekText}</h4>
            <div className="content">
              {savedMealsByDay &&
                savedMealsByDay[selected] &&
                  <>
                    <p>{savedMealsByDay[selected].name}</p>
                    <p>{savedMealsByDay[selected].ingredients}</p>
                  </>
              }
              <button className="button is-text" onClick={() => openAddModal(selected)}>+ add recipe for {WEEKDAYS[selected]}</button>
            </div>
          </div>

        </div>






        {/* //Modal ------------------------------------------------------------------------------------------------------------------- */}

        <div className={displayModal ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-card">

              <header className="modal-card-head">
              <p className="modal-card-title">Add Recipe for {WEEKDAYS[selected]}</p>
              <button className="delete" aria-label="close" onClick={() => setDisplayModal(false)}></button>
            </header>

            <section className="modal-card-body">
              My Recipes <br />
              {recipes && recipes.map((recipe) => (
                <div>
                  <Link href={'/' + recipe.slug} >
                    <a className="has-text-link">{recipe.name}</a>
                  </Link>
                  <button className="button is-small add-button">+ add</button>
                </div>
              ))}
              <br />
              Saved Recipes <br />
              {savedRecipes && savedRecipes.map((savedRecipe) => (
                <div>
                  <Link href={'/' + savedRecipe.slug} >
                    <a className="has-text-link">{savedRecipe.name}</a>
                  </Link>
                  <button className="button is-small add-button" onClick={() => addToMealPlanWeekRef(savedRecipe)}>+ add</button>
                </div>
              ))}
            </section>

            <footer className="modal-card-foot">
              <button className="button is-success">Add Recipe</button>
              <button className="button" onClick={() => setDisplayModal(false)}>Cancel</button>
            </footer>

          </div>
        </div>

        {/* // End Modal ----------------------------------------------------------------------------------------------------------- */}

      </>

      <style jsx>{`
        .is-active {
          font-weight: 700;
          font-weight: bold;
        }

        td {
          width: 120px;
          font-weight: normal;
        }

        td:hover {
          cursor: pointer;

        }
        .add-button {
          margin-left: 22px;
        }

      `}</style>
    </Layout>
  )
}
