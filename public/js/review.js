const newReviewHandler = async (event) => {
  event.preventDefault();

  const property_id = event.target.getAttribute('data-id');
  const title = document.querySelector('#review-title').value.trim();
  const rating = $('input[name=reviewRating]:checked').val();
  const description = document.querySelector('#review-desc').value.trim();

  if (!title) {
    alert('Please Enter a Title for your Review')
  };

  if (!rating) {
    alert('Please enter a rating for your review')
  };

  if (!description) {
    alert('Please give more details about your review.')
  }

  if (title && rating && description) {
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({ title, rating, description, property_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      await Swal.fire({
        icon: 'success',
        title: `Review '${title}' Successfully Added!`,
        confirmButtonText: 'Ok.'
      });
      document.location.reload();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'You have already reviewed this property!',
        text: 'You can view and edit reviews from your dashbaord.',
        showDenyButton: true,
        confirmButtonText: 'Take Me There',
        denyButtonText: 'Sorry.'
      }).then((result) => {
        if (result.isConfirmed) {
          document.location.replace('/dashboard')
        }
      });
    }
  }
};

document
  .querySelector('#postBtn')
  .addEventListener('click', newReviewHandler);