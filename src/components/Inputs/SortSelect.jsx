import React from "react";
// import { Collapse } from "react-bootstrap";
import { ReactComponent as CheckIcon } from "../../assets/img/check.svg";
import { ReactComponent as SortIcon } from "../../assets/img/sort-item.svg";
import { ReactComponent as SortDesc } from "../../assets/img/sort-desc.svg";
import { ReactComponent as SortAsc } from "../../assets/img/sort-asc.svg";
import { ReactComponent as SortAZ } from "../../assets/img/sort-az.svg";
import { ReactComponent as SortZA } from "../../assets/img/sort-za.svg";
import { ReactComponent as SortNotYet } from "../../assets/img/sort-not-yet.svg";

const sortList = [
  {
    img: SortDesc,
    title: "Terbaru",
    key: "terbaru",
  },
  {
    img: SortAsc,
    title: "Terlama",
    key: "terlama",
  },
  {
    img: SortAZ,
    title: "A-Z",
    key: "az",
  },
  {
    img: SortZA,
    title: "Z-A",
    key: "za",
  },
  {
    img: SortNotYet,
    title: "Belum Selesai",
    key: "belum-selesai",
  },
  {
    img: SortNotYet,
    title: "Sudah Selesai",
    key: "sudah-selesai",
  },
];

const SortSelect = ({ input, onSelected }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const _handleSort = (item) => {
    input.set(item.key);
    setIsOpen(false);
    onSelected(item.key);
  };

  return (
    <div className="sort-todo-selector">
      <button
        data-cy="todo-sort-button"
        className="sort-todo-selector__btn"
        onClick={() => setIsOpen((state) => !state)}
      >
        <SortIcon />
      </button>

      <div className="sort-todo-selector__dropdowns">
        {isOpen && (
          <div>
            <div
              id="dropdown-sort"
              className="sort-todo-selector__dropdown"
              data-cy="sort-parent"
            >
              {sortList.map((item) => (
                <button
                  key={item.key}
                  className="sort-todo-selector__item"
                  data-cy="sort-selection"
                  onClick={_handleSort.bind(this, item)}
                >
                  <div className="sort-todo-selector__labels">
                    <div data-cy="sort-selection-icon">
                      <item.img />
                    </div>
                    <span
                      className="sort-todo-selector__title"
                      data-cy="sort-selection-title"
                    >
                      {item.title}
                    </span>
                  </div>

                  {item.key === input.get && (
                    <div
                      className="sort-todo-selector__check active"
                      data-cy="sort-selection-selected"
                    >
                      <CheckIcon />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SortSelect);
