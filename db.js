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
  const [laPlace, londonPlace, barcelonaPlace ] = await Promise.all([
    Places.create({name: 'LA'}),
    Places.create({name: 'London'}),
    Places.create({name: 'Barcelona'})
  ]);

  const [ john, james, sarah] = await Promise.all([
    Person.create({name: 'John', placeId: laPlace.id }),
    Person.create({name: 'James', placeId: londonPlace.id}),
    Person.create({name: 'Sarah', placeId: barcelonaPlace.id})
  ]);

  const things = [
    {name: 'pen', personId: john.id},
    {name: 'paper', personId: james.id},
    {name: 'typewriter', personId: sarah.id}
  ];
  await Promise.all(things.map(thing => Things.create(thing)));
};

module.exports = {
  syncAndSeed,
  models:{
    Person,
    Places,
    Things
  }
};
