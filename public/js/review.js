const newFormHandler = async (event) => {
    event.preventDefault();
  
    // const name = document.querySelector('#project-name').value.trim();
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    
    const review_text = document.querySelector('#review-desc').value.trim();
  
    if (review_text) {
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ review_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log(review_text)
      if (response.ok) {
        document.location.replace('/book');
      } else {
        alert('Failed to create review');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const review_id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/reviews/${review_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/book');
      } else {
        alert('Failed to delete review');
      }
    }
  };
  
  document
    .querySelector('.new-review-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.review-list')
    .addEventListener('click', delButtonHandler);
  