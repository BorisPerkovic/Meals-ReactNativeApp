class Meal {
  constructor(id, categoryId, title, affordability, complexity, imageUrl, duration, ingredient, steps, isGlutenFree, isVegan, isVegeterian, isLactoseFree) {
    this.id = id,
    this.categoryIds = categoryId,
    this.title = title,
    this.affordability = affordability,
    this.complexity = complexity,
    this.imageUrl = imageUrl,
    this.duration = duration,
    this.ingredient = ingredient,
    this.steps = steps,
    this.isGlutenFree = isGlutenFree,
    this.isVegan = isVegan,
    this.isVegeterian = isVegeterian,
    this.isLactoseFree = isLactoseFree
  }
};

export default Meal;