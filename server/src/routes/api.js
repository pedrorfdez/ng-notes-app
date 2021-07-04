const express = require('express');
const router = express.Router();

const pool = require('../database');

/* GET METHODS */

// GET every note
router.get('/notes', (req, res, next) => {
    pool
    .then((pool) => {
        return pool.query('SELECT * FROM notes');
    })
    .then((notes) => {
        res.json(notes);
    })
    .catch((e) => {
        console.log(e);
    });
});

// GET every category

router.get('/categories', (req, res, next) => {
    pool
    .then((pool) => {
        return pool.query('SELECT * FROM categories');
    })
    .then((categories) => {
        res.json(categories);
    })
    .catch((e) => {
        console.log(e);
    })
})

// GET a specific category
router.get('/category/:categoryId', (req, res, next) => {
    pool
    .then((pool) => {
        return pool.query('SELECT * FROM categories WHERE categoryId = ?', [req.params.categoryId]);
    })
    .then((category) => {
        res.json(category);
    })
    .catch((e) => {
        console.log(e);
    })
})

// GET every note from a specific category
router.get('/notes/:categoryId', (req, res, next) => {
    pool    
    .then((pool) => {
        return pool.query('SELECT * FROM notes WHERE categoryId = ?', [req.params.categoryId]);
    })
    .then((notes) => {
        res.json(notes);
    })
    .catch((e) => {
        console.log(e);
    });
});

// GET a specific note
router.get('/note/:noteId', (req, res, next) => {
    pool
    .then((pool) => {
        return pool.query('SELECT * FROM notes WHERE noteId = ?', [req.params.noteId]);
    })
    .then((note) => {
        res.json(note)
    })
    .catch((e) => {
        console.log(e);
    })
});

/* POST METHODS */

// CREATE category
router.post('/category', (req, res, next) => {
    pool
    .then((pool) => {
        pool.query('INSERT INTO categories SET ?', [req.body]);
    })
    .then(() => {
        res.status(200).json({message: `Created category ${req.body.categoryName}`});
    })
    .catch((e) => {
        console.log(e);
    });
});

// CREATE note
router.post('/note', (req, res, next) => {
    pool
    .then((pool) => {
        pool.query('INSERT INTO notes SET ?', [req.body]);
    })
    .then(() => {
        res.status(200).json({message: `Created note ${req.body.noteName}`});
    })
    .catch((e) => {
        console.log(e);
    });
});

/* PUT METHODS */

// UPDATE category
router.put('/category/:categoryId', (req, res, next) => {
    pool
    .then((pool) => {
        pool.query('UPDATE FROM categories SET ? WHERE categoryId = ?', [req.body, req.params.categoryId]);
    })
    .then(() => {
        res.status(200).json({message: `Updated category ${req.body.categoryName}`});
    })
    .catch((e) => {
        console.log(e);
    });
});

// UPDATE note
router.put('/note/:noteId', (req, res, next) => {
    pool
    .then((pool) => {
        pool.query('UPDATE FROM notes SET ? WHERE noteId = ?', [req.body, req.params.noteId]);
    })
    .then(() => {
        res.status(200).json({message: `Updated note ${req.body.noteName}`})
    })
    .catch((e) => {
        console.log(e);
    });
});

/* DELETE METHODS */

// DELETE category
router.delete('/category/:categoryId', (req, res, next) => {
    pool
    .then((pool) => {
        pool.query('DELETE FROM categories WHERE categoryId = ?', [req.params.categoryId])
    })
    .then(() => {
        res.status(200).json({message: `Deleted category with categoryId: ${req.params.categoryId}`});
    })
    .catch((e) => {
        console.log(e);
    })
});

// DELETE note
router.delete('/note/:noteId', (req, res, next) => {
    pool
    .then((pool) => {
        pool.query('DELETE FROM notes WHERE noteId = ?', [req.params.noteId]);
    })
    .then(() => {
        res.status(200).json({message: `Deleted note with noteId: ${req.params.noteId}`})
    })
})

module.exports = router;