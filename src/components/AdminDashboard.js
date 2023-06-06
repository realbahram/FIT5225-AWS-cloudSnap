import React, {useState} from "react";
import Dropzone from "react-dropzone";
function AdminDashboard(){
    const API_URL = `https://858zvysj26.execute-api.us-east-1.amazonaws.com/v1/image-group-assignment2/test.jpg`;
    const [image, setImage] = useState(null);

    const handleUpload = async (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
        });

        if (response.status === 200) {
            setImage(image);
        } else {
            // Handle the error.
        }
    };

    return (
        <div>
            <Dropzone onDrop={handleUpload}>
                <h1>Drop your image here</h1>
            </Dropzone>
            {image && (
                <img src={URL.createObjectURL(image)} />
            )}
        </div>
    );
    // return<h1>addmin dashboard</h1>
}
export default AdminDashboard;