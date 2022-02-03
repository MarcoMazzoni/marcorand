import { AlgorandUser } from '../interfaces/Node.interface';
import {
  UserActionTypes,
  CHANGE_ASSET_SELECTED,
  CHANGE_ACCOUNT_SELECTED,
  FETCH_ACCOUNT_LIST
} from '../interfaces/Actions.interface';



const userReducerDefaultState: AlgorandUser = {
  asset: 'Choose',
  accountList: [''],
  accountSelected: 'Choose an account'
};

const userReducer = (
  state = userReducerDefaultState,
  action: UserActionTypes
): AlgorandUser => {
  switch (action.type) {
    case CHANGE_ASSET_SELECTED:
      return {
        asset: action.asset,
        accountList: state.accountList,
        accountSelected: state.accountSelected
      }
    case FETCH_ACCOUNT_LIST:
      return {
        asset: state.asset,
        accountList: action.accountList,
        accountSelected: state.accountSelected
      };
    case CHANGE_ACCOUNT_SELECTED:
      return {
        asset: state.asset,
        accountList: state.accountList,
        accountSelected: action.account
      };
    default:
      return state;
  }
};

export { userReducer };
