import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faVenusMars, faRuler, faBirthdayCake, faSmile, faUsers, faCheck, faSyringe, faCapsules, faHeartbeat, faHome, faInfo, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './pet.css';
import Loading from "../shared/Loading";

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
        navigate(`/pets/${id}/edit`);
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
                <Loading/>
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
                        <FontAwesomeIcon icon={faEdit} /> Editar
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} /> Deletar
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
                                <FontAwesomeIcon icon={faDog} /> <strong>Espécie:</strong> {pet.species}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faVenusMars} /> <strong>Sexo:</strong> {pet.sex}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faRuler} /> <strong>Porte:</strong> {pet.size}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faBirthdayCake} /> <strong>Idade:</strong> {pet.age}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faSmile} /> <strong>Temperamento:</strong> {pet.temperament}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faUsers} /> <strong>Sociável com:</strong> {pet.socializes_with}
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faCheck} /> <strong>Castrado:</strong> {pet.neutered ? "Sim" : "Não"}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faSyringe} /> <strong>Vacinado:</strong> {pet.vaccinated ? "Sim" : "Não"}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faCapsules} /> <strong>Vermifugado:</strong> {pet.dewormed ? "Sim" : "Não"}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faHeartbeat} /> <strong>Necessita de cuidados especiais:</strong> {pet.special_care ? "Sim" : "Não"}
                            </li>
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={faHome} /> <strong>Ambiente de convívio:</strong> {pet.living_environment}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="description-container p-3">
                        <FontAwesomeIcon icon={faInfo} className="info-icon" />
                        <strong>Descrição:</strong>
                        <p className="mt-2">{pet.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
