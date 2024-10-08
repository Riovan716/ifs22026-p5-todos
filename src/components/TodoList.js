import React from "react";
import TabsItem from "./TabsItem";
import PropTypes from "prop-types";

function TodoList({
  todos,
  onDelete,
  onTodoFinished,
  keywordSearch,
  onEditTitle,
}) {
  // Tambahkan onEditTitle di sini
  let todosNotFinished = todos.filter((todo) => !todo.is_finished);
  let todosFinished = todos.filter((todo) => todo.is_finished);

  if (keywordSearch) {
    todosNotFinished = todosNotFinished.filter(function (todo) {
      return todo.title.toLowerCase().includes(keywordSearch.toLowerCase());
    });
    todosFinished = todosFinished.filter(function (todo) {
      return todo.title.toLowerCase().includes(keywordSearch.toLowerCase());
    });
  }

  todosNotFinished.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  todosFinished.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const titleTodoFinished = `Todo Telah Selesai (${todosFinished.length})`;
  const titleTodoNotFinished = `Todo Belum Selesai (${todosNotFinished.length})`;

  return (
    <div className="col-lg-12 col-md-12">
      <div className="mt-4 mb-5">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#not-finished"
              type="button"
              role="tab"
              aria-controls="not-finished"
              aria-selected="true"
            >
              Belum Selesai
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#finished"
              type="button"
              role="tab"
              aria-controls="finished"
              aria-selected="false"
            >
              Telah Selesai
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <TabsItem
            tabId={"not-finished"}
            title={titleTodoNotFinished}
            isActive={true}
            todos={todosNotFinished}
            onDelete={onDelete}
            onTodoFinished={onTodoFinished}
            onEditTitle={onEditTitle} // Pastikan diteruskan ke TabsItem
          />
          <TabsItem
            tabId={"finished"}
            title={titleTodoFinished}
            isActive={false}
            todos={todosFinished}
            onDelete={onDelete}
            onTodoFinished={onTodoFinished}
            onEditTitle={onEditTitle} // Pastikan diteruskan ke TabsItem
          />
        </div>
      </div>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onTodoFinished: PropTypes.func.isRequired,
  keywordSearch: PropTypes.string.isRequired,
  onEditTitle: PropTypes.func.isRequired, // Tambahkan propTypes
};

export default TodoList;
