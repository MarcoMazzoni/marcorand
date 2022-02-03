import React from 'react';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import Header from '../components/Header';
import { TransactionReceiptCustom } from '../interfaces/Send.interface';
import { bindActionCreators } from 'redux';
import { AppActions } from '../interfaces/Actions.interface';
import { ThunkDispatch } from 'redux-thunk';
import { AlgorandUser } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import { startChangeAsset, startChangeAccount, startFetchAccountList } from '../actions/nodes';
import { connect } from 'react-redux';
import { TransactionCard } from '../components/TransactionCard';

interface HomeState {
  res: string;
  accountList: string[];
}

interface HomeProps {}

type Props = HomeProps & LinkStateProps & LinkDispatchProps;

export class Home extends React.Component<Props, HomeState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      res: '',
      accountList: ['', '']
    };

    this.getBalance = this.getBalance.bind(this);
    this.getAllAccounts = this.getAllAccounts.bind(this);
  }

  async getBalance() {
    
  }

  async getAllAccounts() {
    let response = await fetch("/api/accountList");
    let jsonResponse = await response.json();
    this.setState({ accountList: [...jsonResponse.accounts] })
  }

  changeAsset(assetName: string) {
    this.props.startChangeAsset(assetName);
  }

  renderReceipt(receipt: TransactionReceiptCustom) {
    return Object.entries(receipt).map(key => {
      return (
        <h3 className="text-white mb-0">
          {key[0].toString()}: {key[1].toString()}
        </h3>
      );
    });
  }

  async componentDidMount() {
    document.body.classList.add('bg-default');
    await this.getAllAccounts();
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col xl="7">
              <TransactionCard
                {...this.props}
                accountList={this.state.accountList}
              />
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
  ownProps: HomeProps
): LinkStateProps => ({
  user: state.user
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: HomeProps
): LinkDispatchProps => ({
  startChangeAsset: bindActionCreators(startChangeAsset, dispatch),
  startChangeAccount: bindActionCreators(startChangeAccount, dispatch),
  startFetchAccountList: bindActionCreators(startFetchAccountList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
