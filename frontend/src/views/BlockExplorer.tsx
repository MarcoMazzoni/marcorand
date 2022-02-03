import * as React from 'react';
import { AlgorandUser } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import Header from '../components/Header';
import {
  Container,
  Card,
  CardHeader,
  Row,
  CardBody,
  Button,
  Input,
  FormGroup,
  Col,
  CardFooter,
  InputGroup
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../interfaces/Actions.interface';
import { bindActionCreators } from 'redux';
import { startChangeAsset, startChangeAccount, startFetchAccountList } from '../actions/nodes';
import { connect } from 'react-redux';
import { ResultExplorerCard } from '../components/ResultExplorerCard';
import { ErrorModal } from '../components/ErrorModal';
import { Transaction } from '../interfaces/Send.interface'


enum RadioOptions {
  txHash,
  blockHash
}

interface BlockExplorerProps {}

interface BlockExplorerState {
  showCards: boolean;
  txList: Transaction[];
  selectedOption: RadioOptions;
  errorModalMsg: string;
  errorModalShow: boolean;
}

type Props = BlockExplorerProps & LinkStateProps & LinkDispatchProps;

class BlockExplorer extends React.Component<Props, BlockExplorerState> {
  blockRef: React.RefObject<HTMLInputElement>;
  txRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      showCards: false,
      txList: [],
      selectedOption: RadioOptions.txHash,
      errorModalMsg: '',
      errorModalShow: false
    };
    this.blockRef = React.createRef();
    this.txRef = React.createRef();
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
    this.showResponseCards = this.showResponseCards.bind(this);
    this.searchByTxHash = this.searchByTxHash.bind(this);
    this.renderSearcher = this.renderSearcher.bind(this);
  }

  async searchByTxHash(txHash: string) {

  }

  async searchByBlockHash(blockNum: string) {
    console.log(blockNum);

  // else {
  //     this.setState({
  //       errorModalMsg:
  //         'The Block hash you are looking for\ndoes not exist on the Blockchain!',
  //       errorModalShow: true
  //     });
  //   }
 
  }

  async onSearchClick() {
    this.onClearClick();
    if (this.state.selectedOption === RadioOptions.txHash) {
      let txHash: string = '';
      if (this.txRef.current) {
        txHash = this.txRef.current.value;
        await this.searchByTxHash(txHash);
      }
    } else {
      let blockNum: string;
      if (this.blockRef.current) {
        blockNum = this.blockRef.current.value;
        await this.searchByBlockHash(blockNum);
      }
    }
  }

  onClearClick() {
    this.setState({ showCards: false });
  }

  handleRadioChange(option: RadioOptions) {
    this.setState({
      selectedOption: option
    });
  }

  showResponseCards() {
    if (this.state.txList.length !== 0) {
      return this.state.txList.map((value: Transaction, index: number) => {
        return (
          <ResultExplorerCard user={this.props.user} transaction={value} />
        );
      });
    }
  }

  componentDidMount() {
    document.body.classList.add('bg-default');
  }

  renderSearcher() {
    switch (this.state.selectedOption) {
      case RadioOptions.txHash:
        return (
          <Row>
            <Col lg="11">
              <FormGroup>
                <label className="form-control-label">Transaction Hash</label>
                <Input
                  type="text"
                  innerRef={this.txRef}
                  placeholder="Enter tx hash"
                />
              </FormGroup>
            </Col>
          </Row>
        );
      case RadioOptions.blockHash:
        return (
          <Row>
            <Col lg="11">
              <FormGroup>
                <label className="form-control-label">
                  Block Number
                </label>
                <Input
                  type="text"
                  placeholder="Enter block hash"
                  innerRef={this.blockRef}
                />
              </FormGroup>
            </Col>
          </Row>
        );
      default:
        return '';
    }
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col xl="10">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Explorer
                      </h6>
                      <h2 className="mb-0">Looking for a Transaction?</h2>
                      <h4 className="mb-0">
                        Insert a block number or transaction hash
                      </h4>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="pl-lg-4">
                    <Row className="justify-content-center">
                      <FormGroup>
                        <InputGroup
                          type="radio"
                          label="Transaction Hash"
                          id="radio1"
                          checked={
                            this.state.selectedOption === RadioOptions.txHash
                          }
                          onChange={() =>
                            this.handleRadioChange(RadioOptions.txHash)
                          }
                          inline
                        ></InputGroup>
                        <InputGroup
                          type="radio"
                          label="Block Hash or Block Number"
                          id="radio2"
                          checked={
                            this.state.selectedOption === RadioOptions.blockHash
                          }
                          onChange={() =>
                            this.handleRadioChange(RadioOptions.blockHash)
                          }
                          inline
                        ></InputGroup>
                      </FormGroup>
                    </Row>
                    {this.renderSearcher()}
                  </div>
                </CardBody>

                <CardFooter className="bg-transparent">
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="default"
                      type="button"
                      onClick={() => this.onSearchClick()}
                    >
                      Search
                    </Button>
                    <Button
                      className="mt-4"
                      color="primary"
                      type="button"
                      onClick={() => this.onClearClick()}
                    >
                      Clear
                    </Button>
                    <ErrorModal
                      errorText={this.state.errorModalMsg}
                      isOpen={this.state.errorModalShow}
                      onExit={() => this.setState({ errorModalShow: false })}
                    ></ErrorModal>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5 justify-content-center">
            <Col xl="7">
              {this.state.showCards ? this.showResponseCards() : ''}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export interface LinkStateProps {
  user: AlgorandUser;
}
export interface LinkDispatchProps {
  startChangeAsset: (assetCode: string) => void;
  startChangeAccount: (account: string) => void;
  startFetchAccountList: () => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: BlockExplorerProps
): LinkStateProps => ({
  user: state.user
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: BlockExplorerProps
): LinkDispatchProps => ({
  startChangeAsset: bindActionCreators(startChangeAsset, dispatch),
  startChangeAccount: bindActionCreators(startChangeAccount, dispatch),
  startFetchAccountList: bindActionCreators(startFetchAccountList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockExplorer);
