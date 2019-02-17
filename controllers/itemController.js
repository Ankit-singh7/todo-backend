
const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')

/* Models */
const ItemModel = mongoose.model('Item')
const ListModel = mongoose.model('List')


/* Start getAllItemsFunction */
/* params: listId
*/

let getAllItemsFunction = (req, res) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': req.params.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find list Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No list Found', 'Item  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No list Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'list Details Found', 200, listDetails)
                        resolve(listDetails)
                    }
                })
        })
    }// end findlistDetails

    let findItems = (listDetails) => {
        return new Promise((resolve, reject) => {

            ItemModel.find({ 'listId': req.params.listId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItems', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Items', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItems')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Items Found and Listed', 200, ItemDetails)
                        resolve(apiResponse)
                    }
                })
        })
    }// end findItems


    findListDetails(req, res)
        .then(findItems)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Items Found and Itemed', 200, resolve)
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end getAllItemsFunction 


/*  Start getItemDetailsFunction */
/* params : ItemId
*/
let getItemDetailsFunction = (req, res) => {
    ItemModel.findOne({ 'itemId': req.params.itemId })
        .select()
        .lean()
        .exec((err, ItemDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Item Controller: getItemDetails', 10)
                let apiResponse = response.generate(true, 'Failed To Find Items', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(ItemDetails)) {
                logger.info('No Item Found', 'Item  Controller:getItemDetailsFunction')
                let apiResponse = response.generate(true, 'No Item Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Item Found', 200, ItemDetails)
                res.send(apiResponse)
            }
        })
}// end getItemDetailsFunction


/* Start Delete Item  */
/* params : ItemId
*/
let deleteItemFunction = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        resolve(ItemDetails)
                    }
                })
        })
    }// end validate list input

    let deleteItem = (ItemDetails) => {
        return new Promise((resolve, reject) => {

            ItemModel.findOneAndRemove({ 'itemId': req.params.itemId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Item Controller: deleteItem', 10)
                    let apiResponse = response.generate(true, 'Failed To delete Item', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'Item Controller: deleteItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {

                    let apiResponse = response.generate(false, 'Deleted the Item successfully', 200, null)
                    resolve(apiResponse)
                }
            });// end Item model find and remove

        })
    }// end deleteItem function


    findItemDetails(req, res)
        .then(deleteItem)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Deleted the Item successfully', 200, resolve)
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end deleteItemFunction 


/* Start Update Item details */
/* params: ItemId
   body : ItemName,ItemMode,ItemModifierId,ItemModifierName
*/

let updateItemFunction = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        resolve(ItemDetails)
                    }
                })
        })
    }// end findItemdetails 

    let updateItem = (ItemDetails) => {
        return new Promise((resolve, reject) => {

            let options = req.body;
            options.itemModifiedOn = time.now()

            ItemModel.update({ 'itemId': req.params.itemId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Item Controller:updateItem', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Item details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'Item Controller:updateItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {

                    let apiResponse = response.generate(false, 'Item details Updated', 200, null)
                    resolve(apiResponse)
                }
            });// end Item model update

        })
    }// end updateItem function


    findItemDetails(req, res)
        .then(updateItem)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Item Updated', 200, "None")
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end updateItemFunction 


// start addItemFunction 
/* params: listId,ItemName,ItemCreatorId,ItemCreatorName,ItemModifierId,ItemModifierName
           
*/


let addItemFunction = (req, res) => {

    let validatelistInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listId && req.body.itemName && req.body.itemCreatorId && req.body.itemCreatorName &&
                req.body.itemModifierId && req.body.itemModifierName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Item Creation', 'ItemController: addItem()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate list input

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': req.body.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No List Found', 'Item  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'List Details Found', 200, listDetails)
                        resolve(listDetails)
                    }
                })
        })
    }// end findListDetails

    let addItem = () => {
        return new Promise((resolve, reject) => {
            //console.log(req.body)
            let newItem = new ItemModel({

                listId: req.body.listId,
                itemName: req.body.itemName,
                itemCreatorId: req.body.itemCreatorId,
                itemCreatorName: req.body.itemCreatorName,
                itemModifierId: req.body.itemModifierId,
                itemModifierName: req.body.itemModifierName,
                itemCreatedOn: time.now(),
                itemModifiedOn: time.now(),
            })

            if (req.body.itemId != undefined) {
                newItem.itemId = req.body.itemId
            }
            else {
                newItem.itemId = shortid.generate()
            }

            console.log(newItem)
            newItem.save((err, newItem) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'ItemController: addItem', 10)
                    let apiResponse = response.generate(true, 'Failed to add new Item', 500, null)
                    reject(apiResponse)
                } else {
                    let newItemObj = newItem.toObject();
                    resolve(newItemObj)
                }
            })

        })
    }// end addItem function


    validatelistInput(req, res)
        .then(findListDetails)
        .then(addItem)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Item Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end addItemFunction 


/* Start getSubItemDetailsFunction */
/* params: itemId */
/* body params: subItemId */


let getSubItemDetailsFunction = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        resolve(ItemDetails)
                    }
                })
        })
    }// end findItemdetails 


    let findSubItemDetails = (ItemDetails) => {
        return new Promise((resolve, reject) => {
            ItemModel.find({ "subItems": { $elemMatch: { subItemId: req.body.subItemId } } })
                .select('subItems')
                .lean()
                .exec((err, SubItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findSubItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Sub Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(SubItemDetails)) {
                        logger.info('No Sub Item Found', 'Item  Controller:findSubItemDetails')
                        let apiResponse = response.generate(true, 'No Sub Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Sub Item Details Found', 200, SubItemDetails)
                        resolve(apiResponse)
                    }
                })

        })
    }// end findSubItemDetails function


    findItemDetails(req, res)
        .then(findSubItemDetails)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Item Updated', 200, "None")
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end getSubItemDetailsFunction 


/* Start addSubItemFunction */
/* params: ItemId
   body : subItemName,subItemModifierId,subItemModifierName,subItemCreatorId,subItemCreatorName
*/

let addSubItemFunction = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        resolve(ItemDetails)
                    }
                })
        })
    }// end findItemdetails

    let updateItem = (ItemDetails) => {
        return new Promise((resolve, reject) => {

            let subOptions = {
                subItemName: req.body.subItemName,
                subItemCreatorId: req.body.subItemCreatorId,
                subItemCreatorName: req.body.subItemCreatorName,
                subItemModifierId: req.body.subItemModifierId,
                subItemModifierName: req.body.subItemModifierName,
                subItemCreatedOn: time.now(),
                subItemModifiedOn: time.now(),
            }
            //To add the subitem in item model we will use push method of array

            if (req.body.itemId != undefined) {
                subOptions.subItemId = req.body.subItemId
            }
            else {
                subOptions.subItemId = shortid.generate()
            }

            let options = {
                $push: {
                    subItems: {
                        $each: [subOptions]
                    }
                }
            }



            options.itemModifiedOn = time.now()
            options.itemModifierId = req.body.subItemModifierId,
                options.itemModifierName = req.body.subItemModifierName,


                ItemModel.update({ 'itemId': req.params.itemId }, options).exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller:updateSubItem', 10)
                        let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Adding', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Item Found', 'Item Controller:updateSubItem')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {

                        let apiResponse = response.generate(false, 'Item details Updated : Sub Item Added', 200, subOptions)
                        resolve(apiResponse)
                    }
                });// end Item model update

        })
    }// end updateItem function


    findItemDetails(req, res)
        .then(updateItem)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Item Updated', 200, "None")
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end addSubItemFunction 


/* Start deleteSubItemFunction */
/* params: ItemId,subItemId,
   Body:    itemModifierId                 
            itemModifierName
*/

let deleteSubItemFunction = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        resolve(ItemDetails)
                    }
                })
        })
    }// end findItemdetails

    let updateItem = (ItemDetails) => {
        return new Promise((resolve, reject) => {

            //To delete the subitem from item model we will use pull method of array

            let options = {
                $pull: {
                    subItems: {
                        subItemId: req.body.subItemId
                    }
                }
            }

            options.itemModifiedOn = time.now()
            options.itemModifierId = req.body.subItemModifierId,
                options.itemModifierName = req.body.subItemModifierName,


                ItemModel.update({ 'itemId': req.params.itemId }, options).exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller:updateSubItem', 10)
                        let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Deleting', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Item Found', 'Item Controller:updateSubItem')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {

                        let apiResponse = response.generate(false, 'Item details Updated : Sub Item Deleted', 200, null)
                        resolve(apiResponse)
                    }
                });// end Item model update

        })
    }// end updateItem function


    findItemDetails(req, res)
        .then(updateItem)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Item Updated', 200, "None")
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end deleteSubItemFunction 


/* Start Update Sub Item */
/* params: ItemId,subItemId
   body : subItemName,subItemMode,subItemModifierId,subItemModifierName,subItemDone
*/

let updateSubItemFunction = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        resolve(ItemDetails)
                    }
                })
        })
    }// end findItemdetails

    let updateItem = (ItemDetails) => {
        return new Promise((resolve, reject) => {

            //To update the subitem in item model we will use set method of array
            let options = {
                $set: {
                    "subItems.$.subItemName": req.body.subItemName,
                    "subItems.$.subItemModifierId": req.body.subItemModifierId,
                    "subItems.$.subItemModifierName": req.body.subItemModifierName,
                    "subItems.$.subItemDone": req.body.subItemDone,
                    "subItems.$.subItemModifiedOn": time.now(),
                }
            }


            options.itemModifiedOn = time.now()
            options.itemModifierId = req.body.subItemModifierId,
            options.itemModifierName = req.body.subItemModifierName,

            

            ItemModel.update({ 'itemId': req.params.itemId, 'subItems.subItemId': req.body.subItemId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Item Controller:updateItem', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Updating', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'Item Controller:updateItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {

                    let apiResponse = response.generate(false, 'Item details Updated : Sub Item Updated', 200, result)
                    resolve(apiResponse)
                }
            });// end Item model update

        })
    }// end updateItem function


    findItemDetails(req, res)
        .then(updateItem)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Item Updated', 200, "None")
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end updateSubItemFunction 



module.exports = {
    addItemFunction: addItemFunction,
    updateItemFunction: updateItemFunction,
    deleteItemFunction: deleteItemFunction,
    getAllItemsFunction: getAllItemsFunction,
    getItemDetailsFunction: getItemDetailsFunction,

    addSubItemFunction: addSubItemFunction,
    deleteSubItemFunction: deleteSubItemFunction,
    updateSubItemFunction: updateSubItemFunction,
    getSubItemDetailsFunction: getSubItemDetailsFunction

}// end exports