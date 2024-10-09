import React, { useState } from "react"; // Tambahkan import useState
import * as Icon from "react-feather";
import { formatDate } from "../utils/tools";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Tambahkan import PropTypes

function TodoItem({ todo, onDelete, onTodoFinished, isDetail, onEditTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  let buttonAction;
  if (!todo.is_finished) {
    buttonAction = (
      <button
        onClick={() => onTodoFinished(todo.id, 1)}
        className="btn btn-outline-success"
      >
        <Icon.Check />
        <span>Selesai</span>
      </button>
    );
  } else {
    buttonAction = (
      <button
        onClick={() => onTodoFinished(todo.id, 0)}
        className="btn btn-outline-danger"
      >
        <Icon.X />
        <span>Belum Selesai</span>
      </button>
    );
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle antara mode edit dan non-edit
    if (!isEditing) {
      // Reset nilai saat keluar dari mode edit
      setNewTitle(todo.title);
      setNewDescription(todo.description);
    }
  };

  const handleSaveEdit = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Judul dan deskripsi tidak b boleh kosong.");
      return;
    }
    onEditTitle(todo.id, newTitle, newDescription); // Mengirim ID dan nilai yang diedit
    setIsEditing(false); // Kembali ke mode non-edit
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5>
              {!isDetail ? (
                <Link to={`/detail/${todo.id}`}>{todo.title}</Link>
              ) : (
                todo.title
              )}
            </h5>
            <div>
              {todo.is_finished ? (
                <div>
                  <Icon.Check />
                  <span className="ms-2 text-success">
                    {formatDate(todo.updated_at)}
                  </span>
                </div>
              ) : null}
              <div>
                <Icon.Clock />
                <span className="ms-2 text-muted">
                  {formatDate(todo.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div>{buttonAction}</div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-control"
                  placeholder="Edit judul"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="form-control mt-2"
                  placeholder="Edit deskripsi"
                />
              </>
            ) : (
              <p>{todo.description}</p>
            )}
          </div>
          {!isDetail ? (
            <div className="d-flex">
              <div className="text-end">
                <button
                  onClick={handleEditToggle}
                  className={`btn ${
                    isEditing ? "btn-secondary" : "btn-primary"
                  } me-2`}
                >
                  {isEditing ? "Batal" : "Edit"}
                </button>
                {isEditing && (
                  <button
                    onClick={handleSaveEdit}
                    className="btn btn-success me-2"
                  >
                    Simpan
                  </button>
                )}
                <button
                  onClick={() => {
                    // eslint-disable-next-line no-undef
                    Swal.fire({
                      title: "Hapus Todo",
                      // eslint-disable-next-line quotes
                      text: `Apakah kamu yakin ingin mehapus todo:
${todo.title}?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Ya, Tetap Hapus",
                      customClass: {
                        confirmButton: "btn btn-danger me-3 mb-4",
                        cancelButton: "btn btn-secondary mb-4",
                      },
                      buttonsStyling: false,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // eslint-disable-next-line no-undef
                        onDelete(todo.id);
                      }
                    });
                  }}
                  className="btn btn-danger"
                >
                  <Icon.Trash />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_finished: PropTypes.number.isRequired,
    cover: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onTodoFinished: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired,
  onEditTitle: PropTypes.func.isRequired, // Pastikan prop ini ada
};

export default TodoItem;
