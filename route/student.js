const express = require('express');
const router = express.Router();

module.exports = router;

let students = [
  { id: 1, name: 'Dan' },
  { id: 2, name: 'Karen' },
  { id: 3, name: 'Hannah' },
  { id: 4, name: 'Angela' },
  { id: 5, name: 'Edwin' }
];

router.get('/', (req, res, next) => {
  try {
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = students.find(student => {
      return student.id === id;
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    students = [...students, req.body];
    console.log('Posting Status is~~~~ ', students);
    res.json(req.body);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    let parsedId = parseInt(req.params.id, 10);
    students = students.map(student => {
      if (student.id === parsedId) {
        console.log('Before mutating: ', student);
        student = { ...student, ...req.body };
        console.log('After mutating: ', student);
      }
      return student;
    });
    console.log('Final student database after put(update): ', students);
    res.json(req.body);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    let studentToRemove = students.find(student => {
      return student.id === parseInt(req.params.id, 10);
    });
    let indexOfStudent = students.indexOf(studentToRemove);
    students.splice(indexOfStudent, 1);
    console.log('After deleting student: ', students);
    res.json(req.body);
  } catch (error) {
    next(error);
  }
});
