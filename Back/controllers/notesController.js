const Note = require('../model/Note');

const getAllNotes = async (req, res) => {
    const notes = await Note.find();
    if (!notes) return res.status(204).json({'message': 'No se encontraron notas'});
    res.json(notes);
}

const createNote = async (req, res) => {
    if (!req?.body?.title) {
        return res.status(400).json({ 'message': 'Se requiere un título de la nota' });
    }
    const { content, sharedWith } = req.body;

    if (content && (!Array.isArray(content) || !content.every(item => item.subtitle && Array.isArray(item.textBody) && item.textBody.every(textItem => textItem.text && typeof textItem.checked !== 'undefined')))) {
        return res.status(400).json({ 'message': 'El contenido no contiene valores válidos con subtítulo y textBody.' });
    }

    if (sharedWith && (!Array.isArray(sharedWith) || !sharedWith.every(item => item.userId && item.permissions))) {
        return res.status(400).json({ 'message': 'sharedWith debe ser un valor válidos con userId y permisos.' });
    }

    try {
        const result = await Note.create({
            title: req.body.title,
            content: content || [],   //por defecto: array vacío
            ownerId: req.user.id,
            sharedWith: sharedWith || [], //por defecto: array vacío
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Error al crear la nota.', 'error': err.message });
    }
};

const updateNote = async (req, res) => {
    // Verificar que se proporcione un ID para la nota
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'Se necesita un ID para la nota' });
    }

    // Buscar la nota por ID
    const note = await Note.findOne({ _id: req.body._id }).exec();

    // Si no se encuentra la nota, devolver un estado 204
    if (!note) {
        return res.status(204).json({ 'message': `No se encuentra la nota con el ID ${req.body._id}.` });
    }

    // Verificar si el usuario actual es el propietario de la nota
    const isOwner = note.ownerId.toString() === req.body.ownerId; // esto deberia ser req.user.id

    // Verificar si el usuario actual tiene permisos de escritura en la nota
    const hasWritePermission = note.sharedWith.some(shared => {
        return shared.userId.toString() === req.user.id && shared.permissions === 'write';
    });

    // Si el usuario no es el propietario y no tiene permisos de escritura, devolver un estado 403
    if (!isOwner && !hasWritePermission) {
        return res.status(403).json({ 'message': 'No tienes permiso para actualizar esta nota.' });
    }

    // Actualizar el título de la nota si se proporciona
    if (req.body?.title) note.title = req.body.title;

    // Actualizar el contenido de la nota si se proporciona
    if (req.body?.content) {
        // Validar que el contenido sea un arreglo válido con subtítulo y textBody
        if (Array.isArray(req.body.content) && req.body.content.every(item => 
            item.subtitle && 
            Array.isArray(item.textBody) && 
            item.textBody.every(textItem => textItem.text && typeof textItem.checked !== 'undefined')
        )) {
            note.content = req.body.content;
        } else {
            return res.status(400).json({ 'message': 'El contenido debe ser un valor válido con subtítulo y textBody.' });
        }
    }

    // Actualizar la lista de usuarios compartidos si se proporciona
    if (req.body?.sharedWith) {
        // Validar que la lista de usuarios compartidos sea un arreglo válido con userId y permisos
        if (Array.isArray(req.body.sharedWith) && req.body.sharedWith.every(item => item.userId && item.permissions)) {
            note.sharedWith = req.body.sharedWith;
        } else {
            return res.status(400).json({ 'message': 'sharedWith debe ser un valor válido con userId y permisos.' });
        }
    }

    // Actualizar la fecha de modificación
    note.updatedAt = Date.now();

    // Guardar los cambios en la base de datos
    const result = await note.save();

    // Devolver la nota actualizada
    res.json(result);
};


const deleteNote = async (req, res) => {
    if (!req?.body?.noteId) return res.status(400).json({ 'message': 'Se necesita el ID de la nota' });

    try {
        const note = await Note.findOne({ _id: req.body.noteId }).exec();
        if (!note) {
            return res.status(204).json({ 'message': `No se encuentra la nota con el ID ${req.body.noteId}.` });
        }

        const isOwner = note.ownerId.toString() === req.user.id;

        if (!isOwner) {
            return res.status(403).json({ 'message': 'Solo el propietario tiene permiso para eliminar esta nota' });
        }

        const result = await note.deleteOne({ _id: req.body.noteId });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Error al eliminar la nota.', 'error': err.message });
    }
};


const getNote = async (req, res) => {
    if(!req.params.id) return res.status(400).json({'message': 'Se necesita el ID de la nota'});
    const note = await Note.findOne({_id: req.params.id}).exec();
    if (!note) {
        return res.status(204).json({ "message": `No se encuentra la nota con el ID ${req.params.id}.` });
    }
    res.json(note);
}

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNote
}