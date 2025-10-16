function RadioButton() {
  return (
    <div className="container">
      <h2>Manage Student</h2>
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
        <div className="row mb-3 text-center">
          <div className="col">
            Gender
            <input type="radio" name="gender" checked  /> Male
            <input type="radio" name="gender" /> Female
            <input type="radio" name="gender" /> Other
          </div>
          <div className="col">
            <button className="btn btn-primary">Add Student</button>
          </div>
          <div className="col"></div>          
        </div>
      </form>
    </div>
  )
}

export default RadioButton;