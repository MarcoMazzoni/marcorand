export const CHANGE_ASSET_SELECTED = 'CHANGE_ASSET_SELECTED';
export const CHANGE_ACCOUNT_SELECTED = 'CHANGE_ACCOUNT_SELECTED';
export const FETCH_ACCOUNT_LIST = 'FETCH_ACCOUNT_LIST';


export interface ChangeAssetSelectedAction {
  type: typeof CHANGE_ASSET_SELECTED;
  asset: string;
}

export interface ChangeAccountSelectedAction {
  type: typeof CHANGE_ACCOUNT_SELECTED;
  account: string;
}

export interface FetchAccountListAction {
  type: typeof FETCH_ACCOUNT_LIST;
  accountList: string[];
}

export type UserActionTypes = ChangeAssetSelectedAction | ChangeAccountSelectedAction | FetchAccountListAction;

export type AppActions = UserActionTypes; //  | SomeOtherActionTypes1 | SomeOtherActionTypes2
