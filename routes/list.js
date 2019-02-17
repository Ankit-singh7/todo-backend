
const express = require('express');
const router = express.Router();
const listController = require("../controllers/listController");
const appConfig = require("../config/appConfig")
const auth = require('../middlewares/auth')


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/lists`;

    // params: listName,listCreatorId,listCreatorName,listModifierId,listModifierName,listMode
    
    app.post(`${baseUrl}/addList`, auth.isAuthorized, listController.addListFunction);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/lists/addList api to Add List.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listName Name of the List. (body params) (required)
     * @apiParam {string} listCreatorId User Id of the user creating todo. (body params) (required)
     * @apiParam {string} listCreatorName User Name of the user creating todo. (body params) (required)
     * @apiParam {string} listModifierId User Id of the user modifying todo. (body params) (required)
     * @apiParam {string} listModifierName User Name of the user modifying todo. (body params) (required)
     * @apiParam {string} listMode Mode of the Todo. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "List Created",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "5bb87ee3625e5006d41f786d",
                "listModifiedOn": "2018-10-06T09:22:43.000Z",
                "listCreatedOn": "2018-10-06T09:22:43.000Z",
                "listMode": "private",
                "listModifierName": "Ankit Singh",
                "listModifierId": "SkBEHfS97",
                "listCreatorName": "Ankit Singh",
                "listCreatorId": "SkBEHfS97",
                "listName": "Demo list",
                "listId": "SknkJ-UcX"
            }
        }    
    */


    app.put(`${baseUrl}/:listId/updateList`, auth.isAuthorized, listController.updateListFunction);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {put} /api/v1/lists/:listId/updateList api to Update List Details.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the List. (query params) (required)
     * @apiParam {string} listName Name of the List. (body params) (required)
     * @apiParam {string} listModifierId User Id of the user modifying todo. (body params) (required)
     * @apiParam {string} listModifierName User Name of the user modifying todo. (body params) (required)
     * @apiParam {string} listMode Mode of the Todo. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "List details Updated",
            "status": 200,
            "data": null
        }    
    */

    app.post(`${baseUrl}/:listId/delete`, auth.isAuthorized, listController.deleteListFunction);

    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/lists/:ListId/delete api to Delete List.
     *
     * @apiParam {string} ListId ListId of the List to be deleted. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Deleted the List successfully",
            "status": 200,
            "data": null
        }
    */


    app.get(`${baseUrl}/view/all/lists/:userId`, auth.isAuthorized, listController.getAllListsFunction);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {get} /api/v1/lists/view/all/lists/:userId api for Getting all Lists of User.
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Lists Found and Listed",
            "status": 200,
            "data": [
                {
                    "_id": "5bb87ee3625e5006d41f786d",
                    "listModifiedOn": "2018-10-06T09:26:55.000Z",
                    "listCreatedOn": "2018-10-06T09:22:43.000Z",
                    "listMode": "private",
                    "listModifierName": "Ankit Singh",
                    "listModifierId": "SkBEHfS97",
                    "listCreatorName": "Ankit Singh",
                    "listCreatorId": "SkBEHfS97",
                    "listName": "Updated Demo list",
                    "listId": "SknkJ-UcX",
                    "__v": 0
                }
            ]
        }
    */


    app.post(`${baseUrl}/view/all/shared/lists`, auth.isAuthorized, listController.getAllPublicListsFunction);
   /**
    * @apiGroup lists
    * @apiVersion  1.0.0
    * @api {get} /api/v1/lists/view/all/lists/:userId api for Getting all Lists of User.
    *
    * @apiParam {string} userIds userId of the users. (Body params) (required)
    * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Lists Found and Listed",
            "status": 200,
            "data": [
                {
                    "_id": "5bb87ee3625e5006d41f786d",
                    "listModifiedOn": "2018-10-06T09:26:55.000Z",
                    "listCreatedOn": "2018-10-06T09:22:43.000Z",
                    "listMode": "public",
                    "listModifierName": "Ankit Singh",
                    "listModifierId": "SkBEHfS97",
                    "listCreatorName": "Ankit Singh",
                    "listCreatorId": "SkBEHfS97",
                    "listName": "Updated Demo list",
                    "listId": "SknkJ-UcX",
                    "__v": 0
                }
            ]
        }
   */

    // params: ListId.
    app.get(`${baseUrl}/:listId/details`, auth.isAuthorized, listController.getListDetailsFunction);
    /**
     * @apiGroup lists 
     * @apiVersion  1.0.0
     * @api {get} /api/v1/lists/:listId/details api for getting List details.
     *
     * @apiParam {string} listId listId of the List. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "List Found",
            "status": 200,
            "data": {
                "_id": "5bb87ee3625e5006d41f786d",
                "listModifiedOn": "2018-10-06T09:26:55.000Z",
                "listCreatedOn": "2018-10-06T09:22:43.000Z",
                "listMode": "private",
                "listModifierName": "Ankit Singh",
                "listModifierId": "SkBEHfS97",
                "listCreatorName": "Ankit Singh",
                "listCreatorId": "SkBEHfS97",
                "listName": "Updated Demo list",
                "listId": "SknkJ-UcX",
                "__v": 0
            }
        }
    */

}
