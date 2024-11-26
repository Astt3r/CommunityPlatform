import React, { useState } from 'react';
import axios from 'axios';

const ExportButton = () => {
    const [latest, setLatest] = useState(''); // Estado para capturar cuántas asociaciones exportar

    const handleExport = async () => {
        try {
            console.log("Filtro enviado (latest): ", latest); // Verifica el valor en consola
            const response = await axios.get('/export-neighborhoods', {
                responseType: 'blob', // Descargar como blob
                params: { latest }, // Enviar el filtro como parámetro
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'neighborhood_associations.xlsx'); // Nombre del archivo
            document.body.appendChild(link);
            link.click();
            link.remove(); // Eliminar el enlace después de la descarga
        } catch (error) {
            console.error('Error al exportar los datos:', error);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="latest" className="mr-2">Exportar las últimas:</label>
                <input
                    type="number"
                    id="latest"
                    value={latest}
                    onChange={(e) => setLatest(e.target.value)}
                    placeholder="Ejemplo: 5"
                    className="border rounded px-2 py-1"
                />
            </div>
            <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Exportar a Excel
            </button>
        </div>
    );
};

export default ExportButton;
