import React, { useState } from 'react';
import axiosClient from "../axios-client.js";
import {useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";

export default function AddPetForm(){
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    const [pet, setPet] = useState({
        id:null,
        name: '',
        species: '',
        sex: '',
        size: '',
        age: '',
        neutered: false,
        vaccinated: false,
        dewormed: false,
        special_care: false,
        temperament: '',
        living_environment: '',
        socializes_with: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPet((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
            console.log(pet);
            // axiosClient.post(`/pet`, pet)
            //     .then(() => {
            //         setNotification("Pet adicionado com sucesso!")
            //         navigate('/');
            //     })
            //     .catch(error => {
            //         handleErrors(error);
            //     })
    };

    return (
        <form id='addPetForm' onSubmit={handleSubmit}>
            {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}

            <div className='container'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input type="text" className="form-control" name="name" value={pet.name} onChange={handleChange} required/>
                    <div id="nameHelp" className="form-text">O nome do seu pet</div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="species" className="form-label">Espécie</label>
                    <select className='form-select' name="species" value={pet.species} onChange={handleChange} required>
                        <option value="">Selecione uma opção</option>
                        <option value="Canino">Canino</option>
                        <option value="Felino">Felino</option>
                    </select>
                    <div id="speciesHelp" className="form-text">A espécie do seu pet</div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="sex" className="form-label">Sexo:</label>
                    <select className='form-select' name="sex" value={pet.sex} onChange={handleChange} required>
                        <option value="">Selecione uma opção</option>
                        <option value="Fêmea">Fêmea</option>
                        <option value="Macho">Macho</option>
                    </select>
                    <div id="sexHelp" className="form-text">O sexo do seu pet</div>
                </div>

                <div className='form-label'>Cuidados Veterinários:</div>

                <div className="row">
                    <div className="col-md-3 mb-3">
                        <div className="form-check custom-form-check-label">
                            <input type="checkbox" className="form-check-input" id="neutered" name="neutered"
                                   checked={pet.neutered} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="neutered">Castrado</label>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="form-check custom-form-check-label">
                            <input type="checkbox" className="form-check-input" id="vaccinated" name="vaccinated"
                                   checked={pet.vaccinated} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="vaccinated">Vacinado</label>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="form-check custom-form-check-label">
                            <input type="checkbox" className="form-check-input" id="dewormed" name="dewormed"
                                   checked={pet.dewormed} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="dewormed">Vermifugado</label>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="form-check custom-form-check-label">
                            <input type="checkbox" className="form-check-input" id="special_care" name="special_care"
                                   checked={pet.special_care} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="special_care">Precisa de cuidados
                                especiais</label>
                        </div>
                    </div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="temperament" className="form-label">Temperamento:</label>
                    <select className='form-select' name="temperament" value={pet.temperament} onChange={handleChange}
                            required>
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
                    <div id="temperamentHelp" className="form-text">Como o seu pet se comporta</div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="livingEnviroment" className="form-label"> Ambiente de convívio: </label>
                    <select className='form-select' name="livingEnviroment" value={pet.living_environment}
                            onChange={handleChange} required>
                        <option value="">Selecione uma opção</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Apartamento telado">Apartamento Telado</option>
                        <option value="Casa com quintal fechado">Casa com quintal fechado</option>
                    </select>
                    <div id="livingEnvironmentHelp" className="form-text">Onde seu pet vive melhor</div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="socializesWith" className="form-label"> Sociável com: </label>
                    <select className='form-select' name="socializesWith" value={pet.socializes_with}
                            onChange={handleChange} required>
                        <option value="">Selecione uma opção</option>
                        <option value="Cachorros">Cachorros</option>
                        <option value="Gatos">Gatos</option>
                        <option value="Crianças">Crianças</option>
                        <option value="Pessoas desconhecidas">Pessoas desconhecidas</option>
                    </select>
                    <div id="socializesWithHelp" className="form-text">Com quem seu pet se socializa melhor</div>
                </div>

                <div className="form-floating">
                      <textarea
                          className="form-control"
                          value={pet.description}
                          onChange={handleChange}
                          placeholder="História do seu pet"
                          id="historyDescription"
                          style={{height: '100px', lineHeight:'1.2em'}}
                          name="historyDescription"
                      ></textarea>
                    <label htmlFor="historyDescription">Descrição/Histórico:</label>
                </div>

                <div className="text-center">
                    <button className='btn btn-primary my-3' type="submit">Adicionar Pet</button>
                </div>
            </div>
        </form>
    );
}


