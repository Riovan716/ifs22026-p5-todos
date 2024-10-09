import React from "react";
import TodoList from "../components/TodoList";
import { getAllTodo, getTodo, editTodo, deleteTodo } from "../utils/data-todos";
import PropTypes from "prop-types";

function HomePageWrapper({ keyword }) {
  return <HomePage keyword={keyword} />;
}

HomePageWrapper.propTypes = {
  keyword: PropTypes.string.isRequired,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: getAllTodo(), // Ambil semua todo dari utilitas data
    };

    this.onTodoFinished = this.onTodoFinished.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onEditTitle = this.onEditTitle.bind(this);
  }

  // Fungsi untuk menyimpan perubahan judul dan deskripsi
  onEditTitle(id, newTitle, newDescription) {
    const targetTodo = getTodo(id);
    if (targetTodo) {
      editTodo({
        id,
        title: newTitle, // Simpan judul baru
        description: newDescription, // Simpan deskripsi baru
        is_finished: targetTodo.is_finished, // Status tetap
      });
      this.setState({
        todos: getAllTodo(), // Perbarui state todos
      });
    }
  }

  // Fungsi untuk menghapus todo
  onDeleteHandler(id) {
    deleteTodo(id);
    this.setState({
      todos: getAllTodo(),
    });
  }

  // Fungsi untuk menyelesaikan todo
  onTodoFinished(id, status) {
    const targetTodo = getTodo(id);
    if (targetTodo) {
      editTodo({
        id,
        title: targetTodo.title,
        description: targetTodo.description,
        is_finished: status,
      });
      this.setState({
        todos: getAllTodo(),
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <TodoList
            todos={this.state.todos}
            onDelete={this.onDeleteHandler}
            onTodoFinished={this.onTodoFinished}
            keywordSearch={this.props.keyword}
            onEditTitle={this.onEditTitle} // Pass fungsi untuk edit judul/deskripsi
          />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default HomePageWrapper;
