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
import Truncate from 'react-truncate';
import Measure from 'react-measure';
import copy from 'copy-to-clipboard';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';
import { MinimalAlgoTransactionInfo } from '../interfaces/Send.interface';

const api = '/api';

interface LatestTxsProps {
  lastRound: number;
}

interface LatestTxsState {
  transactions: MinimalAlgoTransactionInfo[];
}

export class LatestTxs extends React.Component<LatestTxsProps, LatestTxsState>{
  constructor(props: LatestTxsProps) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    this.getTxs();
  }

  async getTxs() {
    const { lastRound } = this.props;

    // get the block transaction
    let params = '?round=' + lastRound;
    const response = await fetch(api + '/getTransactionsByRound' + params, { method: 'GET' });
    const transactions = await response.json();

    let txsDetails: MinimalAlgoTransactionInfo[] = [];

    // check if there is any transaction
    if (transactions) {
      for (let i = 0; i < 2; i = i + 1) {
        let tx = transactions[i];
        txsDetails.push(
          {
            transaction_id: tx.transaction_id,
            round: tx.round,
            from: tx.sender,
            to: tx.receiver,
            fees: tx.fees
          }
        );
      }
    }

    this.setState({
      transactions: txsDetails,
    });

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.renderTransactions = this.renderTransactions.bind(this);
  };

  copyToClipboard(text: string) {
    copy(text);
  }

  renderTransactions() {
    return this.state.transactions.map(tx => {
      return (
        <Measure bounds>
            {({ measureRef, contentRect }) => (
              <div ref={measureRef}>
                <Row>
                  <h4 className="font-weight-normal">
                    Round:{' '}
                    <span className="font-weight-bold">
                      {tx.round}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    From:{' '}
                    <span className="font-weight-bold">
                      {tx.from}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    To:{' '}
                    <span className="font-weight-bold">
                      {tx.to}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    Fees:{' '}
                    <span className="font-weight-bold">
                      {tx.fees}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    Input:{' '}
                    <span className="font-weight-bold">
                      <a
                        href="#"
                        onClick={() =>
                          this.copyToClipboard(tx.transaction_id)
                        }
                      >
                        <Truncate
                          lines={1}
                          ellipsis={<span>... </span>}
                          width={
                            contentRect.bounds ? contentRect.bounds.width : 0
                          }
                        >
                          {tx.transaction_id}
                        </Truncate>
                      </a>
                    </span>
                  </h4>
                </Row>
              
              </div>
            )}
          </Measure>
      );
    });
  }


  render() {
    return (
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent">
          <Row className="justify-content-center">
            <h3 className="mb-0">
              <span className="font-weight-normal"> Latest Transactions </span>
            </h3>
          </Row>
        </CardHeader>

        <CardBody className="px-lg-5 py-lg-5">
          
        </CardBody>
      </Card>
    );
  }
  
}

export default LatestTxs;
