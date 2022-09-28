const API_KEY = '9f4fdb632432237ffd62800dc2c846fc';

// search movie when the button is clicked
$('#searchButton').click((e) => {
    // clear error message if exists
    $('#error').text('');
    // disabled search button
    $('#searchButton')
        .empty()
        .attr('disabled', 'disabled')
        .append($('<span class="spinner-border spinner-border-sm" role="status" aria - hidden = "true" > < /span>'))
            .append(' Loading...');
            // clear all previous result from the table
            $('#result').empty();
            // the data to be sent with the GET request
            const data = {
                api_key: API_KEY,
                query: $('#title').val(),
                include_adult: false
            };
            // send GET request
            $.get('https://api.themoviedb.org/3/search/tv', data)
            .done((r) => {
                if (r.results.length === 0) {
                    $('#error').text('!!! No TV Show with this title.')
                } else {
                    r.results.forEach((movie) => {
                        const tableCell = createCell(movie);
                        $('#result').append(tableCell);
                    })
                }
            })
            .fail((e) => {
                $('#error').text(`!!! ${e.status_message}`);
            })
            .always(() => {
                // re-enable the search button
                $('#searchButton')
                    .empty()
                    .removeAttr('disabled')
                    .append('Search');
            });
        })

        function createCell(movie) {
            var article = $('<article></article>');

            const a = $('<a class="text-decoration-none text-reset" href="#"></a>');
            article.append(a);

            const card = $('<div class="card cbm-section-shadow rounded-3 border-0 h-100 overflow-hidden"></div>');
            a.append(card);

            //image
            const posterUrl = (movie.poster_path !== null) ?
                `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                '';
            var cardimg = $('<div class="card-img-relative"></div>');
            cardimg.append($(`<img src="${posterUrl}" height="272">`));
            card.append(cardimg);
           
            const row = $('<div class="row card-body text-center align-items-center g-0"></div>');
            card.append(row);
            const col = $('<div class="col-12"></div>');
            row.append(col);

            //title
            const title = $('<h3 class="fs-6 fw-600 mb-0 entry-title" style="font-size: 1.08rem;"></h3>');
            col.append(title);
            const bold = $('<b></b>').text(movie.name);
            title.append(bold);

            //rating
            const rating = $('<div class="fs-6 text-muted mt-0"></div>').text(`Rating: ${movie.vote_average}`);
            col.append(rating);
            return article;
        }       
