import classNames from "classnames";
import React from "react";

const LabeledInput = ({ label, className, id, input, ...props }) => {
  return (
    <div className={classNames("outline-todo-input", className)}>
      <label
        htmlFor={id}
        className="outline-todo-input__label"
        data-cy="modal-add-name-title"
      >
        {label}
      </label>

      <input
        {...{ id, ...props }}
        onChange={(e) => input.set(e.target.value)}
        value={input.get}
        type="text"
        className="outline-todo-input__text"
        data-cy="modal-add-name-input"
        placeholder="Tambahkan nama list item"
      />
    </div>
  );
};

export default React.memo(LabeledInput);
