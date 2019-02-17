const mongoose = require('mongoose');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')
const shortid = require('shortid');
const time = require('../libs/timeLib');


/* Models */
const HistoryModel = mongoose.model('History')
const ItemModel = mongoose.model('Item')


// start addHistoryFunction 
/* params: key , value */

let addHistoryFunction = (req, res) => {
    console.log(req.body)

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listId && req.body.key) {
                resolve(req)
            } else {
                logger.error('Field Missing During History Creation', 'HistoryController: addHistoryFunctio()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input 

    let findItems = () => {
        return new Promise((resolve, reject) => {
            if(req.body.key == 'Item Add'){
                resolve(null)
            }
            else{
                ItemModel.findOne({ 'itemId': req.body.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: getItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Items', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:getItemDetailsFunction')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Item Found', 200, ItemDetails)
                        resolve(ItemDetails)
                    }
                })
            }
        })
    }// end findItems
 
    let updateHistory = (ItemDetails) => {
        return new Promise((resolve, reject) => {
            let newHistory = new HistoryModel({
                historyId: shortid.generate(),
                listId: req.body.listId,
                key: req.body.key,
                createdOn: time.now(),
                itemId:req.body.itemId,
                subItemId:req.body.subItemId
            })

            newHistory.itemValues = ItemDetails

            newHistory.save((err, newItem) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'HistoryController: addItem', 10)
                    let apiResponse = response.generate(true, 'Failed to add history Item', 500, null)
                    reject(apiResponse)
                } else {
                    let newItemObj = newItem.toObject();
                    resolve(newItemObj)
                }
            })

        })
    }// end updateHistory function


    validateUserInput(req, res)
        .then(findItems)
        .then(updateHistory)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'History Added', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end addHistoryFunction 

// start deleteHistoryFunction

let deleteHistoryFunction = (req, res) => {

    let findHistory = () => {
        return new Promise((resolve, reject) => {
            HistoryModel.findOne({ 'listId': req.body.listId }).sort({ $natural: -1 })
                .select()
                .lean()
                .exec((err, HistoryDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'History Controller: v', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(HistoryDetails)) {
                        logger.info('No Histoy Found', 'History  Controller:findHistory')
                        let apiResponse = response.generate(true, 'No History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'History Found', 200, HistoryDetails)
                        resolve(HistoryDetails)
                    }
                })
        })
    }// end findHistory

    let updateHistory = (HistoryDetails) => {
        return new Promise((resolve, reject) => {

            HistoryModel.findOneAndRemove({ 'historyId': HistoryDetails.historyId }).exec((err, result) => {
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

                    let apiResponse = response.generate(false, 'History Deleted', 200, HistoryDetails)
                    resolve(apiResponse)
                }
            });// end find and remove

        })
    }// end updateHistory function

    findHistory(req, res)
        .then(updateHistory)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'History Deleted', 200, resolve)
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end deleteHistoryFunction 


let getHistoryFunction = (req, res) => {

    let findHistory = () => {
        return new Promise((resolve, reject) => {
            HistoryModel.find().sort({ $natural: -1 })
                .select()
                .lean()
                .exec((err, HistoryDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'History Controller: v', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(HistoryDetails)) {
                        logger.info('No Histoy Found', 'History  Controller:findHistory')
                        let apiResponse = response.generate(true, 'No History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'History Found', 200, HistoryDetails)
                        resolve(apiResponse)
                    }
                })
        })
    }// end findHistory

    findHistory(req, res)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'History Deleted', 200, resolve)
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end deleteHistoryFunction 

module.exports = {
    addHistoryFunction: addHistoryFunction,
    deleteHistoryFunction: deleteHistoryFunction,
    getHistoryFunction: getHistoryFunction
}// end exports