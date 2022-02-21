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
import { MinimalAlgoRoundInfo } from '../interfaces/Send.interface';

const api = '/api';

interface LatestRoundsProps {
  lastRound: number;
}

interface LatestRoundsState {
  rounds: MinimalAlgoRoundInfo[];
}

export class LatestRounds extends React.Component<LatestRoundsProps, LatestRoundsState>{
  constructor(props: LatestRoundsProps) {
    super(props);
    this.state = {
      rounds: []
    };
  }

  async componentDidMount() {
    this.getRounds();
  }

  async getRounds() {
    const { lastRound } = this.props;
    let numberOfRounds = 5;

    // get the block transaction
    let fromRound = lastRound - numberOfRounds
    let params = '?from=' + fromRound + "&to=" + lastRound;
    const response = await fetch(api + '/getRounds' + params, { method: 'GET' });
    const rounds = await response.json();

    let roundsDetails: MinimalAlgoRoundInfo[] = [];

    // check if there is any transaction
    if (rounds) {
      for (let i = 0; i < numberOfRounds; i = i + 1) {
        let r = rounds[i];
        roundsDetails.push(
          {
            round: r.round,
            proposer: r.proposer,
            txs: r.num_of_txs,
          }
        );
      }
    }

    this.setState({
      rounds: roundsDetails
    });
  };

}


export default LatestRounds;