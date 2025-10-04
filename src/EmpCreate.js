import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpCreate = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(true);
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const empdata = { id, name, email, phone, active };

    fetch("https://68e1151293207c4b47963221.mockapi.io/api/v1/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card shadow">
              <div className="card-title text-center mt-3">
                <h2>Employee Create</h2>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label>ID</label>
                  <input
                    value={id}
                    disabled
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    onMouseDown={() => setValidation(true)}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                  {name.length === 0 && validation && (
                    <span className="text-danger">Enter the name</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                  {email.length > 0 &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                      <span className="text-danger">Invalid email format</span>
                    )}
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <label className="form-check-label">Is Active</label>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-success" type="submit">
                    Save
                  </button>
                  <Link to="/" className="btn btn-danger">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpCreate;
