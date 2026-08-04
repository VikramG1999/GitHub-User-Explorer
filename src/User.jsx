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
      <div className="text-center mt-5">
        <div
          className="spinner-border text-success"
          style={{ width: "4rem", height: "4rem" }}
        ></div>

        <h4 className="text-light mt-4">
          Loading GitHub Profile...
        </h4>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="alert alert-danger text-center mt-5 shadow">
        <h4 className="mb-0">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          User Not Found
        </h4>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="row justify-content-center">

      <div className="col-lg-8">

        <div className="card bg-dark text-light border-secondary shadow-lg rounded-4">

          <div className="card-body p-5">

            {usingBackup && (
              <div className="alert alert-warning text-center">

                <i className="bi bi-exclamation-circle-fill me-2"></i>

                GitHub API limit reached.
                <br />
                Showing offline backup profile.

              </div>
            )}

            {/* Profile */}

            <div className="text-center">

              <img
                src={user.avatar_url}
                alt="avatar"
                className="rounded-circle border border-4 border-success shadow"
                width="180"
                height="180"
              />

              <h2 className="fw-bold mt-4">

                {user.name || "No Name"}

              </h2>

              <h5 className="text-secondary">

                @{user.login}

              </h5>

              <p className="mt-3">

                {user.bio || "No Bio Available"}

              </p>

            </div>

            <hr className="my-4" />

            {/* Stats */}

            <div className="row text-center g-3">

              <div className="col-md-4">

                <div className="card bg-black border-success h-100">

                  <div className="card-body">

                    <i className="bi bi-people-fill fs-1 text-success"></i>

                    <h3 className="mt-2">

                      {user.followers}

                    </h3>

                    <p className="mb-0">
                      Followers
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card bg-black border-success h-100">

                  <div className="card-body">

                    <i className="bi bi-person-plus-fill fs-1 text-success"></i>

                    <h3 className="mt-2">

                      {user.following}

                    </h3>

                    <p className="mb-0">
                      Following
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card bg-black border-success h-100">

                  <div className="card-body">

                    <i className="bi bi-journal-code fs-1 text-success"></i>

                    <h3 className="mt-2">

                      {user.public_repos}

                    </h3>

                    <p className="mb-0">
                      Repositories
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <hr className="my-4" />

            {/* Information */}

            <div className="row gy-3">

              <div className="col-md-6">

                <p>
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i>

                  <strong>Location:</strong>

                  <br />

                  {user.location || "Not Available"}

                </p>

              </div>

              <div className="col-md-6">

                <p>

                  <i className="bi bi-building text-info me-2"></i>

                  <strong>Company:</strong>

                  <br />

                  {user.company || "Not Available"}

                </p>

              </div>

              <div className="col-md-6">

                <p>

                  <i className="bi bi-calendar-event text-warning me-2"></i>

                  <strong>Joined:</strong>

                  <br />

                  {new Date(user.created_at).toLocaleDateString()}

                </p>

              </div>

              <div className="col-md-6">

                <p>

                  <i className="bi bi-link-45deg text-success me-2"></i>

                  <strong>Website:</strong>

                  <br />

                  {user.blog
                    ? (
                      <a
                        href={user.blog}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user.blog}
                      </a>
                    )
                    : "Not Available"}

                </p>

              </div>

            </div>

            <div className="d-grid mt-4">

              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success btn-lg fw-bold"
              >
                <i className="bi bi-github me-2"></i>

                View GitHub Profile

              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default User;