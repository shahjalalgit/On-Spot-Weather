import React from 'react';
import './ContactUS.css';
const ContactUS = () => {
    const style = {
        color: 'black'
    }
    return (
        <div className="text-center">
            <h1 className="display-2 m-5 p-2">Contact with US</h1>
            <h1>Email me at <a href="mailto:shahjalal.csegub@gmail.com">shahjal.csegub@gmail.com</a></h1>
            <h1>Phone: +88/01612233903</h1>
            <p>Mirpur, Dhaka Cantt. Dhaka-1206, Bangladesh</p>
        </div>
    );
};

export default ContactUS;
