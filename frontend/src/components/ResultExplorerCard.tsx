import * as React from 'react';
import { Card, CardHeader, Row, CardBody } from 'reactstrap';
import Truncate from 'react-truncate';
import Measure from 'react-measure';
import copy from 'copy-to-clipboard';
import { AlgorandUser } from '../interfaces/Node.interface';
import { Transaction } from '../interfaces/Send.interface'


interface ResultProps {
  transaction: Transaction;
  user: AlgorandUser;
}

interface ResultState {
  response: string;
}

export class ResultExplorerCard extends React.Component<
  ResultProps,
  ResultState
> {
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      response: ''
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  copyToClipboard(text: string) {
    copy(text);
  }


  renderDetails() {
    let response: string = this.state.response;
    let recepient = '';
    let amount = '';
    //let amount = decodedData.inpust[1].names[0];
    return (
      <Row>
        <h4 className="font-weight-normal">
          This is a public transaction!{'\n'}
          <span className="font-weight-bold">
            {this.props.transaction.from} transfered {amount} SCUDO to
            {recepient}
          </span>
        </h4>
      </Row>
    );
    
  }

  componentDidMount() {
  }

  render() {
    const divClassName = 'pl-lg-4';
    return (
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent">
          <Row className="justify-content-center">
            <h3 className="mb-0">
              <span className="font-weight-normal"> Transaction </span>
              <span className="font-weight-bold">
                {this.props.transaction.txnId}
              </span>
            </h3>
          </Row>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Measure bounds>
            {({ measureRef, contentRect }) => (
              <div ref={measureRef} className={divClassName}>
                {this.state.response ? this.renderDetails() : ''}
                <Row>
                  <h4 className="font-weight-normal">
                    BlockNumber:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.block}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    From:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.from}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    To:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.to}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    Fees:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.fees}
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
                          this.copyToClipboard(this.props.transaction.txnId)
                        }
                      >
                        <Truncate
                          lines={1}
                          ellipsis={<span>... </span>}
                          width={
                            contentRect.bounds ? contentRect.bounds.width : 0
                          }
                        >
                          {this.props.transaction.txnId}
                        </Truncate>
                      </a>
                    </span>
                  </h4>
                </Row>
                <Row className="justify-content-center">
                  <h4 className="font-weight-normal">
                    Res:{' '}
                    <span className="font-weight-bold">
                      <a
                        href="#"
                        onClick={() =>
                          this.copyToClipboard(this.props.transaction.txnId)
                        }
                      >
                        <Truncate
                          lines={1}
                          ellipsis={<span>... </span>}
                          width={
                            contentRect.bounds ? contentRect.bounds.width : 0
                          }
                        >
                          {this.state.response}
                        </Truncate>
                      </a>
                    </span>
                  </h4>
                </Row>
              </div>
            )}
          </Measure>
        </CardBody>
      </Card>
    );
  }
}
