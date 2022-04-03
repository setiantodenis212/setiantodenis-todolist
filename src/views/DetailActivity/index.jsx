import React from "react";
import classNames from "classnames";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/img/back.svg";
import { ReactComponent as EditIcon } from "../../assets/img/edit.svg";
import VectorNewList from "../../assets/img/vector-new-list.webp";
import ListCard from "../../components/Cards/ListCard";
import AddButton from "../../components/Buttons/AddButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addCardTodo,
  deleteCardTodo,
  getActivity,
  updateActivity,
  updateCardTodo,
} from "../../redux/actions/activity";
import AddListModal from "../../components/Modals/AddListModal";
import SortSelect from "../../components/Inputs/SortSelect";
import DeleteModal from "../../components/Modals/DeleteModal";

const DetailActivity = () => {
  const [isEdit, setIsEdit] = React.useState(false);

  const [priorityInput, setPriorityInput] = React.useState("very-high");
  const [modalData, setModalData] = React.useState(null);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalType, setModalType] = React.useState("add");
  const [nameInput, setNameInput] = React.useState("");

  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

  const [sortBy, setSortBy] = React.useState("terbaru");

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { detail: data } = useSelector((state) => state.activity);
  const sortData = data?.todo_items?.sort((a, b) => {
    if (sortBy === "terbaru") return b.id - a.id;
    if (sortBy === "terlama") return a.id - b.id;
    if (sortBy === "az") return a?.title?.localeCompare(b?.title);
    if (sortBy === "za") return b?.title?.localeCompare(a?.title);
    if (sortBy === "belum-selesai") return b.is_active - a.is_active;
    if (sortBy === "sudah-selesai") return a.is_active - b.is_active;

    return b.id - a.id;
  });

  React.useEffect(() => {
    const _fetchData = async () => {
      const status = await dispatch(getActivity(id, true));
      if (!status) history.replace("/");
    };

    _fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history, id]);

  const _resetInput = () => {
    setNameInput("");
    setPriorityInput("very-high");
  };

  const _handleShowEditModal = (item) => {
    _resetInput();
    setModalShow(true);
    setModalType("edit");
    setNameInput(item?.title);
    setPriorityInput(item?.priority);
    setModalData(item);
  };

  const _handleDeleteTodo = (isOpen, data = null) => {
    setModalDeleteShow(isOpen);
    if (isOpen) setModalData(data);
  };

  const _editLabel = async (title) => {
    await dispatch(updateActivity(id, title));
    setIsEdit(false);
  };

  const _createList = async () => {
    setModalLoading(true);

    const postData = {
      activity_group_id: id,
      title: nameInput,
      priority: priorityInput,
    };

    setModalShow(false);
    await dispatch(addCardTodo(id, postData));

    _resetInput();
    setModalLoading(false);
  };

  const _onCheckCard = async (cardId, isChecked) => {
    const findData = data?.todo_items?.findIndex((item) => item?.id === cardId);
    const getObjectData = Object.assign({}, data);
    getObjectData.todo_items[findData].is_active = isChecked ? 0 : 1;

    const patchData = { ...getObjectData?.todo_items[findData] };
    await dispatch(updateCardTodo(id, patchData, findData));
  };

  const _editTodoCard = async () => {
    setModalLoading(true);
    const findData = data?.todo_items?.findIndex(
      (item) => item?.id === modalData?.id
    );

    const patchData = {
      ...modalData,
      title: nameInput,
      priority: priorityInput,
    };

    await dispatch(updateCardTodo(id, patchData, findData));

    setModalShow(false);
    setModalLoading(false);
  };

  const _onDeleteCard = async () => {
    setModalLoading(true);
    setModalDeleteShow(false);
    await dispatch(deleteCardTodo(id, modalData?.id));
    setModalLoading(false);
  };

  return (
    <section className="todo-detail">
      <div className="container">
        <div className="todo-detail__header">
          <div className="todo-detail__navigator">
            <button
              data-cy="todo-back-button"
              onClick={() => history.replace("/")}
            >
              <BackIcon />
            </button>

            {!isEdit ? (
              <div>
                <h1
                  className="todo-detail__title"
                  data-cy="todo-title"
                  onClick={() => setIsEdit(true)}
                >
                  {data?.title}
                </h1>
              </div>
            ) : (
              <div>
                <input
                  autoFocus
                  className="todo-detail__title-edit"
                  defaultValue={data?.title}
                  onKeyDown={(e) =>
                    e.key === "Enter" && _editLabel(e.target.value)
                  }
                  onBlur={(e) => _editLabel(e.target.value)}
                />
              </div>
            )}

            <button
              data-cy="todo-title-edit-button"
              onClick={() => setIsEdit((state) => !state)}
            >
              <EditIcon />
            </button>
          </div>

          <div className="todo-detail__action">
            <SortSelect
              input={{ get: sortBy, set: setSortBy }}
              onSelected={(sort) => setSortBy(sort)}
            />

            <AddButton
              data-cy="todo-add-button"
              onClick={() => {
                setModalShow(true);
                setModalType("add");
                _resetInput();
              }}
            />
          </div>
        </div>

        <div
          className={classNames("todo-detail__content", {
            "no-data": !data?.todo_items?.length,
          })}
        >
          {!data?.todo_items?.length ? (
            <button
              className="todo-detail__empty"
              data-cy="todo-empty-state"
              onClick={() => {
                setModalShow(true);
                setModalType("add");
                _resetInput();
              }}
            >
              <img
                loading="lazy"
                src={VectorNewList}
                alt="Vector New Activity"
                width="541px"
                height="413px"
              />
            </button>
          ) : (
            sortData?.map((item) => (
              <ListCard
                key={item?.id}
                data={item}
                inputId={item?.id}
                onCheck={_onCheckCard}
                onEdit={() => _handleShowEditModal(item)}
                onDelete={() => _handleDeleteTodo(true, item)}
              />
            ))
          )}
        </div>
      </div>

      <AddListModal
        show={modalShow}
        type={modalType}
        loading={modalLoading}
        onAdd={_createList}
        onEdit={_editTodoCard}
        onHide={() => setModalShow(false)}
        priority={{ get: priorityInput, set: setPriorityInput }}
        name={{ get: nameInput, set: setNameInput }}
      />

      <DeleteModal
        type={1}
        onDelete={_onDeleteCard}
        title={modalData?.title}
        loading={modalLoading}
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />
    </section>
  );
};

export default DetailActivity;
