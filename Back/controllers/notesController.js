const Note = require('../model/Note');

const getAllNotes = async (req, res) => {
    const notes = await Note.find();
    if (!notes) return res.status(204).json({'message': 'No se encontraron notas'});
    res.json(notes);
}

const createNote = async (req, res) => {
    if(!req?.body?.title || !req?.body?.ownerId) {
        return res.status(400).json({'message': 'se requiere un titulo y el propietario de la nota'});
    }

    try{
        const result = await Note.create({
            title: req.body.title,
            ownerId: req.body.ownerId
        });

        res.status(201).json(result);
    } catch (err){
        console.error(err)
    }
    
}

const updateNote = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({'message': 'Se necesita un ID para la nota'});
    }

    const note = await Note.findOne({_id: req.body.id}).exec();

    if (!note) {
        return res.status(204).json({ "message": `No se encuentra la nota con el ID ${req.body.id}.` });
    }

    if (req.body?.title) note.title = req.body.title;
    if (req.body?.ownerId) note.ownerId = req.body.ownerId;
    if(req.body?.content) note.content = req.body.content;
    const result = await note.save()
    res.json(result);
}

const deleteNote = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message': 'Se necesita el ID de la nota'});
    const note = await Note.findOne({_id: req.body.id}).exec();
    if (!note) {
        return res.status(204).json({ "message": `No se encuentra la nota con el ID ${req.body.id}.` });
    }
    const result = await note.deleteOne({_id:req.body.id});
    res.json(result);
}

const getNote = async (req, res) => {
    if(!req.params?.id) return res.status(400).json({'message': 'Se necesita el ID de la nota'});
    const note = await Note.findOne({_id: req.params.id}).exec();
    if (!note) {
        return res.status(204).json({ "message": `No se encuentra la nota con el ID ${req.body.id}.` });
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