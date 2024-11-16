document.addEventListener("DOMContentLoaded", () => {
  // Variables for modal, buttons, and containers
  const lanesContainer = document.getElementById("lanes");
  const subredditInput = document.getElementById("subredditInput");
  const addLaneBtn = document.getElementById("addLaneBtn");
  const openSubredditModal = document.getElementById("openSubredditModal");
  const subredditModal = document.getElementById("subredditModal");
  const closeModalButton = document.querySelector(".close-modal");

  // Load saved lanes from local storage
  const savedLanes = JSON.parse(localStorage.getItem("redditLanes")) || [];
  savedLanes.forEach(subreddit => addLane(subreddit));

  // Open modal for adding new subreddit
  openSubredditModal.addEventListener("click", () => {
      subredditModal.style.display = "block";
  });

  // Close modal when clicking the close (X) button
  closeModalButton.addEventListener("click", () => {
      subredditModal.style.display = "none";
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
      if (event.target === subredditModal) {
          subredditModal.style.display = "none";
      }
  });

  // Add lane event when user clicks on "Add" button
  addLaneBtn.addEventListener("click", () => {
      const subreddit = subredditInput.value.trim();
      if (subreddit) {
          addLane(subreddit);
          subredditModal.style.display = "none";
      }
  });

  // Function to add a new subreddit lane with options to refresh or delete
  function addLane(subreddit) {
      const lane = document.createElement("div");
      lane.classList.add("lane");
      
      // Create lane with options and posts container
      lane.innerHTML = `
          <h2>${subreddit}</h2>
          <div class="options">
              <span class="options-btn">...</span>
              <div class="options-menu">
                  <button class="refresh-btn">Refresh</button>
                  <button class="delete-btn">Delete</button>
              </div>
          </div>
          <div class="posts-container">Loading posts...</div>
      `;

      lanesContainer.appendChild(lane);
      fetchSubredditPosts(subreddit, lane); // Fetch posts for the subreddit

      // Event listeners for options
      const optionsBtn = lane.querySelector(".options-btn");
      const optionsMenu = lane.querySelector(".options-menu");
      const refreshBtn = lane.querySelector(".refresh-btn");
      const deleteBtn = lane.querySelector(".delete-btn");

      // Toggle the options menu (three dots)
      optionsBtn.addEventListener("click", () => {
          optionsMenu.classList.toggle("show");
      });

      // Refresh button functionality
      refreshBtn.addEventListener("click", () => {
          fetchSubredditPosts(subreddit, lane);
          optionsMenu.classList.remove("show");
      });

      // Delete button functionality
      deleteBtn.addEventListener("click", () => {
          lane.remove();
          removeLaneFromStorage(subreddit);
      });

      // Save lane in localStorage
      saveLane(subreddit);
  }

  // Fetch Reddit posts using Reddit's JSON API
  function fetchSubredditPosts(subreddit, laneElement) {
      const postsContainer = laneElement.querySelector(".posts-container");
      postsContainer.innerHTML = `<div class="loading">Loading...</div>`;

      fetch(`https://www.reddit.com/r/${subreddit}.json`)
          .then(response => {
              if (!response.ok) {
                  throw new Error("Subreddit not found");
              }
              return response.json();
          })
          .then(data => {
              postsContainer.innerHTML = ""; // Clear posts container
              const posts = data.data.children;

              posts.forEach(post => {
                  const postElement = document.createElement("div");
                  postElement.classList.add("post");
                  postElement.innerHTML = `
                      <div class="post-title">${post.data.title}</div>
                      <div class="post-author">Posted by ${post.data.author}</div>
                      <div class="post-votes">Votes: ${post.data.ups}</div>
                  `;
                  postsContainer.appendChild(postElement);
              });
          })
          .catch(error => {
              postsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
          });
  }

  // Save subreddit to local storage
  function saveLane(subreddit) {
      const savedLanes = JSON.parse(localStorage.getItem("redditLanes")) || [];
      if (!savedLanes.includes(subreddit)) {
          savedLanes.push(subreddit);
          localStorage.setItem("redditLanes", JSON.stringify(savedLanes));
      }
  }

  // Remove subreddit from local storage
  function removeLaneFromStorage(subreddit) {
      let savedLanes = JSON.parse(localStorage.getItem("redditLanes")) || [];
      savedLanes = savedLanes.filter(lane => lane !== subreddit);
      localStorage.setItem("redditLanes", JSON.stringify(savedLanes));
  }
});
