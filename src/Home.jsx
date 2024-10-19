import React from 'react'

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const history = useNavigate();

    const navigateToRules = () => {
        history('/rules');
    };

    return (
        <div>
            <button onClick={navigateToRules}>Go to Rules</button>
        </div>
    );
};

export default Home;