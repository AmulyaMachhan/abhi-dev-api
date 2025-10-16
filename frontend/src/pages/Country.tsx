import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useCountryStore from "../store/useCountryStore";
import type { Country } from "../types/country";

function Country() {
  const {
    countries,
    fetchCountries,
    addCountry,
    updateCountry,
    deleteCountry,
  } = useCountryStore();

  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries, addCountry, updateCountry, deleteCountry]);

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
    setId(null);
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast("warning", "Country name is required");
      return;
    }

    try {
      if (id) {
        await updateCountry(id, { name });
        toast("success", "Country updated successfully!");
      } else {
        await addCountry({ name });
        toast("success", "Country added successfully!");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      toast("error", "Operation failed!");
    }
  };

  const handleEdit = (country: Country) => {
    setId(country._id);
    setName(country.name);
  };

  const handleDelete = async (countryId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the country!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCountry(countryId);
          toast("success", "Country deleted successfully!");
        } catch {
          toast("error", "Failed to delete country!");
        }
      }
    });
  };

  return (
    <div className="container">
      <h2>Manage Country</h2>

      {/* Country Form */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Enter country name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3 text-center">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              {id ? "Update Country" : "Add Country"}
            </button>
          </div>
        </div>
      </form>

      {/* Country Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c: Country) => (
            <tr key={c._id}>
              <td>{c._id}</td>
              <td>{c.name}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Country;
