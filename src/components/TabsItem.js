import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

function TabsItem({
  tabId,
  title,
  isActive,
  todos,
  onDelete,
  onTodoFinished,
  onEditTitle,
}) {
  // Tambahkan onEditTitle

  return (
    <div
      className={`tab-pane fade ${isActive ? "show active" : ""}`}
      id={tabId}
    >
      <h3>{title}</h3>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onTodoFinished={onTodoFinished}
          onEditTitle={onEditTitle} // Teruskan ke TodoItem
          isDetail={false}
        />
      ))}
    </div>
  );
}

TabsItem.propTypes = {
  tabId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onTodoFinished: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired, // Tambahkan propTypes
};

export default TabsItem;
