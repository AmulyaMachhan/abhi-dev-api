function Searching() {
  return (
    <div className="container">
      <h2>Search Student</h2>
      <form>
        <div className="row mb-3">
          <div className="col">
            <input type="text" placeholder="Enter Name" className="form-control" />
          </div>
          <div className="col">
            <input type="text" placeholder="Enter Email" className="form-control" />
          </div>
          <div className="col">
            <input type="text" placeholder="Enter Mobile" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="text" placeholder="Enter Country" className="form-control" />
          </div>
          <div className="col">
            <input type="text" placeholder="Enter State" className="form-control" />
          </div>
          <div className="col">
            <input type="text" placeholder="Enter District" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col"></div>
          <div className="col">
            <button className="btn btn-primary">Advance Search</button>
          </div>
          <div className="col"></div>
        </div>

        <div className="row mb-3">
            <table>
                <thead>
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
                    <tr>
                        <td>Paul</td>
                        <td>pual@gmail.com</td>
                        <td>9889799977</td>
                        <td>India</td>
                        <td>Punjab</td>
                        <td>Mohali</td>
                        <td><button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                        <button className="btn btn-warning">View</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

      </form>
    </div>
  )
}

export default Searching
