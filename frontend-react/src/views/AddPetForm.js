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
        history_description: '',
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
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="name" value={petData.name} onChange={handleChange}/>
            </label>

            <label>
                Espécie:
                <select name="species" value={petData.species} onChange={handleChange}>
                    <option value="Canino">Canino</option>
                    <option value="Felino">Felino</option>
                </select>
            </label>

            <label>
                Sexo:
                <select name="sex" value={petData.sex} onChange={handleChange}>
                    <option value="Fêmea">Fêmea</option>
                    <option value="Macho">Macho</option>
                </select>
            </label>

            <label>
                <input type="checkbox" name="neutered" checked={petData.neutered} onChange={handleChange}/>
                Castrado
            </label>

            <label>
                <input type="checkbox" name="vaccinated" checked={petData.vaccinated} onChange={handleChange}/>
                Vacinado
            </label>

            <label>
                <input type="checkbox" name="dewormed" checked={petData.dewormed} onChange={handleChange}/>
                Vermifugado
            </label>

            <label>
                <input type="checkbox" name="special_care" checked={petData.special_care} onChange={handleChange}/>
                Precisa de cuidados especiais
            </label>

            <label>
                Temperamento:
                <input type="text" name="temperament" value={petData.temperament} onChange={handleChange}/>
            </label>

            <label>
                Ambiente de convívio:
                <input type="text" name="living_environment" value={petData.living_environment}
                       onChange={handleChange}/>
            </label>

            <label>
                Sociável com:
                <input type="text" name="socializes_with" value={petData.socializes_with} onChange={handleChange}/>
            </label>

            <label>
                Descrição/Histórico:
                <textarea name="history_description" value={petData.history_description} onChange={handleChange}/>
            </label>

            {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }

            <button type="submit">Adicionar Pet</button>
        </form>
    );
}


