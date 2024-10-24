const Question = require("../models").Question;

const create = async (req, res) => {
  try {
    const data = req.body;
    const newData = await Question.create({ ...data, answer: false });
    return res.json({ succes: true, data: newData });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const service = await Question.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroy = async (req, res) => {
  try {
    const data = req.body;
    await Question.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getAll = async (req, res) => {
  try {
    const newQuestions = await Question.findAll({
      where: {
        answer: false,
      },
    });
    const oldQuestions = await Question.findAll({
      where: {
        answer: true,
      },
    });
    return res.json({ succes: true, newQuestions, oldQuestions });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

module.exports = {
  create,
  edit,
  destroy,
  getAll,
};
