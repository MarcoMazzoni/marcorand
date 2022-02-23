import * as React from 'react';
import {
  Card,
  CardHeader,
  Row,
  CardBody,
  Button,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Col,
  CardFooter
} from 'reactstrap';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';
import { AlgorandTransactionReceipt, AlgorandDynamicFeesTxnReceipt } from '../interfaces/Send.interface';
import { ErrorModal } from './ErrorModal';
import { SuccessModal } from './SuccessModal';
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";
import { USDC_ASSET_ID } from '../utils/utils';



interface TransactionCardProps {
  accountList: string[];
}

interface TransactionCardState {
  amountValue: string;
  amountValueCorrect: boolean;
  recepient: string;
  feePayer: string;
  receipt: AlgorandTransactionReceipt;
  dynamicFeesReceipt: AlgorandDynamicFeesTxnReceipt;
  dynamicFees: boolean;
  //selectedCheckboxes: Set<string>;
  //privateFor: string[];
  //submittedNodes: boolean;
  errorModalMsg: string;
  errorModalShow: boolean;
  successModalShow: boolean;
  setLoading: boolean;
}

type Props = TransactionCardProps & LinkStateProps & LinkDispatchProps;

export class TransactionCard extends React.Component<
  Props,
  TransactionCardState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      amountValue: '',
      amountValueCorrect: true,
      recepient: '',
      feePayer: '',
      receipt: {
        transaction_id: '',
        block: '',
        link: ''
      },
      dynamicFeesReceipt: {
        main_txn_id: '',
        main_txn_block: '',
        main_txn_link: '',
        fee_refund_txn_id: '',
        fee_refund_txn_block: '',
        fee_refund_txn_link: ''
      },
      dynamicFees: false,
      //selectedCheckboxes: new Set<string>(),
      //privateFor: [],
      //submittedNodes: false,
      errorModalMsg: '',
      errorModalShow: false,
      successModalShow: false,
      setLoading: false
    };

    this.validateAmount = this.validateAmount.bind(this);
    this.handleRecepientSelection = this.handleRecepientSelection.bind(this);
    this.handleFeePayerSelection = this.handleFeePayerSelection.bind(this);
    this.sendMoney = this.sendMoney.bind(this);
    this.addToSelectedCheckboxList = this.addToSelectedCheckboxList.bind(this);
    this.toggleDynamicFeesPayer = this.toggleDynamicFeesPayer.bind(this);
  }

  async sendMoney() {
    this.setState({setLoading: true})
    let recepient: string = this.state.recepient;
    let feePayer: string = this.state.feePayer;
    let amount: number = +this.state.amountValue;
    let fromAddress: string = this.props.user.accountSelected; //.slice(2);
    let asset: string = this.props.user.asset;
    
    let params = '?from=' + fromAddress + '&to=' + recepient; 
    let api = '/api';

    if (this.state.dynamicFees === false) {
      if (asset !== 'Algo'){
        api += '/assetTransaction/' + asset;
        if (asset === USDC_ASSET_ID)
          amount = amount * 1000000
        params = params + '&amt=' + amount;
      }
      else {
        api += '/algoTransaction';
        amount = amount * 1000000;
        params = params + '&amt=' + amount;
      } 
    }
    else { 
      if (asset !== 'Algo') {
        api += '/assetTxDynamicFees/' + asset;
        if (asset === USDC_ASSET_ID)
          amount = amount * 1000000
        params = params + '&amt=' + amount + '&fee_payer=' + feePayer;
      }
      else  {
        api += '/algoTxDynamicFees';
        amount = amount * 1000000;
        params = params + '&amt=' + amount + '&fee_payer=' + feePayer;
      } 
    }

    try {
      console.log('API: ' + api)
      const response = await fetch(api + params, { method: 'POST' });
      const data = await response.json();

      if(this.state.dynamicFees === false) {
        this.setState({
          receipt: { 
            transaction_id: data.transaction_id,
            block: data.block,
            link: data.link
          }, 
          successModalShow: true,
          setLoading: false
        });
      }
      else { 
        this.setState({
          dynamicFeesReceipt: { 
            main_txn_id: data.main_txn_id,
            main_txn_block: data.main_txn_block,
            main_txn_link: data.link_main_txn,
            fee_refund_txn_id: data.fee_refund_txn_id,
            fee_refund_txn_block: data.fee_refund_txn_block,
            fee_refund_txn_link: data.link_refund_txn
          }, 
          successModalShow: true,
          setLoading: false
        });
      }
    } catch(error) {
      this.setState({
        errorModalMsg: 'You must provide asset, recepient and amount!',
        errorModalShow: true,
        setLoading: false
      }
    )};
    
  }

  listAccounts() {
    let allAccounts: string[] = this.props.accountList;
    return Object.entries(allAccounts).map(account => {
      let newAccount: string = account[1];
      if(newAccount != this.props.user.accountSelected)
        return <option>{newAccount}</option>;
    });
  }

  listPossibleFeePayers() {
    let allAccounts: string[] = this.props.accountList;
    return Object.entries(allAccounts).map(account => {
      let newAccount: string = account[1];
      if(newAccount != this.props.user.accountSelected && newAccount != this.state.recepient)
        return <option>{newAccount}</option>;
    });
  }

  validateAmount(event: React.FormEvent) {
    let target = event.target as HTMLInputElement;
    let value = (event.target as HTMLInputElement).value;
    if (target.validity.valid)
      this.setState({ amountValue: value, amountValueCorrect: true });
    else this.setState({ amountValueCorrect: false });
  }

  handleRecepientSelection(event: React.FormEvent) {
    let value = (event.target as HTMLInputElement).value;
    this.setState({ recepient: value });
  }

  handleFeePayerSelection(event: React.FormEvent) {
    let value = (event.target as HTMLInputElement).value;
    this.setState({ feePayer: value });
  }

   toggleDynamicFeesPayer() {
     let newDynamicFeesState = !this.state.dynamicFees;
     this.setState({ dynamicFees: newDynamicFeesState });
   }


  addToSelectedCheckboxList(event: React.FormEvent) {
  //   let label = (event.target as HTMLInputElement).value;
  //   let newSelected: Set<string> = this.state.selectedCheckboxes;
  //   if (this.state.selectedCheckboxes.has(label)) {
  //     newSelected.delete(label);
  //   } else {
  //     newSelected.add(label);
  //   }
  //   this.setState({ selectedCheckboxes: newSelected });
  }

  renderFeePayerForm() {
    return (
      <Row>
        <Col lg="11">
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-first-name"
            >
              Fee payer
            </label>
            <InputGroup
              type="select"
              id="feePayerSelector"
              name="customSelect"
              onChange={this.handleFeePayerSelection}
            >
              <option value="">Select Address</option>
              {this.listPossibleFeePayers()}
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }


  render() {
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    return (
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent">
          <Row className="justify-content-center">
            <h2 className="mb-0">Welcome!</h2>
          </Row>
          <Row className="justify-content-center">
            <h2 className="mb-0">Make a Transaction</h2>
          </Row>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="pl-lg-4">
            <Row>
              <Col lg="11">
                <FormGroup>
                  <label className="form-control-label">{this.props.user.asset.includes('Algo') ? 'Amount in Algos' : 'Amount'}</label>
                  <Input
                    type="text"
                    placeholder="Amount to send"
                    pattern="^-?[0-9]\d*\.?\d*$"
                    value={this.state.amountValue}
                    onChange={this.validateAmount}
                    valid={this.state.amountValueCorrect}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="11">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    Recepient
                  </label>
                  <InputGroup
                    type="select"
                    id="recepientSelector"
                    name="customSelect"
                    onChange={this.handleRecepientSelection}
                  >
                    <option value="">Select Address</option>
                    {this.listAccounts()}
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="11">
                <FormGroup>
                  <div className="h5 mt-4">
                    <InputGroup
                      type="checkbox"
                      label="Dynamic Fees transaction: make another account pay for your fees"
                      id="dynamicFeesCustomSwitch"
                      name="customSwitch"
                      onChange={this.toggleDynamicFeesPayer}
                    ></InputGroup>
                  </div>
                </FormGroup>
              </Col>
            </Row>
            {this.state.dynamicFees ? this.renderFeePayerForm() : ''}
            
          </div>
        </CardBody>
      
        
        <CardFooter className="bg-transparent pb-5">
          <div className="text-center">
            {this.state.setLoading ?   
              <div className="mt-4"><PulseLoader color='#5e72e4' css={override} loading={this.state.setLoading} size={30} /></div>
            : <Button className="mt-4" color="primary" type="button" onClick={this.sendMoney}> 
            Send Money
            </Button>
            }           
            <ErrorModal
              errorText={this.state.errorModalMsg}
              isOpen={this.state.errorModalShow}
              onExit={() => this.setState({ errorModalShow: false })}
            ></ErrorModal>
            <SuccessModal
              receipt={this.state.receipt}
              dynamicFeesReceipt={this.state.dynamicFeesReceipt}
              isDynamicFees={this.state.dynamicFees}
              isOpen={this.state.successModalShow}
              onExit={() => this.setState({ successModalShow: false })}
            ></SuccessModal>
          </div>
        </CardFooter>
      </Card> 

    );
  }
}
