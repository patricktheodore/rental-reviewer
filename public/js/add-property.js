async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="property-title"]').value;
    const property_content = document.querySelector('textarea[name="property-content"]').value;

    const response = await fetch(`/api/property`, {
        method: 'POST',
        body: JSON.stringify({ title, property_content }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-property-form').addEventListener('submit', newFormHandler);