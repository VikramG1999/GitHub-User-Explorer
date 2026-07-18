import { useEffect, useState } from "react";

const User = ({ username }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [usingBackup, setUsingBackup] = useState(false);

  useEffect(() => {
    if (!username) {
      setUser(null);
      return;
    }

    const getUser = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        setUsingBackup(false);

        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        // Username not found
        if (response.status === 404) {
          setNotFound(true);
          setUser(null);
          return;
        }

        // GitHub API rate limit exceeded
        if (response.status === 403) {
          const backup = await fetch(`${import.meta.env.BASE_URL}user.json`);
          const backupData = await backup.json();

          setUsingBackup(true);
          setUser(backupData);

          return;
        }

        const data = await response.json();
        setUser(data);

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
          {usingBackup && (
            <div className="alert alert-warning py-2 mb-3">
              ⚠ GitHub API rate limit reached. Showing offline backup profile.
            </div>
          )}

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