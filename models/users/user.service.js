const db = require("_helpers/db");
const User = db.User;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(res) {
  const user = await User.find();
  return res.status(200).json( {
    message: "ok",
    data: user,
  });
}

async function getById(id) {
  user = await User.findById(id);
  return user;
}

async function create(userParam, req, res) {
  try {
    // validate
    if (await User.findOne({ prenom: userParam.prenom })) {
      return res.status(400).json({ message: 'prenom "' + userParam.prenom + '" is already taken' });
    }

    if (await User.findOne({ nom: userParam.nom })) {
      return res.status(400).json({message : 'Nom "' + userParam.nom + '" is already taken'});
    }

    // create User
    const user = new User(userParam);
    // save user
    const user_ = await user.save();

    if (user_) {
      res.status(200).send({"message": "ok","data": user_.toJSON()});    
    }   

  } catch (error) {
      return res.status(500).json({message: error.message})
  }
}

async function update(id, userParam, res) {
    try{
        const user = await User.findById(id);
        // validate
        if (!user) return res.status(400).json({message : "User not found" });
        
        // copy userParam properties to user
        Object.assign(user, userParam);
        const user_ = await user.save();
        if (user_) {
          res.status(200).send({"message": "ok","data": user_.toJSON()});    
        }   

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

async function _delete(id, res) {
    await User.findByIdAndRemove(id);
    res.status(200);
}
