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
      <h1 className="text-center text-light mb-4">
        GitHub User Explorer
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="input-group mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Enter GitHub Username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="btn btn-success"
            type="submit"
          >
            Search
          </button>

        </div>
      </form>

      <User username={username} />

    </div>
  );
};

export default SearchUser;