const newFormHandler = async (event) => {
    event.preventDefault();
  
    const address = document.querySelector('#property-address').value.trim();
  
    if (address) {
      const response = await fetch(`/api/property`, {
        method: 'POST',
        body: JSON.stringify({ address }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: `${address} Added!`,
          text: 'Do you want to add a review to this property?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          showDenyButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            document.location.replace('/');
          }
        })

        
      } else {
        Swal.fire('Failed to create post', '', 'error');
      }
    }
  };

  document
  .querySelector('.new-property-form')
  .addEventListener('submit', newFormHandler);