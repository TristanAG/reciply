import Layout from '../components/layout'
import Firebase from '../firebase/firebase'
import { FirebaseContext } from '../firebase'

export default function ShoppingList() {

  const { user, firebase } = React.useContext(FirebaseContext)

  const [ mealPlanWeekRef, setMealPlanWeekRef ] = React.useState('')

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
  }

  function buildMealPlanWeekRef(ref) {
    ref = ref.toString().split(' ')
    ref = ref[1] + ref[2] + ref[3]

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
        alert('no hit!')
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  function getRecipesInMealPlan(mealPlanWeekRef) {
    // let weekPreviewArr = [0,0,0,0,0,0,0]
    // let recipesInDay = [[], [], [], [], [], [], []]
    var docRef = firebase.db.collection('users').doc(user.uid).collection('mealPlanWeek').doc(mealPlanWeekRef).collection('recipes');
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // const index = doc.data().dayInt
        // const recipesInCurrentDay = weekPreviewArr[index]
        //
        // weekPreviewArr[index] = recipesInCurrentDay + 1
        // recipesInDay[index].push({
        //   name: doc.data().name,
        //   slug: doc.data().slug,
        //   id: doc.id
        // })
        console.log('doc =>', doc.data())

      });
      // setWeekPreview(weekPreviewArr)
      // setMeals(recipesInDay)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  return (
    <Layout>
      <>
        <div className="content">
          <h3>Shopping List</h3>
        </div>
      </>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}
