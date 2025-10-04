import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmpDetail = () => {
  const { empid } = useParams();
  const [empdata, setEmpdata] = useState({});

  useEffect(() => {
    fetch("https://68e1151293207c4b47963221.mockapi.io/api/v1/users/" + empid)
      .then((res) => res.json())
      .then((resp) => setEmpdata(resp))
      .catch((err) => console.log(err.message));
  }, [empid]);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-title text-center mt-3">
          <h2>Employee Details</h2>
        </div>
        {empdata && (
          <div className="card-body">
            <h4>
              <b>{empdata.name}</b> ({empdata.id})
            </h4>
            <p>Email: <b>{empdata.email}</b></p>
            <p>Phone: <b>{empdata.phone}</b></p>
            <p>Status: <b>{empdata.active ? "Active" : "Inactive"}</b></p>
            <Link className="btn btn-danger mt-3" to="/">
              Back to List
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpDetail;
