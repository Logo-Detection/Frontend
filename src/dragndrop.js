import React, {useState, useEffect, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import "./dragndrop.css";

function Dropzone({onDrop, handleSubmit, inputref}){
  const { getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({ onDrop, multiple: false, accept: "image/*" });

  const files = acceptedFiles.map((file) => (

    <center><li key={file.path}>

      {file.path} - {file.size} bytes

    </li></center>

  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
            <div className='container'> 
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()}  />
                <div className="text-center">
                    {isDragActive ? (
                        <p className="dropzone-content">
                            Release to drop the files here
                        </p>
                        ) : (
                        <p className="dropzone-content">
                            Drag n drop an image file here, or click to select file
                        </p>
                     )}
                    <button type="button" id="btn">
                        Browse
                    </button>
                </div>
            </div>
            </div> 
            <center>
              <b>If You are not getting any logos detected try lowering the detection threshold. Detection threshold can only be between 0 and 1</b>
            </center>
            <center className="subbtn">
            <div>
              <b>Set Detection Score: </b>
              <input 
                  className='score'
                  ref={inputref}
                  defaultValue="0.8"
                  type="number"
                  min="0"
                  max="1"
                  step=".01"
                />
              </div>
              <button id="btn" type="submit">Submit</button>
            </center>
      </form>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

export default Dropzone;