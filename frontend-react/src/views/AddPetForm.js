import React, { useState } from 'react';

export default function AddPetForm(){
    const [errors, setErrors] = useState(null);
    const [petData, setPetData] = useState({
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
        setPetData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(petData),
            });

            if (response.ok) {
                setErrors('Pet adicionado com sucesso');
            } else {
                setErrors('Erro ao adicionar o pet');
            }
        } catch (error) {
            setErrors(`Erro na requisição : ${error}`);
        }
    };

    return (
        <form id='addPetForm' onSubmit={handleSubmit}>
            <div className='container'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input type="text" className="form-control" name="name" value={petData.name}
                           onChange={handleChange}/>
                    <div id="nameHelp" className="form-text">O nome do seu pet</div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="species" className="form-label">Espécie</label>
                    <select className='form-select' name="species" value={petData.species} onChange={handleChange}>
                        <option value="Canino">Canino</option>
                        <option value="Felino">Felino</option>
                    </select>
                    <div id="speciesHelp" className="form-text">A espécie do seu pet</div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="sex" className="form-label">Sexo:</label>
                    <select className='form-select' name="sex" value={petData.sex} onChange={handleChange}>
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
                                   checked={petData.neutered} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="neutered">Castrado</label>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="form-check custom-form-check-label">
                            <input type="checkbox" className="form-check-input" id="vaccinated" name="vaccinated"
                                   checked={petData.vaccinated} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="vaccinated">Vacinado</label>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="form-check custom-form-check-label">
                            <input type="checkbox" className="form-check-input" id="dewormed" name="dewormed"
                                   checked={petData.dewormed} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="dewormed">Vermifugado</label>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="form-check custom-form-check-label">
                            <input type="checkbox" className="form-check-input" id="special_care" name="special_care"
                                   checked={petData.special_care} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="special_care">Precisa de cuidados
                                especiais</label>
                        </div>
                    </div>
                </div>


                <div className='mb-3'>
                    <label htmlFor="temperament" className="form-label">Temperamento:</label>
                    <select className='form-select' name="temperament" value={petData.temperament}
                            onChange={handleChange}>
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
                    <select className='form-select' name="livingEnviroment" value={petData.living_environment}
                            onChange={handleChange}>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Apartamento telado">Apartamento Telado</option>
                        <option value="Casa com quintal fechado">Casa com quintal fechado</option>
                    </select>
                    <div id="livingEnvironmentHelp" className="form-text">Onde seu pet vive melhor</div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="socializesWith" className="form-label"> Sociável com: </label>
                    <select className='form-select' name="socializesWith" value={petData.socializes_with}
                            onChange={handleChange}>
                        <option value="Cachorros">Cachorros</option>
                        <option value="Gatos">Gatos</option>
                        <option value="Crianças">Crianças</option>
                        <option value="Pessoas desconhecidas">Pessoas desconhecidas</option>
                    </select>
                    <div id="socializesWithHelp" className="form-text">Com quem seu pet se socializa melhor</div>
                </div>

                <div className="form-floating">
                    <label htmlFor="floatingTextarea">Descrição/Histórico:</label>
                    <textarea className="form-control" placeholder="História do seu pet" id="history_description" style={{height:'100px'}} name='history_description' value={petData.description} onChange={handleChange}></textarea>
                </div>

                <div className="text-center">
                    {errors && <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>}

                    <button className='btn btn-primary my-3' type="submit">Adicionar Pet</button>
                </div>
            </div>
        </form>
    );
}


