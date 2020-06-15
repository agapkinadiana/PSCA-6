
function init() {
    loadJSON();
    loadXML();
}

async function loadJSON() {
    let jsonDiv = document.getElementById('json');
    fetch('http://localhost:8000/test/test.json')
        .then(response => response.json())
        .then(jsonResponse => {
            jsonDiv.innerText = JSON.stringify(jsonResponse);
        });
}

async function loadXML() {
    let xmlDiv = document.getElementById('xml');
    fetch('http://localhost:8000/test/test.xml')
        .then(response => response.text())
        .then(textResponse => {
            xmlDiv.innerText = textResponse;
        });
}
