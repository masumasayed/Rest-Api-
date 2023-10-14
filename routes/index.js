const express =  require('express')
const router = express.Router();

const{Movie} = require('../models/movie');

//get all movie
router.get('/api/movie', async (req, res) => {
    try {
        const data = await Movie.find({}).exec();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred.');
    }
});
 //getting one
 router.get('/api/movie/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ code: 404, message: 'Movie not found.' });
    }
    res.status(200).json({ code: 200, message: 'Movie found', movie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: 500, message: 'An error occurred.' });
  }
});
//create one 
router.post('/api/movie/add', async (req, res) => {
    try {
      const list = new Movie({
        name: req.body.name,
        img: req.body.img,
        summary: req.body.summary,
      });
  
      const data = await list.save();
      
      res.status(200).json({ code: 200, message: 'Movie added successfully', addMovie: data });
    } catch (err) {
      res.status(500).json({ code: 500, message: 'Error adding movie', error: err.message });
    }
  });
 
//update

router.put('/api/movie/edit/:id', async (req, res) => {
  try {
    const mov = {
      name: req.body.name,
      img: req.body.img,
      summary: req.body.summary,
    };

    // Use await with Movie.findByIdAndUpdate to update the document
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: mov }, { new: true });

    if (updatedMovie) {
      res.status(200).json({
        code: 200,
        message: 'Movie Updated Successfully',
        updateMovie: updatedMovie,
      });
    } else {
      res.status(404).json({
        code: 404,
        message: 'Movie not found',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: 500, message: 'An error occurred.' });
  }
});

//Delete Employee
router.delete('/api/movie/:id', async (req, res) => {
  try {
    // Use await with Movie.findByIdAndRemove to delete the movie
    const deletedMovie = await Movie.findByIdAndRemove(req.params.id);

    if (deletedMovie) {
      res.status(200).json({
        code: 200,
        message: 'Movie Deleted Successfully',
        deleteMovie: deletedMovie,
      });
    } else {
      res.status(404).json({
        code: 404,
        message: 'Movie not found',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: 500, message: 'An error occurred.' });
  }
});


    module.exports = router;