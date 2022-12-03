const db = require("_helpers/db");
const Shoes = db.Shoes;
const Shops = db.Shops;


module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(res) {
  const shoes = await Shoes.find();
  return res.status(200).json( {
    message: "ok",
    data: shoes,
  });
}

async function getById(id , req, res) {
  shoes = await Shoes.findById(id);

  shop = await Shops.findById(shoes.shopId);

  data = {"shoes": shoes, "shop": shop}
  return res.status(200).json( {
    message: "ok",
    data,
  });
}

async function create(ShoesParam, req, res) {
  try {

    // create Shoes
    const shoes = new Shoes(ShoesParam);

    // save Shoes
    const Shoes_ = await shoes.save();

    if (Shoes_) {
      res.status(200).send({"message": "ok","data": Shoes_.toJSON()});    
    }   

  } catch (error) {
      return res.status(500).json({message: error.message})
  }
}

async function update(id, ShoesParam, res) {
    try{
        const shoes = await Shoes.findById(id);
        // validate
        if (!shoes) return res.status(400).json({message : "Shoes not found" });
        
        // copy ShoesParam properties to Shoes
        Object.assign(shoes, ShoesParam);
        const Shoes_ = await Shoes.save();
        if (Shoes_) {
          res.status(200).send({"message": "ok","data": Shoes_.toJSON()});    
        }   

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

async function _delete(id, res) {
    await Shoes.findByIdAndRemove(id);
    res.status(200);
}
