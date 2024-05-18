const socketClient = io()

socketClient.on("sendProducts", (obj) => {
    updateProductList(obj)
})

function updateProductList(productList) {
    const productsDiv = document.getElementById('list-products')
    let productsHTML = ""

    productList.forEach((product) => {
        productsHTML += `<div class="column is-one-fifth">
        <div class="card" style="height: 100%">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-5">${product.title}</p>
                        <p class="subtitle is-6">$ ${product.price}</p>
                    </div>
                </div>
                <div class="content">
                    ${product.description}
                    <br /><br />
                    Stock: ${product.stock}
                    <br /><br />
                    ID: ${product._id}
                </div>
            </div>
        </div>
    </div>`
    })

    productsDiv.innerHTML = productsHTML
}

const form = document.getElementById("formProduct")
form.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const title = form.elements.title.value
    const description = form.elements.description.value
    const price = form.elements.price.value
    const code = form.elements.code.value
    const stock = form.elements.stock.value
    const thumbnail = form.elements.thumbnail.value
    const status = form.elements.status.checked

    socketClient.emit("addProduct", {
        title,
        description,
        price,
        code,
        stock,
        thumbnail,
        status,
    })
    form.reset()
})

document.getElementById("delete-btn").addEventListener("click", () => {
    const idInput = document.getElementById("id-prod")
    const deleteId = idInput.value
    
    socketClient.emit("deleteProduct", deleteId)
    idInput.value = ""
})

socket.emit('message', "Comunicandome desde websocket")