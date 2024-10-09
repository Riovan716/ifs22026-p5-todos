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
      todos: getAllTodo(), // Mengambil semua todo dari utilitas data
    };

    this.onTodoFinished = this.onTodoFinished.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onEditTitle = this.onEditTitle.bind(this);
  }

  // Fungsi utilitas untuk memperbarui todo
  updateTodo(id, updatedFields) {
    const targetTodo = getTodo(id);
    if (!targetTodo) {
      console.error(`Todo with id ${id} not found`);
      return;
    }

    editTodo({
      id,
      title: updatedFields.title || targetTodo.title, // Jika tidak ada perubahan, gunakan nilai sebelumnya
      description: updatedFields.description || targetTodo.description,
      is_finished:
        updatedFields.is_finished !== undefined
          ? updatedFields.is_finished
          : targetTodo.is_finished,
    });

    this.setState({
      todos: getAllTodo(), // Memperbarui state setelah perubahan
    });
  }

  // Fungsi untuk menyimpan perubahan judul dan deskripsi
  onEditTitle(id, newTitle, newDescription) {
    this.updateTodo(id, { title: newTitle, description: newDescription });
  }

  // Fungsi untuk menyelesaikan todo
  onTodoFinished(id, status) {
    this.updateTodo(id, { is_finished: status });
  }

  // Fungsi untuk menghapus todo
  onDeleteHandler(id) {
    deleteTodo(id);
    this.setState({
      todos: getAllTodo(),
    });
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
