import React from "react";
import classNames from "classnames";

import { ReactComponent as Add } from "../../assets/img/add.svg";

const AddButton = ({ className, ...props }) => {
  return (
    <button {...props} className={classNames("todo-add-btn", className)}>
      <Add />
      <div className="todo-add-btn__title">Tambah</div>
    </button>
  );
};

export default React.memo(AddButton);
