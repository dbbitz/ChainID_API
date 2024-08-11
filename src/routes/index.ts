// src/routes/documentRoutes.ts

import express, { Request, Response } from "express";
import { Service } from "../services";
import { validateBody } from "../middleware/validate";
import {
  getDocumentsSchema,
  registerDocumentSchema,
  verifyDocumentSchema,
} from "./schema";
import { web3 } from "../config/blockchain";

const router = express.Router();
const service = new Service();

router.get(
  "/documents",
  async (req: Request, res: Response) => {
    
    const { addressSender } = req.query

    if(typeof addressSender !== 'string'){
      return res.status(400).send('param needs to be a string')
    }

    try {
      const documents = await service.getDocuments({ addressSender });
      res
        .status(200)
        .send(
          JSON.stringify(documents, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

router.post(
  "/documents",
  validateBody(registerDocumentSchema),
  async (req: Request, res: Response) => {
    const { addressSender, documentType, document } = req.body;
    if (!addressSender || !documentType || !document) {
      return res.status(400).send("Title and content are required");
    }
    try {

      const newDocument = await service.registerDocument({
        addressSender,
        docMetadata: JSON.stringify(document),
        docType: documentType,
      });
      res.status(201).json({
        message: "document registered on the blockchain!",
        document: newDocument,
      });
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

router.post(
  "/documents/verify",
  validateBody(verifyDocumentSchema),
  async (req: Request, res: Response) => {
    const { addressSender, documentHash } = req.body;

    try {
      const verifyResponse = await service.verifyDocument({
        documentHash,
        addressSender,
      });
      res.status(201).json(verifyResponse);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

export default router;
