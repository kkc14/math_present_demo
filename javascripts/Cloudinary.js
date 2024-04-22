const cloudName = "diijeq0o4"; // replace with your own cloud name
const uploadPreset = "MathPresenter2324"; // replace with your own upload preset
var textarea = document.getElementById('input');


const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      //console.log("Done! Here is the image info: ", result.info);
      //document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);

      textarea.value = textarea.value + '![My Image]('+ result.info.secure_url +')' ;
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);


