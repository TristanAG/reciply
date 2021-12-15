import Layout from '../components/layout'
import Firebase from '../firebase/firebase'
import { FirebaseContext } from '../firebase'
import Link from 'next/link'

export default function ShoppingList() {

  const { user, firebase } = React.useContext(FirebaseContext)

  const [ mealPlanWeekRef, setMealPlanWeekRef ] = React.useState('')
  const [ ingredients, setIngredients ] = React.useState(null)
  const [ mealPlanRefText, setMealPlanWeekRefText] = React.useState(null)
  const [ formattedIngredients, setFormattedIngredients ] = React.useState()
  const [ showList, setShowList ] = React.useState(false)
  const [ selectedRef, setSelectedRef ] = React.useState('')


  React.useEffect(() => {
    if (mealPlanWeekRef && user) {
      getMealPlanWeekRef(mealPlanWeekRef)
    }

    if (user) {
      generateMealPlanWeekRef()
    }
  }, [mealPlanWeekRef, user])

  function generateMealPlanWeekRef() {
    let arr = []

    const today = new Date()
    const day = today.getDay()

    const startWeekIndex = day * -1
    let beginningOfWeekRef = null
    let endOfWeekRef = null
    let beginningOfWeekRefText = null
    let endOfWeekRefText = null

    for (let i = startWeekIndex; i <= startWeekIndex + 6; i++) {
      const currentDate = new Date()
      const newDate = currentDate.setDate(currentDate.getDate() + i)

      let indexRef = new Date(newDate)

      arr.push(indexRef)

      if (i === startWeekIndex) {
        beginningOfWeekRef = buildMealPlanWeekRef(indexRef)
        beginningOfWeekRefText = buildMealPlanWeekRefText(indexRef)
      } else if (i === startWeekIndex + 6) {
        endOfWeekRef = buildMealPlanWeekRef(indexRef)
        endOfWeekRefText = buildMealPlanWeekRefText(indexRef)
      }
    }

    setMealPlanWeekRef(beginningOfWeekRef + '-' + endOfWeekRef)
    setMealPlanWeekRefText(beginningOfWeekRefText + ' - ' + endOfWeekRefText)
  }

  function buildMealPlanWeekRef(ref) {
    ref = ref.toString().split(' ')
    ref = ref[1] + ref[2] + ref[3]

    return ref
  }

  function buildMealPlanWeekRefText(ref) {
    ref = ref.toString().split(' ')
    ref = ref[1] + ' ' + ref[2]
    return ref
  }

  function getMealPlanWeekRef(mealPlanWeekRef) {
    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef);
    docRef.get().then((doc) => {
      if (doc.exists) {
        //UPDATE IF EXISTS
        getRecipesInMealPlan(mealPlanWeekRef)
        setShowList(true)
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  function getRecipesInMealPlan(mealPlanWeekRef) {
    let ingredientsArray = []

    var docRef = firebase.db.collection('users').doc(user.uid).collection('shoppingList').doc(mealPlanWeekRef).collection('listItems');
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = doc.data()
        // console.log(data.checked)
        // console.log('selected ref: ')
        console.log('selected ref: ' + selectedRef)
        // if (selectedRef) {
        //
        // }

        ingredientsArray.push(doc.data())
      });
      // formatIngredientList(ingredientsArray)
      setFormattedIngredients(ingredientsArray)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  function formatIngredientList(ingredientsArray) {
    console.log(ingredientsArray)
    let allIngredients = []

    ingredientsArray.forEach(dayIngredients => {
      dayIngredients.forEach((ingredient, pos) => {
        allIngredients.push(ingredient)
      })
    });

    let compressedIngredients = []

    allIngredients.forEach((ingredient, i) => {
      if (compressedIngredients.length > 0) {
        if (!checkIfDuplicate(ingredient, compressedIngredients)) {
          compressedIngredients.push(ingredient)
        }
      } else if (compressedIngredients.length === 0) {
        compressedIngredients.push(ingredient)
      }
    })
    setFormattedIngredients(compressedIngredients)
  }

  function checkIfDuplicate(ingredient, compressedIngredients) {
    // if(compressedIngredients.includes(ingredient)){
    //   return true
    // }
    let foundDuplicate = false
    let occurences = 0
    compressedIngredients.forEach((compressedIngredient, i) => {
      if (compressedIngredient.ingredientName === ingredient.ingredientName) {
        foundDuplicate = true;
        occurences++
      }
    })

    if (foundDuplicate === true) {
      console.log('occurences')
      console.log(occurences)
      return true;
    }
  }

  function handleSelectIngredient(ingredient, listItem) {
    // var db = firebase.firestore();
    // var itemRef = document.querySelector('#' + listItem)
    // if (ingredient.checked) {
    //   itemRef.style.color = '#dbdbdb !important'
    // } else {
    //   itemRef.style.color = '#4a4a4a !important'
    // }
    // setSelectedRef(ingredient.name)
    // console.log(ingredient.name)

    let arr = []
    formattedIngredients.forEach(elem => {
      if (elem.name === ingredient.name) {
        console.log('hit')
        arr.push({
          name: elem.name,
          quantity: elem.quantity,
          checked: !elem.checked
        })
      } else {
        arr.push({
          name: elem.name,
          quantity: elem.quantity,
          checked: elem.checked
        })
      }
    })


    setFormattedIngredients(arr)
    firebase.db.collection('users').doc(user.uid).collection('shoppingList').doc(mealPlanWeekRef).collection('listItems').doc(ingredient.name).update({checked: !ingredient.checked});
// var docRef = firebase.db.collection('users').doc(user.uid).collection('shoppingList').doc(mealPlanWeekRef).collection('listItems').doc(doc.ingredientName)



  }

  return (
    <Layout>
      <>
        <div className="content">
          <h3>Shopping List</h3>

          {!user
            ? <p className="has-text-danger">must be logged in to post a recipe</p>
            : <>
                {showList &&
                  <ul>
                    {formattedIngredients && formattedIngredients.map((ingredient, i) => (
                      <li key={i} id={'list-item-' + i} onClick={() => handleSelectIngredient(ingredient, 'list-item-' + i)}
                        className={ingredient.checked ? 'has-text-grey-lighter' : 'has-text-black'}
                      >

                        {ingredient.name}
                        {/* | {ingredient.quantity} | {ingredient.checked ? 'checked' : 'not checked'} */}
                      </li>
                    ))}
                  </ul>
                 }
                {!showList &&
                  <div>Add some recipes to your <Link href="/meal-planner"><a className="has-text-grey">Meal Planner</a></Link> to generate a shopping list</div>
                }
            </>
          }
        </div>
      </>

      <style jsx>{`
        li {
          cursor:pointer;
        }
      `}</style>
    </Layout>
  )
}
