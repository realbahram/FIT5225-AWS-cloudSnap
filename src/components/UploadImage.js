import React,{useState} from "react";


function UploadImage() {
    //const API_URL = "https://858zvysj26.execute-api.us-east-1.amazonaws.com/v1/image-group-assignment2/test.jpg";

    const [image, setImage] = useState(null);

    const  fileSelectHandler = event =>{
        setImage(event.target.files[0])
    }
    const handleUpload = async (event) => {
        let reader = new FileReader();
        let base64String = "";
        //console.log("next");
        //let base64 = ""
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
            console.log(base64String);
            const data ={
                name: "test.jpg",
                file: base64String
            }
            const response =  fetch("https://cd469m2uil.execute-api.us-east-1.amazonaws.com/dev2/upload",{
                method:"POST",
                body: JSON.stringify(data),
                // body:{
                //     "name" : "test,jpg",
                //     "file": base64String
                // },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("response",response);
        }
        reader.readAsDataURL(image);
    };
    return(
        <div className="upload-container">
            <h2>Upload Image</h2>
            <div>
                <input type="file" onChange={fileSelectHandler} className="file-input" />
                <button onClick={handleUpload} className="upload-button">
                    Upload
                </button>
            </div>
        </div>
    )

}
export default UploadImage;