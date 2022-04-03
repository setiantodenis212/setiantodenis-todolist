import React from "react";

const ItemCheckbox = ({ id, ...props }) => {
  const dataCy = props["data-cy"];
  delete props["data-cy"];

  return (
    <div className="item-checkbox" data-cy={dataCy}>
      <input
        aria-hidden={true}
        style={{ display: "none" }}
        type="checkbox"
        {...{ id, ...props }}
      />
      <label className="item-checkbox__content" htmlFor={id}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.9165 6.99995L5.83317 9.91662L11.6665 4.08328"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>
      </label>
    </div>
  );
};

export default React.memo(ItemCheckbox);
