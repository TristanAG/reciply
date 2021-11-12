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
  const [ meals, setMeals ] = React.useState([[], [], [], [], [], [], []])

  React.useEffect(() => {
    setDayOfWeekText(WEEKDAYS[selected])
  },[selected])

  React.useEffect(() => {
    buildCalendar()
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
      getMealPlanWeekRef(mealPlanWeekRef)
    }
  }, [mealPlanWeekRef, user])

  function buildMealPlanWeekRef(ref) {
    ref = ref.toString().split(' ')
    ref = ref[1] + ref[2] + ref[3]

    return ref
  }

  function buildCalendar() {
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
  }

  function removeMealFromDay(meal) {
    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef).collection('recipes');
    docRef.doc(meal).delete().then(() => {
      getRecipesInMealPlan(mealPlanWeekRef)
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
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

  function addNewShoppingList() {
    firebase.db.collection('users').doc(user.uid).collection('shoppingLists').doc(mealPlanWeekRef).set({
      ref: mealPlanWeekRef
    }).then(() => {
      alert("created shoping list");
      updateShoppingList('test')
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  function updateMealPlanRef(savedRecipe) {
    firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef).collection('recipes').add({
      name: savedRecipe.name,
      slug: savedRecipe.slug,
      ingredients: savedRecipe.ingredients,
      dayInt: selected
    })
    .then((doc) => {
      console.log("Document successfully written!");
      console.log('rerender ui')
      console.log(doc.id)
      getRecipesInMealPlan(mealPlanWeekRef)
      setDisplayModal(false)

      updateShoppingList(savedRecipe.ingredients)
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  function updateShoppingList(list) {

    console.log(list)

    // var db = firebase.firestore();
    var batch = firebase.db.batch()

    const array = [{name: 'a'},{name: 'b'}]

    list.forEach((doc) => {
      // var docRef = db.collection("col").doc(); //automatically generate unique id
      var docRef = firebase.db.collection('users').doc(user.uid).collection('shoppingList').doc(mealPlanWeekRef).collection('listItems').doc(doc.ingredientName);
      batch.set(docRef, doc);
    });

    batch.commit()

    // firebase.db.collection('users').doc(user.uid).collection('shoppingLists').doc(mealPlanWeekRef).collection('listItems').add({
    //   list
    // })
    // .then((doc) => {
    //   console.log("Document successfully written!");
    //   console.log('rerender ui')
    //   console.log(doc.id)
    // })
    // .catch((error) => {
    //   console.error("Error writing document: ", error);
    // });
  }

  function getMealPlanWeekRef(mealPlanWeekRef) {
    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef);
    docRef.get().then((doc) => {
      if (doc.exists) {
        //UPDATE IF EXISTS
        getRecipesInMealPlan(mealPlanWeekRef)
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  function getRecipesInMealPlan(mealPlanWeekRef) {
    let weekPreviewArr = [0,0,0,0,0,0,0]
    let recipesInDay = [[], [], [], [], [], [], []]
    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef).collection('recipes');
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const index = doc.data().dayInt
        const recipesInCurrentDay = weekPreviewArr[index]

        weekPreviewArr[index] = recipesInCurrentDay + 1
        recipesInDay[index].push({
          name: doc.data().name,
          slug: doc.data().slug,
          id: doc.id
        })

      });
      setWeekPreview(weekPreviewArr)
      setMeals(recipesInDay)
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


          {!user
            ? <p className="has-text-danger">must be logged in to post a recipe</p>
            : <>
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
                            <small>
                              {currentWeekDatesArray[i].getMonth() + 1}/{currentWeekDatesArray[i].getDate()}
                            </small>
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

                  {meals[selected].map((meal, i) => {
                    return <p>{meal.name} <b onClick={() => removeMealFromDay(meal.id)} className="remove-button">x</b></p>
                  })}

                  <button className="button is-text" onClick={() => openAddModal(selected)}>+ add recipe for {WEEKDAYS[selected]}</button>
                </div>
              </div>
            </>
          }

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
                  <button className="button is-small add-button" onClick={() => addToMealPlanWeekRef(recipe)}>+ add</button>
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

        .remove-button {
          cursor: pointer;
        }

      `}</style>
    </Layout>
  )
}
