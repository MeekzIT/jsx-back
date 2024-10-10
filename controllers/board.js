const Board = require("../models").Board;
const BoardImage = require("../models").BoardImage;

const create = async (req, res) => {
  try {
    const data = req.body;
    const newService = await Board.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const service = await Board.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroy = async (req, res) => {
  try {
    const data = req.body;
    await Board.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getAll = async (req, res) => {
  try {
    const services = await Board.findAll({
      include: [
        {
          model: BoardImage,
        },
      ],
    });
    return res.json({ succes: true, data: services });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.query;
    const service = await Board.findOne({
      where: { id },
      include: [
        {
          model: BoardImage,
        },
      ],
    });
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

// -------------------------------------------------- images -------------------------------------------------------------

const createImage = async (req, res) => {
  try {
    const data = req.body;
    const newService = await BoardImage.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroyImage = async (req, res) => {
  try {
    const data = req.body;
    await BoardImage.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

module.exports = {
  create,
  edit,
  destroy,
  getAll,
  getOne,
  createImage,
  destroyImage,
};
