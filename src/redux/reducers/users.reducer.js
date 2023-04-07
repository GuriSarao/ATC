import { userConstants } from '../constants';
import { success, failure } from '../../theme/redux';

const initialState = {
  isRequesting: false,
  vehicles_detail: [],
  Material_detail: [],
  Companies: [],
  Drivers: [],
  Stations: [],
  GR_Code: {},
  Expense_detail: [],
  Expense_data: {}
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {

    //Login user 
    case userConstants.LOGIN:
      return { ...state, isRequesting: true };
    case success(userConstants.LOGIN):
    case failure(userConstants.LOGIN):
      return { ...state, isRequesting: false };

    // GET Vehicles
    case userConstants.GET_VEHICLES:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_VEHICLES):
      {
        const data = action.payload.data.data;
        return { ...state, vehicles_detail: data, isRequesting: false };
      }
    case failure(userConstants.GET_VEHICLES):
      return { ...state, isRequesting: false };

    // Get material type 
    case userConstants.GET_MATERIALS:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_MATERIALS):
      {
        const data = action.payload.data.data;
        return { ...state, Material_detail: data, isRequesting: false };
      }
    case failure(userConstants.GET_MATERIALS):
      return { ...state, isRequesting: false };

    // Get Companies
    case userConstants.GET_COMPANIES:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_COMPANIES):
      {
        const data = action.payload.data.data;
        return { ...state, Companies: data, isRequesting: false };
      }
    case failure(userConstants.GET_COMPANIES):
      return { ...state, isRequesting: false };

    // Get Drivers
    case userConstants.GET_DRIVERS:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_DRIVERS):
      {
        const data = action.payload.data.data;
        return { ...state, Drivers: data, isRequesting: false };
      }
    case failure(userConstants.GET_DRIVERS):
      return { ...state, isRequesting: false };

    //Get Stations 
    case userConstants.GET_STATIONS:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_STATIONS):
      {
        const data = action.payload.data.data;
        return { ...state, Stations: data, isRequesting: false };
      }
    case failure(userConstants.GET_STATIONS):
      return { ...state, isRequesting: false };

    //Get GR
    case userConstants.GET_GR:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_GR):
      {
        const data = action.payload.data.data;
        return { ...state, GR_Code: data, isRequesting: false };
      }
    case failure(userConstants.GET_GR):
      return { ...state, isRequesting: false };

    //Get Expense Detail
    case userConstants.GET_EXPENSE_DETAIL:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_EXPENSE_DETAIL):
      {
        const data = action.payload.data.data;
        return {
          ...state,
          Expense_detail: data,
          isRequesting: false
        };
      }
    case failure(userConstants.GET_EXPENSE_DETAIL):
      return { ...state, isRequesting: false };

    //Get User Notifications
    case userConstants.USER_NOTI:
      return { ...state, isRequesting: true };
    case success(userConstants.USER_NOTI):
    case failure(userConstants.USER_NOTI):
      return { ...state, isRequesting: false };

    //Get Expense detail by expense id
    case userConstants.EXPENSE_DETAIL_BY_EXPENSE_ID:
      return { ...state, isRequesting: true };
    case success(userConstants.EXPENSE_DETAIL_BY_EXPENSE_ID):
      {
        const data = action.payload.data.data;
        return { ...state, Expense_data: data, isRequesting: false };
      }
    case failure(userConstants.EXPENSE_DETAIL_BY_EXPENSE_ID):
      return { ...state, isRequesting: false };

    // Save Gr
    case userConstants.Save_GR:
      return { ...state, isRequesting: true };
    case success(userConstants.Save_GR):
    case failure(userConstants.Save_GR):
      return { ...state, isRequesting: false };

    // Save Empty expense
    case userConstants.SAVE_EMPTY_EXPENSE:
      return { ...state, isRequesting: true };
    case success(userConstants.SAVE_EMPTY_EXPENSE):
    case failure(userConstants.SAVE_EMPTY_EXPENSE):
      return { ...state, isRequesting: false };

    // Update Empty expense
    case userConstants.UPDATE_EMPTY_EXPENSE:
      return { ...state, isRequesting: true };
    case success(userConstants.UPDATE_EMPTY_EXPENSE):
    case failure(userConstants.UPDATE_EMPTY_EXPENSE):
      return { ...state, isRequesting: false };

    // Save GR based expense
    case userConstants.SAVE_GR_BASED_EXPENSE:
      return { ...state, isRequesting: true };
    case success(userConstants.SAVE_GR_BASED_EXPENSE):
    case failure(userConstants.SAVE_GR_BASED_EXPENSE):
      return { ...state, isRequesting: false };

    // Update GR Based Expesne
    case userConstants.UPDATE_GR_BASED:
      return { ...state, isRequesting: true };
    case success(userConstants.UPDATE_GR_BASED):
    case failure(userConstants.UPDATE_GR_BASED):
      return { ...state, isRequesting: false };

    // Save Price for routes
    case userConstants.SAVE_PRIZE_FOR_ROUTES:
      return { ...state, isRequesting: true };
    case success(userConstants.SAVE_PRIZE_FOR_ROUTES):
    case failure(userConstants.SAVE_PRIZE_FOR_ROUTES):
      return { ...state, isRequesting: false };

    // Update Price for route expense
    case userConstants.UPDATE_PRIZE_FOR_ROUTE:
      return { ...state, isRequesting: true };
    case success(userConstants.UPDATE_PRIZE_FOR_ROUTE):
    case failure(userConstants.UPDATE_PRIZE_FOR_ROUTE):
      return { ...state, isRequesting: false };

    // Save Petty expense
    case userConstants.SAVE_PETTY_EXPENSE:
      return { ...state, isRequesting: true };
    case success(userConstants.SAVE_PETTY_EXPENSE):
    case failure(userConstants.SAVE_PETTY_EXPENSE):
      return { ...state, isRequesting: false };

    // Update Petty Expense
    case userConstants.UPDATE_PETTY_EXPENSE:
      return { ...state, isRequesting: true };
    case success(userConstants.UPDATE_PETTY_EXPENSE):
    case failure(userConstants.UPDATE_PETTY_EXPENSE):
      return { ...state, isRequesting: false };

    // Save Vehicle expense
    case userConstants.SAVE_VEHICLE_EXPENSE:
      return { ...state, isRequesting: true };
    case success(userConstants.SAVE_VEHICLE_EXPENSE):
    case failure(userConstants.SAVE_VEHICLE_EXPENSE):
      return { ...state, isRequesting: false };

    // Update Vehicle Expense
    case userConstants.UPDATE_VEHICLE_EXPENSE:
      return { ...state, isRequesting: true };
    case success(userConstants.UPDATE_VEHICLE_EXPENSE):
    case failure(userConstants.UPDATE_VEHICLE_EXPENSE):
      return { ...state, isRequesting: false };

    //Delete Expense
    case userConstants.DELETE_EXPENSE:
      return { ...state, isRequesting: true };
    case success(userConstants.DELETE_EXPENSE):
    case failure(userConstants.DELETE_EXPENSE):
      return { ...state, isRequesting: false };

    //Approve Expense
    case userConstants.APPROVE_GR:
      return { ...state, isRequesting: true };
    case success(userConstants.APPROVE_GR):
    case failure(userConstants.APPROVE_GR):
      return { ...state, isRequesting: false };

    // Get Source Station from bill company 
    case userConstants.GET_SOURCE_STATION_BY_BILL:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_SOURCE_STATION_BY_BILL):
    case failure(userConstants.GET_SOURCE_STATION_BY_BILL):
      return { ...state, isRequesting: false };

    // Get Des Station from bill company 
    case userConstants.GET_DES_STATION_BY_BILL:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_DES_STATION_BY_BILL):
    case failure(userConstants.GET_DES_STATION_BY_BILL):
      return { ...state, isRequesting: false };

    // Get Vehicle detail
    case userConstants.GET_VEHICLE_DETAIL:
      return { ...state, isRequesting: true };
    case success(userConstants.GET_VEHICLE_DETAIL):
    case failure(userConstants.GET_VEHICLE_DETAIL):
      return { ...state, isRequesting: false };



    default:
      return state;
  }
};
export default usersReducer;
