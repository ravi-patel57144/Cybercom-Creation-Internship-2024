fetch('https://reqres.in/api/users')
    .then(response => {
        console.log('Response status:', response.status);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data');
        }
    })
    .then(data => {
        console.log('Data received:', data);


        const userListDiv = document.getElementById('user-list');
        const users = data.data;

        users.forEach(user => {
            const userCard = document.createElement('div');
            const img = document.createElement('img');
            const userCardContent = document.createElement('div');
            const h3 = document.createElement('h3');
            const p = document.createElement('p');

            userCard.classList.add('user-card');
            img.src = user.avatar;
            img.alt = `${user.first_name} ${user.last_name}'s avatar`;
            userCardContent.classList.add('user-card-content');
            h3.textContent = `${user.first_name} ${user.last_name}`;
            p.textContent = user.email;

            userCardContent.appendChild(h3);
            userCardContent.appendChild(p);
            userCard.appendChild(img);
            userCard.appendChild(userCardContent);
            userListDiv.appendChild(userCard);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
