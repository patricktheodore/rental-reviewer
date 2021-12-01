const viewButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        document.location.replace(`/api/property/${id}`)
    }
};

document.querySelectorAll('.viewBtn').forEach(btn => {
    btn.addEventListener('click', viewButtonHandler)
});