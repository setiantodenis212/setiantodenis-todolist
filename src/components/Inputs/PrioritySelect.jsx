import React from "react";
import classNames from "classnames";
// import { Collapse } from "react-bootstrap";
import { ReactComponent as checkIcon } from "../../assets/img/check.svg";

export const priorityList = [
  {
    className: "todo-indicator red",
    title: "Very High",
    key: "very-high",
  },
  {
    className: "todo-indicator yellow",
    title: "High",
    key: "high",
  },
  {
    className: "todo-indicator green",
    title: "Medium",
    key: "normal",
  },
  {
    className: "todo-indicator blue",
    title: "Low",
    key: "low",
  },
  {
    className: "todo-indicator purple",
    title: "Very Low",
    key: "very-low",
  },
];

const PrioritySelect = ({ input, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getInput = priorityList.find((item) => item.key === input.get);

  return (
    <div className="outline-todo-selector" {...props}>
      <div
        className="outline-todo-selector__label"
        data-cy="modal-add-priority-title"
      >
        Priority
      </div>

      <div className="outline-todo-selector__dropdowns">
        <button
          className={classNames("outline-todo-selector__btn", {
            active: isOpen,
          })}
          data-cy="modal-add-priority-dropdown"
          onClick={() => setIsOpen((state) => !state)}
          aria-controls="dropdown-`item`"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <div className="outline-todo-selector__btn-title">
              Pilih Priority
            </div>
          ) : (
            <>
              <div className={getInput.className} />
              <div className="outline-todo-selector__btn-title">
                {getInput.title}
              </div>
            </>
          )}
        </button>

        <div className="outline-todo-selector__wrapper">
          {isOpen && (
            <div>
              <div
                className="outline-todo-selector__dropdown"
                id="dropdown-item"
              >
                {priorityList?.map((item) => (
                  <button
                    key={item.key}
                    data-cy="modal-add-priority-item"
                    className="outline-todo-selector__dropdown-item"
                    onClick={() => {
                      setIsOpen(false);
                      input.set(item.key);
                    }}
                  >
                    <div className={item.className} />
                    <div className="outline-todo-selector__dropdown-title">
                      {item.title}
                    </div>

                    {item.key === input.get && (
                      <div className="active">
                        <checkIcon />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PrioritySelect);
