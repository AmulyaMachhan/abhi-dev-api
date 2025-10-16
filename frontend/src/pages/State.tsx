import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useCountryStore from "../store/useCountryStore";
import useStateStore from "../store/useStateStore";
import type { Country } from "../types/country";
import type { State, State as StateType } from "../types/state";

function State() {
  const { countries, fetchCountries } = useCountryStore();
  const { states, fetchStates, addState, updateState, deleteState } =
    useStateStore();

  const [stateId, setStateId] = useState<string | null>(null);
  const [countryId, setCountryId] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");

  useEffect(() => {
    fetchCountries();
    fetchStates();
  }, [fetchCountries, fetchStates]);

  const toast = (icon: "success" | "error" | "warning", title: string) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const resetForm = () => {
    setStateId(null);
    setCountryId("");
    setStateName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryId || !stateName.trim()) {
      toast("warning", "Please select a country and enter a state name");
      return;
    }

    try {
      if (stateId) {
        await updateState(stateId, { name: stateName, country: countryId });
        toast("success", "State updated successfully!");
      } else {
        await addState({ name: stateName, country: countryId });
        toast("success", "State added successfully!");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      toast("error", "Operation failed!");
    }
  };

  const handleEdit = (state: StateType) => {
    setStateId(state._id);
    setStateName(state.name);
    setCountryId(state.country?._id || "");
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the state!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteState(id);
        toast("success", "State deleted successfully!");
      } catch (err) {
        console.error(err);
        toast("error", "Failed to delete state!");
      }
    }
  };

  return (
    <div className="container">
      <h2>Manage State</h2>

      {/* Add / Update State Form */}
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
              {stateId ? "Update State" : "Add State"}
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
          {states.map((state: State) => {
            return (
              <tr key={state._id}>
                <td>{state._id}</td>
                <td>{state.name}</td>
                <td>{state.country ? state.country.name : "Unknown"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(state)}
                  >
                    Edit
                  </button>
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
