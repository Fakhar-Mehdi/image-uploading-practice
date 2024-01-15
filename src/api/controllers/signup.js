export const saveUser = async (req, res) => {
  try {
    //validate input with yup
    const { name, email, age, dp } = req.body;
    if (!name || !email || !age || age <= 0 || !dp)
      throw new Error("Invalid Data");
    //create a new user
    const newUser = new User({ name, email, age, dp });
    const saved = await newUser.save();
    res.send(saved);
  } catch (e) {
    res.status(400).send(e.message.toString());
  }
};
