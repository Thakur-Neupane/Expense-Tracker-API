import express from "express";
import {
  deleteTransactionsForUser,
  getTransactionsByUserId,
  insertNewTrans,
} from "../models/transaction/TransactionModel.js";
const router = express.Router();

// router = {
//     get("/", (req,res)=>{}) ,
//     post(){}

// }

router.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const trans = (await getTransactionsByUserId(authorization)) ?? [];
    res.json({
      status: "success",
      message: "Here are the list of the transactions",
      trans,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { authorization } = req.headers;

    const result = await insertNewTrans({ ...req.body, userId: authorization });

    result?._id
      ? res.json({
          status: "success",
          message: "Newansaction has been added",
        })
      : res.json({
          status: "error",
          message: "Unabel to process your request, try again later",
        });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { authorization } = req.headers;

    const result = await deleteTransactionsForUser(authorization, req.body);
    console.log(result);

    result?.deletedCount
      ? res.json({
          status: "success",
          message: "The transactions have been deleted successfully!",
        })
      : res.json({
          status: "error",
          message: "Unable to delte the transaction, try again later",
        });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
