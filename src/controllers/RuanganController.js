"use strict";

require("../config/database");
const db = require("../models");
const Transaction = db.transaction;
const User = db.user;
const Room = db.room;
const Op = db.Sequelize.Op;

async function index(req, res) {
	// get all transactions with User and Rooms
	const transactions = await Transaction.findAll({
		include: [
			{
				model: User,
				as: "user",
			},
			{
				model: Room,
				as: "room",
			},
		],
	});

  return res.render("index", { transactions, success: req.query.success });
}

async function add(req, res) {
	const users = await User.findAll();
	const rooms = await Room.findAll();

	return res.render("create", { users, rooms });
}

async function create(req, res) {
  const { room_id, user_id, check_in, check_out } = req.body;

  const transaction = await Transaction.create({
    room_id,
    user_id,
    check_in,
    check_out,
  });

  const success = transaction ? "Ruangan berhasil dipinjam" : "Ruangan gagal dipinjam";
  return res.redirect(`/?success=${success}`);
}

async function edit(req, res) {
	const id = req.params.id;

	// where id = id and include User and Room
	const transaction = await Transaction.findByPk(id, {
		include: [
			{
				model: User,
				as: "user",
			},
			{
				model: Room,
				as: "room",
			},
		],
	});

	const users = await User.findAll();
	const rooms = await Room.findAll();
	
	return res.render("edit", { transaction, users, rooms });
}

async function update(req, res) {
	const id = req.params.id;
	const { room_id, user_id, check_in, check_out } = req.body;

	const transaction = await Transaction.update(
		{
			room_id,
			user_id,
			check_in,
			check_out,
		},
		{
			where: { id },
		}
	);

	const success = transaction ? "Ruangan berhasil diupdate" : "Ruangan gagal diupdate";
	return res.redirect(`/?success=${success}`);
}

async function destroy(req, res) {
	const id = req.params.id;

	const transaction = await Transaction.destroy({
		where: { id },
	});

	const success = transaction ? "Ruangan berhasil dihapus" : "Ruangan gagal dihapus";
	return res.redirect(`/?success=${success}`);
}

module.exports = {
  index,
	add,
	create,
	update,
	edit,
	destroy
};
