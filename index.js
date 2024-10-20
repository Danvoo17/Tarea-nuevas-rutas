
const express = require('express');
const app = express();

app.use(express.json());

const contactos = [
    { id: 1, nombre: 'Joel David', telefono: '849-249-2006', correo: 'jdavid.kas@gmail.com' },
    { id: 2, nombre: 'Jose Daniel', telefono: '809-787-3912', correo: 'dancoren@gmail.com' },
    { id: 3, nombre: 'Jesus Dariel', telefono: '849-478-9343', correo: 'ldaroi@gmail.com' }
];

app.get('/api/contacts', (req, res) => {
    res.send(contactos);
});

app.get('/api/contacts/:id', (req, res) => {
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

app.post('/api/contacts', (req, res) => {
    const { nombre, telefono, correo } = req.body;

    const nuevoContacto = {
        id: contactos.length + 1,
        nombre,
        telefono,
        correo
    };

    contactos.push(nuevoContacto);
    res.status(201).send(nuevoContacto); 
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
    console.log('-');
    console.log('API funcionando en el puerto ' + port);
});
