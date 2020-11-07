/**
 *  Workout Queries
 *
 *	0 id INT AUTO_INCREMENT NOT NULL,
 *  1 workoutName VARCHAR(255) NOT NULL,
 *  2 userId INT references users(id),
 *  3 workoutDate DATE NOT NULL,
 *  4 exercises VARCHAR(255),
 *    PRIMARY KEY (id)
 *
 */
const findAllWorkouts = 'SELECT id, workoutName FROM workouts;';
const findWorkoutByIdQuery =
  'SELECT id, workoutName FROM workouts WHERE id = ?;';
const findWorkoutByWorkoutName =
  'SELECT id FROM workouts WHERE workoutName = ?;';
const insertWorkout =
  'INSERT INTO workout (workoutName, userId, workoutDate, exercises) VALUES (?, ?, ?, ?);';
const deleteWorkoutQuery = 'DELETE FROM workout WHERE ID = ?;';

// seed 
// 'INSERT INTO workout (workoutName, userId, workoutDate, exercises) 
// VALUES (
// 'BackDay',
// 1,
// '2020-11-04',
// {name: curls, name: squat},
// );

module.exports = {
  findAllWorkouts,
  findWorkoutByIdQuery,
  findWorkoutByWorkoutName,
  insertWorkout,
  deleteWorkoutQuery,
};
