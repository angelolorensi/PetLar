import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        axiosClient.get(`/pets/${id}`)
            .then(response => {
                setPet(response.data);
            })
            .catch(error => {
                console.error('Error fetching pet details:', error);
            });
    }, [id]);

    if (!pet) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{pet.name}</h2>
            <p>{pet.description}</p>
        </div>
    );
};

export default PetDetails;
