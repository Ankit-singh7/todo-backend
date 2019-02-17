
const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')

const emailLib = require('../libs/emailLib');

/* Models */
const ListModel = mongoose.model('List')
const UserModel = mongoose.model('User')


/* Start getAllListsFunction */
/* params: userId
*/

let getAllListsFunction = (req, res) => {

    let findUserDetails = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ 'userId': req.params.userId })
                .select()
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: findUserDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No User Found', 'List  Controller:findLists')
                        let apiResponse = response.generate(true, 'No User Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'User Details Found', 200, userDetails)
                        resolve(userDetails)
                    }
                })
        })
    }// end finduserDetails

    let findLists = () => {
        return new Promise((resolve, reject) => {

            ListModel.find({ 'listCreatorId': req.params.userId})
                .select()
                .lean()
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: findLists', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Lists', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'List  Controller:findLists')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Lists Found and Listed', 200, ListDetails)
                        resolve(apiResponse)
                    }
                })
        })
    }// end findLists


    findUserDetails(req, res)
        .then(findLists)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Lists Found and Listed', 200, resolve)
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end getAllListsFunction 


/* Start getAllPublicListsFunction */
/* params: userId
*/

let getAllPublicListsFunction = (req, res) => {
    let userIds = req.body.userId.split(',')
    console.log(userIds)

    let findUserDetails = () => {
        return new Promise((resolve, reject) => {

            UserModel.find({ userId: { $in: userIds } })
                .select()
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: findUserDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No User Found', 'List  Controller:findLists')
                        let apiResponse = response.generate(true, 'No User Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'User Details Found', 200, userDetails)
                        resolve(userDetails)
                    }
                })
        })
    }// end finduserDetails

    let findLists = (userDetails) => {
        return new Promise((resolve, reject) => {


            ListModel.find({ 'listCreatorId': { $in:  userIds } , listMode: "public"})
                .select()
                .lean()
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: findLists', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Lists', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'List  Controller:findLists')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Lists Found and Listed', 200, ListDetails)
                        resolve(apiResponse)
                    }
                })
        })
    }// end findLists


    findUserDetails(req, res)
        .then(findLists)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Lists Found and Listed', 200, resolve)
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end getAllPublicListsFunction 


/*  Start getListDetailsFunction */
/* params : ListId
*/
let getListDetailsFunction = (req, res) => {
    ListModel.findOne({ 'listId': req.params.listId })
        .select()
        .lean()
        .exec((err, ListDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'List Controller: getListDetails', 10)
                let apiResponse = response.generate(true, 'Failed To Find Lists', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(ListDetails)) {
                logger.info('No List Found', 'List  Controller:getListDetailsFunction')
                let apiResponse = response.generate(true, 'No List Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'List Found', 200, ListDetails)
                res.send(apiResponse)
            }
        })
}// end getListDetailsFunction


/* Start Delete List  */
/* params : ListId 
*/
let deleteListFunction = (req, res) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': req.params.listId })
                .select()
                .lean()
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'List  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'List Details Found', 200, ListDetails)
                        resolve(ListDetails)
                    }
                })
        })
    }// end validate user input

    let deleteList = (ListDetails) => {
        return new Promise((resolve, reject) => {

            ListModel.findOneAndRemove({ 'listId': req.params.listId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'List Controller: deleteList', 10)
                    let apiResponse = response.generate(true, 'Failed To delete List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No List Found', 'List Controller: deleteList')
                    let apiResponse = response.generate(true, 'No List Found', 404, null)
                    reject(apiResponse)
                } else {
                    
                    let apiResponse = response.generate(false, 'Deleted the List successfully', 200, null)
                    resolve(apiResponse)
                }
            });// end List model find and remove

        })
    }// end deleteList function


    findListDetails(req, res)
        .then(deleteList)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Deleted the List successfully', 200, resolve)
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end deleteListFunction 


/* Start Update List details */
/* params: listId
   body : listName,listMode,listModifierId,listModifierName
*/

let updateListFunction = (req, res) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': req.params.listId })
                .select()
                .lean()
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'List  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'List Details Found', 200, ListDetails)
                        resolve(ListDetails)
                    }
                })
        })
    }// end findListdetails

    let updateList = (ListDetails) => {
        return new Promise((resolve, reject) => {

            let options = req.body;
            options.listModifiedOn = time.now()
            
            ListModel.update({ 'listId': req.params.listId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'List Controller:updateList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update List details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No List Found', 'List Controller:updateList')
                    let apiResponse = response.generate(true, 'No List Found', 404, null)
                    reject(apiResponse)
                } else {

                    let apiResponse = response.generate(false, 'List details Updated', 200, null)
                    resolve(apiResponse)
                }
            });// end List model update

        })
    }// end updateList function


    findListDetails(req, res)
        .then(updateList)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'List Updated', 200, "None")
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end updateListFunction 



// start addListFunction 
/* params: listName,listCreatorId,listCreatorName,listModifierId,listModifierName,listMode,
           
*/

let addListFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listName && req.body.listCreatorId && req.body.listCreatorName &&
                req.body.listModifierId && req.body.listModifierName && req.body.listMode ) {
                resolve(req)
            } else {
                logger.error('Field Missing During List Creation', 'ListController: addList()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input 

    let addList = () => {
        return new Promise((resolve, reject) => {
            //console.log(req.body)
            let newList = new ListModel({
                listId: shortid.generate(),
                listName: req.body.listName,
                listCreatorId: req.body.listCreatorId,
                listCreatorName: req.body.listCreatorName,
                listModifierId: req.body.listModifierId,
                listModifierName: req.body.listModifierName,
                listMode: req.body.listMode,
                listCreatedOn: time.now(),
                listModifiedOn: time.now(),
            })

            console.log(newList)
            newList.save((err, newList) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'ListController: addList', 10)
                    let apiResponse = response.generate(true, 'Failed to add new List', 500, null)
                    reject(apiResponse)
                } else {
                    let newListObj = newList.toObject();
                    resolve(newListObj)
                }
            })

        })
    }// end addList function


    validateUserInput(req, res)
        .then(addList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'List Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end addListFunction 



module.exports = {
    addListFunction: addListFunction,
    updateListFunction: updateListFunction,
    deleteListFunction: deleteListFunction,
    getAllListsFunction: getAllListsFunction,
    getListDetailsFunction: getListDetailsFunction,
    getAllPublicListsFunction:getAllPublicListsFunction
}// end exports