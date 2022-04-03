import React from "react";
import { BrowserRouter as Routers, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MessageModal from "./components/Modals/MessageModal";
import routes from "./routes";
import { setModalMsg } from "./redux/actions/display";

const App = () => {
  const { modal_msg } = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const _handleHideModal = () =>
    dispatch(setModalMsg(false, modal_msg.message, modal_msg.type));

  return (
    <>
      <header className="todo-header">
        <div className="container" data-cy="header-background">
          <h2 className="todo-header__title" data-cy="header-title">
            TO DO LIST APP
          </h2>
        </div>
      </header>

      <main className="todo-main">
        <Routers>
          <Switch>
            {routes.map(({ component: Component, ...props }, key) => (
              <Route
                {...{ key }}
                {...props}
                render={(prop) => <Component {...prop} />}
              />
            ))}
          </Switch>
        </Routers>
      </main>

      <MessageModal
        show={modal_msg.show}
        msg={modal_msg.message}
        onHide={_handleHideModal}
        type={modal_msg.type}
      />
    </>
  );
};

export default App;
