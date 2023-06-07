import React, { useState } from "react";

function AddRemove() {
    const [name, setName] = useState("");
    const [repetitions, setRepetitions] = useState(0);
    const [queryData, setQueryData] = useState([]);
    const [url, setUrl] = useState("");
    const [operation, setOperation] = useState("add");

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

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleOperationChange = (event) => {
        setOperation(event.target.value);
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

        if (url && queryData.length > 0) {
            const tags = queryData.map((query) => ({
                tag: query.name,
                count: query.repetitions,
            }));

            const formattedData = {
                url: url,
                type: operation === "add" ? 1 : 0,
                tags: tags,
            };

            try {
                const response = await fetch(
                    "https://cd469m2uil.execute-api.us-east-1.amazonaws.com/dev2/add-remove-tags",
                    {
                        method: "POST",
                        body: JSON.stringify(formattedData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Query data sent successfully!", responseData);
                } else {
                    console.error("Failed to send query data. Error:", response.status);
                }
            } catch (error) {
                console.error("Failed to send query data. Error:", error);
            }
        }
    };

    return (
        <div className="query-search-container">
            <h2>add and remove tags</h2>
            <div className="input-container">
                <label htmlFor="operationInput">Operation:</label>
                <select
                    id="operationInput"
                    value={operation}
                    onChange={handleOperationChange}
                >
                    <option value="add">Add</option>
                    <option value="remove">Remove</option>
                </select>
                <label htmlFor="urlInput">URL:</label>
                <input
                    type="text"
                    id="urlInput"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="Enter URL"
                />
                <label htmlFor="nameInput">Tag:</label>
                <input
                    type="text"
                    id="nameInput"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter Tag"
                />
                <label htmlFor="repetitionsInput">Repetitions:</label>
                <input
                    type="number"
                    id="repetitionsInput"
                    value={repetitions}
                    onChange={handleRepetitionsChange}
                    placeholder="Enter repetitions"
                />
                <button onClick={handleAddQuery}>Add Query</button>
            </div>
            <div className="button-container">
                <button onClick={handleGetQueries}>Get Queries</button>
            </div>
            {queryData.length > 0 && (
                <div className="query-list-container">
                    <h3>Added Queries:</h3>
                    <ul className="query-list">
                        {queryData.map((query, index) => (
                            <li key={index}>
                                <span className="query-name">Tag: {query.name}</span>
                                <span className="query-repetitions">
                  Repetitions: {query.repetitions}
                </span>
                                <button onClick={() => handleDeleteQuery(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AddRemove;
