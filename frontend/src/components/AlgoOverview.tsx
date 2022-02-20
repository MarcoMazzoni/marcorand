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
import { LatestRounds } from './LatestRounds';
import { LatestTxs } from './LatestTxs';
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";


const api = '/api';

interface AlgoOverviewState {
  lastRound: number;
}

type Props = LinkStateProps & LinkDispatchProps;

export class AlgoOverview extends React.Component<
  Props,
  AlgoOverviewState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lastRound: 0
    };
  }

  async componentDidMount() {
    const response = await fetch(api + '/lastRound', { method: 'GET' });
    const data = await response.json();
    this.setState({
      lastRound: data
    })
  }

  getLatestRounds = () => {
    if (this.state.lastRound) {
      return <LatestRounds lastRound={this.state.lastRound}></LatestRounds>;
    }
  }

  getLatestTxs = () => {
    if (this.state.lastRound) {
      return <LatestTxs lastRound={this.state.lastRound}></LatestTxs>;
    }
  }



}

export default AlgoOverview;

