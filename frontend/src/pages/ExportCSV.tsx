import { useState } from "react";

function ExportCSV() {
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
        <button className="btn btn-outline-success btn-sm d-flex align-items-center gap-1 shadow-sm rounded-pill">
        <i className="bi bi-download"></i> Export
        </button>
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
    </div>
  );
}

export default ExportCSV;