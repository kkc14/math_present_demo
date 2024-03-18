var header = document.getElementsByClassName('header');
var color_Picker = document.getElementById('colorPicker');
var input = document.getElementById('input');
var key = document.getElementById('name');
var preview = document.getElementById('preview');
const colorPicker = document.getElementById('colorPicker');
const fontSizeInput = document.getElementById('fontSizeInput');

Save.addEventListener("click", function() {
    var key = document.getElementById('name');
    var text = input.value;
    localStorage.setItem(key.value, text);
    console.log("Saved");
    console.log(text);
});

Load.addEventListener("click", function() {
  var key = document.getElementById('name');
  const value = localStorage.getItem(key.value);
  input.value=value;
  console.log("loaded");
  reloadPreview();
});

function reloadPreview(){
   var value = input.value;
   var html = '<div>'+markdownToHtml(value)+'</div>';
   preview.innerHTML = html;
    MathJax.typeset();
    MathJax.typeset();

}


// Get the file input element
const fileInput = document.getElementById('fileInput');

// Add an event listener for when a file is selected
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Get the first selected file

  if (file) {
    const reader = new FileReader(); // Create a new FileReader object

    // Add an event listener for when the file is successfully read
    reader.addEventListener('load', (event) => {
      const fileContent = event.target.result; // Get the file content as a string
      input.value = fileContent
      console.log(fileContent); // You can process the file content here
      reloadPreview();
    });

    // Read the file as text
    reader.readAsText(file);

    
  }
});

function downloadTextFile() {
  const textarea = document.getElementById("input");
  const content = textarea.value;

  // Create a new Blob object with the textarea content
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element to trigger the download
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "textarea_content.md";

  // Append the anchor to the document
  document.body.appendChild(anchor);

  // Trigger the download by clicking the anchor
  anchor.click();

  // Clean up by removing the anchor and revoking the temporary URL
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

color_Picker.addEventListener('change', function(){
  console.log('color change to'+color_Picker.value)
  header[0].style.backgroundColor = color_Picker.value;
});

// Add an event listener to the input field
fontSizeInput.addEventListener('input', function() {
  // Get the value from the input field
  const fontSize = this.value;

  // Update the font size of the target element
  preview.style.fontSize = `${fontSize}em`;
});

window.MathJax = {
    tex: {
    macros: {
        code: ['\\href{#2}{}', 1],
    },
      inlineMath: [['$', '$'], ['\\(', '\\)']
    ],
      displayMath: [['$$', '$$'],['\\[', '\\]']
    ],
    }
  };
  //inlineMath: [['$', '$'], ['\\(', '\\)'],['\(','\)']