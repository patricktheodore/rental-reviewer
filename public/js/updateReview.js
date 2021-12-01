const newReviewHandler = async (event) => {
    event.preventDefault();
  
    const id = event.target.getAttribute('data-id');
    const title = document.querySelector('#reviewTitle').value.trim();
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
    });      }
    }
  };
  
  document
  .querySelector('#postBtn')
  .addEventListener('click', newReviewHandler);
