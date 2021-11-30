const newReviewHandler = async (event) => {
    event.preventDefault();
  
    const property_id = event.target.getAttribute('data-id');
    const title = document.querySelector('#reviewTitle').value.trim();
    const rating = $('input[name=reviewRating]:checked').val();
    const description = document.querySelector('#reviewDescription').value.trim();
  
    if (title && rating && description) {
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ title, rating, description, property_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  document
  .querySelector('#postBtn')
  .addEventListener('click', newReviewHandler);