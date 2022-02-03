export const USDC_ASSET_ID = '10458941'
export const CONIO_TOKEN_ASSET_ID = '13168300'
export const assetList: string[] = ['Algo', CONIO_TOKEN_ASSET_ID, USDC_ASSET_ID];

export const getAllAccounts = async (): Promise<string[]> => {
  let response = await fetch("/api/accountList");
  let jsonResponse = await response.json();
  let accountList: string[] = jsonResponse.accounts
  return accountList;
}


