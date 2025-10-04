import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmpDetail = () => {
  const { empid } = useParams();
  const [empdata, setEmpdata] = useState({});

  useEffect(() => {
    fetch("https://68e1151293207c4b47963221.mockapi.io/api/v1/users" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmpdata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      <div className="card" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>Employee Create</h2>
        </div>
        <div className="card-body"></div>
        {empdata && (
          <div>
            <h2>
              The Employee name is : <b>{empdata.name}</b> ({empdata.id})
            </h2>
            <h3>Contact Details</h3>
            <h5>
              Email is : <b>{empdata.email}</b>
            </h5>
            <h5>
              Phone is : <b>{empdata.phone}</b>
            </h5>
            <Link className="btn btn-danger" to="/">
              Back to List
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpDetail;
