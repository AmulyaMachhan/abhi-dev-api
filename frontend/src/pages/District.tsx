import { useEffect, useState } from "react";
import useDistrictStore from "../store/useDistrictStore";
import type { District } from "../types/district";
import type { State } from "../types/state";
import type { Country } from "../types/country";
import useCountryStore from "../store/useCountryStore";
import useStateStore from "../store/useStateStore";
import Swal from "sweetalert2";

function District() {
  const {
    districts,
    fetchDistricts,
    addDistrict,
    updateDistrict,
    deleteDistrict,
  } = useDistrictStore();
  const { countries, fetchCountries } = useCountryStore();
  const { states, fetchStatesByCountry } = useStateStore();

  const [id, setId] = useState<string | null>("");
  const [name, setName] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");

  useEffect(() => {
    fetchDistricts();
    fetchCountries();
  }, [fetchCountries, fetchDistricts]);

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

  const handleCountrySelection = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCountryId = e.target.value;
    setCountryId(newCountryId);

    if (newCountryId) {
      await fetchStatesByCountry(newCountryId);
    } else {
      setStateId("");
    }
  };
  const resetForm = () => {
    setId(null);
    setCountryId("");
    setStateId("");
  };

  const handleEdit = (d: District) => {
    setId(d._id);
    setName(d.name);
    setStateId(d.state._id);
    setCountryId(d.country._id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!countryId || !stateId || !name.trim()) {
      toast(
        "warning",
        "Please select a country and state and then enter a district name"
      );
      return;
    }
    try {
      if (!id) {
        await addDistrict({ name, state: stateId, country: countryId });
        toast("success", "District added successfully!");
      } else {
        await updateDistrict(id, { name, state: stateId, country: countryId });
        console.log(districts);
        toast("success", "District updated successfully!");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      toast("error", "Operation failed!");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the district!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteDistrict(id);
        toast("success", "District deleted successfully!");
      } catch (err) {
        console.error(err);
        toast("error", "Failed to delete district!");
      }
    }
  };

  return (
    <div className="container">
      <h2>Manage District</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <select
              className="form-control"
              value={countryId}
              onChange={(e) => handleCountrySelection(e)}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country: Country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
            <select
              className="form-control"
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
              disabled={!countryId || states.length === 0}
              required
            >
              <option value="">Select State</option>
              {states.map((s: State) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter District"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3 text-center">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              {id ? "Update District" : "Add District"}
            </button>
          </div>
        </div>
      </form>

      {/* Districts Table */}
      <h3>Districts List</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>District</th>
            <th>State</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {districts?.map((d: District) => {
            return (
              <tr key={d._id}>
                <td>{d._id}</td>
                <td>{d.name}</td>
                <td>{d.state ? d.state.name : "Unknown"}</td>
                <td>{d.country ? d.country.name : "Unknown"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(d._id)}
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

export default District;
