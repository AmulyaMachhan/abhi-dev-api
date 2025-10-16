function District() {
  return (
    <div className="container">
      <h2>Manage District</h2>
      <form>
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
        <div className="row mb-3 text-center">
          <div className="col">
            <button className="btn btn-primary">Add District</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default District
