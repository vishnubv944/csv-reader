
console.log("Hello")
function showTable(){
    document.getElementById("file-input").classList.add("none")
    document.getElementById("table").classList.remove("none")
}

function searchFunc(){
    console.log("Searchingg...")
}

$(document).ready(function() {
    $('#tab').DataTable( {
    } );
} );


$(function(){
    $("#upload_link").on('click', function(e){
        e.preventDefault();
        $("#upload:hidden").trigger('click');
    });
    });
    