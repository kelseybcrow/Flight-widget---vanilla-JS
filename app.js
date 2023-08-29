const tableBody = document.getElementById('table-body')

// this array of objects is dummy data
let flights = [
  {
    time: '08:11',
    destination: 'OMAN',
    flight: 'OX 203',
    gate: 'A 01',
    remarks: 'ON TIME',
  },
  {
    time: '12:39',
    destination: 'LONDON',
    flight: 'CL 320',
    gate: 'C 31',
    remarks: 'CANCELLED',
  },
  {
    time: '13:21',
    destination: 'DUBAI',
    flight: 'DXB 201',
    gate: 'A 19',
    remarks: 'CANCELLED',
  },
  {
    time: '14:01',
    destination: 'FRANKFURT',
    flight: 'FR 402',
    gate: 'B 02',
    remarks: 'ON TIME',
  },
  {
    time: '15:22',
    destination: 'TOKYO',
    flight: 'TK 211',
    gate: 'A 32',
    remarks: 'DELAYED',
  },
]

// these are more dummy data
const destinations = ['TOKYO', 'FRANKFURT', 'DUBAI', 'LONDON', 'OMAN', 'BEIRUT']
const remarks = ['ON TIME', 'DELAYED', 'CANCELLED']
let hour = 15

const populateTable = () => {
  // for of loop to iterate through the array of flights
  for (const flight of flights) {
    // for each flight, create a table row and table icon in the DOM
    const tableRow = document.createElement('tr')
    const tableIcon = document.createElement('td')
    // set the text content to the airplane icon
    tableIcon.textContent = '✈'
    // append the table icon to the table row because we can't just create stuff, we have to then append it
    tableRow.append(tableIcon)

    // for in loop to iterate through the key/value pairs in each flight object
    for (const flightDetail in flight) {
      // for each key/value pair in each flight object, create a table cell for it
      // also create a variable for the array version of the flight details (an array-like object)
      const tableCell = document.createElement('td')
      const word = Array.from(flight[flightDetail])

      // for of loop for the new array version of the flight details that we just created in the last line of code?
      // destructuring the index and letter properties from the object that is word? (.entries() returns an array of the key/value pairs)
      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement('div')
        setTimeout(() => {
          letterElement.classList.add('flip')
          letterElement.textContent = letter
          tableCell.append(letterElement)
        }, 100 * index)
      }
      tableRow.append(tableCell)
    }
    tableBody.append(tableRow)
  }
}

populateTable()

// more dummy data

function generateRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

// more dummy data

function generateRandomNumber(maxNumber) {
  const numbers = '0123456789'
  if (maxNumber) {
    const newNumbers = numbers.slice(0, maxNumber)
    return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
  } else {
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
}

// more dummy data

function generateTime() {
  let displayHour = hour
  if (hour < 24) {
    hour++
  }
  if (hour >= 24) {
    hour = 1
    displayHour = hour
  }
  if (hour < 10) {
    displayHour = '0' + hour
  }
  return displayHour + ':' + generateRandomNumber(5) + generateRandomNumber()
}

const shuffleUp = () => {
  flights.shift()
  flights.push({
    time: generateTime(),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    flight:
      generateRandomLetter() +
      generateRandomLetter() +
      ' ' +
      generateRandomNumber() +
      generateRandomNumber() +
      generateRandomNumber(),
    gate:
      generateRandomLetter() +
      ' ' +
      generateRandomLetter() +
      generateRandomLetter(),
    remarks: remarks[Math.floor(Math.random() * remarks.length)],
  })
  tableBody.textContent = ''
  populateTable()
}

setInterval(shuffleUp, 5000)
