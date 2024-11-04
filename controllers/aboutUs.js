const AboutUs = require("../models").AboutUs;

const edit = async (req, res) => {
  try {
    const data = req.body;
    const service = await AboutUs.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getOne = async (req, res) => {
  try {
    const service = await AboutUs.findAll({});
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

module.exports = {
  edit,
  getOne,
};
