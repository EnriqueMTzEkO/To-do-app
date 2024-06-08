const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/notesController');




router.route('/')
    .get(employeesController.getAllNotes)
    .post(employeesController.createNote)
    .put(employeesController.updateNote)
    .delete(employeesController.deleteNote);

router.route('/:id')
    .get(employeesController.getNote);

module.exports = router;