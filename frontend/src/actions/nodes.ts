import {
  AppActions,
  CHANGE_ACCOUNT_SELECTED,
  CHANGE_ASSET_SELECTED,
  FETCH_ACCOUNT_LIST
} from '../interfaces/Actions.interface';

import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';

import { getAllAccounts } from '../utils/utils'

const changeAccountSelected = (account: string): AppActions => {
  return {
    type: CHANGE_ACCOUNT_SELECTED,
    account
  };
};

const changeAssetSelected = (asset: string): AppActions => {
  return {
    type: CHANGE_ASSET_SELECTED,
    asset
  }
}

const fetchAccountList = (accountList: string[]): AppActions => {
  return {
    type: FETCH_ACCOUNT_LIST,
    accountList
  }
}

export const startChangeAsset = (asset: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(changeAssetSelected(asset));
  };
};

export const startChangeAccount = (account: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(changeAccountSelected(account));
  };
};

export const startFetchAccountList = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    return getAllAccounts().then(accountList => {
      dispatch(fetchAccountList(accountList));
    }
  )}
}