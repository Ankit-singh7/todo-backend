
const express = require('express');
const router = express.Router();
const historyController = require("../controllers/historyController");
const appConfig = require("../config/appConfig")
const auth = require('../middlewares/auth')


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/history`;

    // params: key(String), value(Object)
    
    app.post(`${baseUrl}/addHistory`, auth.isAuthorized, historyController.addHistoryFunction);
    /**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/addHistory api to Add history.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the list. (body params) (required)
     * @apiParam {string} itemId Id of the Item. (body params) (required)
     * @apiParam {string} subItemId Id of the Sub Item. (body params) (Optional)
     * @apiParam {string} key Action of the history. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "History Added",
            "status": 200,
            "data": [
                {
                    "_id": "5bc88c95ecfe471824759870",
                    "createdOn": "2018-10-18T13:37:25.000Z",
                    "itemValues": null,
                    "key": "Item Add",
                    "subItemId": "undefined",
                    "itemId": "S1RqhZ8jQ",
                    "listId": "SkHeBWUo7",
                    "historyId": "B1xCqnWIiX",
                    "__v": 0
                }
            ]
        }
    */



    app.post(`${baseUrl}/deleteHistory`, auth.isAuthorized, historyController.deleteHistoryFunction);

    /**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/deleteHistory api to Delete history(Latest Object will be deleted).
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the List. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "History Deleted",
            "status": 200,
            "data": [
                {
                    "_id": "5bc88c95ecfe471824759870",
                    "createdOn": "2018-10-18T13:37:25.000Z",
                    "itemValues": null,
                    "key": "Item Add",
                    "subItemId": "undefined",
                    "itemId": "S1RqhZ8jQ",
                    "listId": "SkHeBWUo7",
                    "historyId": "B1xCqnWIiX",
                    "__v": 0
                }
            ]
        }
    */

    app.post(`${baseUrl}/getHistory`, auth.isAuthorized, historyController.getHistoryFunction);



}

