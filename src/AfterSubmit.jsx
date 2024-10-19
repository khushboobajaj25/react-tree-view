import React from 'react';
import { useNavigate } from 'react-router-dom';

const AfterSubmit = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>Success!</h1>
            <p>Your submission was successful.</p>
            <button onClick={handleBack}>Go Back</button>
        </div>
    );
};

export default AfterSubmit;