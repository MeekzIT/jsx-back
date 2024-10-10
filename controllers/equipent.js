const Equipment = require("../models").Equipment;
const EquipmentImage = require("../models").EquipmentImage;

const create = async (req, res) => {
  try {
    const data = req.body;
    const newService = await Equipment.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const service = await Equipment.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroy = async (req, res) => {
  try {
    const data = req.body;
    await Equipment.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getAll = async (req, res) => {
  try {
    const services = await Equipment.findAll({
      include: [
        {
          model: EquipmentImage,
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
    const service = await Equipment.findOne({
      where: { id },
      include: [
        {
          model: EquipmentImage,
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
    const newService = await EquipmentImage.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroyImage = async (req, res) => {
  try {
    const data = req.body;
    await EquipmentImage.destroy({ where: { id: data.id } });
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
