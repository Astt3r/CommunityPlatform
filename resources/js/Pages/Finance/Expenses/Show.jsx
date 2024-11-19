import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
        </div>
    );
}
