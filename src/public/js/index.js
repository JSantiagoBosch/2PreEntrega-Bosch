const socket = io();

socket.on("realtimeprodcuts", data => {
    let containerHTML = "";

    data.forEach(item => {
        containerHTML += `<div class="col-md-3">
            <div class="card">
                <img src="${item.thumbnails[0]}" alt="${item.title}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">Precio: ${item.price}</p>
                </div>
            </div>
        </div>`;
    });

    containerHTML += "</ul>";
    document.getElementById("content").innerHTML = containerHTML;
})