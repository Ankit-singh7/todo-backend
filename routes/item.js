
const express = require('express');
const router = express.Router();
const itemController = require("../controllers/itemController");
const appConfig = require("../config/appConfig")
const auth = require('../middlewares/auth')


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/items`;

    // params: listId,itemName,itemCreatorId,itemCreatorName,itemModifierId,itemModifierName,


 
    app.post(`${baseUrl}/additem`, auth.isAuthorized, itemController.addItemFunction);
    /**
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {post} /api/v1/items/additem api to Add item.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the List. (body params) (required)
     * @apiParam {string} itemName Name of the item. (body params) (required)
     * @apiParam {string} itemCreatorId User Id of the user creating todo. (body params) (required)
     * @apiParam {string} itemCreatorName User Name of the user creating todo. (body params) (required)
     * @apiParam {string} itemModifierId User Id of the user modifying todo. (body params) (required)
     * @apiParam {string} itemModifierName User Name of the user modifying todo. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Item Created",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "5bb8839db223e91708c6f19d",
                "subItems": [],
                "itemModifierName": "Ankit Singh",
                "itemModifierId": "SkBEHfS97",
                "itemModifiedOn": "2018-10-06T09:42:53.000Z",
                "itemCreatedOn": "2018-10-06T09:42:53.000Z",
                "itemCreatorName": "Ankit Singh",
                "itemCreatorId": "SkBEHfS97",
                "itemName": "Demo Item",
                "itemId": "r1Bim-Lqm",
                "listId": "SknkJ-UcX"
            }
        }
    */


    app.put(`${baseUrl}/:itemId/updateitem`, auth.isAuthorized, itemController.updateItemFunction);
    /**
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {put} /api/v1/items/:itemId/updateitem api to Update item Details.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} itemName Name of the item. (body params) (required)
     * @apiParam {string} itemModifierId User Id of the user modifying todo. (body params) (required)
     * @apiParam {string} itemModifierName User Name of the user modifying todo. (body params) (required)
     * @apiParam {string} itemDone yes/no to make item done/undone. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Item details Updated",
            "status": 200,
            "data": null
        }    
    */

    // params: itemId.
    app.post(`${baseUrl}/:itemId/delete`, auth.isAuthorized, itemController.deleteItemFunction);

    /**
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {post} /api/v1/items/:itemId/delete api to Delete item.
     *
     * @apiParam {string} itemId Id of the item to be deleted. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Deleted the Item successfully",
            "status": 200,
            "data": null
        }
    */


    app.get(`${baseUrl}/view/all/items/:listId`, auth.isAuthorized, itemController.getAllItemsFunction);
    /**
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {get} /api/v1/items/view/all/items/:userId api for Getting all items of User.
     *
     * @apiParam {string} listId userId of the user. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Items Found and Listed",
            "status": 200,
            "data": [
                {
                    "_id": "5bb8839db223e91708c6f19d",
                    "subItems": [],
                    "itemModifierName": "Ankit Singh",
                    "itemModifierId": "SkBEHfS97",
                    "itemModifiedOn": "2018-10-06T09:44:54.000Z",
                    "itemCreatedOn": "2018-10-06T09:42:53.000Z",
                    "itemCreatorName": "Ankit Singh",
                    "itemCreatorId": "SkBEHfS97",
                    "itemName": "Updated Demo Item",
                    "itemId": "r1Bim-Lqm",
                    "listId": "SknkJ-UcX",
                    "__v": 0
                }
            ]
        }
    */


    // params: itemId.
    app.get(`${baseUrl}/:itemId/details`, auth.isAuthorized, itemController.getItemDetailsFunction);
    /**
     * @apiGroup items 
     * @apiVersion  1.0.0
     * @api {get} /api/v1/items/:itemId/details api for getting item details.
     *
     * @apiParam {string} itemId itemId of the item. (header params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Item Found",
            "status": 200,
            "data": {
                "_id": "5bb8839db223e91708c6f19d",
                "subItems": [],
                "itemModifierName": "Ankit Singh",
                "itemModifierId": "SkBEHfS97",
                "itemModifiedOn": "2018-10-06T09:44:54.000Z",
                "itemCreatedOn": "2018-10-06T09:42:53.000Z",
                "itemCreatorName": "Ankit Singh",
                "itemCreatorId": "SkBEHfS97",
                "itemName": "Updated Demo Item",
                "itemId": "r1Bim-Lqm",
                "listId": "SknkJ-UcX",
                "__v": 0
            }
        }
    */


    /* params: ItemId
        body : subItemName,subItemModifierId,subItemModifierName,subItemCreatorId,subItemCreatorName
    */

   app.put(`${baseUrl}/:itemId/addSubItem`, auth.isAuthorized, itemController.addSubItemFunction);
   /**
    * @apiGroup items
    * @apiVersion  1.0.0
    * @api {put} /api/v1/items/:itemId/addSubItem api to Update item Details : Add Sub Item.
    *
    * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
    * @apiParam {string} itemId Id of the Item. (header params) (required)
    * @apiParam {string} subItemName Name of the Sub item. (body params) (required)
    * @apiParam {string} subItemCreatorId User Id of the user creating todo sub item. (body params) (required)
    * @apiParam {string} subItemCreatorName User Name of the user creating todo sub item. (body params) (required)
    * @apiParam {string} subItemModifierId User Id of the user modifying todo sub item. (body params) (required)
    * @apiParam {string} subItemModifierName User Name of the user modifying todo sub item. (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Item details Updated : Sub Item Added",
            "status": 200,
            "data": null
        }
   */
   
  app.put(`${baseUrl}/:itemId/updateSubItem`, auth.isAuthorized, itemController.updateSubItemFunction);
  /**
   * @apiGroup items
   * @apiVersion  1.0.0
   * @api {put} /api/v1/items/:itemId/updateSubItem api to Update item Details : Update Sub Item.
   *
   * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
   * @apiParam {string} itemId Id of the Item. (header params) (required)
   * @apiParam {string} subItemId Id of the Sub Item. (body params) (required)
   * @apiParam {string} subItemName Name of the Sub item. (body params) (required)
   * @apiParam {string} subItemModifierId User Id of the user modifying todo sub item. (body params) (required)
   * @apiParam {string} subItemDone yes/no yes while completing todo sub item and no to undone sub item. (body params) (required)
   * @apiParam {string} subItemModifierName User Name of the user modifying todo sub item. (body params) (required)
   *
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "Item details Updated : Sub Item Updated",
        "status": 200,
        "data": null
    }
  */

 app.put(`${baseUrl}/:itemId/deleteSubItem`, auth.isAuthorized, itemController.deleteSubItemFunction);
 /**
  * @apiGroup items
  * @apiVersion  1.0.0
  * @api {put} /api/v1/items/:itemId/deleteSubItem api to Update item Details : Delete Sub Item.
  *
  * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
  * @apiParam {string} itemId Id of the Item. (header params) (required)
  * @apiParam {string} subItemId Id of the Sub Item. (body params) (required)
  *
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.
  * 
  * @apiSuccessExample {object} Success-Response:
   {
       "error": false,
       "message": "Item details Updated : Sub Item Deleted",
       "status": 200,
       "data": null
   }
 */

app.post(`${baseUrl}/subItems/:itemId/details`, auth.isAuthorized, itemController.getSubItemDetailsFunction);
/**
 * @apiGroup items 
 * @apiVersion  1.0.0
 * @api {get} /api/v1/items/subItems/:itemId/details api for getting sub item details.
 *
 * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
 * @apiParam {string} itemId Id of the Item. (header params) (required)
 * @apiParam {string} subItemId Id of the Sub Item. (body params) (required)
 * 
 * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "Item Found",
        "status": 200,
        "data": {
            "_id": "5bb8839db223e91708c6f19d",
            "subItems": [],
            "itemModifierName": "Ankit Singh",
            "itemModifierId": "SkBEHfS97",
            "itemModifiedOn": "2018-10-06T09:44:54.000Z",
            "itemCreatedOn": "2018-10-06T09:42:53.000Z",
            "itemCreatorName": "Ankit Singh",
            "itemCreatorId": "SkBEHfS97",
            "itemName": "Updated Demo Item",
            "itemId": "r1Bim-Lqm",
            "listId": "SknkJ-UcX",
            "__v": 0
        }
    }
*/


}

