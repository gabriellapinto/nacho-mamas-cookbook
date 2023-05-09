const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

// Get homepage
router.get('/', async (req, res) => {
    const recipeData = await Recipe.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });
    const recipes = recipeData.map(recipe => recipe.toJSON());
    res.render('home', {
        logged_in: req.session.logged_in,
        recipes
    });
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/profile');
    }
    res.render('login');
});

// Get certain recipe based off of id
router.get('/recipes', withAuth, async (req, res) => {
    const recipeId = req.params.id;
    const recipeData = await Recipe.findByPk(recipeId, {
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });
    // const recipe = recipeData.toJSON();
    res.render('recipes', {
        recipeData,
        logged_in: req.session.logged_in
    });
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/profile');
    }
    res.render('login');
});

module.exports = router;