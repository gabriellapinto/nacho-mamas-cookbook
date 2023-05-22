const router = require('express').Router();
const { Recipe } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newRecipe = await Recipe.create({
            ...req.body,
            // recipe_id: req.session.recipe_id,
            user_id: req.session.user_id
        });

        res.status(200).json(newRecipe);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const currentUserId = req.session.user_id
        const getUserRecipes = await Recipe.findAll({
            where: {
                user_id: currentUserId
            }
        });
        res.status(200).json(getUserRecipes);
    }
    catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.destroy({
            where: {
                recipe_id: req.params.recipe_id,
            },
        });

        if (!recipeData) {
            res.status(404).json({
                message: 'No recipe found with this id!'
            });
            return;
        }

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;