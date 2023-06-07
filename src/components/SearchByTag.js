import React, { useState } from "react";

function SearchByTags() {
    const [name, setName] = useState("");
    const [repetitions, setRepetitions] = useState(0);
    const [queryData, setQueryData] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [s3Urls, setS3Urls] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null); // New state variable for selected image

    const handleDeleteQuery = (index) => {
        const updatedQueryData = queryData.filter((_, i) => i !== index);
        setQueryData(updatedQueryData);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleRepetitionsChange = (event) => {
        setRepetitions(Number(event.target.value));
    };

    const handleAddQuery = () => {
        if (name && repetitions > 0) {
            setQueryData([...queryData, { name, repetitions }]);
            setName("");
            setRepetitions(0);
        }
    };

    const handleGetQueries = async () => {
        if (name && repetitions > 0) {
            handleAddQuery();
        }

        const tags = queryData.map((query) => ({
            tag: query.name,
            count: query.repetitions,
        }));

        const formattedData = {
            tags: tags,
        };

        try {
            const response = await fetch("https://cd469m2uil.execute-api.us-east-1.amazonaws.com/dev2/search-by-tag", {
                method: "POST",
                body: JSON.stringify(formattedData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Query data sent successfully!", responseData);
                const imageUrls = responseData["image url results"];
                const s3Urls = responseData["s3-url"];

                setImageUrls(imageUrls);
                setS3Urls(s3Urls);
            } else {
                console.error("Failed to send query data. Error:", response.status);
            }
        } catch (error) {
            console.error("Failed to send query data. Error:", error);
        }
    };

    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <div className="query-search-container">
            <h2>Query Search</h2>
            <div className="input-container">
                <label htmlFor="nameInput">Tag:</label>
                <input type="text" id="nameInput" value={name} onChange={handleNameChange} placeholder="Enter Tag" />
                <label htmlFor="repetitionsInput">Repetitions:</label>
                <input type="number" id="repetitionsInput" value={repetitions} onChange={handleRepetitionsChange} placeholder="Enter repetitions" />
                <button onClick={handleAddQuery}>Add Query</button>
            </div>
            <div className="button-container">
                <button onClick={handleGetQueries}>Get Queries</button>
            </div>
            {imageUrls.length > 0 && (
                <div className="image-results-container">
                    <h3>Image URLs:</h3>
                    <ul className="image-results-list">
                        {imageUrls.map((imageUrl, index) => (
                            <li key={index} onClick={() => handleImageSelect(index)} className={selectedImageIndex === index ? 'selected' : ''}>
                                <img src={imageUrl} alt={`Image ${index + 1}`} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedImageIndex !== null && (
                <div className="selected-image-container">
                    <h3>Selected Image:</h3>
                    <p>S3 URL: {s3Urls[selectedImageIndex]}</p>
                </div>
            )}
            {queryData.length > 0 && (
                <div className="query-list-container">
                    <h3>Added Queries:</h3>
                    <ul className="query-list">
                        {queryData.map((query, index) => (
                            <li key={index}>
                                <span className="query-name">Tag: {query.name}</span>
                                <span className="query-repetitions">Repetitions: {query.repetitions}</span>
                                <button onClick={() => handleDeleteQuery(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchByTags;
