import { useEffect, useState } from "react";
import useCountryStore from "../store/useCountryStore";
import useStateStore from "../store/useStateStore";
import useDistrictStore from "../store/useDistrictStore";
import type { Gender } from "../types/gender";

function RadioButton() {
  const { countries, fetchCountries } = useCountryStore();
  const { states, fetchStatesByCountry } = useStateStore();
  const { districts, fetchDistrictsByState } = useDistrictStore();

  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [gender, setGender] = useState<Gender>();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleCountryChange = async (
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

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStateId = e.target.value;
    setStateId(newStateId);

    if (newStateId) await fetchDistrictsByState(newStateId);
    else setStateId("");
  };

  return (
    <div className="container">
      <h2>Manage Student</h2>
      <form>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter Mobile"
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <select
              value={countryId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleCountryChange(e)
              }
            >
              <option value="">Select Country</option>
              {countries?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <select
              name="state"
              value={stateId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleStateChange(e)
              }
              disabled={!countryId || states.length === 0}
            >
              <option value="">Select State</option>
              {states?.map((s) => (
                <option value={s._id} key={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <select
              name="district"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              disabled={!stateId || districts.length === 0}
            >
              <option value="">Select District</option>
              {districts?.map((d) => (
                <option value={d._id} key={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3 text-center">
          <div className="col">
            Gender
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value as Gender)}
                checked={gender === "Male"}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value as Gender)}
                checked={gender === "Female"}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={(e) => setGender(e.target.value as Gender)}
                checked={gender === "Other"}
              />
              Other
            </label>
          </div>
          <div className="col">
            <button className="btn btn-primary">Add Student</button>
          </div>
          <div className="col"></div>
        </div>
      </form>
    </div>
  );
}

export default RadioButton;
