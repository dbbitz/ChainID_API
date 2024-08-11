import ABI from "../contract/abi";
import { web3, contractAddress } from "../config/blockchain";
import crypto from "crypto";

const contract = new web3.eth.Contract(ABI, contractAddress);

export class Service {
  async getDocuments({ addressSender }: { addressSender: string }) {
    try {
      // Tentar chamar a função com um limite de gas maior
      const documents: any = await contract.methods.getDocuments().call({
        from: addressSender,
        gas: "6000000",
      });

      console.log(documents);

      const processedDocuments = documents.map((doc: any) => {
        return {
          documentType: doc.documentType,
          documentHash: doc.documentHash,
          documentMetadata: doc.metadata,
        };
      });

      return processedDocuments;
    } catch (error: any) {
      console.error("Erro ao recuperar documentos:", error);
      return new Error(error);
    }
  }

  async registerDocument({
    addressSender,
    docType,
    docMetadata,
  }: {
    addressSender: string;
    docType: string;
    docMetadata: string;
  }) {
    const docHash = this.generateHash(docMetadata);

    try {
      const gasEstimate = await contract.methods
        .registerDocument(docHash, docType, docMetadata)
        .estimateGas({ from: addressSender });

      console.log(`Estimativa de gás: ${gasEstimate}`);

      const tx = await contract.methods
        .registerDocument(docHash, docType, docMetadata)
        .send({ from: addressSender, gas: String(gasEstimate) });

      return {
        hash: docHash,
        type: docType,
        metadata: docMetadata,
        transactionHash: tx.transactionHash,
      };
    } catch (error: any) {
      console.error("Erro ao registrar documento:", error);
      return new Error(
        error.message || "Erro desconhecido ao registrar documento."
      );
    }
  }

  async verifyDocument({addressSender,documentHash }: {documentHash: string; addressSender: string;}) {
    try {
      const isVerified = await contract.methods
        .verifyDocument(addressSender, documentHash)
        .call();
      if (isVerified) {
		return {
			message: "document successfully verified",
			valid: true
		}
      } else {
        return {
			message: "document not found or does not match the user provided.",
			valid: false
		}
      }

    } catch (error: any) {
      console.error("Erro ao verificar o documento:", error);
	  return new Error(error.message || error)
    }
  }

  private generateHash(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex");
  }
}
