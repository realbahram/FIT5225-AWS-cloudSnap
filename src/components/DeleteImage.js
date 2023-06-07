import React, { useState } from 'react';

function DeleteImage() {
    const [url, setUrl] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const handleDelete = () => {

        const data = {
            url: url
        };
        // Make the API request to delete the URL
        fetch('https://cd469m2uil.execute-api.us-east-1.amazonaws.com/dev2/delete-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    // URL successfully deleted
                    setDeleteMessage('Image deleted successfully');
                } else {
                    // Handle error case
                    setDeleteMessage('Failed to delete image');
                }
            })
            .catch((error) => {
                // Handle network error
                setDeleteMessage('Network error occurred');
                console.error(error);
            });
    };

    return (
        <div>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
            />
            <button onClick={handleDelete}>Delete</button>
            {deleteMessage && <p>{deleteMessage}</p>}
        </div>
    );
}

export default DeleteImage;
