// src/components/PetList.js
import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import axiosClient from "../axios-client";

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        getPets();
    }, []);

    const getPets = () => {
        setLoading(true)
        axiosClient.get('/pets')
            .then(({data}) => {
                setLoading(false)
                console.log(data)
                setPets(data);
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div className="container">
            <h1 className="my-4">Available Pets</h1>
            <div className="row">
                {pets.map((pet) => (
                    <div key={pet.id} className="col-md-4">
                        <PetCard pet={pet} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetList;
