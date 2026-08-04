import { useState } from "react";
import User from "./User";

const SearchUser = () => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setUsername(input.trim());
  };

  return (
    <div className="container py-5">

      {/* Header */}

      <div className="text-center mb-5">

        <i
          className="bi bi-github text-white"
          style={{ fontSize: "70px" }}
        ></i>

        <h1 className="display-4 fw-bold text-white mt-3">
          GitHub User Explorer
        </h1>

        <p className="lead text-secondary">
          Search and explore any public GitHub profile
        </p>

      </div>

      {/* Search Box */}

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <form onSubmit={handleSubmit}>

            <div className="input-group input-group-lg shadow">

              <span className="input-group-text bg-dark border-secondary text-light">

                <i className="bi bi-search"></i>

              </span>

              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Enter GitHub Username..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <button
                className="btn btn-success px-4 fw-bold"
                type="submit"
              >
                Search
              </button>

            </div>

          </form>

        </div>

      </div>

      <div className="mt-5">
        <User username={username} />
      </div>

    </div>
  );
};

export default SearchUser;