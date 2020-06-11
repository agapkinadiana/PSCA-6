
function lockRemoveButton() {
    const removeButton = document.getElementById('remove-button');
    if (!removeButton) {
        return;
    }
    removeButton.setAttribute('disabled', 'true');
}

function addNewRecord() {
    const fullName = document.getElementsByName('fullName')[0].value;
    const phone = document.getElementsByName('phone')[0].value;

    if (!fullName || !phone) {
        return;
    }

    fetch('/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({fullName, phone})
    }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function updateRecord() {
    const id = document.getElementsByClassName('form-part edit')[0].getAttribute('data-key');
    const fullName = document.getElementsByName('fullName')[0].value;
    const phone = document.getElementsByName('phone')[0].value;

    if (!fullName || !phone) {
        return;
    }

    fetch('/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, fullName, phone})
    }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function deleteRecord() {
    const id = document.getElementsByClassName('form-part edit')[0].getAttribute('data-key');
    if (!id) {
        return;
    }

    fetch('/delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
    }).then(response => response.json())
        .then(() => window.location.href = '/');
}
