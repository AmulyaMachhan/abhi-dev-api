import React, { useEffect, useState } from "react";
import useCustomerStore from "../store/useCustomerStore";
import type { Customer } from "../types/customer";

const PHONE_PATTERN = /^[0-9]{7,15}$/;
const MAX_IMAGE_BYTES = 2_000_000; // 2 MB - adjust as needed
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];

export default function ImageUpload() {
  const { createCustomer, getCustomers, customers } = useCustomerStore();

  const [name, setName] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // fetch customers once on mount
  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // assume getCustomers is stable in store (or wrap in useCallback in store)

  // preview handling separate from the above effect
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setImageFile(null);
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(f.type)) {
      setErrorMsg("Unsupported file type. Use PNG/JPG/GIF.");
      setImageFile(null);
      return;
    }
    if (f.size > MAX_IMAGE_BYTES) {
      setErrorMsg("Image is too large. Max 2 MB allowed.");
      setImageFile(null);
      return;
    }

    setImageFile(f);
  };

  const resetForm = () => {
    setName("");
    setPhoneNo("");
    setEmail("");
    setImageFile(null);
    setPreviewUrl(null);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg("Please enter a name.");
      return;
    }
    if (!PHONE_PATTERN.test(phoneNo.trim())) {
      setErrorMsg("Please enter a valid phone number (7–15 digits).");
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("phoneNumber", phoneNo.trim());
    formData.append("email", email.trim());
    if (imageFile) formData.append("image", imageFile);

    try {
      setIsSubmitting(true);
      await createCustomer(formData); // store action should accept FormData
      // refresh list after successful create
      await getCustomers();
      resetForm();
      setErrorMsg(null);
      // replace alert with toast if you have one
      alert("Customer created successfully.");
    } catch (err) {
      console.error("Failed to create customer", err);
      setErrorMsg("Failed to create customer. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manage Customer</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone Number <span aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-control"
              placeholder="Enter phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
              aria-required
            />
            <div className="form-text">Only digits, 7–15 characters.</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="image" className="form-label">
              Profile Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
              aria-describedby="imageHelp"
            />
            <div id="imageHelp" className="form-text">
              Optional. JPG/PNG/GIF recommended. Max 2MB.
            </div>
          </div>

          {errorMsg && (
            <div className="col-12">
              <div className="alert alert-danger py-2">{errorMsg}</div>
            </div>
          )}

          {/* Preview */}
          {previewUrl && (
            <div className="col-12">
              <div className="card" style={{ maxWidth: 240 }}>
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="card-img-top"
                  style={{ objectFit: "cover", height: 160 }}
                />
                <div className="card-body py-2 px-2">
                  <small className="text-muted">{imageFile?.name}</small>
                </div>
              </div>
            </div>
          )}

          <div className="col-12 text-center mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Saving…" : "Add Customer"}
            </button>
          </div>
        </div>
      </form>

      {/* Customers table */}
      <div className="mt-5">
        <h3>Customers</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Image</th>
                <th style={{ minWidth: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No customers found
                  </td>
                </tr>
              ) : (
                customers?.map((c: Customer) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.phoneNumber}</td>
                    <td>{c.email}</td>
                    <td style={{ width: 120 }}>
                      {c.imagePath ? (
                        <img
                          src={`http://localhost:5000${c.imagePath}`}
                          alt={c.name ?? "customer imagePath"}
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 6,
                          }}
                        />
                      ) : (
                        <div className="text-muted small">
                          No imagePath :{" "}
                          {`http://localhost:5000/${c.imagePath}`}
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
