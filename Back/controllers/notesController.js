const Note = require('../model/Note');

const getAllNotes = async (req, res) => {
    const notes = await Note.find();
    if(!notes) return res.status(204).json({'message': 'No se encontraron notas'});
    res.json(notes);
}

const createNote = async (req, res) => {
    if(!req?.body?.title) {
        return res.status(400).json({'message': 'se requiere un titulo de la nota'});
    }
    const { subtitle, content, sharedWith } = req.body;

    if(content && (!Array.isArray(content) || !content.every(item => item.text && typeof item.checked !== 'undefined'))) {
        return res.status(400).json({ 'message': 'El contenido debe ser un array de objetos válidos con texto y checked.' });
    }

    if(sharedWith && (!Array.isArray(sharedWith) || !sharedWith.every(item => item.userId && item.permissions))) {
        return res.status(400).json({ 'message': 'sharedWith debe ser un array de objetos válidos con userId y permisos.' });
    }

    try {
        const result = await Note.create({
            title: req.body.title,
            subtitle: subtitle || [], // Valor por defecto: array vacío
            content: content || [],   // Valor por defecto: array vacío
            ownerId: req.user.id,
            sharedWith: sharedWith || [] // Valor por defecto: array vacío
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Error al crear la nota.', 'error': err.message });
    }
};

const updateNote = async (req, res) => {
    if(!req?.body?.noteId){
        return res.status(400).json({'message': 'Se necesita un ID para la nota'});
    }   

    const note = await Note.findOne({_id: req.body.noteId}).exec();

    if(!note) {
        return res.status(204).json({ "message": `No se encuentra la nota con el ID ${req.body.noteId}.` });
    }

    const isOwner = note.ownerId.toString() === req.user.id;

    // Verificar forma parte de sharedWith con permiso write
    const hasWritePermission = note.sharedWith.some(shared => {
        return shared.userId.toString() === req.user.id && shared.permissions === 'write';
    });

    if(!isOwner && !hasWritePermission) {
        return res.status(403).json({ 'message': 'No tienes permiso para actualizar esta nota.' });
    }

    if(req.body?.title) note.title = req.body.title;
    if(req.body?.subtitle) note.subtitle = req.body.subtitle;
    if(req.body?.content) {
        if (Array.isArray(req.body.content) && req.body.content.every(item => item.text && typeof item.checked !== 'undefined')) {
            note.content = req.body.content;
        } else {
            return res.status(400).json({ 'message': 'El texto debe tener un estado en el check' });
        }
    }
    if(req.body?.ownerId) note.ownerId = req.body.ownerId;
    if(req.body?.sharedWith) {
        if (Array.isArray(req.body.sharedWith) && req.body.sharedWith.every(item => item.userId && item.permissions)) {
            note.sharedWith = req.body.sharedWith;
        } else {
            return res.status(400).json({ 'message': 'se debe dar datos para saber con quien se esta compartiendo y con que permisos cuenta.' });
        }
    }
    note.updatedAt = Date.now();
    const result = await note.save()
    res.json(result);
}

const deleteNote = async (req, res) => {
    if(!req?.body?.noteId) return res.status(400).json({'message': 'Se necesita el ID de la nota'});
    const note = await Note.findOne({_id: req.body.noteId}).exec();
    if (!note) {
        return res.status(204).json({ "message": `No se encuentra la nota con el ID ${req.body.noteId}.` });
    }

    const isOwner = note.ownerId.toString() === req.user.id;

    if(!isOwner) {
        return res.status(403).json({ 'message': 'Solo el propietario tiene permiso para eliminar esta nota' });
    }

    const result = await note.deleteOne({_id:req.body.noteId});
    res.json(result);
}

const getNote = async (req, res) => {
    if(!req.params?.noteId) return res.status(400).json({'message': 'Se necesita el ID de la nota'});
    const note = await Note.findOne({_id: req.params.noteId}).exec();
    if (!note) {
        return res.status(204).json({ "message": `No se encuentra la nota con el ID ${req.body.noteId}.` });
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