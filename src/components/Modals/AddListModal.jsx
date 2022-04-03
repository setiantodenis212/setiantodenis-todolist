import React from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as CloseIcon } from "../../assets/img/close.svg";

import SaveButton from "../Buttons/SaveButton";
import LabeledInput from "../Inputs/LabeledInput";
import PrioritySelect from "../Inputs/PrioritySelect";

const AddListModal = ({
  show,
  onHide,
  priority,
  name,
  type,
  onAdd,
  onEdit,
  loading,
  ...props
}) => {
  const onSubmit = type === "add" ? onAdd : onEdit;

  return (
    <Modal
      {...{ show, onHide, ...props }}
      animation={false}
      dialogClassName="list-todo-add"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-cy="modal-add"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <div>
            <div className="list-todo-add__title-wrapper">
              <div className="list-todo-add__title" data-cy="modal-add-title">
                {type === "add" ? "Tambah" : "Edit"} List Item
              </div>

              <button data-cy="modal-add-close-button" onClick={onHide}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <LabeledInput
          id="add-input"
          label="Nama List Item"
          input={name}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />

        <PrioritySelect input={priority} />
      </Modal.Body>
      <Modal.Footer>
        <SaveButton
          data-cy="modal-add-save-button"
          onClick={onSubmit}
          disabled={!priority.get || !name.get}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(AddListModal);
