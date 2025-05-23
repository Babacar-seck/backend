const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
  console.log(` req : ${req}`)
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;

  console.log(`${req.file}`)
  const thing = new Thing({
    ...thingObject, 
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  thing.save()
  .then(() => res.status(201).json({message : 'Thing saved successfully!'}))
  .catch(error => res.status(400).json({error}));
}

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Thing updated successfully!!'}))
  .catch(error => res.status(400).json({error}));
}

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'thing deleted!'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
}

exports.getAllThings = (req,res,next) => {
  Thing.find()
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({error}));
}