module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transactions", {
    room_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    check_in: {
      type: Sequelize.DATE,
    },
    check_out: {
      type: Sequelize.DATE,
    },
  });

	const Room = sequelize.models.rooms;
  const User = sequelize.models.users;

  // Define associations BEFORE returning the model
  Transaction.belongsTo(Room, {
    foreignKey: "room_id",
    as: "room",
  });

  Transaction.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  return Transaction;
};
