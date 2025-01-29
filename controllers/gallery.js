const Gallery = require("../models").Gallery;

const create = async (req, res) => {
  try {
    const data = req.body;
    const newService = await Gallery.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroy = async (req, res) => {
  try {
    const data = req.body;
    await Gallery.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getAll = async (req, res) => {
  try {
    const services = await Gallery.findAll();
    return res.json({ succes: true, data: services });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const service = await Gallery.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const updateOrder = async (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body.items)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const { items } = req.body;

    const updatePromises = items.map(async (item, index) => {
      return Gallery.update(
        { order: index + 1 }, // Устанавливаем новый order
        { where: { id: item.id } } // Поиск по ID
      );
    });

    await Promise.all(updatePromises); // Дожидаемся выполнения всех запросов

    // Возвращаем обновленные данные
    res.json({
      succes: true,
      updatedItems: items.map((item, index) => ({ ...item, order: index + 1 })),
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  destroy,
  getAll,
  edit,
  updateOrder,
};
