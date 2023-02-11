import requests from './request'

export const reqCity = () => {
  return requests({
    url: '/houseInCity',
    method: 'GET'
  })
}

export const getCityList = () => {
  return requests({
    url: '/city',
    method: 'GET'
  })
}

export const getAllAvgPrice = () => {
  return requests({
    url: '/allAvgPrice',
    method: 'GET'
  })
}

export const getMaxPrice = () => {
  return requests({
    url: '/maxPrice',
    method: 'GET'
  })
}
