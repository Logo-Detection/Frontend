import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import Dropzone from './dragndrop';
import "./main.css";

function Main() {
  // variables  
  const [imageURLs, setImageURLs] = useState([]);
  const formData2 = new FormData();
  const [images, setImages] = useState([]);
  var base64img;
  const inputRef = useRef();

  // hooks
  useEffect(()=>{
    if(images.length<1) return;
    const newImageURLs = [];
    newImageURLs.push(URL.createObjectURL(images));
    setImageURLs(newImageURLs);
  }, [images]);

  // functions
  function getBase64Img(str){
    return "data:image/png;base64,"+str;
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages(file);
      };
      reader.readAsDataURL(file);
      return file;
    });

  }, []);

  function Base64ToImage(base64img, callback) {
    var img = new Image();
    img.onload = function() {
        callback(img);
    };
    img.src = base64img;
  }

  function downloadfile(){
    if(images.length<1) return;
    const downloadlink = document.createElement("a");
    downloadlink.href = base64img;
    downloadlink.download = images.name;
    downloadlink.click();
  }

  const handleSubmit = event =>{
    if(images.length<1) return; 

    console.log(inputRef.current.value);

    var val = inputRef.current.value;

    event.preventDefault();
    formData2.append(
      "score",
      val
    )
    formData2.append(
      "file",
      images,
      images.name
    )

    const requestOptions = {
      method: 'POST',
      body: formData2
    };

    fetch('http://127.0.0.1:8888/LOGOS', requestOptions)
    .then(response=>response.json())
    .then(function(response){

      base64img = getBase64Img(response["image"]);

      Base64ToImage(base64img, function(img) {
        img.className = "image";
        document.getElementById('output-img').innerHTML="";
        document.getElementById('output-img').appendChild(img);
        var log = "Image Size:\n\tWidth: " + img.width + "\n\tHeight: " + img.height+"\n";
        log += "Bounding Boxes ([x_min, y_min, x_max, y_max]): \n"

        var arrayLength = response['bounding_boxes'].length;
        for (var i = 0; i < arrayLength; i++) {
          log+= "\t[ "+response['bounding_boxes'][i]+" ]\n";
        } 

        document.getElementById('log').value = log;
      });
    });

  }

  return (
    <div className='appbody'>
      <div className='input'>
        <Dropzone onDrop={onDrop} handleSubmit={handleSubmit} inputref={inputRef}/>
        <div className='preview'>
          <h3>
            <center id="bold">Preview</center>
          </h3>
          <div id='box-design'>
            { imageURLs.map(imageSrc => <img className="image" src={imageSrc}/>)}
          </div>
        </div>
      </div>
      <div className='output'>
        <center><h1 id="bold">Output</h1></center>
        <div id='box-design'>
          <div id="output-img"></div>
        </div>
        <center className='download-btn'><button id="btn" type="button" onClick={downloadfile}>Download</button></center>
        <textarea className='output-text' id="log"></textarea>
      </div>
  </div>
  );
}

export default Main;