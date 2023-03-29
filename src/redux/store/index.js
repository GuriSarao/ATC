
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import reducers from '../reducers'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { showMessage } from "react-native-flash-message";

const stagging = 'https://azadtankercompany.com/atcstagging/api/';
const live = 'https://azadtankercompany.com/api/'

const client = axios.create({
  baseURL: stagging,
  headers: {
    accept: '*/*',
    'X-API-KEY': '82haf8kklm3fotpr23-f4gh2-vq587-32kytms'
  },
})

// client.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('access_token')
//     console.log('token', token)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   },
// )

const middlewareConfig = {
  interceptors: {
    request: [
      {
        success({ getState, dispatch, getSourceAction }, req) {
          let request = req
          if (request.method === 'post' || request.method === 'put') {
            request.data = request.data
          }
          return request
        },
      },
    ],
    response: [
      {
        success({ getState, dispatch, getSourceAction }, response) {
          return response
        },
        error({ getState, dispatch, getSourceAction }, error) {
          if (!axios.isCancel(error)) {
            // console.log(error)
            httpHandleError(error.response)
          }

          return Promise.reject(error)
        },
      },
    ],
  },
}

const httpHandleError = (error) => {
  console.log(error, 'error')
  console.log('error -=-=-=--=', error.data)
  if (error.status == 401) {
    // AsyncStorage.clear()
    // RootNavigation.navigate('Login')
  }

  if (error.status == 500) {
    showMessage({
      message: error.data.message,
      type: "warning",
      icon: "warning",
    });
  }

  if (error.status == 400 || error.status == 412) {
    showMessage({
      message: error.data.message,
      type: "warning",
      icon: "warning",
    });
  }

  if (error.status == 422) {
    if (error.data && error.data.message) {
      if (typeof error.data.message == 'object') {
        var firstKey = ''
        for (var key in error.data.message) {
          firstKey = key
          break
        }

        if (error.data.message[firstKey]) {
          showMessage({
            message: error.data.message[firstKey][0],
            type: "warning",
            icon: "warning",
          });
        } else if (error.data.message[firstKey]) {
          showMessage({
            message: error.data.message[firstKey],
            type: "warning",
            icon: "warning",
          });
        }
      } else if (typeof error.data.message == 'string') {
        showMessage({
          message: error.data.message,
          type: "warning",
          icon: "warning",
        });
      }
    } else {
      showMessage({
        message: 'Something went wrong',
        type: "warning",
        icon: "warning",
      });
    }
  }
}

/**
 * Prepare the Redux Store
 */
const composedMiddlewares = applyMiddleware(thunk)

const createStoreWithMiddleware = applyMiddleware(
  axiosMiddleware(client, middlewareConfig),
  thunk,
)(configureStore)


const Store = () => {
  return createStoreWithMiddleware({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
  },
    undefined,
    composedMiddlewares)
}

export default Store
