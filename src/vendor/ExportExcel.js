// import request from '@/services/post'
import { Message } from 'element-ui'
const BASEURL = 'http://172.30.61.89:882'

export default function DownFiles(exportFileUrl, formValues, filename, thisObject) {
  const Sys = {}
  const ua = navigator.userAgent.toLowerCase()
  const re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
  const m = ua.match(re)
  if (m == null) {
    Sys.browser = 'msie'
  } else {
    Sys.browser = m[1].replace(/version/, "'safari")
    // eslint-disable-next-line prefer-destructuring
    Sys.ver = m[2]
  }
  if (thisObject !== undefined) {
    thisObject.butLoading = true
  }

  fetch(BASEURL + exportFileUrl, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(formValues),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      if (thisObject !== undefined) {
        thisObject.butLoading = false
      }
      return response
    }
    const errortext = response.statusText
    Message({
      message: errortext,
      type: 'error',
      duration: 5 * 1000
    })
    if (thisObject !== undefined) {
      thisObject.butLoading = false
    }
    throw new Error()
  }).then(response => response.blob()
    .then(blob => {
      if (Sys.browser === 'msie') {
        if (filename === null) {
          filename = new Date().getTime() + '.xls'
        }
        window.navigator.msSaveBlob(blob, filename)
      } else if (Sys.browser === 'firefox') {
        const url = window.URL.createObjectURL(blob)
        window.open(url)
      } else {
        const url = window.URL.createObjectURL(blob)
        if (filename == null) filename = decodeURI(response.headers.get('Content-Disposition'))
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
      }
      if (thisObject !== undefined) {
        thisObject.butLoading = false
      }
      return response
    }))
}
