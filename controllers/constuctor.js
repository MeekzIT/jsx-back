const { where, fn, col } = require("sequelize");

const Constructor = require("../models").Constuctor;
const Item = require("../models").ConstuctorItem;
const Option = require("../models").ConstuctorItemOption;
const OptionItem = require("../models").ConstuctorOptionItem;
const ItemOption = require("../models").ConstuctorItemOptionItemOption;
const Order = require("../models").Order;

const create = async (req, res) => {
  try {
    const data = req.body;
    const newService = await Constructor.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const service = await Constructor.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroy = async (req, res) => {
  try {
    const data = req.body;
    await Constructor.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getAll = async (req, res) => {
  try {
    const services = await Constructor.findAll({
      include: [
        {
          model: Item,
          include: {
            model: Option,
            include: {
              model: OptionItem,
            },
          },
        },
      ],
      order: [[{ model: Item }, "order", "ASC"]],
    });
    return res.json({ succes: true, data: services });
  } catch (e) {
    console.log("something went wrong", e);
    return res.json({ succes: false, message: "Internal Server Error" });
  }
};

// const getOne = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const service = await Constructor.findOne({
//       where: { id },
//       include: [
//         {
//           model: Item,
//           include: {
//             model: Option,
//             include: {
//               model: OptionItem,
//             },
//           },
//         },
//       ],
//       order: [[{ model: Item }, "order", "ASC"]],
//     });
//     return res.json({ succes: true, data: service });
//   } catch (e) {
//     console.log("something went wro ng", e);
//   }
// };

const getOne = async (req, res) => {
  try {
    const { id } = req.query;
    const service = await Constructor.findOne({
      where: { id },
      include: [
        {
          model: Item,
          include: [
            {
              model: Option,
              include: [
                {
                  model: OptionItem,
                },
              ],
            },
          ],
        },
      ],
      order: [[Item, "order", "ASC"]], // Correct way to order by Item.order
    });

    return res.json({ succes: true, data: service });
  } catch (e) {
    console.error("Something went wrong", e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getPrice = async (req, res) => {
  try {
    const selectedData = req.body;
    const { variant, services, ...items } = selectedData;

    // 1. Find the Constructor by the provided variant ID
    if (!variant) {
      return res.status(400).json({ error: "Variant ID is required" });
    }

    const constructor = await Constructor.findOne({ where: { id: variant } });
    if (!constructor) {
      return res.status(404).json({ error: "Constructor not found" });
    }

    // Initialize total price
    let totalPrice = 0;

    // 2. Process Items and Options for main selection (excluding 'services')
    const itemOptions = await Promise.all(
      Object.entries(items).map(async ([itemId, optionValues]) => {
        // Log item ID and options being processed
        console.log(`Processing item ID: ${itemId}, Options: ${optionValues}`);

        // Ensure itemId and optionValues are defined
        if (!itemId || !optionValues) {
          return {
            error: `Invalid Item or Option provided for itemId: ${itemId}`,
          };
        }

        const item = await Item.findOne({ where: { id: itemId } });
        if (!item) {
          return { error: `Item with id ${itemId} not found` };
        }

        let options;
        if (Array.isArray(optionValues)) {
          // If optionValues is an array (multiple options for an item)
          options = await Option.findAll({ where: { id: optionValues } });
        } else {
          // If optionValues is a single value
          options = await Option.findOne({ where: { id: optionValues } });
        }

        if (!options || (Array.isArray(options) && options.length === 0)) {
          return { error: `Options for itemId ${itemId} not found` };
        }

        // Calculate the total price of options
        const optionPrices = Array.isArray(options)
          ? options.reduce((sum, opt) => sum + (parseFloat(opt.price) || 0), 0) // Convert to number
          : parseFloat(options.price) || 0; // Convert to number

        totalPrice += optionPrices; // Increment total price

        return {
          item: item,
          options: Array.isArray(options)
            ? options.map((opt) => opt || `Option with id not found`)
            : options,
          price: optionPrices, // Add the price for this item
        };
      })
    );

    // 3. Process 'services' items and options
    const serviceOptions = await Promise.all(
      Object.entries(services).map(async ([itemId, optionValues]) => {
        console.log(
          `Processing service item ID: ${itemId}, Options: ${optionValues}`
        );

        // Ensure service itemId and optionValues are defined
        if (!itemId || !optionValues) {
          return {
            error: `Invalid Service Item or Option provided for itemId: ${itemId}`,
          };
        }

        const item = await OptionItem.findOne({ where: { id: itemId } });
        if (!item) {
          return { error: `Service item with id ${itemId} not found` };
        }

        let options;
        if (Array.isArray(optionValues)) {
          // If optionValues is an array (multiple options for a service)
          options = await ItemOption.findAll({ where: { id: optionValues } });
        } else {
          // If optionValues is a single value
          options = await ItemOption.findOne({ where: { id: optionValues } });
        }

        if (!options || (Array.isArray(options) && options.length === 0)) {
          return { error: `Options for service itemId ${itemId} not found` };
        }

        // Calculate the total price of options
        const optionPrices = Array.isArray(options)
          ? options.reduce((sum, opt) => sum + (parseFloat(opt.price) || 0), 0) // Convert to number
          : parseFloat(options.price) || 0; // Convert to number

        totalPrice += optionPrices; // Increment total price

        return {
          service: item,
          options: Array.isArray(options)
            ? options.map((opt) => opt || `Option with id not found`)
            : options,
          price: optionPrices, // Add the price for this service
        };
      })
    );

    // 4. Return the result in the same structure as selectedData but with DB values
    const response = {
      variant: constructor,
      items: itemOptions,
      services: serviceOptions,
      price: totalPrice, // Add total price to the response
    };

    return res.json({ succes: true, data: response });
  } catch (error) {
    console.error("Error processing selectedData:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ------------------------------------------------- item -----------------------------------------

const updateConstuctorItemsOrder = async (req, res) => {
  try {
    const reorderedItems = req.body.items;

    const updateItemPromises = reorderedItems.map(async (item) => {
      console.log(item.order, item.nameRu, "Item");

      await Item.update({ order: item.order }, { where: { id: item.id } });

      const options = await Option.findAll({ where: { itemId: item.id } });

      const updateOptionPromises = options.map(async (option, index) => {
        const optionsFromBody = reorderedItems.find((i) => i.id === item.id);
        const singleOption = optionsFromBody.ConstuctorItemOptions.find(
          (y) => y.id === option.id
        );

        console.log(
          `Updating Option ID: ${option.id}${option.nameRu} with new order: ${singleOption.order}`,
          `Current Option order in DB: ${option.order}`
        );

        // Only update if the order has actually changed
        if (singleOption.order !== option.order) {
          console.log(
            `Updating Option ID: ${option.id},${option.nameRu} current order: ${option.order}, new order: ${singleOption.order}`
          );

          const updatedOption = await Option.update(
            { order: singleOption.order },
            { where: { id: option.id } }
          );

          console.log(updatedOption, "Update result for option");
        } else {
          console.log(`No update needed for Option ID: ${option.id}`);
        }
      });

      await Promise.all(updateOptionPromises);
    });

    await Promise.all(updateItemPromises);

    return res.json({ succes: true });
  } catch (error) {
    console.error("Something went wrong", error);
    return res
      .status(500)
      .json({ succes: false, message: "Internal server error" });
  }
};

const updateConstuctorOptionOrder = async (req, res) => {
  try {
    const reorderedItems = req.body.items;

    const updateItemPromises = reorderedItems.map(async (item) => {
      console.log(reorderedItems, item.order, item.nameRu, "Item");

      await OptionItem.update(
        { order: item.order },
        { where: { id: item.id } }
      );

      const options = await ItemOption.findAll({ where: { itemId: item.id } });
      // console.log(options, "options");

      const updateOptionPromises = options.map(async (option, index) => {
        const optionsFromBody = reorderedItems.find((i) => i.id === item.id);

        const singleOption =
          optionsFromBody.ConstuctorItemOptionItemOptions.find(
            (y) => y.id === option.id
          );

        console.log(
          `Updating Option ID: ${option.id} ${option.nameRu} with new order: ${singleOption.order}`,
          `Current Option order in DB: ${option.order}`
        );

        // Only update if the order has actually changed
        if (singleOption.order !== option.order) {
          console.log(
            `Updating Option ID: ${option.id},${option.nameRu} current order: ${option.order}, new order: ${singleOption.order}`
          );

          const updatedOption = await ItemOption.update(
            { order: singleOption.order },
            { where: { id: option.id } }
          );

          console.log(updatedOption, "Update result for option");
        } else {
          console.log(`No update needed for Option ID: ${option.id}`);
        }
      });

      await Promise.all(updateOptionPromises);
    });

    await Promise.all(updateItemPromises);

    return res.json({ succes: true });
  } catch (error) {
    console.error("Something went wrong", error);
    return res
      .status(500)
      .json({ succes: false, message: "Internal server error" });
  }
};

const createItem = async (req, res) => {
  try {
    const data = req.body;
    const newService = await Item.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const editItem = async (req, res) => {
  try {
    const data = req.body;
    const service = await Item.findOne({ where: { id: data.id } });
    console.log(service, "dddd");

    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroyItem = async (req, res) => {
  try {
    const data = req.body;
    await Item.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

// --------------------------------------------------  option ---------------------------------

const getOptionItems = async (req, res) => {
  try {
    const { id } = req.query;
    const newService = await Option.findOne({
      where: { id },
      include: [
        {
          model: OptionItem,
          include: {
            model: ItemOption,
          },
        },
      ],
    });
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const createOption = async (req, res) => {
  try {
    const data = req.body;
    const newService = await Option.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const editOption = async (req, res) => {
  try {
    const data = req.body;
    const service = await Option.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroyOption = async (req, res) => {
  try {
    const data = req.body;

    await Option.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

// --------------------------------------------------- option item -----------------------------------

const updateConstuctorOptionItemsOrder = async (req, res) => {
  try {
    const reorderedItems = req.body.items; // Expecting an array of items with 'id' and 'order'

    const updatePromises = reorderedItems.map((item) =>
      OptionItem.update({ order: item.order }, { where: { id: item.id } })
    );
    await Promise.all(updatePromises);
    return res.json({ succes: true });
  } catch (error) {
    console.log("something went wrong", e);
  }
};

const createOptionItem = async (req, res) => {
  try {
    const data = req.body;
    const newService = await OptionItem.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const editOptionItem = async (req, res) => {
  try {
    const data = req.body;
    const service = await OptionItem.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getOptionItem = async (req, res) => {
  try {
    const { id } = req.query;
    const service = await OptionItem.findAll({
      where: { reletedId: id },
      include: [
        {
          model: ItemOption,
        },
      ],
    });
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroyOptionItem = async (req, res) => {
  try {
    const data = req.body;

    await OptionItem.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

// -------------------------------------------- option item option---------------------

const createOptionOption = async (req, res) => {
  try {
    const data = req.body;
    const newService = await ItemOption.create(data);
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const editOptionOption = async (req, res) => {
  try {
    const data = req.body;
    const service = await ItemOption.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const destroyOptionOption = async (req, res) => {
  try {
    const data = req.body;
    await ItemOption.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

// -------- order

const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const newService = await Order.create({ ...data, archive: false });
    return res.json({ succes: true, data: newService });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const editOrder = async (req, res) => {
  try {
    const data = req.body;
    const service = await Order.findOne({ where: { id: data.id } });
    await service.update(data);
    return res.json({ succes: true, data: service });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const data = req.body;
    await Order.destroy({ where: { id: data.id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const newOrders = await Order.findAll({
      where: {
        archive: false,
      },
    });
    const oldOrders = await Order.findAll({
      where: {
        archive: true,
      },
    });
    return res.json({ succes: true, newOrders, oldOrders });
  } catch (e) {
    console.log("something went wro ng", e);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  edit,
  destroy,
  updateConstuctorItemsOrder,
  createItem,
  editItem,
  destroyItem,
  createOption,
  editOption,
  destroyOption,
  updateConstuctorOptionItemsOrder,
  createOptionItem,
  destroyOptionItem,
  editOptionItem,
  createOptionOption,
  editOptionOption,
  destroyOptionOption,
  getOptionItems,
  getPrice,
  getOptionItem,
  createOrder,
  editOrder,
  deleteOrder,
  getAllOrders,
  updateConstuctorOptionOrder,
};
