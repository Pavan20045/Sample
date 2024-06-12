import React, { useState } from 'react';

const CheckPlant = () => {
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [dropZoneClass, setDropZoneClass] = useState('');

    const previewImage = (event) => {
        const dropZone = document.getElementById('dropZone');
        const previewImage = document.getElementById('previewImage');

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setPreviewImageUrl(e.target.result);
                setDropZoneClass('dropped');
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your logic for handling form submission
    };

    return (
        <div className="container">
            <p>Upload an image to identify the species of the plant.</p>
            <form id="uploadForm" method="POST" action="/upload" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input type="file" id="plantImage" name="plantImage" accept="image/*" onChange={(event) => previewImage(event)} />
                <div id="dropZone" className={dropZoneClass} onClick={() => document.getElementById('plantImage').click()}>
                    <div id="previewImage" style={{ backgroundImage: `url(${previewImageUrl})` }}></div>
                    <div>Drag and drop an image <br />here or click to select</div>
                </div>
                <button type="submit">Identify Plant</button>
            </form>
            <div id="result"></div>
        </div>
    );
};

export default CheckPlant;
