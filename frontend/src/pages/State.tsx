import { useState, useEffect } from "react";
import useCountryStore from "../store/useCountryStore";
import useStateStore from "../store/useStateStore";
import type { Country } from "../types/country";
import type { State as StateType } from "../types/state";

function State() {
  const { countries } = useCountryStore();
  const { states, fetchStates, addState, deleteState } = useStateStore();

  const [countryId, setCountryId] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!countryId || !stateName.trim()) {
      alert("Please select a country and enter a state name");
      return;
    }

    try {
      await addState({ name: stateName, country: countryId });
      setStateName("");
      setCountryId("");
      alert("State added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add state");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this state?")) return;

    try {
      await deleteState(id);
      alert("State deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete state");
    }
  };

  return (
    <div className="container">
      <h2>Manage State</h2>

      {/* Add State Form */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <select
              className="form-control"
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country: Country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter State"
              className="form-control"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3 text-center">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Add State
            </button>
          </div>
        </div>
      </form>

      {/* States Table */}
      <h3>States List</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>State Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state: StateType) => {
            const country = countries.find((c) => c._id === state.country);
            return (
              <tr key={state._id}>
                <td>{state._id}</td>
                <td>{state.name}</td>
                <td>{country ? country.name : "Unknown"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(state._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default State;
