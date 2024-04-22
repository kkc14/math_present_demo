
var input = document.getElementById('input');
var preview = document.getElementById('preview');
let timeoutId = null;
let mark=0;

document.addEventListener('DOMContentLoaded', function() {
    input.addEventListener('input', function() {
      mark=0;
      var text = input.value;
      var html = markdownToHtml(text)+'</div>';
      preview.innerHTML = html;
      console.log(html)
      save_to_localStorage();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(function() {
        MathJax.typeset();
      }, 500);

      //codeElement();
    });
  });


  function markdownToHtml(markdown) {
    
    const text = input.textContent;
    console.log(text)

//=====================

var md = window.markdownit({
  html: true,
  linkify: true,
  typographer: true
})

var defaultRender = md.renderer.rules.image;

md.inline.ruler.push('customDiv', function (state, index) {
  var start = state.pos;
  var marker = '#-';
  // Check if the current position matches the marker
  if (state.src.startsWith(marker)) {
    var end = start + state.posMax;
    //console.log(state);
    // Extract class names from the marker
    var classAttribute = state.src.slice(start + 3, end);
    var token = state.push('html_block', '', 1);
    if (mark == 0) {
      token.content = '<div id=slide ' + 'class="' + classAttribute + '">';
      mark = 1;
    } else {
      token.content = '</div><div id=slide ' + 'class="' + classAttribute + '">';
    }

    state.pos = state.posMax;
    return true;
  }
  return false;
});

// Disable paragraph mode
md.renderer.rules.paragraph_open = function () {
  return '';
};
md.renderer.rules.paragraph_close = function () {
  return '';
};



md.renderer.rules.image = function (tokens, idx, options, env, self) {
  var token = tokens[idx];

  // Parse the alt text for size information
  var altText = token.content;
  var match = altText.match(/{size:(\d+)+ float:([a-z]+)}/);
  if (match) {
    var size = match[1];
    var float = match[2];

    // Remove the size information from the alt text
    token.content = altText.replace(/{size:(\d+%)+ float:([a-z]+)}/, '');

    // Add the size information to the src attribute
    token.attrs[token.attrIndex('src')][1] += ' style="width: ' + size + '%; height: ' + size + '%;float:'+float+' ;"';
  }

  // Call the default renderer
  return defaultRender(tokens, idx, options, env, self);
};


//==================
    
    var output = md.render(markdown);
    return output ;
  }