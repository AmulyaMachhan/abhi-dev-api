function ImageUpload() {
  return (
    <div className="container">
      <h2>Manage Customer</h2>
      <form>
        <div className="row mb-3">
          <div className="col">
            <input type="text" placeholder="Enter Name" className="form-control" />
          </div>
          <div className="col">
            <input type="text" placeholder="Enter Email" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="text" placeholder="Enter Mobile" className="form-control" />
          </div>
          <div className="col">
            <input type="file" className="form-control" />
          </div>
        </div>
        <div className="row mb-3 text-center">
          <div className="col">
            <button className="btn btn-primary">Add Customer</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ImageUpload
