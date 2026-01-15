export function estimateSinglePostReadTime() {
  const post = document.querySelector('.single-post');
  const readTimeEl = document.querySelector('.single-post__read-time');

  // Text calculation
  const text = post.innerText || '';
  const words = text.trim().split(/\s+/).length; // count words
  const readingSpeed = 200; // words per minute
  let timeMinutes = words / readingSpeed;

  // Images calculation
  const images = post.querySelectorAll('img').length;
  const imageTime = images * 10; // 10 seconds per image
  timeMinutes += imageTime / 60; // convert seconds to minutes

  // Round to nearest minute
  const roundedTime = Math.max(1, Math.round(timeMinutes));

  //  Update the element
  readTimeEl.textContent = `${roundedTime} min read`;
}