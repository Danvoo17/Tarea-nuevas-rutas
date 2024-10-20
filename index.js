const express = require('express');
const app = express();

app.use(express.json());

const contactos = [
    { id: 1, nombre: 'Joel David', telefono: '849-249-2006' },
    { id: 2, nombre: 'Jose Daniel', telefono: '809-787-3912' },
    { id: 3, nombre: 'Jesus Dariel', telefono: '849-478-9343' }
];

const clientes = [
    { id: 1, nombre: 'Skibidi', pais: 'México' },
    { id: 2, nombre: 'Yao ming', pais: 'China' },
    { id: 3, nombre: 'Mr Beast', pais: 'USA' }
];

const empresas = [
    { id: 1, nombre: 'Tech Solutions'},
    { id: 2, nombre: 'SoftCorp'},
    { id: 3, nombre: 'Innovatech'}
];

const catalogos = [
    { id: 1, producto: 'Laptop', categoria: 'Electrónica' },
    { id: 2, producto: 'Escritorio', categoria: 'Muebles' },
    { id: 3, producto: 'Teléfono', categoria: 'Electrónica' }
];


////////////////////////////////Obtener listas de registros/////////////////////////////
app.get('/api/contactos', (req, res) => {
    res.send(contactos);
});

app.get('/api/clientes', (req, res) => {
    res.send(clientes);
});

app.get('/api/empresas', (req, res) => {
    res.send(empresas);
});

app.get('/api/catalogos', (req, res) => {
    res.send(catalogos);
});


////////////////////////////////Buscar por ID/////////////////////////////
app.get('/api/contactos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).send('Bad Request: El ID debe ser un número');
    }

    const contacto = contactos.find(c => c.id === id);

    if (!contacto) {
        return res.status(404).send('Not Found: Contacto no encontrado');
    }

    res.send(contacto);
});

app.get('/api/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).send('Bad Request: El ID debe ser un número');
    }

    const cliente = clientes.find(c => c.id === id);

    if (!cliente) {
        return res.status(404).send('Not Found: Cliente no encontrado');
    }

    res.send(cliente);
});

app.get('/api/empresas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).send('Bad Request: El ID debe ser un número');
    }

    const empresa = empresas.find(e => e.id === id);

    if (!empresa) {
        return res.status(404).send('Not Found: Empresa no encontrada');
    }

    res.send(empresa);
});

app.get('/api/catalogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).send('Bad Request: El ID debe ser un número');
    }

    const catalogo = catalogos.find(c => c.id === id);

    if (!catalogo) {
        return res.status(404).send('Not Found: Catálogo no encontrado');
    }

    res.send(catalogo);
});


////////////////////////////////Crear nuevos registros////////////////////////////////

let nextId = 4;  // Esta variable es para solucionar un error de logica que habia, funciona como si fuera un auto-increment, y empieza desde el 4 porque los registros ya tienen 3 id 
app.post('/api/contactos', (req, res) => {
    const { nombre, telefono } = req.body;

    const nuevoContacto = {
        id: nextId++,
        nombre,
        telefono
    };

    contactos.push(nuevoContacto);
    res.status(201).send(nuevoContacto);
});

let nextIdcli = 4;
app.post('/api/clientes', (req, res) => {
    const { nombre, pais } = req.body;

    const nuevoCliente = {
        id: nextIdcli++,
        nombre,
        pais
    };

    clientes.push(nuevoCliente);
    res.status(201).send(nuevoCliente);
});

let nextIdemp = 4;
app.post('/api/empresas', (req, res) => {
    const { nombre, ubicacion } = req.body;

    const nuevaEmpresa = {
        id: nextIdemp++,
        nombre,
        ubicacion
    };

    empresas.push(nuevaEmpresa);
    res.status(201).send(nuevaEmpresa);
});

let nextIdcat = 4;
app.post('/api/catalogos', (req, res) => {
    
    const { producto, categoria } = req.body;

    const nuevoCatalogo = {
        id: nextIdcat++,
        producto,
        categoria
    };

    catalogos.push(nuevoCatalogo);
    res.status(201).send(nuevoCatalogo);
});


////////////////////////////////Borrar los registros////////////////////////////////
app.delete('/api/contactos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = contactos.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).send(`Contacto con ID ${id} no encontrado`);
    }

    const contactoEliminado = contactos.splice(index, 1);
    res.send(contactoEliminado);
});

app.delete('/api/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).send(`Cliente con ID ${id} no encontrado`);
    }

    const clienteEliminado = clientes.splice(index, 1);
    res.send(clienteEliminado); 
});

app.delete('/api/empresas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = empresas.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).send(`Empresa con ID ${id} no encontrada`);
    }

    const empresaEliminada = empresas.splice(index, 1);
    res.send(empresaEliminada); 
});

app.delete('/api/catalogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = catalogos.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).send(`Catálogo con ID ${id} no encontrado`);
    }

    const catalogoEliminado = catalogos.splice(index, 1);
    res.send(catalogoEliminado); 
});


////////////////////////////////Configuracion de Puerto///////////////////////
const port = process.env.PORT || 5100;
app.listen(port, () => {
    console.log('API funcionando en el puerto ' + port);
});
