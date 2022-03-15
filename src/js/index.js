import { emptyTemplate, userTemplate } from "./templates.js";

const app = {};

app.init = () => {
    console.log('Application Init');
    let createUserForm = document.querySelector('#userCreateForm');
    createUserForm.addEventListener('submit', app.createUser);
    let updateUserForm = document.querySelector('#userUpdateForm');
    updateUserForm.addEventListener('submit', app.updateUser);
    app.renderUsers();
}

app.renderToast = (response) => {
    let toast = document.querySelector('.toast');
    toast.classList.add('active');
    toast.textContent = response;
    let showToast = setTimeout(() => {
        toast.classList.remove('active');
    }, 2000);
}

app.renderUsers = () => {
    console.log('Udskriver Brugere');
    let usersContainer = document.querySelector('#userList');
    app.getUsers().then((users) => {
        console.log(users);
        //Tømmer containeren for brugere
        usersContainer.innerHTML = '';

        if (users.length === 0) {
            //Udskriver ingen brugere
            users.map(() => {
                usersContainer.insertAdjacentHTML('beforeend', emptyTemplate);
            });
        } else {
            //Udskriver alle brugere
            users.map((user) => {
                usersContainer.insertAdjacentHTML('beforeend', userTemplate(user));
            });
            let deleteBtn = document.querySelectorAll('.deleteBtn');
            deleteBtn.forEach((btn) => {
                btn.addEventListener('click', app.deleteUser);
            });
        }
    });
}

app.getUsers = () => {
    return fetch('http://localhost:3000/user').then((res) => res.json());
}

app.postNewuser = (userName, userImage) => {
    var formdata = new FormData();
    formdata.append("name", userName);
    formdata.append("userImage", userImage.files[0]);
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    return fetch('http://localhost:3000/user', requestOptions)
        .then((res) => res.json());
}

app.createUser = (e) => {
    //stopper normal opførsel (refresh af side)
    e.preventDefault();
    let username = document.querySelector('#inpUserName');
    let userimage = document.querySelector('#inpUserImage');

    app.postNewuser(username.value, userimage).then((res) => {
        app.renderToast(res.message);
        username.value = '';
        userimage.value = '';
        app.renderUsers();
    });
}

app.patchUser = (userName, newUserName, userImage) => {
    var formdata = new FormData();
    formdata.append("name", newUserName);
    formdata.append("userImage", userImage.files[0]);
    var requestOptions = {
        method: 'PATCH',
        body: formdata,
        redirect: 'follow'
    };
    return fetch(`http://localhost:3000/user/${userName}`, requestOptions)
        .then((res) => res.json());
}

app.updateUser = (e) => {
    //stopper normal opførsel (refresh af side)
    e.preventDefault();
    let username = document.querySelector('#inpUserNameUpdate');
    let newUserName = document.querySelector('#inpUserNameNewUpdate');
    let userimage = document.querySelector('#inpUserImageUpdate');
    app.patchUser(username.value, newUserName.value, userimage).then((res) => {
        app.renderToast(res.message);
        username.value = '';
        userimage.value = '';
        newUserName.value = '';
        app.renderUsers();
    });
}

app.deleteSingleUSer = (id) => {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    return fetch(`http://localhost:3000/user/${id}`, requestOptions)
        .then((res) => res.json());
}

app.deleteUser = (e) => {
    e.preventDefault();
    let userID = e.target.id;
    app.deleteSingleUSer(userID).then((res) => {
        app.renderToast(res.message);
        app.renderUsers();
    });
}

app.init();