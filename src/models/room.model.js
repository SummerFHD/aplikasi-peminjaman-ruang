module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("rooms", {
    name: {
      type: Sequelize.STRING
    },
    capacity: {
      type: Sequelize.INTEGER
    }
  });

  return Room;
};
