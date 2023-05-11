let recipeName;
let recipeDescription;
let recipeIngredients;
let recipeInstructions;
let saveRecipeBtn;
let newRecipeBtn;
let recipeList;

if (window.location.pathname === '/recipes') {
  recipeName = document.querySelector('.recipe-name');
  recipeDescription = document.querySelector('.recipe-description');
  recipeIngredients = document.querySelector('.recipe-ingredients');
  recipeInstructions = document.querySelector('.recipe-instructions');
  saveRecipeBtn = document.querySelector('.save-recipe-btn');
  newRecipeBtn = document.querySelector('.new-recipe-btn');
  recipeList = document.querySelectorAll('.list-container .list-group');
}

const show = (elem) => {
    elem.style.display = 'inline';
  };
  
const hide = (elem) => {
    elem.style.display = 'none';
};
  
let activeRecipe = {};

// Fetches for back-end
const getRecipes = () =>
  fetch('/api/recipes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveRecipe = (recipe) =>
  fetch('/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });

const deleteRecipe = (id) =>
  fetch(`/api/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Renders Active Recipe
const renderActiveRecipe = () => {
    hide(saveRecipeBtn);
  
    if (activeRecipe.id) {
      recipeName.setAttribute('readonly', true);
      recipeDescription.setAttribute('readonly', true);
      recipeIngredients.setAttribute('readonly', true);
      recipeInstructions.setAttribute('readonly', true);
      recipeName.value = activeRecipe.name;
      recipeDescription.value = activeRecipe.description;
      recipeIngredients.value = activeRecipe.ingredients;
      recipeInstructions.value = activeRecipe.instructions;
    } else {
      recipeName.removeAttribute('readonly');
      recipeDescription.removeAttribute('readonly');
      recipeIngredients.removeAttribute('readonly');
      recipeInstructions.removeAttribute('readonly');
      recipeName.value = '';
      recipeDescription.value = '';
      recipeIngredients.value = '';
      recipeInstructions.value = '';
    }
};
  
const handleRecipeSave = () => {
    const newRecipe = {
      name: recipeName.value,
      description: recipeDescription.value,
      ingredients: recipeIngredients.value,
      instructions: recipeInstructions.value,
    };
    saveRecipe(newRecipe).then(() => {
      getAndRenderRecipe();
      renderActiveRecipe();
    });
};


const handleRecipeDelete = (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();
  
    const recipe = e.target;
    const recipeId = JSON.parse(recipe.parentElement.getAttribute('data-recipe')).id;
  
    if (activeRecipe.id === recipeId) {
      activeRecipe = {};
    }
  
    deleteRecipe(recipeId).then(() => {
      getAndRenderRecipe();
      renderActiveRecipe();
    });
};

// Sets the activeRecipe and displays it
const handleRecipeView = (e) => {
    e.preventDefault();
    activeRecipe = JSON.parse(e.target.parentElement.getAttribute('data-recipe'));
    renderActiveRecipe();
  };
  
  // Sets the activeRecipe to and empty object and allows the user to enter a new recipe
const handleNewRecipeView = (e) => {
    activeRecipe = {};
    renderActiveRecipe();
};
  
const handleRenderSaveBtn = () => {
    if (!recipeName.value.trim() || !recipeDescription.value.trim() || !recipeIngredients.value.trim() || !recipeInstructions.value.trim()) {
      hide(saveRecipeBtn);
    } else {
      show(saveRecipeBtn);
    }
};

// Render the list of recipe names
const renderRecipeList = async (recipes) => {
    let jsonRecipes = await recipes.json();
    if (window.location.pathname === '/recipes') {
      recipeList.forEach((el) => (el.innerHTML = ''));
    }
  
    let recipeListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleRecipeView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-recipe'
      );
      delBtnEl.addEventListener('click', handleRecipeDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonRecipes.length === 0) {
    recipeListItems.push(createLi('No Saved Recipes', false));
  }

  jsonRecipes.forEach((recipe) => {
    const li = createLi(recipe.name);
    li.dataset.recipe = JSON.stringify(recipe);

    recipeListItems.push(li);
  });

  if (window.location.pathname === '/recipes') {
    recipeListItems.forEach((recipe) => recipeList[0].append(recipe));
  }
};

const getAndRenderRecipe = () => getRecipes().then(renderRecipeList);

if (window.location.pathname === '/recipes') {
  saveRecipeBtn.addEventListener('click', handleRecipeSave);
  newRecipeBtn.addEventListener('click', handleNewRecipeView);
  recipeName.addEventListener('keyup', handleRenderSaveBtn);
  recipeDescription.addEventListener('keyup', handleRenderSaveBtn);
  recipeIngredients.addEventListener('keyup', handleRenderSaveBtn);
  recipeInstructions.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderRecipe();
  