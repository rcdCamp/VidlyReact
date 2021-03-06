import React, { Component } from "react";
import { Link } from "react-router-dom";

import Table from "./table";
import auth from "../../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: auth.isAdmin()
        ? movie => <Link to={"/movies/" + movie._id}>{movie.title}</Link>
        : null
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie._id)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    if (auth.isAdmin()) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
