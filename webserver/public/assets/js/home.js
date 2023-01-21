function runQueryParamsExample(form) {
    let params = readFormParams(form);
    let url = '/demo/query-params?' + new URLSearchParams(params);
    fetch(url).then(displayResponse);
    return false;
}

function runPostJsonExample(form) {
    let params = readFormParams(form);
    let url = '/demo/post-json';
    let options = {method: 'POST', body: JSON.stringify(params), headers: {'Content-Type': 'application/json'}};
    fetch(url, options).then(displayResponse);
    return false;
}

function readFormParams(form) {
    let params = {};

    let inputList = form.querySelectorAll('input');

    for (let input of inputList) {
        params[input.name] = input.value;
    }

    return params;
}

function displayResponse(response) {
    response.text().then(text => {
        document.querySelector('#response').innerText = text;
    });
}
