import React from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as WarningIcon } from "../../assets/img/warning.svg";

const DeleteModal = ({
  show,
  onHide,
  title,
  type,
  onDelete,
  loading,
  ...props
}) => {
  const types = type === 0 ? "activity" : "List item";

  return (
    <Modal
      {...{ show, onHide, ...props }}
      animation={false}
      dialogClassName="modal-todo-delete"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-cy="modal-delete"
    >
      <Modal.Body>
        <div data-cy="modal-delete-icon">
          <WarningIcon />
        </div>

        <div className="modal-todo-delete__title" data-cy="modal-delete-title">
          Apakah anda yakin menghapus {types + " "}
          <br />
          <b className="modal-todo-delete__highlight">“{title}”?</b>
        </div>

        <div className="modal-todo-delete__action">
          <button
            className="modal-todo-delete__button no"
            data-cy="modal-delete-cancel-button"
            onClick={onHide}
          >
            Batal
          </button>

          <button
            className="modal-todo-delete__button yes"
            data-cy="modal-delete-confirm-button"
            onClick={onDelete}
            disabled={loading}
          >
            Hapus
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(DeleteModal);
