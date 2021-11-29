async function reviewFormHandler(event) {
    event.preventDefault();

    const review_text = document.querySelector('textarea[name="review-body"]').value.trim();

    const property_id = window.location.toString().split('/').pop();

    if (review_text) {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({ property_id, review_text }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.review-form').addEventListener('submit', reviewFormHandler);