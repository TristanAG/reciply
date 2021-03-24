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
        currentDay = 'Tuesday ' + currentMonth + ' / ' + dayOfWeekInt
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

  const [ dayOfWeekText, setDayOfWeekText ] = React.useState(currentDay)

  // switch(today.getDay()) {
  //   case 0:
  //     setDayOfWeekText('Sunday')
  //     break;
  //   case 1:
  //     setDayOfWeekText('Monday')
  //     break;
  //   case 2:
  //     setDayOfWeekText('Tuesday')
  //     break;
  //   case 3:
  //     setDayOfWeekText('Wednesday')
  //     break;
  //   case 4:
  //     setDayOfWeekText('Thursday')
  //     break;
  //   case 5:
  //     setDayOfWeekText('Friday')
  //     break;
  //   case 6:
  //     setDayOfWeekText('Saturday')
  //     break;
// }



  return (
    <Layout>
      <div className="content">
        <h3>Meal Planner</h3>
        <div class="table-container">
          <table class="table is-bordered is-striped">
            <tbody>
              <tr>
                <td className={dayOfWeekInt === 1 && "has-background-info-light is-active"}>Monday</td>
                <td className={dayOfWeekInt === 2 && "has-background-info-light is-active"}>Tuesday</td>
                <td className={dayOfWeekInt === 3 && "has-background-info-light is-active"}>Wednesday</td>
                <td className={dayOfWeekInt === 4 && "has-background-info-light is-active"}>Thursday</td>
                <td className={dayOfWeekInt === 5 && "has-background-info-light is-active"}>Friday</td>
                <td className={dayOfWeekInt === 6 && "has-background-info-light is-active"}>Saturday</td>
                <td className={dayOfWeekInt === 0 && "has-background-info-light is-active"}>Sunday</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="day-view">
          <h4>{dayOfWeekText}</h4>
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
