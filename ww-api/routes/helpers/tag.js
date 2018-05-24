var DB = require("../../models");

exports.getAllTagsOfType = async function(req, res, next){
  try {
    let tagType = req.body.tagType;
    if(!tagType){
      let tags = await DB.Tag.find({});
      return res.status(200).json(tags);
    }
    let tags = await DB.Tag.find({tagType:tagType});
    return res.status(200).json(tags);
  } catch(err) {
    return next(err)
  }
}

exports.getAllTagTypes = async function(req, res, next){
  try{
    let tags = await DB.Tag.find({});
    let tagTypes = [];
    // populate tagTypes arrya with unique values
    tags.forEach(tag => {
      if(!tagTypes.contains(tag.tagType)){
        tagTypes.push(tag.tagType)
      }
    });
    return res.status(200).json(tagTypes);
  } catch(err) {
    return next(err);
  }
}

exports.createTag = async function(req, res, next){
  try{
    let tagType = req.body.tagType;
    let tag = req.body.tag;
    if(!tag || !tagType){
      let err = new Error("Tag or Tag Type not supplied within the body of the request.");
      err.status = 404;
      throw err;
    }
    let tagObject = await DB.ICYOA.create({
      tag: tag,
      tagType: tagType
    });
  }
  catch(err){
    return next(err);
  }
}