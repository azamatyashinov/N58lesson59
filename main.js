async function getAllPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        console.log(posts);
        return posts;
    } catch (error) {
        console.log(error);
    }
}

async function getPostById(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadPostsButton = document.getElementById('loadPosts');
    const cardsContainer = document.getElementById('cards');
    const detailsContainer = document.getElementById('details');

    if (loadPostsButton) {
        loadPostsButton.addEventListener('click', async (e) => {
            e.preventDefault();
            

            const posts = await getAllPosts();
            cardsContainer.innerHTML = '';  

            posts.forEach(post => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.postId = post.id;  
                card.innerHTML = `
                    <p>${post.id}</p>
                    <p>${post.userId}</p>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                cardsContainer.appendChild(card);
            });
        });

        cardsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.card')) {
                const card = e.target.closest('.card');
                const postId = card.dataset.postId;

                
                window.location.href = `details.html?postId=${postId}`;
            }
        });
    }

    if (detailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('postId');

        if (postId) {
            (async () => {
                const post = await getPostById(postId);
                detailsContainer.innerHTML = '';  

                const detailCard = document.createElement('div');
                detailCard.classList.add('card');
                detailCard.innerHTML = `
                    <h3>Post ID: ${post.id}</h3>
                    <h3>User ID: ${post.userId}</h3>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                detailsContainer.appendChild(detailCard);
            })();
        } else {
            detailsContainer.innerHTML = '<p>Post topilmadi</p>';
        }
    }
});
