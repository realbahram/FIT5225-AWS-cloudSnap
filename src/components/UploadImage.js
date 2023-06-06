import React,{useState} from "react";

function UploadImage() {
    //const API_URL = "https://858zvysj26.execute-api.us-east-1.amazonaws.com/v1/image-group-assignment2/test.jpg";

    const [image, setImage] = useState(null);

    const  fileSelectHandler = event =>{
        setImage(event.target.files[0])
    }
    const handleUpload = async (event) => {
        const formData = new FormData();
        formData.append('image', image);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "image/jpeg");
        myHeaders.append("X-Api-Key", "eWXiX98Bqbn57cbKV5KN2A==Eo4oOf4lNxbJMQnT");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Credentials","true");
        var file = formData;
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: file,
            redirect: 'follow'
        };
        fetch("https://858zvysj26.execute-api.us-east-1.amazonaws.com/v1/image-group-assignment2/test2.jpg", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };
    return(
        <div>
            <h2>upload image</h2>
            <div>
                <input type='file' onChange={fileSelectHandler}/>
                <button onClick={handleUpload}>upload</button>
            </div>
        </div>
    )

}
export default UploadImage;