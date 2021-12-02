const newReviewHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');
  const title = document.querySelector('#reviewTitle').value.trim();
  const rating = $('input[name=reviewRating]:checked').val();
  const description = document.querySelector('#review-desc').value.trim();

  if (!title) {
    Swal.fire({
      icon: 'error',
      title: 'Please Enter a Title for your Review'
    });
  };

  if (!rating) {
    Swal.fire({
      icon: 'error',
      title: 'Please Enter a Rating for your Review'
    });
  };

  if (!description) {
    Swal.fire({
      icon: 'error',
      title: 'Please Provide More details about your Review.'
    });
  }


  if (title && rating && description) {
    const response = await fetch(`/api/reviews/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, rating, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      await Swal.fire({
        icon: 'success',
        title: `Review '${title}' Successfully Updated!`,
        confirmButtonText: 'Ok.'
      });
      document.location.replace(`/dashboard`);
    } else {
      Swal.fire({
        icon: 'error',
        title: response.statusText
      });
    }
  }
};

document
  .querySelector('#postBtn')
  .addEventListener('click', newReviewHandler);
