import moment from 'moment'

export const env = {
  host: import.meta.env.VITE_HOST,
  appUrl: import.meta.env.VITE_APP_URL,
}

let monthOfYear = []

for (let i = 0; i < 12; i++) {
  let monthName = moment().month(i).format('MMMM')
  monthOfYear.push({ name: monthName, number: i + 1 })
}

monthOfYear.unshift({ name: 'ALL', number: 'ALL' })

export { monthOfYear }

// export const months = [
//   { name: 'January', number: 1 },
//   { name: 'February', number: 2 },
//   { name: 'March', number: 3 },
//   { name: 'April', number: 4 },
//   { name: 'May', number: 5 },
//   { name: 'June', number: 6 },
//   { name: 'July', number: 7 },
//   { name: 'August', number: 8 },
//   { name: 'September', number: 9 },
//   { name: 'October', number: 10 },
//   { name: 'November', number: 11 },
//   { name: 'December', number: 12 },
// ]
