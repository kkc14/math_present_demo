const cloudName = "diijeq0o4"; // replace with your own cloud name
const uploadPreset = "MathPresenter2324"; // replace with your own upload preset
var textarea = document.getElementById('myTextarea');


const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      //console.log("Done! Here is the image info: ", result.info);
      //document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
      insertAtCursor(textarea, '![My Image]('+ result.info.secure_url +')');
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


function insertAtCursor(textarea, text) {
  var startPos = textarea.selectionStart;
  var endPos = textarea.selectionEnd;
  textarea.value = textarea.value.substring(0, startPos) + text + textarea.value.substring(endPos, textarea.value.length);
  // Position the cursor after the inserted text
  textarea.selectionStart = startPos + text.length;
  textarea.selectionEnd = startPos + text.length;
}

