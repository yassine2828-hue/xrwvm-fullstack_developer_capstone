import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const PostReview = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [purchase, setPurchase] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");

  let params = useParams();
  let dealerId = params.id;

  const postReview = async (e) => {
    e.preventDefault();

    let review_url = window.location.origin + "/djangoapp/add_review";

    const res = await fetch(review_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        dealership: parseInt(dealerId),
        review: review,
        purchase: purchase,
        purchase_date: purchaseDate,
        car_make: carMake,
        car_model: carModel,
        car_year: parseInt(carYear),
      }),
    });

    const json = await res.json();
    if (json.status === 200) {
      alert("Review posted successfully!");
      window.location.href = window.location.origin + `/dealer/${dealerId}/`;
    } else {
      alert("Failed to post review.");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ margin: "20px", maxWidth: "600px" }}>
        <h2>Post a Review</h2>
        <form onSubmit={postReview}>
          <div style={{ marginBottom: "15px" }}>
            <label>Name:</label><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Review:</label><br />
            <textarea value={review} onChange={(e) => setReview(e.target.value)} rows="4" required style={{ width: "100%", padding: "8px" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>
              <input type="checkbox" checked={purchase} onChange={(e) => setPurchase(e.target.checked)} /> Was this a purchase?
            </label>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Purchase Date (MM/DD/YYYY):</label><br />
            <input type="text" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} placeholder="01/15/2023" style={{ width: "100%", padding: "8px" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Car Make:</label><br />
            <input type="text" value={carMake} onChange={(e) => setCarMake(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Car Model:</label><br />
            <input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Car Year:</label><br />
            <input type="number" value={carYear} onChange={(e) => setCarYear(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          </div>
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#00ced1", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostReview;