const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`api/reviews/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };

  const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id'))  {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`api/reviews/edit/${id}`, {
        method: 'GET',
      }); 

      if (response.ok) {
        document.location.replace(`/api/reviews/edit/${id}`)
      } else {
        alert('Cannot Find Review!')
      }
    }};


  document
.querySelector('#editBtn')
.addEventListener('click', editButtonHandler);

  document
.querySelector('#delBtn')
.addEventListener('click', delButtonHandler);