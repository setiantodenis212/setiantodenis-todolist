import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import VectorNewActivity from "../../assets/img/vector-new-activity.webp";
import AddButton from "../../components/Buttons/AddButton";
import {
  addActivity,
  deleteActivity,
  getActivities,
} from "../../redux/actions/activity";

import ActivityCard from "../../components/Cards/ActivityCard";
import DeleteModal from "../../components/Modals/DeleteModal";

const Dashboard = () => {
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { activity: data } = useSelector((state) => state.activity);

  React.useEffect(() => {
    const _fetchData = async () => {
      await dispatch(getActivities());
    };

    _fetchData();
  }, [dispatch]);

  const _handleDeleteActivity = (isOpen, data = null) => {
    setModalDeleteShow(isOpen);
    if (isOpen) setModalData(data);
  };

  const _addActivity = async () => {
    setBtnLoading(true);

    await dispatch(addActivity());
    setBtnLoading(false);
  };

  const _deleteActivity = async () => {
    setModalLoading(true);

    setModalDeleteShow(false);
    await dispatch(deleteActivity(modalData?.id));
    setModalLoading(false);
  };

  return (
    <section className="todo-dashboard">
      <div className="container">
        <div className="todo-dashboard__header">
          <h1 className="todo-dashboard__title" data-cy="activity-title">
            Activity
          </h1>

          <AddButton
            data-cy="activity-add-button"
            loading={btnLoading}
            onClick={_addActivity}
          />
        </div>

        <div
          className={classNames("todo-dashboard__row", {
            centered: !data?.length,
          })}
        >
          {!data?.length ? (
            <button
              data-cy="activity-empty-state"
              className="todo-dashboard__empty"
              onClick={_addActivity}
            >
              <img
                loading="lazy"
                src={VectorNewActivity}
                alt="Vector New Activity"
                width="767px"
                height="490px"
              />
            </button>
          ) : (
            data?.map((item) => (
              <div key={item?.id} className="todo-dashboard__row-item">
                <ActivityCard
                  data={item}
                  onClick={() => history.push(`/detail/${item?.id}`)}
                  onDelete={() => _handleDeleteActivity(true, item)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <DeleteModal
        type={0}
        title={modalData?.title}
        show={modalDeleteShow}
        loading={modalLoading}
        onHide={() => _handleDeleteActivity(false)}
        onDelete={() => _deleteActivity()}
      />
    </section>
  );
};

export default Dashboard;
