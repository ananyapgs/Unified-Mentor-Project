document.addEventListener('DOMContentLoaded', function() {
    // Comment form submission
    const commentForm1 = document.getElementById('commentForm1');
    const commentsContainer1 = document.getElementById('comments1');
  
    commentForm1.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name1').value;
      const message = document.getElementById('message1').value;
      const comment = document.createElement('div');
      comment.innerHTML = `<strong>${name}</strong>: ${message}`;
      commentsContainer1.appendChild(comment);
      commentForm1.reset();
    });
  
    // Similar event listeners for other comment forms
  });
  