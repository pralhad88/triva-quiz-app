import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => ( // if user enter wrong path on url then it redirect on not found page and give then lading page url option.
  <div className="container">
    404 Page Not Found - <Link to="/" style={{color: 'black'}}>Go home</Link>
  </div>
);

export default NotFoundPage;