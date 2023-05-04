const router = require('express').Router();
const { Project, User } = require('../models');
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

// Get certain recipe based off of id
router.get('/recipe/:id', withAuth, async (req, res) => {
    const recipeId = req.params.id;
    const recipeData = await Recipe.findByPk(recipeId, {
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });
    const recipe = recipeData.toJSON();
    res.render('recipe', {
        ...recipe,
        logged_in: req.session.logged_in
    });
});

module.exports = router;