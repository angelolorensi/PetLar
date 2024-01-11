// src/components/PetCard.js
import React, { useState } from 'react';

const PetCard = ({ pet }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? (pet.images ? pet.images.length - 1 : 0) : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === (pet.images ? pet.images.length - 1 : 0) ? 0 : prevIndex + 1));
    };

    return (
        <div className="card m-3">
            <div id={`carousel-${pet.id}`} className={`carousel ${pet.images ? 'slide' : ''}`} data-bs-ride="carousel">
                <div className="carousel-inner">
                    {pet.images &&
                        pet.images.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}>
                                <img src={image} className="d-block w-100" alt={pet.name} />
                            </div>
                        ))}
                </div>
                {pet.images && pet.images.length > 1 && (
                    <>
                        <button className="carousel-control-prev" type="button" onClick={handlePrevImage}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" onClick={handleNextImage}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </>
                )}
            </div>
            <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">{pet.description.length > 100 ? `${pet.description.substring(0, 100)}...` : pet.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Espécie: {pet.species}</li>
                <li className="list-group-item">Sexo: {pet.sex}</li>
                <li className="list-group-item">Porte: {pet.size}</li>
                <li className="list-group-item">Idade: {pet.age}</li>
                <li className="list-group-item">Temperamento: {pet.temperament}</li>
                <li className="list-group-item">Sociável com: {pet.socializes_with}</li>
            </ul>
        </div>
    );
};

export default PetCard;
