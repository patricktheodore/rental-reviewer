const newReviewHandler = async (event) => {
    event.preventDefault();
  
    const id = event.target.getAttribute('data-id');
    const title = document.querySelector('#reviewTitle').value.trim();
    const rating = $('input[name=reviewRating]:checked').val();
    const description = document.querySelector('#reviewDescription').value.trim();

  
    if (title && rating && description) {
      const response = await fetch(`/api/reviews/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, rating, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/api/reviews/${id}`);
    } else {
        alert('Failed to update post');
      }
    }
  };
  
  document
  .querySelector('#postBtn')
  .addEventListener('click', newReviewHandler);