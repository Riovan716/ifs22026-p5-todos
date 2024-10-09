import React from "react";
import PropTypes from "prop-types";

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    // Initialize the state with default values for title and description
    this.state = {
      title: "",
      description: "",
    };

    // Bind event handlers to 'this' to ensure they can access the class context
    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onDescriptionChangeEventHandler =
      this.onDescriptionChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  // Event handler for title input change
  onTitleChangeEventHandler(event) {
    // Prevents the title from exceeding 50 characters
    if (event.target.value.length > 50) return;
    // Update the state with the new title value while preserving other state properties
    this.setState((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
      };
    });
  }

  // Event handler for description input change
  onDescriptionChangeEventHandler(event) {
    // Update the state with the new description value while preserving other state properties
    this.setState((prevState) => {
      return {
        ...prevState,
        description: event.target.value,
      };
    });
  }

  // Event handler for form submission
  onSubmitEventHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Pass the current state (title and description) to the parent component's onAddTodo function
    this.props.onAddTodo(this.state);
    // Reset the state to clear the form inputs
    this.setState({
      title: "",
      description: "",
    });
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12">
        <div className="mb-3 mt-4">
          <div className="border p-3">
            <h3>Tambah Todo</h3>
            <hr />
            {/* Form to handle adding a new todo item */}
            <form id="form" onSubmit={this.onSubmitEventHandler}>
              {/* Input field for the title of the todo */}
              <div className="form-group mb-3">
                <label htmlFor="inputTitle" className="formlabel">
                  Title
                </label>
                <div className="input-group">
                  <input
                    onInput={this.onTitleChangeEventHandler}
                    type="text"
                    className="form-control"
                    id="inputTitle"
                    value={this.state.title} // Controlled component with state as value
                  />
                  {/* Display remaining character count for the title */}
                  <span className="input-group-text">
                    {50 - this.state.title.length}
                  </span>
                </div>
              </div>

              {/* Textarea for the description of the todo */}
              <div className="form-group mb-3">
                <label htmlFor="inputDescription" className="formlabel">
                  Description
                </label>
                <textarea
                  onInput={this.onDescriptionChangeEventHandler}
                  className="form-control"
                  id="inputDescription"
                  rows="5"
                  value={this.state.description} // Controlled component with state as value
                ></textarea>
              </div>

              {/* Submit button to save the new todo item */}
              <div className="form-group mb-3 text-end">
                <button type="submit" className="btn btn-primary">
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Define prop types for the component to ensure onAddTodo is a required function
TodoInput.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoInput;
