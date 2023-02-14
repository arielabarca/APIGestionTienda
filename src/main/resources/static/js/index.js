// Call the dataTables jQuery plugin
$(document).ready(function() {
  tagEmailUsuario();
});

function tagEmailUsuario(){
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

