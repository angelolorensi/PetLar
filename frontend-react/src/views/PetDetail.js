import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isUserPetOwner, setIsUserPetOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useStateContext();
    const imageUrl = `http://localhost:8000/storage/`;
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient
            .get(`/pets/${id}`)
            .then((data) => {
                console.log(data.data.data);
                setPet(data.data.data);
                setIsUserPetOwner(data.data.data.user_id === user.id);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching pet details:", error);
                setLoading(false);
            });
    }, [id, user.id]);

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

    const handleEdit = () => {
        // Navigate to the edit page (replace with the correct route)
        // For example: navigate(`/edit-pet/${id}`);
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this pet?"
        );

        if (isConfirmed) {
            axiosClient
                .delete(`/pets/${id}`)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error deleting pet:", error);
                });
        }
    };

    if (loading) {
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
        <div className="container ">
            {isUserPetOwner && (
                <div className="d-flex justify-content-end mb-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={handleEdit}
                    >
                        ✏️ Editar
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        🗑️Deletar
                    </button>
                </div>
            )}
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
