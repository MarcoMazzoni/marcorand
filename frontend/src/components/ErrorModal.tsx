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

interface ErrorModalProps extends ModalProps {
  errorText: string;
}

export class ErrorModal extends React.Component<ErrorModalProps> {

  render() {
    return (
      <Modal {...this.props} centered>
        <ModalHeader className="text-uppercase text-muted mb-0">
          <h2 className="mb-0">Error!</h2>
        </ModalHeader>
        <ModalBody>
          <FormGroup tag="fieldset" className="font-weight-bold">
            {this.props.errorText}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.onExit}>
            Got it
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
