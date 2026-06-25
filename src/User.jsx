import { useEffect, useState } from "react";

const User = ({ username }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;

    const getUser = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        const data = await response.json();

        if (data.message === "Not Found") {
          setNotFound(true);
          setUser(null);
        } else {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  if (loading) {
    return (
      <h4 className="text-center text-light">
        Loading...
      </h4>
    );
  }

  if (notFound) {
    return (
      <h4 className="text-center text-danger">
        User Not Found
      </h4>
    );
  }

  if (!user) return null;

  return (
    <div className="d-flex justify-content-center">
      <div className="card github-card">

        <img
          src={user.avatar_url}
          alt="avatar"
          className="card-img-top profile-img"
        />

        <div className="card-body text-center">

          <h3>{user.name}</h3>

          <h5 className="text-secondary">
            @{user.login}
          </h5>

          <p>{user.bio}</p>

          <div className="stats">

            <div>
              <strong>{user.followers}</strong>
              <p>Followers</p>
            </div>

            <div>
              <strong>{user.following}</strong>
              <p>Following</p>
            </div>

            <div>
              <strong>{user.public_repos}</strong>
              <p>Repos</p>
            </div>

          </div>

          <p>
            📍 {user.location || "Location Not Available"}
          </p>

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-success"
          >
            View GitHub Profile
          </a>

        </div>
      </div>
    </div>
  );
};

export default User;