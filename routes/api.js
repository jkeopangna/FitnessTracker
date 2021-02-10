
const Workout = require('../models/workoutModel');
const router = require('express').Router();

router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration'
        }
      }
    }
  ])
  .then((dbWorkout) => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.json(err);
  });
});

router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});


router.post('/api/workouts', (req, res) => {
    Workout.create({})
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.json(err);
  });
  });

  router.put('/api/workouts/:id', ({ workout, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: workout } },
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  module.exports = router;