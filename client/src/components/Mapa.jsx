import React from 'react';

const ImageComponent = () => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Mapa de Puracé, Cauca</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.234567890123!2d-76.3660059!3d2.366458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMjInMDAuMCJOIDc2wrAyMSc1Ny42Ilc!5e0!3m2!1ses!2sco!4v1631234567890!5m2!1ses!2sco"
        width="80%"
        height="450"
        style={{ border: '0', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
        Mapa del municipio de Puracé, Cauca, Colombia.
      </p>
    </div>
  );
};

export default ImageComponent;