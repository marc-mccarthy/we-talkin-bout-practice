const crew = {
  _skaters: [
    {
      firstName: "Radius",
      lastName: "Welder",
      age: 79,
    },
    {
      firstName: "Kiljoy",
      lastName: "Rampart",
      age: 88,
    },
    {
      firstName: "Weenboy",
      lastName: "Blip",
      age: 68,
    },
  ],
  _tricks: [
    {
      trick: "The Flatline",
      radPoints: 94,
    },
    {
      trick: "The Cane Spin",
      radPoints: 67,
    },
    {
      trick: "The Arthritis Shuffle",
      radPoints: 100,
    },
  ],
  get skaters() {
    return this._skaters;
  },
  get tricks() {
    return this._tricks;
  },
  addSkater(firstName, lastName, age) {
    let newSkater = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    this._skaters.push(newSkater);
  },
  addTrick(trickName, trickPoints) {
    let newTrick = {
      trick: trickName,
      radPoints: trickPoints,
    };
    this._tricks.push(newTrick);
  },
};

crew.addSkater("Cylas", "Beam", 93);
crew.addTrick("The Zip Hip", 76);

console.log(crew.skaters);
console.log(crew.tricks);
