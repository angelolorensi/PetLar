import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import axiosClient from "../axios-client";

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        getPets();
    }, [currentPage]);

    const getPets = () => {
        setLoading(true);
        axiosClient
            .get("/pets", {
                params: {
                    page: currentPage,
                    search: searchQuery,
                },
            })
            .then(({ data }) => {
                setLoading(false);
                setPets(data.data);
                setLastPage(data.last_page);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = () => {
        setCurrentPage(1);
        getPets();
    };

    return (
        <div className="container">
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <div className="col-md-12">
                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control m-2"
                            style={{height:'40px'}}
                            placeholder="Pesquisar pets e suas características..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSearchSubmit}
                            >
                                Pesquisar
                            </button>
                        </div>
                    </div>
                </div>
            <div className="pagination justify-content-center">
                <ul className="pagination">
                    {Array.from(
                        { length: lastPage },
                        (_, index) => index + 1
                    ).map((page) => (
                        <li
                            key={page}
                            className={`page-item ${
                                page === currentPage ? "active" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
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
                {!loading &&
                    pets.map((pet) => (
                        <div key={pet.id} className="col-md-4">
                            <PetCard pet={pet} />
                        </div>
                    ))}
            </div>
            <div className="pagination justify-content-center">
                <ul className="pagination">
                    {Array.from(
                        { length: lastPage },
                        (_, index) => index + 1
                    ).map((page) => (
                        <li
                            key={page}
                            className={`page-item ${
                                page === currentPage ? "active" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PetList;
