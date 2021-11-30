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
        document.location.replace('/');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('.new-property-form')
  .addEventListener('submit', newFormHandler);