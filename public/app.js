// Grab the articles as a json
$.get("/articles", function (data) {

    if (data.length === 0) {
        $("#articles").append(
            `<div class="card mb-3">
                <div class="card-body ">
                    <h1 class="text-center">Nothing here yet, scrape some ish!</h1>
                </div>
            </div>`
        );
    }
    else {
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#articles").append(
                `<div class="card mb-3 border-0 shadow-xl">
                <div class="card-header bg-dark">
                    <div class="d-flex bd-highlight">
                        <div class="p-2 w-100 bd-highlight">
                            <a class="rounded" href="${data[i].link}">
                                <h4 class="articleTitle text-white-50 font-weight-normal">${data[i].title}</h4>
                            </a>
                        </div>
                        <div class="p-2 flex-shrink-1 bd-highlight">
                            <button data-id="${data[i]._id}" type="button" class="btn btn-success float-right" id="noteThing">Notes</button>
                        </div>
                    </div>
                </div>

                <div class="card-body bg-light">
                    <blockquote class="blockquote mb-0">
                        <p class="text-secondary"><strong>Excerpt: </strong>${data[i].excerpt}</p>
                    </blockquiote>
                </div>
            </div>`
            );
        };
    };
});

// Scrape for the newest articles
$(document).on("click", "#scrapePoop", function () {

    $.ajax({
        method: "GET",
        url: "/scrape/"
    }).then(function () {
        $('#scrapePoop').popover('show')
        setTimeout(function () {
            location.reload();
        }, 1500);
    });
});

// Whenever someone clicks a p tag
$(document).on("click", "#noteThing", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(function (data) {
            // console.log(data);
            $("#notes").append(
                `<h3>${data.title}"</h3>
                <hr>

                <div class="form-group">
                    <input class="form-control mb-2" type="text" id="titleinput" placeholder="Note Title">

                    <textarea class="form-control" id="bodyinput" rows="4" placeholder="Note Content"></textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" data-id=${data._id} id="savenote" class="btn btn-success">Save Note</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>`
            );
            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            };

        });
    $('#modal4days').modal()
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    }).then(function () {
        $("#notes").empty();
        $("#notes").append(
            `<h3 class="text-center">Note Saved</h3>`
        );
    });
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
