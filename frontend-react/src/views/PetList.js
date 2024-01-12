// src/components/PetList.js
import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import axiosClient from "../axios-client";

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        getPets();
    }, []);

    const getPets = () => {
        setLoading(true);
        axiosClient
            .get("/pets")
            .then(({ data }) => {
                setLoading(false);
                setPets(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <div className="row">
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
                {!loading && pets.map((pet) => (
                    <div key={pet.id} className="col-md-4">
                        <PetCard pet={pet} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetList;
