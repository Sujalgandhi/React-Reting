import React, { useEffect, useState } from 'react';
import Input from './input';
import { FaStar } from 'react-icons/fa';

const Form = () => {
    const [input, setInput] = useState({});
    const [formData, setFormData] = useState([]);
    const [rating, setRating] = useState(0); 

    useEffect(() => {
        const oldData = JSON.parse(localStorage.getItem('FormData'));
        if (Array.isArray(oldData)) {
            setFormData(oldData);
        } else {
            setFormData([]);
        }
    }, []);

    const data = [
        { type: 'text', name: 'name' },
    ];

    const handleInput = (e) => {
        const { name, type, value, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setInput((prevInput) => ({
                    ...prevInput,
                    [name]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setInput((prevInput) => ({
                ...prevInput,
                [name]: value,
            }));
        }
    };

    const handleRating = (index) => {
        setRating(index + 1);
        setInput((prevInput) => ({
            ...prevInput,
            rating: index + 1,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData((prevData) => {
            const newData = [...prevData, input];
            localStorage.setItem('FormData', JSON.stringify(newData));
            return newData;
        });
        alert('Data Submitted See In Cards and Table');
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-box">
                    <h1 className="login-title">Form</h1>
                    <form onSubmit={handleSubmit}>
                        {data.map((val, key) => (
                            <Input
                                key={key}
                                type={val.type}
                                names={val.name}
                                onChange={(e) => handleInput(e)}
                            />
                        ))}
                        <label className='selectLabel' style={{ textAlign: 'start' }} htmlFor="rating">Rating</label>
                        <div className="star-group" style={{ textAlign: 'start', marginBottom: '10px' }}>
                            {[1, 2, 3, 4, 5].map((val, index) => (
                                <FaStar className='rm'
                                    key={index}
                                    size={22}
                                    onMouseOver={() => handleRating(index)}
                                    color={rating > index ? "#ffc107" : "#e4e5e9"}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                        <div className="comment" style={{marginBottom:'5px'}}>
                            <label className='selectLabel' style={{ textAlign: 'start' }} htmlFor="textarea">Comment</label>
                            <textarea name="comment" style={{textAlign:'start',borderRadius:'8px'}} cols={35} rows={4} onChange={(e) => handleInput(e)}></textarea>
                        </div>
                        <button type="submit" className="login-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
