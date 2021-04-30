import Layout from '../components/layout'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function MealPlanner() {

  const today = new Date();
  const day = today.getDay()

  const currentMonth = today.getMonth() + 1

  const [ dayOfWeekInt, setDayOfWeek ] = React.useState(day)

  let currentDay = ''

  for (let i in WEEKDAYS) {
    // alert(day)
    if (i == day) {
      currentDay = WEEKDAYS[i]
      console.log(i)
    }
  }

  const [ dayOfWeekText, setDayOfWeekText ] = React.useState(currentDay + ' ' + currentMonth + ' / ' + String(today.getDate()).padStart(2, '0'))

  React.useEffect(() => {
    const startWeekIndex = today.getDay() * -1

    for (let i = startWeekIndex; i <= startWeekIndex + 6; i++) {
      console.log(i)
      var currentDate = new Date()
      var newDate = currentDate.setDate(currentDate.getDate() + i)
      console.log(new Date(newDate))
    }
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
                {WEEKDAYS.map((day, i) => (
                  <td className={dayOfWeekInt === i && "has-background-info-light is-active"}>{WEEKDAYS[i]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="day-view">
          <h4>{dayOfWeekText}</h4>
          <p>hello</p>
        </div>

      </div>

      <style jsx>{`
        .is-active {
          font-weight: 700;
        }
      `}</style>
    </Layout>
  )
}
