import React from "react";
import classNames from "classnames";

const SaveButton = ({ className, ...props }) => {
  return (
    <button {...props} className={classNames("todo-save-btn", className)}>
      <div className="todo-save-btn__title">Simpan</div>
    </button>
  );
};

export default React.memo(SaveButton);
