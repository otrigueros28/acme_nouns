const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost/acme_nouns');
const { STRING, UUID, UUIDV4 } = Sequelize;

const People = conn.define(person, {
  id: {
    type: UUIDV4,
    primaryKey: true
  },
  name:{
    unique: true,
    notNull: false,
    notEmpty: true
  }
})

const Places = conn.define(place, {
  id: {
    type: UUIDV4,
    primaryKey: true
  },
  name:{
    unique: true,
    notNull: false,
    notEmpty: true
  }
});

const Things = conn.define(thing, {
  id: {
    type: UUIDV4,
    primaryKey: true
  },
  name:{
    unique: true,
    notNull: false,
    notEmpty: true
  }
});

People.belongsTo(Places);
Things.belongsTo(People);
