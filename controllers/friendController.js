
const mongoose = require('mongoose');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')

/* Models */
const UserModel = mongoose.model('User')

 
/* getAllRequestSent */
/* Params : userId*/
let getAllRequestSent = (req, res) => {
    UserModel.find({userId:req.header.userId})
        .select('friendRequestSent')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Friend Controller: getAllRequestSent', 10)
                let apiResponse = response.generate(true, 'Failed To Find Sent Requests', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result.friendRequestSent)) {
                logger.info('No Sent Request Found', 'Friend Controller: getAllRequestSent')
                let apiResponse = response.generate(true, 'No Sent Request Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Sent Requsts Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end getAllRequestSent


/* getAllRequestRecieved */
/* Params : userId*/
let getAllRequestRecieved = (req, res) => {
    UserModel.find({userId:req.header.userId})
        .select('friendRequestRecieved')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Friend Controller: getAllRequestRecieved', 10)
                let apiResponse = response.generate(true, 'Failed To Find Recieved Requests', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result.friendRequestRecieved)) {
                logger.info('No Recieved Request Found', 'Friend Controller: getAllRequestRecieved')
                let apiResponse = response.generate(true, 'No Recieved Request Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Recieved Requsts Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end getAllRequestRecieved


/* sendFriendRequest  */
/* params : senderId,senderName,recieverId,recieverName
*/

let sendFriendRequest = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                    resolve(req)
            } else {
                logger.error('Field Missing During Sending request', 'friendController: sendFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSender = () => {
        let subOptions = {
            friendId: req.body.recieverId,
            friendName: req.body.recieverName,
        }

        let options = {
            $push: { 
                friendRequestSent: { $each: [ subOptions ] } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateSender', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSender')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender with sent requests', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSender

    let updateReciever = () => {
        let subOptions = {
            friendId: req.body.senderId,
            friendName: req.body.senderName,
        }

        let options = {
            $push: { 
                friendRequestRecieved: { $each: [ subOptions ]                     
                } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateReciever', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciever not Found', 'Friend Controller: updateReciever')
                    let apiResponse = response.generate(true, 'Reciever not Found', 404, null)
                    reject(apiResponse)
                } else {
                    //let apiResponse = response.generate(false, 'Updated Reciever with Recieved requests', 200, null)
                    resolve(result)
                }
            });// end user model update
        })
    } //end updateReciever

    validateUserInput(req, res)
        .then(updateSender)
        .then(updateReciever)
        .then((resolve) => {            
            let apiResponse = response.generate(false, 'Friend Request Sent', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}


/* acceptFriendRequest  */
/* params : senderId,senderName,recieverId,recieverName
*/

let acceptFriendRequest = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                    resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'friendController: acceptFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSenderFriendList = () => {
        
        let subOptions = {
            friendId: req.body.recieverId,
            friendName: req.body.recieverName,
        }

        let options = {
            $push: { 
                friends: { $each: [ subOptions ]                     
                } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateSenderFriendList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Friend List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSenderFriendList')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Friend List', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderFriendList

    let updateRecieverFriendList = () => {
        
        let subOptions = {
            friendId: req.body.senderId,
            friendName: req.body.senderName,
        }

        let options = {
            $push: { 
                friends: { $each: [ subOptions ]                     
                } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateRecieverFriendList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciver Friend List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'Friend Controller: updateRecieverFriendList')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Reciver Friend List', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverFriendList

    let updateSenderSentRequest = () => {
        
        let options = {
            $pull: { 
                friendRequestSent: {
                    friendId:req.body.recieverId                      
                } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateSenderSentRequest', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Sent Request', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSenderSentRequest')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Sent Request', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderSentRequest

    let updateRecieverRequestRecieved = () => {
        
        let options = {
            $pull: { 
                friendRequestRecieved: {
                    friendId:req.body.senderId                      
                } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateRecieverRequestRecieved', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever Requests Recieved', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'Friend Controller: updateRecieverRequestRecieved')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Recievers Requests Recieved', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverRequestRecieved

    validateUserInput(req, res)
        .then(updateSenderFriendList)
        .then(updateRecieverFriendList)
        .then(updateSenderSentRequest)
        .then(updateRecieverRequestRecieved)
        .then((resolve) => {            
            let apiResponse = response.generate(false, 'Accepted Friend Request', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}


/* rejectFriendRequest  */
/* params : senderId,senderName,recieverId,recieverName
*/

let rejectFriendRequest = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                    resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'friendController: rejectFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input


    let updateSenderSentRequest = () => {
        
        let options = {
            $pull: { 
                friendRequestSent: {
                    friendId:req.body.recieverId                      
                } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateSenderSentRequest', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Sent Request', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSenderSentRequest')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Sent Request', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderSentRequest

    let updateRecieverRequestRecieved = () => {
        
        let options = {
            $pull: { 
                friendRequestRecieved: {
                    friendId:req.body.senderId                      
                } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateRecieverRequestRecieved', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever Requests Recieved', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'Friend Controller: updateRecieverRequestRecieved')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Recievers Requests Recieved', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverRequestRecieved

    validateUserInput(req, res)
        .then(updateSenderSentRequest)
        .then(updateRecieverRequestRecieved)
        .then((resolve) => {            
            let apiResponse = response.generate(false, 'Rejected Friend Request', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}


/* cancelFriendRequest  */
/* params : senderId,senderName,recieverId,recieverName
*/

let cancelFriendRequest = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                    resolve(req)
            } else {
                logger.error('Field Missing During Sending request', 'friendController: sendFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSender = () => {


        let subOptions = {
            friendId: req.body.recieverId,
            friendName: req.body.recieverName,
        }

        let options = {
            $pull: { 
                friendRequestSent: { subOptions } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateSender', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSender')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender with sent requests', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSender

    let updateReciever = () => {
        let subOptions = {
            friendId: req.body.senderId,
            friendName: req.body.senderName,
        }

        let options = {
            $pull: { 
                friendRequestRecieved: { subOptions } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateReciever', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciever not Found', 'Friend Controller: updateReciever')
                    let apiResponse = response.generate(true, 'Reciever not Found', 404, null)
                    reject(apiResponse)
                } else {
                    //let apiResponse = response.generate(false, 'Updated Reciever with Recieved requests', 200, null)
                    resolve(result)
                }
            });// end user model update
        })
    } //end updateReciever

    validateUserInput(req, res)
        .then(updateSender)
        .then(updateReciever)
        .then((resolve) => {            
            let apiResponse = response.generate(false, 'Canceled Friend Request', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}

/* Unfriend  */
/* params : senderId,senderName,recieverId,recieverName
*/

let unfriendFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                    resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'friendController: acceptFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSenderFriendList = () => {
        
        let subOptions = {
            friendId: req.body.recieverId,
            friendName: req.body.recieverName,
        }

        let options = {
            $pull: { 
                friends: {  subOptions } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateSenderFriendList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Friend List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSenderFriendList')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Friend List', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderFriendList

    let updateRecieverFriendList = () => {
        
        let subOptions = {
            friendId: req.body.senderId,
            friendName: req.body.senderName,
        }

        let options = {
            $pull: { 
                friends: { subOptions } 
            } 
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateRecieverFriendList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciver Friend List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'Friend Controller: updateRecieverFriendList')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Reciver Friend List', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverFriendList


    validateUserInput(req, res)
        .then(updateSenderFriendList)
        .then(updateRecieverFriendList)
        .then((resolve) => {            
            let apiResponse = response.generate(false, 'Unfriend User', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}


module.exports = {
    getAllRequestSent:getAllRequestSent,
    getAllRequestRecieved:getAllRequestRecieved,
    sendFriendRequest:sendFriendRequest,
    acceptFriendRequest:acceptFriendRequest,
    rejectFriendRequest:rejectFriendRequest,
    cancelFriendRequest:cancelFriendRequest,
    unfriendFunction:unfriendFunction

}// end exports