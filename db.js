const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost/acme_nouns');
const { STRING, UUID, UUIDV4 } = Sequelize;

const Person = conn.define('person', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name:{
    type: STRING,
    unique: true,
    notNull: false,
    notEmpty: true
  }
})

const Places = conn.define('place', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name:{
    type: STRING,
    unique: true,
    notNull: false,
    notEmpty: true
  }
});

const Things = conn.define('thing', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name:{
    type: STRING,
    unique: true,
    notNull: false,
    notEmpty: true
  }
});

Person.belongsTo(Places);
Things.belongsTo(Person);



const syncAndSeed = async () =>{
  await  conn.sync({force: true});
  const places = [
    {name: 'LA'},
    {name: 'London'},
    {name: 'Barcelona'}
  ];

  await Promise.all(places.map(place => Places.create(place)));

  const person = [
    {name: 'John'},
    {name: 'James'},
    {name: 'Sarah'}
  ];

  await Promise.all(person.map(person => Person.create(person)));

  const things = [
    {name: 'pen',},
    {name: 'paper'},
    {name: 'typewriter'}
  ];
  await Promise.all(things.map(thing => Things.create(thing)));
};

module.exports = {
  syncAndSeed
};
