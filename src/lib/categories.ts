interface CategoryData {
  [key: string]: string[];
}

export const categories: CategoryData = {
  Main: [
    "Fish Dishes",
    "Meat Dishes",
    "Vegetarian Dishes",
    "Chicken Dishes",
    "Beef Dishes",
    "Pork Dishes",
  ],
  Soups: ["Cream Soups", "Vegetable Soups", "Meat Soups", "Cold Soups"],
  Salads: ["Vegetable Salads", "Fruit Salads", "Pasta Salads", "Meat Salads"],
  Snacks: [
    "Meat Snacks",
    "Vegetarian Snacks",
    "Bread Snacks",
    "Puff Pastry Snacks",
    "Sweet Snacks",
  ],
  Desserts: [
    "Fruit Desserts",
    "Chocolate Desserts",
    "Ice Cream Desserts",
    "Milk-based Desserts",
    "No-Bake Desserts",
  ],
  Cakes: [
    "Traditional Cakes",
    "Chocolate Cakes",
    "Fruit Cakes",
    "Gluten-Free Cakes",
    "No-Bake Cakes",
    "Tortes",
  ],
  Barbeque: ["Barbeque"],
};
