import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setValue(key, value) {
  return Cookies.set(key, value)
}

export function removeValue(key) {
  return Cookies.remove(key)
}

export function getValue(key) {
  return Cookies.get(key)
}
