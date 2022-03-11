export const emptyTemplate = 
    `<span>-</span>
    <span class='userimage'><div>-</div></span>
    <span>-</span>
    <span>-</span>`;

export const userTemplate = (user) => 
    `<span>${user._id}</span>
    <span class='userimage'>
        <div>
            <img src=http://localhost:3000/${user.userImage}>
        </div>
    </span>
    <span>${user.name}</span>
    <span>
        <button class='deleteBtn' id=${user._id}>DELETE</button>
    </span>`;