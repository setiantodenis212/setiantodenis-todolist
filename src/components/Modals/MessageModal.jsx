import React from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as warningIcon } from "../../assets/img/warning.svg";
import { ReactComponent as infoIcon } from "../../assets/img/info.svg";

const MessageModal = ({ show, onHide, msg, type, ...props }) => {
  const IconStatus = type !== 0 ? infoIcon : warningIcon;

  return (
    <Modal
      {...{ show, onHide, ...props }}
      animation={false}
      dialogClassName="modal-todo-information"
      aria-labelledby="contained-modal-title-vcenter"
      data-cy="modal-information"
      size="lg"
      centered
    >
      <Modal.Body>
        <div className="modal-todo-information__section">
          <span
            className="modal-todo-information__icon"
            data-cy="modal-information-icon"
          >
            <IconStatus />
          </span>

          <div
            className="modal-todo-information__title"
            data-cy="modal-information-title"
          >
            {msg}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(MessageModal);
