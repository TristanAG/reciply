import Layout from '../components/layout'
import Firebase from '../firebase/firebase'
import { FirebaseContext } from '../firebase'

export default function ShoppingList() {

  const { user, firebase } = React.useContext(FirebaseContext)

  const [ mealPlanWeekRef, setMealPlanWeekRef ] = React.useState('')
  const [ ingredients, setIngredients ] = React.useState(null)
  const [ mealPlanRefText, setMealPlanWeekRefText] = React.useState(null)
  const [ formattedIngredients, setFormattedIngredients ] = React.useState()

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
        console.log(beginningOfWeekRefText)
      } else if (i === startWeekIndex + 6) {
        endOfWeekRef = buildMealPlanWeekRef(indexRef)
        // console.log(indexRef)
        endOfWeekRefText = buildMealPlanWeekRefText(indexRef)
        console.log(endOfWeekRefText)
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
      } else {
        //ADD NEW mealPlanWeekRef if no doc exists
        // addNewMealPlanWeekRef(savedRecipe)
        alert('no mealplanweekref found!')
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  function getRecipesInMealPlan(mealPlanWeekRef) {
    let ingredientsArray = []
    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef).collection('recipes');
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        ingredientsArray.push(doc.data().ingredients)
      });
      // setIngredients(ingredientsArray)
      formatIngredientList(ingredientsArray)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  function formatIngredientList(ingredientsArray) {
    let newArr = []
    ingredientsArray.map(ingredientsInDay => (
      ingredientsInDay.map(ingredient => {
        // console.log(ingredient.ingredientName)

        newArr.push(ingredient.ingredientName)

      })
    ))

    setFormattedIngredients(newArr)
  }

  return (
    <Layout>
      <>
        <div className="content">
          <h3>Shopping List</h3>
          <ul>
            {formattedIngredients && formattedIngredients.map(ingredient => (
              <li>{ingredient}</li>
            ))}
          </ul>
        </div>
      </>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}
