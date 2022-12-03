const db = require("_helpers/db");
const Shops = db.Shops;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(res) {
  const shops = await Shops.find();
  return res.status(200).json( {
    message: "ok",
    data: shops,
  });
}

async function getById(id) {
  shops = await Shops.findById(id);
  return shops;
}

async function create(ShopsParam, req, res) {
  try {

    // create Shops
    const shops = new Shops(ShopsParam);

    // save Shops
    const Shops_ = await shops.save();

    if (Shops_) {
      res.status(200).send({"message": "ok","data": Shops_.toJSON()});    
    }   

  } catch (error) {
      return res.status(500).json({message: error.message})
  }
}

async function update(id, ShopsParam, res) {
    try{
        const shops = await Shops.findById(id);
        // validate
        if (!shops) return res.status(400).json({message : "Shops not found" });
        
        // copy ShopsParam properties to Shops
        Object.assign(shops, ShopsParam);
        const Shops_ = await Shops.save();
        if (Shops_) {
          res.status(200).send({"message": "ok","data": Shops_.toJSON()});    
        }   

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

async function _delete(id, res) {
    await Shops.findByIdAndRemove(id);
    res.status(200);
}
