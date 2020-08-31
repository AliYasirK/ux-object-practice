// I had my mentor help me a bit, I was struggling.

/**
 * createPlant - Produces an object respresenting a plant.  It should have the following properties:
 * @param {string} type - The Type of plant.  Possible values are [ "rose", "orchid", "lily", "lavender", "poppy", "begonia", "snapdragon", "marigold"]
 * @param {boolean} isPerennial - A boolean showing if the plant is a perennial or not
 * @param {string} leafDescription - A visual description of the leaves
 * @param {string} leafColor - A string representing the leaf color
 * @param {string} flowerColor - A string representing the color of the flower
 * @param {string} flowerDescription - A visual description of the flower
 * @param {number} gallonsWaterPerWeek - 0.0 to 3.0, representing the number of gallons of water needed per week for the plant
 * @param {number} amountOfSunNeeded - 0 to 10, representing the amount of sun needed
 */

class Plant {
  // the different properties of Plant are stored here
  constructor(
    type,
    isPerennial,
    leafDescription,
    leafColor,
    flowerColor,
    flowerDescription,
    gallonsWaterPerWeek,
    amountOfSunNeeded
  ) {
    this.type = type;
    this.isPerennial = isPerennial;
    this.leafDescription = leafDescription;
    this.leafColor = leafColor;
    this.flowerColor = flowerColor;
    this.flowerDescription = flowerDescription;
    this.gallonsWaterPerWeek = gallonsWaterPerWeek;
    this.amountOfSunNeeded = amountOfSunNeeded;
  }

  // function that describes a plant
  describe() {
    let description =
      "A " +
      this.type +
      " is a plant with " +
      this.leafColor +
      " and " +
      this.flowerColor +
      " color to it. " +
      this.leafDescription +
      " leaves. It has " +
      this.flowerDescription +
      " flowers.";

    console.log(description);
  }

  // changes the color of the plants flowers
  changeColor() {
    let newColors = [
      "Amber",
      "Crimson",
      "Aqua",
      "Cerulean Blue",
      "Flamingo",
      "Gun Smoke",
      "Jade",
      "Merigold",
      "Mustard",
      "Periwinkle",
    ];
    // ~~ Magic Genetic Engineering ~~
    let randIndex = Math.floor(Math.random() * newColors.length);
    if (this.isFlawed) {
      this.flowerDescription = "wilted sad buds with no pedals.";
      this.flowerColor = null;
    } else {
      this.flowerColor = newColors[randIndex];
    }
    let randomChance = Math.floor(Math.random() * 3);
    if (randomChance < 1) {
      this.isFlawed = true;
    }
  }

  // clones this plant and returns the clone
  clone() {
    var clone = new Plant();
    var originPlant = this;

    for (let property in originPlant) {
      clone[property] = originPlant[property];
    }

    clone.changeColor();
    return clone;
  }
}

// A Garden object class, holds a bunch of plants
class Garden {
  constructor(name) {
    this.name = name;
    this.plants = [];
  }

  // describes the garden and gets the name of each plant
  describe() {
    let description =
      "the " +
      this.name +
      " has " +
      this.plants.length +
      " plants in it. It contains: ";

    // runs for each plant in the garden
    for (let plant of this.plants) {
      description += plant.type + ", ";
    }

    console.log(description);
  }

  // adds a plant to the garden
  addplant(plant) {
    this.plants.push(plant);
  }
}

// the Estate object holds three types of gardens
class Estate {
  // set it up with three gardens first
  constructor() {
    this.roseArbor = new Garden("roseArbor");
    this.perennialGarden = new Garden("perennialGarden");
    this.slopePlanters = new Garden("slopePlanters");
  }

  // adds a plant to its correct garden
  addPlant(plant) {
    if (plant.type == "rose") {
      this.roseArbor.addplant(plant);
    } else if (plant.isPerennial == true && plant.amountOfSunNeeded <= 5) {
      this.perennialGarden.addplant(plant);
    } else this.slopePlanters.addplant(plant);
  }

  // describes the estate and calls describe on each garden object
  describe() {
    console.log("This is an estate. It has 3 gardens which look as follows:");
    this.roseArbor.describe();
    console.log("----------------");
    this.perennialGarden.describe();
    console.log("----------------");
    this.slopePlanters.describe();
  }

  // adds up all the plants in all the gardens
  calculateWaterUsagePerWeek() {
    let numGallons = 0.0;

    var listOfPlants = this.roseArbor.plants;
    for (let plant of listOfPlants) {
      numGallons += plant.gallonsWaterPerWeek;
    }

    var listOfPlants = this.perennialGarden.plants;
    for (let plant of listOfPlants) {
      numGallons += plant.gallonsWaterPerWeek;
    }

    var listOfPlants = this.slopePlanters.plants;
    for (let plant of listOfPlants) {
      numGallons += plant.gallonsWaterPerWeek;
    }

    // total estate water consumption
    console.log(numGallons);
  }

  // clones all the plants in the roseArbor
  cloneAllTheRosesAndChangeTheirColors() {
    let clonedRoses = [];

    for (let rose of this.roseArbor.plants) {
      let clonedRose = rose.clone();
      clonedRoses.push(clonedRose);
    }

    for (let clonedRose of clonedRoses) {
      this.roseArbor.plants.push(clonedRose);
    }
  }
}

/* TEST FUNCTIONS AND METHODS FOR THE ABOVE CLASSES ASSIGNMENT */

let myEstate = new Estate();

let firstPlant = new Plant(
  "rose",
  true,
  "rounded with a point",
  "green",
  "red",
  "concentric circles of pedals",
  0.8,
  4
);
myEstate.addPlant(firstPlant);

let secondPlant = new Plant(
  "orchid",
  true,
  "long and wide with a point at the end",
  "green",
  "fuscia",
  "pedals surrounding a central mouth",
  1.2,
  2
);
myEstate.addPlant(secondPlant);

let thirdPlant = new Plant(
  "marigold",
  false,
  "thin and jagged along branches",
  "green",
  "yellow and orange",
  "rounded pedals in groups of five with a darker orange center",
  0.8,
  4
);
myEstate.addPlant(thirdPlant);

myEstate.describe(); // This should print the whole description of the estate.

myEstate.calculateWaterUsagePerWeek(); // This should print 2.8

myEstate.cloneAllTheRosesAndChangeTheirColors(); // This should clone the rose and make a second one.
console.log(myEstate.roseArbor.plants.length == 2);
