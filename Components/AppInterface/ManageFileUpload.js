import firebase from "firebase";

import { useState } from "react";
const manageFileUpload = async (
  fileBlob, ClientName,ClientId,FileNameChoosen,type,
  { onStart, onProgress, onComplete, onFail }
) => {

  var today = new Date();
var dd = String(today.getDate()-1).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
let Hours = new Date().getHours().toLocaleString();
let Minutes = new Date().getMinutes().toLocaleString();
let Seconds = new Date().getSeconds().toLocaleString();
let size;
// let type;
if(FileNameChoosen==='notdefined')
{
  FileNameChoosen = Hours + Minutes + Seconds;
  today = yyyy + '/' + mm + '/' + FileNameChoosen + "--"+dd;
}
else{
  today = yyyy + '/' + mm + '/' + FileNameChoosen + "--"+dd;
}

  // const date = day+"/"+month+"/"+year;
  const Name = ClientId + "--Metadata-"+ClientName + "--"+today;
  

  const storageRef = firebase.storage().ref(`files/${Name+type}`);
  //  storageRef.getMetadata().then((metadata)=>{
  //      size = metadata.size;
  //      type = metadata.contentType;

  //  });
  //  console.log("size:" + size + " type: "+ type)

  // // Create file metadata including the content type
  // /** @type {any} */
  // const metadata = {
  //   contentType: 'any',
  // };

  // Trigger file upload start event
  onStart && onStart();
  const uploadTask = storageRef.put(fileBlob);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    

      // Monitor uploading progress
      onProgress && onProgress(Math.fround(progress).toFixed(2));

    },
    (error) => {

      // Something went wrong - dispatch onFail event with error  response
      onFail && onFail(error);

    },
    async() => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getMetadata().then((metadata) => {
        size = metadata.size;
        // type = metadata.contentType;
        console.log("size:" + size + " contentType:" + type);
      })
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        
        // dispatch on complete event
        onComplete && onComplete(ClientName,ClientId, FileNameChoosen,downloadURL,size);

        // submitDocumentInfo(ClientId,FileNameGiven,ClientName,downloadURL,today,type,size)
        console.log('uploading file',Name, 'with size of '+size +'and type being'+type)
        console.log("File available at", downloadURL);
      });

      // console.log("qwdqwdqwdqw"+ uploadTask.snapshot.metadata.size)
    }
  );
};


export default manageFileUpload 