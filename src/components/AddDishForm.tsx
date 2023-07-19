import React from "react";
import { useContentIDs } from "../contexts/ContentIDProvider";

export default function AddDishForm() {
  const locationID = useContentIDs().contentIDs.locationID;
  return (
    <>
      <h2>Add a dish!</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div>
          <label htmlFor="dish-name-input">Dish Name</label>
          <input type="text" id="dish-name-input" name="dish-name" required />
        </div>
        <div>
          <label htmlFor="dish-price-input">Dish Price</label>
          <input
            type="number"
            min="0.01"
            id="dish-price-input"
            step="0.01"
            name="dish-price"
            required
          />
        </div>
        <fieldset>
          <legend>Availability</legend>

          <div>
            <input
              type="checkbox"
              id="availability-breakfast-input"
              name="dish-breakfast?"
            />
            <label htmlFor="availability-breakfast-input">Breakfast</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="availability-lunch-input"
              name="dish-lunch?"
            />
            <label htmlFor="availability-lunch-input">Lunch</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="availability-dinner-input"
              name="dish-dinner?"
            />
            <label htmlFor="availability-dinner-input">Dinner</label>
          </div>
          <input type="hidden" name="location-id" value={locationID} />
        </fieldset>
        <input type="file" name="dish-img" />
        <button type="submit">Submit</button>
      </div>
    </>
  );
}
