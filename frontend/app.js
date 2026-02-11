class Orden {
    constructor(producto, cantidad = 1, nota = "") {
        this.producto = producto;
        this.cantidad = cantidad;
        this.nota = nota;
    }

    editar(cantidad, nota) {
        this.cantidad = cantidad;
        this.nota = nota;
    }

    render(index) {
        return `
            <span>${this.cantidad} ${this.producto}${this.nota ? " (Nota: " + this.nota + ")" : ""}</span>
            <button class="edit-btn" data-index="${index}">Editar</button>
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        `;
    }
}

class GestorDeOrdenes {
    constructor(listaDOM) {
        this.ordenes = [];
        this.listaDOM = listaDOM;
        this.cargarDeLocalStorage();
    }

    agregarOrden(producto, cantidad, nota) {
        const existente = this.ordenes.find(o => o.producto === producto && o.nota === nota);
        if (existente) {
            existente.cantidad += cantidad;
        } else {
            this.ordenes.push(new Orden(producto, cantidad, nota));
        }
        this.render();
        this.guardarEnLocalStorage();
    }

    eliminarOrden(index) {
        this.ordenes.splice(index, 1);
        this.render();
        this.guardarEnLocalStorage();
    }

    editarOrden(index, cantidad, nota) {
        this.ordenes[index].editar(cantidad, nota);
        this.render();
        this.guardarEnLocalStorage();
    }

    render() {
        this.listaDOM.innerHTML = "";
        this.ordenes.forEach((orden, i) => {
            const li = document.createElement("li");
            li.innerHTML = orden.render(i);
            this.listaDOM.appendChild(li);
        });
    }

    guardarEnLocalStorage() {
        localStorage.setItem("ordenesElFuelle", JSON.stringify(this.ordenes));
    }

    cargarDeLocalStorage() {
        const data = localStorage.getItem("ordenesElFuelle");
        if (data) {
            const parsed = JSON.parse(data);
            this.ordenes = parsed.map(o => new Orden(o.producto, o.cantidad, o.nota));
            this.render();
        }
    }
}

const ordersList = document.getElementById("orders");
const gestor = new GestorDeOrdenes(ordersList);

// 🎯 Adaptación para las tarjetas
document.querySelectorAll(".card .agregar").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        const producto = card.dataset.producto;
        const cantidad = parseInt(card.querySelector(".cantidad").value) || 1;
        const nota = card.querySelector(".nota").value.trim();

        gestor.agregarOrden(producto, cantidad, nota);

        // limpiar inputs
        card.querySelector(".cantidad").value = 1;
        card.querySelector(".nota").value = "";
    });
});

// Delegación de eventos para editar y eliminar dentro del carrito
ordersList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("edit-btn")) {
        const orden = gestor.ordenes[index];
        const li = e.target.closest("li");
        li.innerHTML = `
            <strong>Editando:</strong> ${orden.producto}
            <br>
            <label>Cantidad:</label>
            <input type="number" class="edit-qty" value="${orden.cantidad}" min="1">
            <label>Nota:</label>
            <input type="text" class="edit-note" value="${orden.nota}" placeholder="Notas (ej. sin frijoles)">
            <br>
            <button class="save-btn" data-index="${index}">Guardar</button>
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        `;
    }

    if (e.target.classList.contains("save-btn")) {
        const li = e.target.closest("li");
        const newQty = parseInt(li.querySelector(".edit-qty").value) || 1;
        const newNote = li.querySelector(".edit-note").value.trim();
        gestor.editarOrden(index, newQty, newNote);
    }

    if (e.target.classList.contains("delete-btn")) {
        gestor.eliminarOrden(index);
    }
});
