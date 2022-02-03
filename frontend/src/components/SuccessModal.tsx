import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  ModalProps
} from 'reactstrap';
import { AlgorandTransactionReceipt, AlgorandDynamicFeesTxnReceipt } from '../interfaces/Send.interface';
import Truncate from 'react-truncate';
import Measure, { ContentRect } from 'react-measure';
import copy from 'copy-to-clipboard';
import { ExternalLink } from 'react-external-link';

interface SuccessModalProps extends ModalProps {
  receipt: AlgorandTransactionReceipt;
  dynamicFeesReceipt: AlgorandDynamicFeesTxnReceipt;
}

export class SuccessModal extends React.Component<SuccessModalProps> {
  copyToClipboard(text: string) {
    copy(text);
  }

  renderReceipt(receipt: AlgorandTransactionReceipt, contentRect: ContentRect) {
    return Object.entries(receipt).map(key => {
      let field: string = key[0].toString();
      let value: string = key[1].toString();
      let txn_link: string = 'https://goalseeker.purestake.io/algorand/testnet/transaction/';
      let block_link: string = 'https://goalseeker.purestake.io/algorand/testnet/block/';
      if (field === 'transaction_id')
        return (
          <h4 className="font-weight-normal">
            {field}:{' '}
            <ExternalLink href={txn_link + value}>
              <span className="font-weight-bold">{value}</span>
            </ExternalLink>
          </h4>
        );
      if (field === 'block')
        return (
          <h4 className="font-weight-normal">
            {field}:{' '}
            <ExternalLink href={block_link + value}>
              <span className="font-weight-bold">{value}</span>
            </ExternalLink>
          </h4>
        );
    });
  }

  renderDynamicFeesReceipt(receipt: AlgorandDynamicFeesTxnReceipt, contentRect: ContentRect) {
    return Object.entries(receipt).map(key => {
      let field: string = key[0].toString();
      let value: string = key[1].toString();
      let txn_link: string = 'https://goalseeker.purestake.io/algorand/testnet/transaction/';
      let block_link: string = 'https://goalseeker.purestake.io/algorand/testnet/block/';
      if (field.includes('txn_id'))
        return (
          <h4 className="font-weight-normal">
            {field}:{' '}
            <ExternalLink href={txn_link + value}>
            <span className="font-weight-bold">{value}</span>
            </ExternalLink>
          </h4>
        );
      if (field.includes('txn_block'))
        return (
          <h4 className="font-weight-normal">
            {field}:{' '}
            <ExternalLink href={block_link + value}>
            <span className="font-weight-bold">{value}</span>
            </ExternalLink>
          </h4>
        );
    });
  }

  render() {
    const divClassName = 'pl-lg-4';
    return (
      <Modal {...this.props} size="lg" className="modal" centered>
        <ModalHeader>
          <h2 className="mb-0">Transaction Successful!</h2>
        </ModalHeader>
        <ModalBody>
          <FormGroup tag="fieldset">
            <Measure bounds>
              {({ measureRef, contentRect }) => (
                <div ref={measureRef} className={divClassName}>
                  {this.props.isDynamicFees ? this.renderDynamicFeesReceipt(this.props.dynamicFeesReceipt, contentRect) : this.renderReceipt(this.props.receipt, contentRect)}
                </div>
              )}
            </Measure>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.props.onExit}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
