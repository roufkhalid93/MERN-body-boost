const express = require('express')
const{
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    getAllWorkouts
} = require('../controllers/workoutController')
const { requireAuth, requireAdminAuth } = require('../middleware/requireAuth')


const router = express.Router()

//require auth for all workout routes
router.use(requireAuth)

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a new workout
router.delete('/:id', deleteWorkout)

//UPDATE a new workout
router.patch('/:id', updateWorkout)

// Admin route: GET all workouts
router.get('/admin/all', requireAdminAuth, getAllWorkouts);

module.exports = router