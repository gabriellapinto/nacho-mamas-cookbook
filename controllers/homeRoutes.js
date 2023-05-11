const router = require('express').Router();
const { Recipe, User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
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
    res.render('recipes', {
        recipeData,
        logged_in: req.session.logged_in
    });
});

router.post('/recipes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf8'));

    // New recipe object
    const newRecipe = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    };

    // Pushes the data into the new recipe object and shows it to the page
    dbJson.push(newRecipe);
    fs.writeFileSync(path.join(__dirname, '../db/schema.sql'), JSON.stringify(dbJson));
    res.json(dbJson);
});

router.delete('/recipes/:id', (req, res) => {
    let newData = fs.readFileSync('db/schema.sql', 'utf8');
  
    const dataJson =  JSON.parse(newData);
  
    const newRecipe = dataJson.filter((recipe) => { 
      return recipe.id !== req.params.id;
    });
  
    // Save that array to the filesystem
    fs.writeFileSync('db/schema.sql',JSON.stringify(newRecipe));
  
    // Respond to the DELETE request
    res.json('Successfully deleted recipe!');
  });

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/recipes');
    }
    res.render('login');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/signup', (req, res) => {
    if (req.session.signed_up) {
        return res.redirect('/login');
    }
    res.render('signup');
});

module.exports = router;