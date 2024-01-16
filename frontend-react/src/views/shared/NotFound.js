import React from "react";
import { Link } from "react-router-dom";
import undrawNotFound from '../../assets/img/undraw_not_found.svg';
import './shared.css';

const NotFound = () => {
  return (
    <div className="not-found-page animated fadeInDown">
      <div className="content">
        <p className="message mb-3">
          Oops! A pagina que você esta procurando não existe.
        </p>
        <Link to="/" className="btn btn-primary">
          Voltar
        </Link>
      </div>
      <div>
        <img src={undrawNotFound} alt="Not Found" width="300" height="300" />
      </div>
    </div>
  );
};

export default NotFound;
