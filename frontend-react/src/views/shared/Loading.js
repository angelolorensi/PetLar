import React from "react";
import './shared.css';

export default function Loading() {
    return (
        <>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
}
