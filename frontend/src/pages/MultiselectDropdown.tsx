import { useState } from "react";
import Select from "react-select";

function MultiselectDropdown() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const languageOptions = [
    { value: "hindi", label: "Hindi" },
    { value: "english", label: "English" },
    { value: "german", label: "German" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
  ];

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
            <label className="form-label">Languages</label>
            <Select
              options={languageOptions}
              isMulti
              isSearchable
              value={selectedLanguages}
              onChange={(selected) => setSelectedLanguages(selected)}
              placeholder="Select languages..."
            />
          </div>

          <div className="col-md-4 d-flex align-items-end justify-content-end">
            <button type="submit" className="btn btn-primary w-100">Add Employee</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MultiselectDropdown;