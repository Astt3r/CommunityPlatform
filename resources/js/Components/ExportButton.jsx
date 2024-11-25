import React from 'react';
import axios from 'axios';

const ExportButton = () => {
    const handleExport = async () => {
        try {
            const response = await axios.get('/export-neighborhoods', {
                responseType: 'blob', // Asegura que el archivo se descargue como un blob
            });

            // Crear una URL para el archivo descargado
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
        <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Exportar a Excel
        </button>
    );
};

export default ExportButton;
