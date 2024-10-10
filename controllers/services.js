const Services = require("../models").Services;

const create = async (req, res) => {
  try {
    const data = req.body;
    const newService = await Services.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const service = await Services.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroy = async (req, res) => {
  try {
    const data = req.body;
    await Services.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getAll = async (req, res) => {
  try {
    const services = await Services.findAll();
    return res.json({ succes: true, data: services });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.query;
    const service = await Services.findOne({ where: { id } });
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};
module.exports = { create, edit, destroy, getAll, getOne };
