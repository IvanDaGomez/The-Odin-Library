document.addEventListener("DOMContentLoaded", function() {


    var pestaña =document.querySelector("#pestaña");
    function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read ? "read" : "not read yet";
    
        this.info = () => {
            return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
        }
    }
    function agregarPestaña() {
        pestaña.style.display = "inline";
    }
    
    function cerrarPestaña() {
        pestaña.style.display = "none";
    }
    // Función para actualizar los libros en la página
    function actualizarLibros(total) {
        for (book of total){
            crearLibro(book.title);
        }
    }


    // Función para crear libros en la página
    function crearLibro(titulo) {
        // Objeto para almacenar las posiciones ocupadas en cada estantería

    
        var estanterias = [".leidos_up", ".leidos_down", ".noleidos_up", ".noleidos_down"];
        

        var estanteria = document.querySelector(estanterias[Math.floor(Math.random() * estanterias.length)]);
        if (estanteria.childElementCount>3){
            var estanteriaIndex = estanterias.indexOf(estanteria)
            estanterias.splice(estanteriaIndex,1);
            }
            
     
        const libro = document.createElement("div");
        libro.className = "libro";
        


        colores = ["#68C7C1","#FACA78","#DD5341", "#F57F5B"]
        libro.style.background = colores[Math.floor(Math.random()*colores.length)];
        
        // Agregar el libro a la estantería
        estanteria.appendChild(libro);
    
        // Agregar el título del libro
        div=document.createElement("div")
        libro.appendChild(div);
        div.innerText = titulo;
    }

    

    
    let leido = [];
    let noleido = [];
    let cuenta = document.querySelector("#cuentaleido");
    let nocuenta = document.querySelector("#cuentanoleido");

    function actualizarContadores() {
        cuenta.innerText = `Leído: ${leido.length}`;
        nocuenta.innerText = `No leído: ${noleido.length}`;
    }
    function guardarLibros() {
        localStorage.setItem('leido', JSON.stringify(leido));
        localStorage.setItem('noleido', JSON.stringify(noleido));
    }
    if (localStorage.getItem('leido')) {
        leido = JSON.parse(localStorage.getItem('leido')).map(book => new Book(book.title, book.author, book.pages, book.read === "read"));
    }
    if (localStorage.getItem('noleido')) {
        noleido = JSON.parse(localStorage.getItem('noleido')).map(book => new Book(book.title, book.author, book.pages, book.read === "not read yet"));
    }
    total = leido.concat(noleido);

    actualizarContadores();
    actualizarLibros(total);


//click para la pagina
    let agregar = document.querySelector(".agregar");
    agregar.addEventListener("click", agregarPestaña);
    
    let cerrar = document.querySelector(".imgcerrar");
    cerrar.addEventListener("click", cerrarPestaña);
    


    
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        const fd = new FormData(form);
        let libro = {};
        for (item of fd){
            console.log(item);
            if (item[1] == "on") item[1] = true;
            libro[item[0]] = item[1];
        }
        if (libro['Leido']) {
            leido.push(new Book(libro['nombre'], libro['autor'], libro['paginas'], true));
        } else {
            noleido.push(new Book(libro['nombre'], libro['autor'], libro['paginas'], false));
        }
        let input = document.querySelector(".input");

        pestaña.style.display = "none";

        actualizarContadores();
        guardarLibros();
        crearLibro(libro['nombre']);
    });

});
