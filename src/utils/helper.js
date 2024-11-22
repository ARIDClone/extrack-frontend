import moment from 'moment-timezone'
import CryptoJS from 'crypto-js'

const dateToDateInputFormat = string => {
  const date = new Date(string)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  let day = date.getDate()
  day = day < 10 ? `0${day}` : day

  return `${year}-${month}-${day}`
}
const convertBase64ToBlob = base64String => {
  return fetch(base64String)
    .then(response => response.blob())
    .catch(error => {
      console.error('Error converting Base64 to Blob:', error)
    })
}

const convertToCompositionText = arrayText => {
  let compositionText = ''

  if (arrayText?.length > 0) {
    arrayText?.forEach((v, idx) => {
      if (idx === 0) {
        compositionText += `${idx + 1}. ${v?.nameComposition}`
      } else {
        compositionText += `\n${idx + 1}. ${v?.nameComposition}`
      }
    })
  } else {
    compositionText = ''
  }

  return compositionText
}

const parseFloat2Decimals = value => {
  if (value)
    return parseFloat(
      parseFloat(value.toString().replaceAll(',', '')).toFixed(4)
    )
  return 0
}

const parseToThousand = value => {
  if (value) {
    value = value.toString()
    if (value[value.length - 1] === '.') {
      let dotCount = 0
      for (const char of value) {
        if (char === '.') dotCount++
      }
      if (value[value.length - 2] === '.' || dotCount > 1) {
        return value.substring(0, value.length - 1)
      }
      return value
    }
    value = value.toLowerCase().replaceAll(',', '')

    if (value.split('.')[1]?.length > 4)
      return parseToThousand(value.substring(0, value.length - 1))

    let parsed = parseFloat(value).toLocaleString('EN', {
      maximumFractionDigits: 4,
      minimumFractionDigits: 4,
    })
    if (parsed === 'NaN') {
      return 0
    } else {
      return parsed
    }
  }
  return 0
}

const dateViewFormat = date => {
  return moment(date).format('DD-MMM-YY').toUpperCase()
}

const timeDuration = (date, duration, timezone = moment.tz.guess(true)) => {
  const timeStart = moment(date).tz(timezone).format('LT')
  const timeEnd = moment(date).tz(timezone).add(duration, 'minute').format('LT')

  return `${timeStart} - ${timeEnd}`
}

const encodeText = text => {
  // const encodedText = CryptoJS.AES.encrypt(
  //   text,
  //   CryptoJS.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_KEY),
  //   {
  //     iv: CryptoJS.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_IV),
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7,
  //   }
  // ).ciphertext.toString();
  // return encodedText;
}

const getDecodedToken = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem('x-auth-token'))
  try {
    return isAuthenticated.token
  } catch (e) {
    return null
  }
}
const numberFormat = number => {
  return number
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export {
  dateToDateInputFormat,
  convertToCompositionText,
  parseFloat2Decimals,
  dateViewFormat,
  timeDuration,
  parseToThousand,
  encodeText,
  getDecodedToken,
  convertBase64ToBlob,
  numberFormat,
}
