import * as React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { assetList, CONIO_TOKEN_ASSET_ID, USDC_ASSET_ID } from '../utils/utils';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';

interface ClickableCardProps {
  cardTitle: string;
  cardContent: string;
  iconColor: string;
  iconType: string;
}

interface ClickableCardState {
  modal: boolean;
  radio: string;
}

type Props = ClickableCardProps & LinkStateProps & LinkDispatchProps;

export class ClickableHeaderCard extends React.Component<
  Props,
  ClickableCardState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false,
      radio: ''
    };
    this.toggle = this.toggle.bind(this);
    this.onRadioSelect = this.onRadioSelect.bind(this);
    this.onConfirmClickAccount = this.onConfirmClickAccount.bind(this);
    this.onConfirmClickAsset = this.onConfirmClickAsset.bind(this);
  }

  toggle() {
    const oldState: boolean = this.state.modal;
    this.setState({ modal: !oldState });
  }

  onConfirmClickAsset() {
    let assetName: string = this.state.radio;
    this.props.startChangeAsset(assetName);
    this.toggle();
  }

  onConfirmClickAccount() {
    this.props.startChangeAccount(this.state.radio);
    this.toggle();
  }

  onRadioSelect(val: string) {
    this.setState({ radio: val });
  }

  printAssetLabel(asset: string) {
    switch(asset) { 
      case USDC_ASSET_ID: { 
         return ' - USDC'
      } 
      case CONIO_TOKEN_ASSET_ID: { 
         return ' - ConioTKN' 
      } 
      default: { 
         return ''
      } 
   } 
  }

  listAssets() {
    return assetList.map((asset: string) => {
      return (
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="radio1"
              onClick={() => this.onRadioSelect(asset)}
            />{' '}
            {asset}{this.printAssetLabel(asset)}
          </Label>
        </FormGroup>
      );
    });
  }

  listAccounts() {
    return this.props.user.accountList.map((account: string) => {
        return (
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio1"
                onClick={() => this.onRadioSelect(account)}
              />{' '}
              {account}
            </Label>
          </FormGroup>
        );
      });
  }

  isAssetCard(): boolean {
    if (this.props.cardTitle.includes('Asset')) return true;
    return false;
  }

  componentDidMount() {
    this.props.startFetchAccountList()
  }

  showList() {
    if (this.isAssetCard()) {
      return this.listAssets();
    } else {
      return this.listAccounts();
    }
  }

  render() {
    return (
      <>
        <Card
          onClick={this.toggle}
          style={{ cursor: 'pointer' }}
          className="card-stats mb-4 mb-xl-0"
        >
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  {this.props.cardTitle}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">
                  {this.props.cardContent}
                </span>
              </div>
              <Col className="col-auto">
                <div className={this.props.iconColor}>
                  <i className={this.props.iconType} />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.modal} toggle={this.toggle}  size="lg">
          <ModalHeader
            toggle={this.toggle}
            className="text-uppercase text-muted mb-0"
          >
            {this.isAssetCard() ? 'Choose Asset to Transfer' : 'Choose Address'}
          </ModalHeader>
          <ModalBody>
            <FormGroup tag="fieldset">
              <legend>
                {' '}
                {this.isAssetCard() ? 'Transfer:' : 'Login with:'}
              </legend>
              {this.showList()}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => {
                this.isAssetCard()
                  ? this.onConfirmClickAsset()
                  : this.onConfirmClickAccount();
              }}
            >
              Confirm
            </Button>{' '}
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
