import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageUrl = `http://localhost:8000/storage/`;

    useEffect(() => {
        axiosClient
            .get(`/pets/${id}`)
            .then((data) => {
                console.log(data.data.data);
                setPet(data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching pet details:", error);
            });
    }, [id]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0
                ? pet.images
                    ? pet.images.length - 1
                    : 0
                : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === (pet.images ? pet.images.length - 1 : 0)
                ? 0
                : prevIndex + 1
        );
    };

    if (!pet) {
        return (
            <div className="d-flex justify-content-center">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div
                id={`carousel-${pet.id}`}
                className={`carousel ${pet.images ? "slide" : ""}`}
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    {pet.images &&
                        pet.images.map((image, index) => (
                            <div
                                key={index}
                                className={` carousel-item ${
                                    index === currentImageIndex
                                        ? "active pet-detail-image-container"
                                        : ""
                                }`}
                            >
                                <img
                                    className="bleed-blur"
                                    src={`${imageUrl}${image}`}
                                    alt={`Pet ${pet.name}`}
                                />
                                <img
                                    src={`${imageUrl}${image}`}
                                    className="pet-detail-main-image"
                                    alt={`Pet ${pet.name}`}
                                />
                            </div>
                        ))}
                </div>
                {pet.images && pet.images.length > 1 && (
                    <>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            onClick={handlePrevImage}
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            onClick={handleNextImage}
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </>
                )}
            </div>

            <div className="mt-4">
                <h2 className="m-2 fw-bold">{pet.name}</h2>

                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Espécie:</strong> {pet.species}
                            </li>
                            <li className="list-group-item">
                                <strong>Sexo:</strong> {pet.sex}
                            </li>
                            <li className="list-group-item">
                                <strong>Porte:</strong> {pet.size}
                            </li>
                            <li className="list-group-item">
                                <strong>Idade:</strong> {pet.age}
                            </li>
                            <li className="list-group-item">
                                <strong>Temperamento:</strong> {pet.temperament}
                            </li>
                            <li className="list-group-item">
                                <strong>Sociável com:</strong>{" "}
                                {pet.socializes_with}
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Castrado:</strong>{" "}
                                {pet.neutered ? "Sim" : "Não"}
                            </li>
                            <li className="list-group-item">
                                <strong>Vacinado:</strong>{" "}
                                {pet.vaccinated ? "Sim" : "Não"}
                            </li>
                            <li className="list-group-item">
                                <strong>Vermifugado:</strong>{" "}
                                {pet.dewormed ? "Sim" : "Não"}
                            </li>
                            <li className="list-group-item">
                                <strong>
                                    Necessita de cuidados especiais:
                                </strong>{" "}
                                {pet.special_care ? "Sim" : "Não"}
                            </li>
                            <li className="list-group-item">
                                <strong>Ambiente de convívio:</strong>{" "}
                                {pet.living_environment}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4">
                    <p>
                        <strong>Descrição:</strong> {pet.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
