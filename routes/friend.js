
const express = require('express');
const router = express.Router();
const friendController = require("../controllers/friendController");
const appConfig = require("../config/appConfig")
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/friends`;

    app.get(`${baseUrl}/view/friend/request/sent/:userId`, auth.isAuthorized, friendController.getAllRequestSent);
    /**
     * @apiGroup friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friends/view/friend/request/sent/:userId api for Getting all friends request sent.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {string} userId Id of the user. (header params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All Sent Requsts Found",
            "status": 200,
            "data": [
                {
                    "_id": "5bb8a1cb7e0dc6148cbf4bc5",
                    "friendRequestSent": [
                        {
                            "friendId": "SkBEHfS97",
                            "friendName": "Ankit Singh",
                            "_id": "5bb8a427bf63d9156cae71e6"
                        }
                    ]
                }
            ]
        }
    */


   app.get(`${baseUrl}/view/friend/request/recieved/:userId`, auth.isAuthorized, friendController.getAllRequestRecieved);
   /**
    * @apiGroup friends
    * @apiVersion  1.0.0
    * @api {get} /api/v1/friends/view/friend/request/recieved/:userId api for Getting all friends request Recieved.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} UserId Id of the user. (header params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "All Recieved Requsts Found",
        "status": 200,
        "data": [
            {
                "_id": "5bb7952dfb58ea1178205904",
                "friendRequestRecieved": [
                    {
                        "friendId": "SJ70bQL97",
                        "friendName": "Abhishek Sharma",
                        "_id": "5bb8a427bf63d9156cae71e7"
                    }
                ]
            }
        ]
    }
   */

    
    app.post(`${baseUrl}/send/friend/request`, auth.isAuthorized,friendController.sendFriendRequest);
    /**
     * @apiGroup friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friends/send/friend/request api for Sending Friend Request.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {string} senderId Id of the Sender. (body params) (required)
     * @apiParam {string} senderName Name of the Sender. (body params) (required)
     * @apiParam {string} recieverId Id of the Reciever. (body params) (required)
     * @apiParam {string} recieverName Name of the Reciever. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Friend Request Sent",
            "status": 200,
            "data": null
        }
    */
   
   app.post(`${baseUrl}/accept/friend/request`, auth.isAuthorized,friendController.acceptFriendRequest);
   /**
    * @apiGroup friends
    * @apiVersion  1.0.0
    * @api {get} /api/v1/friends/accept/friend/request api for Accepting Friend Request.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} senderId Id of the Sender. (body params) (required)
    * @apiParam {string} senderName Name of the Sender. (body params) (required)
    * @apiParam {string} recieverId Id of the Reciever(Login User). (body params) (required)
    * @apiParam {string} recieverName Name of the Reciever(Login User). (body params) (required)
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
       {
           "error": false,
           "message": "Accepted Friend Request",
           "status": 200,
           "data": null
       }
   */

  app.post(`${baseUrl}/reject/friend/request`, auth.isAuthorized,friendController.rejectFriendRequest);
  /**
   * @apiGroup friends
   * @apiVersion  1.0.0
   * @api {get} /api/v1/friends/reject/friend/request api for Rejecting Friend Request.
   *
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} senderId Id of the Sender. (body params) (required)
   * @apiParam {string} senderName Name of the Sender. (body params) (required)
   * @apiParam {string} recieverId Id of the Reciever(Login User). (body params) (required)
   * @apiParam {string} recieverName Name of the Reciever(Login User). (body params) (required)
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
      {
          "error": false,
          "message": "Rejected Friend Request",
          "status": 200,
          "data": null
      }
  */


 app.post(`${baseUrl}/cancel/friend/request`, auth.isAuthorized,friendController.cancelFriendRequest);
 /**
  * @apiGroup friends
  * @apiVersion  1.0.0
  * @api {get} /api/v1/friends/cancel/friend/request api to Cancel Friend Request.
  *
  * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
  * @apiParam {string} senderId Id of the Sender(Login User). (body params) (required)
  * @apiParam {string} senderName Name of the Sender(Login User). (body params) (required)
  * @apiParam {string} recieverId Id of the Reciever. (body params) (required)
  * @apiParam {string} recieverName Name of the Reciever. (body params) (required)
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.
  * 
  * @apiSuccessExample {object} Success-Response:
     {
         "error": false,
         "message": "Canceled Friend Request",
         "status": 200,
         "data": null
     }
 */

app.post(`${baseUrl}/unfriend/user`, auth.isAuthorized,friendController.unfriendFunction);
/**
 * @apiGroup friends
 * @apiVersion  1.0.0
 * @api {get} /api/v1/friends/unfriend/user api to Unfriend user.
 *
 * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
 * @apiParam {string} senderId Id of the Sender. (body params) (required)
 * @apiParam {string} senderName Name of the Sender. (body params) (required)
 * @apiParam {string} recieverId Id of the Reciever(Login User). (body params) (required)
 * @apiParam {string} recieverName Name of the Reciever(Login User). (body params) (required)
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "Canceled Friend Request",
        "status": 200,
        "data": null
    }
*/


}
