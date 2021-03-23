import Layout from '../components/layout'

export default function MealPlanner() {

  const today = new Date();


  var currentMonth = today.getMonth()+1


  // today.setDate(today.getDate()-1);

  const [ dayOfWeekInt, setDayOfWeek ] = React.useState(today.getDay())


  console.log('hi?')

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
                <td className={dayOfWeekInt === 1 && "has-text-primary"}>Monday</td>
                <td className={dayOfWeekInt === 2 && "has-text-primary"}>Tuesday</td>
                <td className={dayOfWeekInt === 3 && "has-text-primary"}>Wednesday</td>
                <td className={dayOfWeekInt === 4 && "has-text-primary"}>Thursday</td>
                <td className={dayOfWeekInt === 5 && "has-text-primary"}>Friday</td>
                <td className={dayOfWeekInt === 6 && "has-text-primary"}>Saturday</td>
                <td className={dayOfWeekInt === 0 && "has-text-primary"}>Sunday</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="day-view">
          <h4>{dayOfWeekText}</h4>
        </div>
      </div>
    </Layout>
  )
}
