import React from "react";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete.svg";
import dayjs from "dayjs";

const ActivityCard = ({ onClick, onDelete, data }) => {
  return (
    <div className="activity-card-todo" data-cy="activity-item">
      <div {...{ onClick }} className="activity-card-todo__body">
        <div
          className="activity-card-todo__title"
          data-cy="activity-item-title"
        >
          {data?.title}
        </div>
      </div>

      <div className="activity-card-todo__action">
        <div className="activity-card-todo__date" data-cy="activity-item-date">
          {dayjs(data?.created_at).locale("id").format("DD MMMM YYYY")}
        </div>

        <button onClick={onDelete} data-cy="activity-item-delete-button">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default React.memo(ActivityCard);
