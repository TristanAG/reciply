import Layout from '../components/layout'
import Firebase from '../firebase/firebase'
import { FirebaseContext } from '../firebase'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function MealPlanner() {

  const { firebase, user } = React.useContext(FirebaseContext)

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

  React.useEffect(() => {
    let diff = dayOfWeekInt - selected
    setDayOfWeekText(WEEKDAYS[selected])
  },[selected])

  React.useEffect(() => {

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
      }

      if (i === startWeekIndex + 6) {
        endOfWeekRef = buildMealPlanWeekRef(indexRef)
      }

    }

    setMealPlanWeekRef(beginningOfWeekRef + '-' + endOfWeekRef)

    setCurrentWeekDatesArray(arr)
  },[dayOfWeekInt])

  React.useEffect(() => {
    if (mealPlanWeekRef) {
      // firebase.db.collection('users').where("postedBy.id", "==", user.uid)

      //ok, i gotta figure out how to do this query.... i think it's a good break time here
      /*
        to pick this up - I be able to structure the query by looking for the current user,
        and then in the current user look for the correct mealPlanWeek collection
        then in mealPlanWeek use the mealPlanWeekRef to fetch the data of the current week

        IF IT EXISTS

        if it doesn't exist
            then you create it!
      */
    }
  }, [mealPlanWeekRef])

  function buildMealPlanWeekRef(ref) {
    ref = ref.toString().split(' ')
    ref = ref[1] + ref[2] + ref[3]

    return ref
  }


  return (
    <Layout>
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
                  <td className={ dayOfWeekInt === i && "has-background-info-light is-active" || selected === i && "has-background-light"}
                    onClick={() => setSelected(i)} >
                      {WEEKDAYS[i]} <br />
                      <small>{currentWeekDatesArray[i].getMonth()}/{currentWeekDatesArray[i].getDate()}</small>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="day-view">
          <h4>{dayOfWeekText}</h4>
          <p>hello123</p>
        </div>

      </div>

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

      `}</style>
    </Layout>
  )
}
