import React from "react";

export default function AddLocationForm({ loading }: { loading: boolean }) {
  return (
    <>
      <h2>Add a location!</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div>
          <label htmlFor="location-name-input">Location Name</label>
          <input
            type="text"
            id="location-name-input"
            name="location-name"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </div>
    </>
  );
}
