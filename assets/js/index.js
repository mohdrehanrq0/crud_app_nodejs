
$('#add_user').submit(function(e){
 alert("User added successfully.");
});


$('#update_user').submit(function(e){
    e.preventDefault();

    var unindex_array = $(this).serializeArray();
    var data = {};

    $.map(unindex_array, function(n, i){
        data[n['name']] = n['value'];
    })
    console.log(data);

    var request = {
        "url": `http://localhost:8080/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }
    
    $.ajax(request).done(function(response) {
        alert('Data updated successfully.');
    })    
});


if(window.location.pathname == "/"){
    $ondelete = $('table tbody tr td a#delete_btn');
    $ondelete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:8080/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm('Are you sure you want to delete this record ?')){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully.");
                location.reload();
            })
        }
    });
}