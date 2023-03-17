/*
 * @Author: zzq 1731492139@qq.com
 * @Date: 2023-02-28 22:59:56
 * @LastEditors: zzq 1731492139@qq.com
 * @LastEditTime: 2023-03-17 20:15:21
 * @FilePath: \vue3-bs\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

export const getCityPrice = (city) => {
  return requests({
    url: '/cityPrice',
    method: 'GET',
    params: {
      cityname: city
    }
  })
}

export const getHuxingData = (city = '') => {
  if (city === '') {
    return requests({
      url: '/allHuxingCount',
      method: 'GET'
    })
  } else {
    return requests({
      url: `/allHuxingCount/${city}`,
      method: 'GET'
    })
  }
}

export const getOrientationData = (city = '') => {
  if (city === '') {
    return requests({
      url: '/allOrientation',
      method: 'GET'
    })
  } else {
    return requests({
      url: `/allOrientation/${city}`,
      method: 'GET'
    })
  }
}

export const getTypeData = (city = '') => {
  if (city === '') {
    return requests({
      url: '/houseType',
      method: 'GET'
    })
  } else {
    return requests({
      url: `/houseType/${city}`,
      method: 'GET'
    })
  }
}

export const getFloorData = (city = '') => {
  if (city === '') {
    return requests({
      url: '/allCityFloor',
      method: 'GET'
    })
  } else {
    return requests({
      url: `/allCityFloor/${city}`,
      method: 'GET'
    })
  }
}

export const getTrafficData = (city = '') => {
  if (city === '') {
    return requests({
      url: '/traffic',
      method: 'GET'
    })
  } else {
    return requests({
      url: `/traffic/${city}`,
      method: 'GET'
    })
  }
}

export const getSquareData = (city = '') => {
  if (city === '') {
    return requests({
      url: '/square',
      method: 'GET'
    })
  } else {
    return requests({
      url: `/square/${city}`,
      method: 'GET'
    })
  }
}

export const loginReq = (username, password) => {
  return requests({
    url: '/login',
    method: 'post',
    data: {
      usn: username,
      pwd: password
    }
  })
}

export const checkToken = (token) => {
  return requests({
    url: '/checkToken',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const getPageData = (city, pageConfig) => {
  if (city === '') {
    return requests({
      url: '/getDetailData',
      method: 'POST',
      data: {
        cityname: city,
        pageData: pageConfig
      }
    })
  } else {
    return requests({
      url: '/getDetailData',
      method: 'POST',
      data: {
        cityname: city,
        pageData: pageConfig
      }
    })
  }
}

export const zcReq = (username, password) => {
  return requests({
    url: '/zc',
    method: 'post',
    data: {
      usn: username,
      pwd: password
    }
  })
}
