import React from 'react';
import { useParams } from 'react-router-dom';

const Contact = () => {
    const {key} = useParams();
    console.log(key)
    return (
        <div>
           <h1>this is Contact</h1> 
           {console.log(key)}
        </div>
    );
};

export default Contact;