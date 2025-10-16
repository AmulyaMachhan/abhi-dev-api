import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

function Pagination() {
  const [students, setStudents] = useState([
    { id: 1, name: "Paul", email: "paul@gmail.com", mobile: "9889799977", country: "India", state: "Punjab", district: "Mohali" },
    { id: 2, name: "Anil", email: "anil@gmail.com", mobile: "9876543210", country: "India", state: "UP", district: "Lucknow" },
    { id: 3, name: "Ravi", email: "ravi@gmail.com", mobile: "9123456789", country: "India", state: "Bihar", district: "Patna" },
    { id: 4, name: "Neha", email: "neha@gmail.com", mobile: "9871112233", country: "India", state: "Delhi", district: "New Delhi" }
  ]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Student</h2>
        <div className="d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Rows per page:</label>
          <select className="form-select form-select-sm w-auto">
            <option>3</option>
            <option>6</option>
            <option>9</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Country</th>
              <th>State</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mobile}</td>
                <td>{student.country}</td>
                <td>{student.state}</td>
                <td>{student.district}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                  <button className="btn btn-warning btn-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="flex-grow-1 d-flex justify-content-center">
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <button className="page-link">
                  <ChevronLeft size={16} />
                </button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">3</button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
              <li className="page-item">
                <button className="page-link">10</button>
              </li>
              <li className="page-item">
                <button className="page-link">
                  <ChevronRight size={16} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;