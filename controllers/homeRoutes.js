const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in,
  });
});

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        // {
        //   model: Book,
        //   attributes: ['name', 'author', 'year', 'date_posted', 'synopsis'],
        // },
      ],
    });

    const book = bookData.get({ plain: true });
    
    res.render('book', {
      ...book,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/book', withAuth, async (req, res) => {
  try {
    // // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Book }],
    // });

    // const user = userData.get({ plain: true });
    // console.log(user)
    res.render('book', {
      // ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
