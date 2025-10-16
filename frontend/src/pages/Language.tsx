import { useEffect, useState } from "react";
import useLanguageStore from "../store/useLanguageStore";
import type { Language } from "../types/language";
import Swal from "sweetalert2";

function Language() {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");

  const {
    fetchLanguages,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    languages,
  } = useLanguageStore();

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

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  const resetForm = () => {
    setName("");
    setId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast("warning", "Language name is required");
      return;
    }

    try {
      if (id) {
        await updateLanguage(id, { name });
        toast("success", "Language updated successfully!");
      } else {
        await addLanguage({ name });
        toast("success", "Language added successfully!");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      toast("error", "Operation failed!");
    }
  };

  const handleEdit = (l: Language) => {
    setName(l.name);
    setId(l._id);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the language!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteLanguage(id);
          toast("success", "Language deleted successfully!");
        } catch {
          toast("error", "Failed to delete Language!");
        }
      }
    });
  };
  return (
    <div className="container">
      <h2>Manage Language</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Enter Language name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3 text-center">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              {id ? "Update Language" : "Add Language"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((l: Language) => (
            <tr key={l._id}>
              <td>{l._id}</td>
              <td>{l.name}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(l)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(l._id)}
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

export default Language;
