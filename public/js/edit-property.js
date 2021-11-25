async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/').pop();

    const title = document.querySelector('input[name="property-title"]').value;
    const property_content = document.querySelector('textarea[name="property-content"]').value;

    const response = await fetch(`/api/property/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, property_content }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-property-form').addEventListener('submit', editFormHandler);
