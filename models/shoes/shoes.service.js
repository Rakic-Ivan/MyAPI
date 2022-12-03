const db = require("_helpers/db");
const Shoes = db.Shoes;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(res) {
  const Shoes = await Shoes.find();
  return res.status(200).json( {
    message: "ok",
    data: Shoes,
  });
}

async function getById(id) {
  Shoes = await Shoes.findById(id);
  return Shoes;
}

async function create(ShoesParam, req, res) {
  try {

    // create Shoes
    const Shoes = new Shoes(ShoesParam);
    // save Shoes
    const Shoes_ = await Shoes.save();

    if (Shoes_) {
      res.status(200).send({"message": "ok","data": Shoes_.toJSON()});    
    }   

  } catch (error) {
      return res.status(500).json({message: error.message})
  }
}

async function update(id, ShoesParam, res) {
    try{
        const Shoes = await Shoes.findById(id);
        // validate
        if (!Shoes) return res.status(400).json({message : "Shoes not found" });
        
        // copy ShoesParam properties to Shoes
        Object.assign(Shoes, ShoesParam);
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
