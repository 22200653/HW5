/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
  const [empdata, setEmpdata] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const navigate = useNavigate();

  const LoadDetail = (id) => navigate("/employee/detail/" + id);
  const LoadEdit = (id) => navigate("/employee/edit/" + id);

  const Removefunction = (id) => {
    if (window.confirm("정말 이 직원 정보를 삭제하시겠습니까?")) {
      fetch("https://68e1151293207c4b47963221.mockapi.io/api/v1/users/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("Removed successfully.");
          setEmpdata(empdata.filter((item) => item.id !== id));
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    fetch("https://68e1151293207c4b47963221.mockapi.io/api/v1/users")
      .then((res) => res.json())
      .then((resp) => setEmpdata(resp))
      .catch((err) => console.log(err.message));
  }, []);

  // 검색 + 정렬
  const filtered = empdata
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "id") return a.id - b.id;
      return a[sortKey].localeCompare(b[sortKey]);
    });

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-title text-center mt-3">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="mb-3 d-flex justify-content-between">
            <input
              type="text"
              placeholder="Search by name or email"
              className="form-control w-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="form-select w-25"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
            </select>
          </div>

          <div className="text-end mb-3">
            <Link to="employee/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button
                      onClick={() => LoadEdit(item.id)}
                      className="btn btn-success btn-sm me-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => Removefunction(item.id)}
                      className="btn btn-danger btn-sm me-1"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => LoadDetail(item.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
