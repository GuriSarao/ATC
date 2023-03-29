/**
 *  Import node modules
 */
import { combineReducers } from 'redux'

/**
 *  Import reducers
 *  All reducers used in the app must be declared here!
 */
import users from './users.reducer'


console.log('calling reducressss');
/**
 *  Combine the reducers
 */
const reducers = combineReducers({
  users,
})

/**
 *  Export the combined reducers
 */
export default reducers
