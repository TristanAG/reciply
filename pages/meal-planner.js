import Layout from '../components/layout'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function MealPlanner() {

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

  React.useEffect(() => {
    //i need the diff of today int and this day int 'selected'
    //today's int is
    // alert(day)


    //if number is negative, you can determine that... how do we do that again?
    //we figure out the difference in the number, and we're able to


    //so it can be real easy, if it's a negative number you just subtract that amount of days
    //if its a positive number, you add the days
    //prove that i can get the data that i want with a dummy output

    // if (selected < 0) {
    //   alert('negative number')
    // } else {
    //   alert('positive number')
    // }
    let diff = dayOfWeekInt - selected

    alert(String(today.getDate() - diff).padStart(2, '0'))


    // alert(String(today.getDate()).padStart(2, '0'))
    setDayOfWeekText(WEEKDAYS[selected])
  },[selected])

  React.useEffect(() => {
    let arr = []
    const startWeekIndex = day * -1
    for (let i = startWeekIndex; i <= startWeekIndex + 6; i++) {
      const currentDate = new Date()
      const newDate = currentDate.setDate(currentDate.getDate() + i)
      arr.push(new Date(newDate))
    }
    setCurrentWeekDatesArray(arr)
  },[dayOfWeekInt])

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
