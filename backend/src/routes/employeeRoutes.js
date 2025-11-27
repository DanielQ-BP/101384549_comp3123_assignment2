const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');       
const upload = require('../middleware/upload');   

const router = express.Router();

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find({}, { __v: 0 }).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/',
  auth,
  upload.single('photo'),
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').isEmail(),
  body('position').isString().trim().notEmpty(),
  body('department').isString().trim().notEmpty(),
  body('salary').isNumeric(),
  body('dateOfJoining').isISO8601(),
  async (req, res) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const payload = { ...req.body };
      if (req.file) payload.photoUrl = `/uploads/${req.file.filename}`;

      const newEmployee = new Employee(payload);
      await newEmployee.save();

      res.status(201).json({
        message: 'Employee created successfully',
        employee: newEmployee
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get('/search',
  auth,
  query('department').optional().isString(),
  query('position').optional().isString(),
  async (req, res) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const { department, position } = req.query;
      const filter = {};
      if (department) filter.department = department;
      if (position) filter.position = position;

      const employees = await Employee.find(filter).sort({ createdAt: -1 });
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get('/:id',
  auth,
  param('id').isMongoId(),
  async (req, res) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
router.put('/:id',
  auth,
  upload.single('photo'),
  param('id').isMongoId(),
  async (req, res) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const updates = { ...req.body };
      if (req.file) updates.photoUrl = `/uploads/${req.file.filename}`;

      const employee = await Employee.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true
      });

      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete('/:id',
  auth,
  param('id').isMongoId(),
  async (req, res) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get('/search',
  auth,
  query('department').optional().isString(),
  query('position').optional().isString(),
  async (req, res) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const { department, position } = req.query;
      const filter = {};
      if (department) filter.department = department;
      if (position) filter.position = position;

      const employees = await Employee.find(filter).sort({ createdAt: -1 });
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;