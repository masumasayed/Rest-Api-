const mongoose = require('mongoose');


//movie schema

const Movie = mongoose.model('Movie',{
    name: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
});

module.exports ={ Movie }