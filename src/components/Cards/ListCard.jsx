import React from "react";
import ItemCheckbox from "../Inputs/ItemCheckbox";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/img/edit.svg";
import { priorityList } from "../Inputs/PrioritySelect";

import classNames from "classnames";

function ListCard({ inputId, data, active, onEdit, onDelete, onCheck }) {
  const checkPriority = priorityList.find(
    (item) => item.key === data?.priority
  );

  return (
    <div className="list-card-todo" data-cy="todo-item">
      <div className="list-card-todo__content">
        <div className="list-card-todo__checkbox">
          <ItemCheckbox
            id={inputId}
            checked={data?.is_active === 0}
            onChange={(e) => onCheck(data?.id, e.target.checked)}
            data-cy="todo-item-checkbox"
          />
        </div>

        <div className="list-card-todo__indicator">
          <div
            className={checkPriority.className}
            data-cy="todo-item-priority-indicator"
          />
        </div>

        <div
          className={classNames("list-card-todo__title", {
            active: data?.is_active === 0,
          })}
          data-cy="todo-item-title"
        >
          {data?.title}
        </div>

        <div className="list-card-todo__edit">
          <button data-cy="todo-item-edit-button" onClick={() => onEdit()}>
            <EditIcon />
          </button>
        </div>
      </div>

      <div className="list-card-todo__action">
        <button data-cy="todo-item-delete-button" onClick={onDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default React.memo(ListCard);
