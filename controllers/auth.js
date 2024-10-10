const Admin = require("../models").Admin;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }

    const admin = await Admin.findOne({
      where: { email: email.toLowerCase() },
    });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        { user_id: admin.id, email },
        process.env.TOKEN_KEY_ADMIN
      );
      admin.token = token;
      admin.save();
      return res.json({ data: admin, succes: true });
    }

    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const logout = async (req, res) => {
  try {
    const { user_id } = req.user;

    const user = await Admin.findOne({ where: { id: user_id } });
    user.token = null;
    await user.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = { login, logout };
