function CheckBox() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Employee</h2>
      <form className="p-3 border rounded shadow-sm bg-light">
        <div className="row mb-3">
          <div className="col">
            <input type="text" placeholder="Enter Name" className="form-control" />
          </div>
          <div className="col">
            <input type="email" placeholder="Enter Email" className="form-control" />
          </div>
          <div className="col">
            <input type="text" placeholder="Enter Mobile" className="form-control" />
          </div>
        </div>

        {/* Row 2 */}
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
          <div className="col-md-4">
            <label className="form-label d-block">Gender</label>
            <div className="form-check form-check-inline">
              <input type="radio" name="gender" className="form-check-input" defaultChecked />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name="gender" className="form-check-input" />
              <label className="form-check-label">Female</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name="gender" className="form-check-input" />
              <label className="form-check-label">Other</label>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label d-block">Languages</label>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Hindi</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">English</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">German</label>
            </div>
          </div>

          <div className="col-md-4 d-flex align-items-end justify-content-end">
            <button type="submit" className="btn btn-primary w-100">Add Employee</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckBox;
