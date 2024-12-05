import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';


const Card = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('FormData'));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    localStorage.setItem('FormData', JSON.stringify(newData));
  };

  return (
    <>
      <div className="card-container">
        <div className="card-group">
          {data.map((val, key) => (
            <div className="card" key={key}>
              <div className="card-content">
                <h4 className="card-title">Name: {val.name}</h4>
                <div className="card-rating">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <FaStar
                      key={index}
                      size={20}
                      color={index < val.rating ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
                <p className="card-comment">{val.comment}</p>
                <div className="card-actions">
                  <button className="delete-button" onClick={() => handleDelete(key)}>
                    Delete
                  </button>
                  <Link to="/">
                    <button className="add-button">Add</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
