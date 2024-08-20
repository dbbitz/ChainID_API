// src/routes/documentRoutes.ts

import express, { Request, Response } from "express";
import Web3 from "web3";
import contractABI from "../contract/abi";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const web3 = new Web3("http://127.0.0.1:7545");

const contractAddress = process.env.CONTRACT_ADDRESS


const adminAddress = process.env.ADMIN_ADDRESS;

const institutionPrivateKey: any =
  process.env.INSTITUTION_PRIVATE_KEY;

const adminPrivateKey: any = process.env.ADMIN_PRIVATE_KEY

const contract = new web3.eth.Contract(contractABI, contractAddress);

router.post(
  "/issue-credential", async (req, res) => {
    const { educationAddress, studentAddress, credentialType, credentialDetails, credentialDate } = req.body;

    try {
        const credentialHash: any = web3.utils.soliditySha3(
            credentialType,
            credentialDetails,
            educationAddress,
            studentAddress,
            credentialDate
        );

        console.log(institutionPrivateKey)

        const signatureObject = web3.eth.accounts.sign(credentialHash, institutionPrivateKey);
        const signature = signatureObject.signature;

        console.log("Assinatura gerada: ", signature);
        console.log("Hash da credencial: ", credentialHash);

        const tx = contract.methods.issueCredential(
            educationAddress,
            studentAddress,
            credentialType,
            credentialDetails,
            credentialDate,
            signature
        );

        const gas = await tx.estimateGas({ from: educationAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();

        const txData = {
            from: educationAddress,
            to: contractAddress,
            data: data,
            gas,
            gasPrice
        };

        const signedTx = await web3.eth.accounts.signTransaction(txData, institutionPrivateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        res.json({ 
          transactionHash: receipt.transactionHash, 
          credentialHash, 
          signature 
      });
    } catch (error: any) {
        res.status(500).send('Erro ao emitir credencial: ' + error.message);
    }
});

router.get('/credential', async (req, res) => {
  try {

      const { studentAddress } = req.query;

      let credentials: any[] = await contract.methods.getStudentCredentials(studentAddress).call();

      credentials = credentials.map((cred :any) => {
        return {
            credentialHash: cred[0],
            credentialType: cred[1],
            credentialDetails: cred[2],
            educationalInstitutionAddress: cred[3],
            studentAddress: cred[4],
            credentialDate: cred[5].toString(),
        };
    });
      res.json(credentials);
  } catch (error: any) {
      res.status(500).send('Erro ao recuperar credenciais: ' + error.message);
  }
});

router.post('/validate-credential', async (req, res) => {
  const { credentialHash, educationAddress } = req.body;

  const signatureObject = web3.eth.accounts.sign(credentialHash, institutionPrivateKey);
  const signature = signatureObject.signature

  try {
      // Recupera o endereço que assinou o hash
      const recoveredAddress = web3.eth.accounts.recover(credentialHash, signature);

      // Verifica se o endereço recuperado corresponde ao endereço da instituição
      const isValid = recoveredAddress.toLowerCase() === educationAddress.toLowerCase();

      res.json({ isValid });
  } catch (error: any) {
      res.status(500).send('Erro ao validar credencial: ' + error.message);
  }
});

router.post('/set-admin', async (req, res) => {
  const { newAdmin } = req.body;

  try {
      const tx = contract.methods.setAdmin(newAdmin);
      const gas = await tx.estimateGas({ from: adminAddress });
      const gasPrice = await web3.eth.getGasPrice();
      const data = tx.encodeABI();

      const txData = {
          from: adminAddress,
          to: contractAddress,
          data,
          gas,
          gasPrice
      };

      const signedTx = await web3.eth.accounts.signTransaction(txData, adminPrivateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      res.json({ transactionHash: receipt.transactionHash });
  } catch (error: any) {
      res.status(500).send('Erro ao definir novo administrador: ' + error.message);
  }
});

router.post('/set-institution', async (req, res) => {
  try {
      const { institutionAddress, institutionName } = req.body;

      console.log(institutionAddress, institutionName);

      const tx = contract.methods.setInstitution(institutionAddress, institutionName);
      const gas = await tx.estimateGas({ from: adminAddress });
      const gasPrice = await web3.eth.getGasPrice();
      const data = tx.encodeABI();

      const txData = {
          from: adminAddress,
          to: contractAddress,
          data,
          gas,
          gasPrice
      };
      // Nao precise de assinar a transacao
      const receipt = await web3.eth.sendTransaction(txData);

      res.json({ transactionHash: receipt.transactionHash });

  }
  catch (error: any) {
    console.log(error);
      res.status(500).send('Erro ao definir instituição: ' + error.message);
  }
} );

router.post('/set-student', async (req, res) => {
  try {
      const { studentAddress, name, cpf } = req.body;

      const tx = contract.methods.setStudent(studentAddress, name, cpf);
      const gas = await tx.estimateGas({ from: adminAddress });
      const gasPrice = await web3.eth.getGasPrice();
      const data = tx.encodeABI();

      const txData = {
          from: adminAddress,
          to: contractAddress,
          data,
          gas,
          gasPrice
      };

      const receipt = await web3.eth.sendTransaction(txData);

      res.json({ transactionHash: receipt.transactionHash });
  } catch (error: any) {
      res.status(500).send('Erro ao definir estudante: ' + error.message);
  }
});

router.post('/set-employer', async (req, res) => {
  try {
      const { employerAddress } = req.body;

      console.log(employerAddress)

      const tx = contract.methods.setEmployer(employerAddress);
      const gas = await tx.estimateGas({ from: adminAddress });
      const gasPrice = await web3.eth.getGasPrice();
      const data = tx.encodeABI();

      const txData = {
          from: adminAddress,
          to: contractAddress,
          data,
          gas,
          gasPrice
      };

      const receipt = await web3.eth.sendTransaction(txData);

      res.json({ transactionHash: receipt.transactionHash });
  } catch (error: any) {
      res.status(500).send('Erro ao definir empregador: ' + error.message);
  }
});

router.post('/is-instiution', async (req, res) => {
  try {
      const { address } = req.body;

      const validRole = await contract.methods.isInstitution(address).call();

      res.json({ validRole });
  } catch (error: any) {
      res.status(500).send('Erro ao verificar se é instituição: ' + error.message);
  }
});

router.post('/is-student', async (req, res) => {
  try {
      const { address } = req.body;

      const validRole = await contract.methods.isStudent(address).call();

      res.json({ validRole });
  } catch (error: any) {
      res.status(500).send('Erro ao verificar se é estudante: ' + error.message);
  }
});

router.post('/is-employer', async (req, res) => {
  try {
      const { address } = req.body;

      const validRole = await contract.methods.isEmployer(address).call();

      res.json({ validRole });
  } catch (error: any) {
      res.status(500).send('Erro ao verificar se é empregador: ' + error.message);
  }
});


export default router;
