import React, { useState } from "react";
import axiosClient from "../axios-client.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function AddPetForm() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [pet, setPet] = useState({
        id: null,
        name: "",
        species: "",
        sex: "",
        size: "",
        age: "",
        neutered: false,
        vaccinated: false,
        dewormed: false,
        special_care: false,
        temperament: "",
        living_environment: "",
        socializes_with: "",
        description: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            setPet((prevData) => ({
                ...prevData,
                [name]: [...files],
            }));
        } else {
            setPet((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", pet.name);
        formData.append("species", pet.species);
        formData.append("sex", pet.sex);
        formData.append("size", pet.size);
        formData.append("age", pet.age);
        formData.append("neutered", pet.neutered ? 1 : 0);
        formData.append("vaccinated", pet.vaccinated ? 1 : 0);
        formData.append("dewormed", pet.dewormed ? 1 : 0);
        formData.append("special_care", pet.special_care ? 1 : 0);
        formData.append("temperament", pet.temperament);
        formData.append("living_environment", pet.living_environment);
        formData.append("socializes_with", pet.socializes_with);
        formData.append("description", pet.description);

        pet.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        axiosClient
            .post(`/pets`, formData)
            .then(() => {
                setLoading(false);
                setNotification("Pet adicionado com sucesso!");
                navigate("/");
            })
            .catch((error) => {
                setErrors(error);
            });
    };

    return (
        <form id="addPetForm" onSubmit={handleSubmit}>
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <div className="d-flex justify-content-center">
                {loading && (
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
            </div>

            {!loading && (
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="images" className="form-label">
                            Imagem
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            name="images"
                            onChange={handleChange}
                            multiple
                            accept="image/*"
                        />
                        <div id="imagesHelp" className="form-text">
                            Selecione uma ou mais imagens do seu pet
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={pet.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="species" className="form-label">
                                Espécie
                            </label>
                            <select
                                className="form-select"
                                name="species"
                                value={pet.species}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="Canino">Canino</option>
                                <option value="Felino">Felino</option>
                            </select>
                        </div>

                        <div className="col-md-3 mb-3">
                            <label htmlFor="size" className="form-label">
                                Porte:
                            </label>
                            <select
                                className="form-select"
                                name="size"
                                value={pet.size}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="Pequeno">Pequeno</option>
                                <option value="Médio">Médio</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>

                        <div className="col-md-3 mb-3">
                            <label htmlFor="age" className="form-label">
                                Idade:
                            </label>
                            <select
                                className="form-select"
                                name="age"
                                value={pet.age}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="Filhote">Filhote</option>
                                <option value="Adulto">Adulto</option>
                                <option value="Idoso">Idoso</option>
                            </select>
                        </div>

                        <div className="col-md-3 mb-3">
                            <label htmlFor="sex" className="form-label">
                                Sexo:
                            </label>
                            <select
                                className="form-select"
                                name="sex"
                                value={pet.sex}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="Fêmea">Fêmea</option>
                                <option value="Macho">Macho</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-label">Cuidados Veterinários:</div>

                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="form-check custom-form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="neutered"
                                    name="neutered"
                                    checked={pet.neutered}
                                    onChange={handleChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="neutered"
                                >
                                    Castrado
                                </label>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-check custom-form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="vaccinated"
                                    name="vaccinated"
                                    checked={pet.vaccinated}
                                    onChange={handleChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="vaccinated"
                                >
                                    Vacinado
                                </label>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-check custom-form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="dewormed"
                                    name="dewormed"
                                    checked={pet.dewormed}
                                    onChange={handleChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="dewormed"
                                >
                                    Vermifugado
                                </label>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-check custom-form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="special_care"
                                    name="special_care"
                                    checked={pet.special_care}
                                    onChange={handleChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="special_care"
                                >
                                    Precisa de cuidados especiais
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="temperament" className="form-label">
                            Temperamento:
                        </label>
                        <select
                            className="form-select"
                            name="temperament"
                            value={pet.temperament}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione uma opção</option>
                            <option value="Agressivo">Agressivo</option>
                            <option value="Arisco">Arisco</option>
                            <option value="Brincalhão">Brincalhão</option>
                            <option value="Calmo">Calmo</option>
                            <option value="Carente">Carente</option>
                            <option value="Dócil">Dócil</option>
                            <option value="Independente">Independente</option>
                            <option value="Sociável">Sociável</option>
                        </select>
                        <div id="temperamentHelp" className="form-text">
                            Como o seu pet se comporta
                        </div>
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="living_environment"
                            className="form-label"
                        >
                            {" "}
                            Ambiente de convívio:{" "}
                        </label>
                        <select
                            className="form-select"
                            name="living_environment"
                            value={pet.living_environment}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione uma opção</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Apartamento telado">
                                Apartamento Telado
                            </option>
                            <option value="Casa com quintal fechado">
                                Casa com quintal fechado
                            </option>
                        </select>
                        <div id="livingEnvironmentHelp" className="form-text">
                            Onde seu pet vive melhor
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="socializes_with" className="form-label">
                            {" "}
                            Sociável com:{" "}
                        </label>
                        <select
                            className="form-select"
                            name="socializes_with"
                            value={pet.socializes_with}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione uma opção</option>
                            <option value="Cachorros">Cachorros</option>
                            <option value="Gatos">Gatos</option>
                            <option value="Crianças">Crianças</option>
                            <option value="Pessoas desconhecidas">
                                Pessoas desconhecidas
                            </option>
                        </select>
                        <div id="socializesWithHelp" className="form-text">
                            Com quem seu pet se socializa melhor
                        </div>
                    </div>

                    <div className="form-floating">
                        <textarea
                            className="form-control"
                            onChange={handleChange}
                            defaultValue={pet.description}
                            placeholder="História do seu pet"
                            id="description"
                            style={{ height: "100px" }}
                            name="description"
                        ></textarea>
                        <label htmlFor="description">
                            Descrição/Histórico:
                        </label>
                    </div>

                    <div className="text-center d-flex justify-content-center gap-3">
                        <button className="btn btn-primary my-3" type="submit">
                            Adicionar Pet
                        </button>
                        <Link className="btn btn-dark my-3" to="/">
                            Cancelar
                        </Link>
                    </div>
                </div>
            )}
        </form>
    );
}
