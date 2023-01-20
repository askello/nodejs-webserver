$('#query-params-example').submit(function(e) {
    e.preventDefault();
    let url = '/demo/query-params?' + $(this).serialize();
    $.getJSON(url, displayResponse);
});

$('#post-json-example').submit(function(e) {
    e.preventDefault();
    let params = readFormParams($(this));
    $.post('/demo/post-json', JSON.stringify(params), displayResponse, 'json');
});

function readFormParams(form) {
    let params = {};

    form.find('input').each(function() {
        let key = $(this).attr('name');
        let val = $(this).val();
        params[key] = val;
    });

    return params;
}

function displayResponse(json) {
    $('#response').text(JSON.stringify(json, null, 4));
}
