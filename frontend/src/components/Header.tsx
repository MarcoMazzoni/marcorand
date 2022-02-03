import React from 'react';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { ClickableHeaderCard } from './ClickableHeaderCard';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';

interface HeaderProps {
//  accountList: string[];
}

interface HeaderState {
  balance: string;
}

type Props = HeaderProps & LinkStateProps & LinkDispatchProps;

class Header extends React.Component<Props, HeaderState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      balance: ''
    };
    this.getMyBalance = this.getMyBalance.bind(this);
  }

  async getMyBalance() {
    let acc: string = this.props.user.accountSelected;
    let asset: string = this.props.user.asset;
    if (acc !== '' && acc.length == 58 && asset !== 'Choose') {
      asset = this.props.user.asset.startsWith('Algo') ? '0' : asset;
      let balance: Response = await fetch("/api/assetBalance/" + acc + '?asset_id=' + asset);
    
      balance.json().then(
        data => this.setState({
          balance: data.balance
        })
      )
    }
  }

  componentDidMount() {
    
  }

  render() {
    this.getMyBalance();
    return (
      <>
        <div className="header bg-gradient-blue pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
