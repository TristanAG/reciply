import Layout from '../components/layout'

export default function MealPlanner() {

  const today = new Date();
  var currentMonth = today.getMonth() + 1

  const [ dayOfWeekInt, setDayOfWeek ] = React.useState(today.getDay())

  let currentDay = ''

  switch(today.getDay()) {
      case 0:
        currentDay = 'Sunday'
        break;
      case 1:
        currentDay = 'Monday'
        break;
      case 2:
        currentDay = 'Tuesday'
        break;
      case 3:
        currentDay = 'Wednesday'
        break;
      case 4:
        currentDay = 'Thursday'
        break;
      case 5:
        currentDay = 'Friday'
        break;
      case 6:
        currentDay = 'Saturday'
        break;
  }

  const [ dayOfWeekText, setDayOfWeekText ] = React.useState(currentDay + currentMonth + ' / ' + String(today.getDate()).padStart(2, '0'))

  const startWeekIndex = today.getDay() * -1



  for (let i = startWeekIndex; i <= startWeekIndex + 6; i++) {
    console.log(i)

    var currentDate = new Date()
    var newDate = currentDate.setDate(currentDate.getDate() + i)
    console.log(new Date(newDate))
  }
  console.log('---')

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
                <td className={dayOfWeekInt === 0 && "has-background-info-light is-active"}>Sunday</td>
                <td className={dayOfWeekInt === 1 && "has-background-info-light is-active"}>Monday</td>
                <td className={dayOfWeekInt === 2 && "has-background-info-light is-active"}>Tuesday</td>
                <td className={dayOfWeekInt === 3 && "has-background-info-light is-active"}>Wednesday</td>
                <td className={dayOfWeekInt === 4 && "has-background-info-light is-active"}>Thursday</td>
                <td className={dayOfWeekInt === 5 && "has-background-info-light is-active"}>Friday</td>
                <td className={dayOfWeekInt === 6 && "has-background-info-light is-active"}>Saturday</td>
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
