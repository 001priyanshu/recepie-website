const Recipe = require("../models/recipe");
const Comment = require("../models/comment");

exports.createRecipe = async (req, res) => {
  try {
    const { recipeName, ingredients, instruction, category, contentUrl } =
      req.body;
    const user = req.user;
    const recipe = await Recipe.create({
      recipeName,
      userId: user._id,
      ingredients,
      instruction,
      category,
      contentUrl,
    });

    await recipe.save();
    return res.status(500).json({
      message: "Successfully created recipe!",
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { recipeName, ingredients, instruction, category, contentUrl } =
      req.body;

    const { id } = req.params;
    const recipe = await Recipe.findById({ _id: id });
    recipe.recipeName = recipeName;
    recipe.ingredients = ingredients;
    recipe.instruction = instruction;
    recipe.contentUrl = contentUrl;
    recipe.category = category;

    await recipe.save();
    return res.status(500).json({
      message: "Successfully updated recipe!",
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndDelete({ _id: id });
    await Comment.deleteMany({ recipeId: id });
    return res.status(500).json({
      message: "Successfully deleted recipe!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.getAllRecipe = async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});
    return res.status(200).json({
      message: "Success!",
      allRecipes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.getMyRecipe = async (req, res) => {
  try {
    const user = req.user;
    const allRecipes = await Recipe.find({ userId: user._id });
    return res.status(200).json({
      message: "Success!",
      allRecipes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
