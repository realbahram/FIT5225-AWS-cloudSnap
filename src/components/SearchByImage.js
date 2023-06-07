import React, { useState } from "react";

function SearchByImage() {
    const [image, setImage] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const fileSelectHandler = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        let reader = new FileReader();
        let base64String = "";

        reader.onload = function () {
            base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

            const data = {
                image: base64String,
            };

            fetch("https://cd469m2uil.execute-api.us-east-1.amazonaws.com/dev2/search-by-image", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData); // Handle the response data here

                    if (responseData["image url results"]) {
                        setImageUrls(responseData["image url results"]);
                    } else {
                        setImageUrls([]);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };

        reader.readAsDataURL(image);
    };

    return (
        <div className="upload-container">
            <h2>Upload Image</h2>
            <div>
                <input type="file" onChange={fileSelectHandler} className="file-input" />
                <button onClick={handleUpload} className="upload-button">
                    Upload
                </button>
            </div>
            <div className="image-results">
                <h3>Image URL Results:</h3>
                {imageUrls.length > 0 ? (
                    <ul>
                        {imageUrls.map((url, index) => (
                            <li key={index}>
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No image URL results found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchByImage;
