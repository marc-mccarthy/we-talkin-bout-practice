const menu = {
  _courses: {
    appetizers: [],
    mains: [],
    desserts: [],
  },
  get courses() {
    return {
      appetizers: this.appetizers,
      mains: this.mains,
      desserts: this.desserts,
    };
  },
  addDishToCourse(courseName, dishName, dishPrice) {
    const dish = {
      name: dishName,
      price: dishPrice,
    };
    this._courses[courseName].push(dish);
  },
  getRandomDishFromCourse(courseName) {
    const dishes = this._courses[courseName];
    const choose = Math.floor(Math.random() * dishes.length);
    return dishes[choose];
  },
  generateRandomMeal() {
    const appetizer = this.getRandomDishFromCourse("appetizers");
    const main = this.getRandomDishFromCourse("mains");
    const dessert = this.getRandomDishFromCourse("desserts");
    const price = appetizer.price + main.price + dessert.price;
    return `Appetizer: ${appetizer.name} | Main: ${main.name} | Dessert: ${dessert.name} | Price: ${price} dollars`;
  },
};

menu.addDishToCourse("appetizers", "Milkshake", 400);
menu.addDishToCourse("appetizers", "Pellets", 1000);
menu.addDishToCourse("appetizers", "Deepfried Goop", 700);

menu.addDishToCourse("mains", "Pork Pie", 1300);
menu.addDishToCourse("mains", "New York Hair", 1600);
menu.addDishToCourse("mains", "The Blue Dish", 1000000);

menu.addDishToCourse("desserts", "Key Lime Pie", 20);
menu.addDishToCourse("desserts", "Swiss Coffee Melt", 2000);
menu.addDishToCourse("desserts", "Hard Boiled Egg", 430);

let meal = menu.generateRandomMeal();
console.log(meal);
