/**
 *  Import action creator constants & dependencies
 */
import { userConstants } from '../constants'
import { API_URLS } from '../../configs/url'

export const beginLogin = data => ({
  type: userConstants.LOGIN,
  payload: {
    request: {
      url: API_URLS.LOGIN,
      method: 'post',
      data,
    },
  },
})

export function Login_user(params) {
  return async dispatch => {
    try {
      const response = await dispatch(beginLogin(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const get_all_vehicles = id => ({
  type: userConstants.GET_VEHICLES,
  payload: {
    request: {
      url: API_URLS.GET_VEHICLES,
    },
  },
})

export const get_all_Material = id => ({
  type: userConstants.GET_MATERIALS,
  payload: {
    request: {
      url: API_URLS.GET_MATERIALS,
    },
  },
})

export const get_all_Companies = id => ({
  type: userConstants.GET_COMPANIES,
  payload: {
    request: {
      url: API_URLS.GET_COMPANIES,
    },
  },
})

export const get_all_Drivers = id => ({
  type: userConstants.GET_DRIVERS,
  payload: {
    request: {
      url: API_URLS.GET_DRIVERS,
    },
  },
})

export const get_all_Stations = id => ({
  type: userConstants.GET_STATIONS,
  payload: {
    request: {
      url: API_URLS.GET_STATIONS,
    },
  },
})

export const get_Gr = id => ({
  type: userConstants.GET_GR,
  payload: {
    request: {
      url: API_URLS.GET_GR,
    },
  },
})

export const get_vehicle_detail = (id) => ({
  type: userConstants.GET_VEHICLE_DETAIL,
  payload: {
    request: {
      url: `${API_URLS.GET_VEHICLE_DETAIL}/?vehicle_id=${id}}`,
    },
  },
})

export const GET_SOURCE_STATION_BY_BILL = (id) => ({
  type: userConstants.GET_SOURCE_STATION_BY_BILL,
  payload: {
    request: {
      url: `${API_URLS.GET_SOURCE_STATION_BY_BILL}/?company_id=${id}}`,
    },
  },
})

export const GET_DES_STATION_BY_BILL = (id) => ({
  type: userConstants.GET_DES_STATION_BY_BILL,
  payload: {
    request: {
      url: `${API_URLS.GET_DES_STATION_BY_BILL}/?company_id=${id}}`,
    },
  },
})

export const GET_EXPENSE_DETAIL = (id) => ({
  type: userConstants.GET_EXPENSE_DETAIL,
  payload: {
    request: {
      url: `${API_URLS.GET_EXPENSE_DETAIL}/?user_id=${id}`,
    },
  },
})

export const GET_User_Noti = (id) => ({
  type: userConstants.USER_NOTI,
  payload: {
    request: {
      url: `${API_URLS.USER_NOTI}/?user_id=${id}`,
    },
  },
})

export const GET_EXPENSE_DETAIL_BY_EXPENSE_ID = (id, expense_id) => ({
  type: userConstants.EXPENSE_DETAIL_BY_EXPENSE_ID,
  payload: {
    request: {
      url: `${API_URLS.EXPENSE_DETAIL_BY_EXPENSE_ID}/?user_id=${id}&expense_id=${expense_id}`,
    },
  },
})


export const begin_Save_Gr = data => ({
  type: userConstants.Save_GR,
  payload: {
    request: {
      url: API_URLS.Save_GR,
      method: 'post',
      data,
    },
  },
})

export function Save_GR(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Save_Gr(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Update_GR_Based = data => ({
  type: userConstants.UPDATE_GR_BASED,
  payload: {
    request: {
      url: API_URLS.UPDATE_GR_BASED,
      method: 'post',
      data,
    },
  },
})

export function Update_GR_Based(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Update_GR_Based(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Save_Empty = data => ({
  type: userConstants.SAVE_EMPTY_EXPENSE,
  payload: {
    request: {
      url: API_URLS.SAVE_EMPTY_EXPENSE,
      method: 'post',
      data,
    },
  },
})

export function Save_Empty_Expense(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Save_Empty(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Update_Empty = data => ({
  type: userConstants.UPDATE_EMPTY_EXPENSE,
  payload: {
    request: {
      url: API_URLS.UPDATE_EMPTY_EXPENSE,
      method: 'post',
      data,
    },
  },
})

export function Update_Empty_Expense(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Update_Empty(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Save_GR_Based = data => ({
  type: userConstants.SAVE_GR_BASED_EXPENSE,
  payload: {
    request: {
      url: API_URLS.SAVE_GR_BASED_EXPENSE,
      method: 'post',
      data,
    },
  },
})

export function Save_GR_Based(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Save_GR_Based(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Save_Prize_for_routes = data => ({
  type: userConstants.SAVE_PRIZE_FOR_ROUTES,
  payload: {
    request: {
      url: API_URLS.SAVE_PRIZE_FOR_ROUTES,
      method: 'post',
      data,
    },
  },
})

export function Save_Prize_for_routes(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Save_Prize_for_routes(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}


export const begin_Update_Prize_for_routes = data => ({
  type: userConstants.UPDATE_PRIZE_FOR_ROUTE,
  payload: {
    request: {
      url: API_URLS.UPDATE_PRIZE_FOR_ROUTE,
      method: 'post',
      data,
    },
  },
})

export function Update_Prize_for_routes(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Update_Prize_for_routes(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}


export const begin_Save_Petty_Expense = data => ({
  type: userConstants.SAVE_PETTY_EXPENSE,
  payload: {
    request: {
      url: API_URLS.SAVE_PETTY_EXPENSE,
      method: 'post',
      data,
    },
  },
})

export function Save_Petty_Expense(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Save_Petty_Expense(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Update_Petty_Expense = data => ({
  type: userConstants.UPDATE_PETTY_EXPENSE,
  payload: {
    request: {
      url: API_URLS.UPDATE_PETTY_EXPENSE,
      method: 'post',
      data,
    },
  },
})

export function Update_Petty_Expense(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Update_Petty_Expense(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Save_Vehicle_Expense = data => ({
  type: userConstants.SAVE_VEHICLE_EXPENSE,
  payload: {
    request: {
      url: API_URLS.SAVE_VEHICLE_EXPENSE,
      method: 'post',
      data,
    },
  },
})

export function Save_Vehicle_Expense(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Save_Vehicle_Expense(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Update_Vehicle_Expense = data => ({
  type: userConstants.UPDATE_VEHICLE_EXPENSE,
  payload: {
    request: {
      url: API_URLS.UPDATE_VEHICLE_EXPENSE,
      method: 'post',
      data,
    },
  },
})

export function Update_Vehicle_Expense(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Update_Vehicle_Expense(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Delete_Expense = data => ({
  type: userConstants.DELETE_EXPENSE,
  payload: {
    request: {
      url: API_URLS.DELETE_EXPENSE,
      method: 'post',
      data,
    },
  },
})

export function Delete_Expense(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Delete_Expense(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const begin_Approve_Expense = data => ({
  type: userConstants.APPROVE_GR,
  payload: {
    request: {
      url: API_URLS.APPROVE_GR,
      method: 'post',
      data,
    },
  },
})

export function Approve_Expense(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_Approve_Expense(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }
      throw response
    } catch (error) {
      throw error.response
    }
  }
}


















