import Joi from "joi";

const documentSchema = Joi.object({
  issuedBy: Joi.string().min(3).max(100).required().messages({
    "string.base": '"issuedBy" deve ser um texto',
    "string.empty": '"issuedBy" não pode estar vazio',
    "string.min": '"issuedBy" deve ter pelo menos {#limit} caracteres',
    "string.max": '"issuedBy" deve ter no máximo {#limit} caracteres',
    "any.required": '"issuedBy" é um campo obrigatório',
  }),

  dateIssued: Joi.date().iso().required().messages({
    "date.base": '"dateIssued" deve ser uma data válida',
    "date.format": '"dateIssued" deve estar no formato ISO (YYYY-MM-DD)',
    "any.required": '"dateIssued" é um campo obrigatório',
  }),

  degree: Joi.string().min(3).max(100).required().messages({
    "string.base": '"degree" deve ser um texto',
    "string.empty": '"degree" não pode estar vazio',
    "string.min": '"degree" deve ter pelo menos {#limit} caracteres',
    "string.max": '"degree" deve ter no máximo {#limit} caracteres',
    "any.required": '"degree" é um campo obrigatório',
  }),

  studentName: Joi.string().min(3).max(100).required().messages({
    "string.base": '"studentName" deve ser um texto',
    "string.empty": '"studentName" não pode estar vazio',
    "string.min": '"studentName" deve ter pelo menos {#limit} caracteres',
    "string.max": '"studentName" deve ter no máximo {#limit} caracteres',
    "any.required": '"studentName" é um campo obrigatório',
  }),

  studentRA: Joi.string().regex(/^\d+$/).min(5).max(10).required().messages({
    "string.base": '"studentRA" deve ser um texto',
    "string.empty": '"studentRA" não pode estar vazio',
    "string.pattern.base": '"studentRA" deve conter apenas dígitos',
    "string.min": '"studentRA" deve ter pelo menos {#limit} caracteres',
    "string.max": '"studentRA" deve ter no máximo {#limit} caracteres',
    "any.required": '"studentRA" é um campo obrigatório',
  }),

  course: Joi.string().min(3).max(100).required().messages({
    "string.base": '"course" deve ser um texto',
    "string.empty": '"course" não pode estar vazio',
    "string.min": '"course" deve ter pelo menos {#limit} caracteres',
    "string.max": '"course" deve ter no máximo {#limit} caracteres',
    "any.required": '"course" é um campo obrigatório',
  }),

  duration: Joi.string()
    .regex(/^\d{4}-\d{4}$/)
    .required()
    .messages({
      "string.base": '"duration" deve ser um texto',
      "string.empty": '"duration" não pode estar vazio',
      "string.pattern.base": '"duration" deve estar no formato YYYY-YYYY',
      "any.required": '"duration" é um campo obrigatório',
    }),

  institutionAddress: Joi.string().min(10).max(200).required().messages({
    "string.base": '"institutionAddress" deve ser um texto',
    "string.empty": '"institutionAddress" não pode estar vazio',
    "string.min":
      '"institutionAddress" deve ter pelo menos {#limit} caracteres',
    "string.max": '"institutionAddress" deve ter no máximo {#limit} caracteres',
    "any.required": '"institutionAddress" é um campo obrigatório',
  }),
});

const addressSenderSchema = Joi.string()
  .pattern(/^0x[a-fA-F0-9]{40}$/)
  .required()
  .messages({
    "string.base": '"addressSender" deve ser um texto',
    "string.pattern.base":
      '"addressSender" deve ser um endereço Ethereum válido',
    "any.required": '"addressSender" é um campo obrigatório',
  });

export const registerDocumentSchema = Joi.object({
  addressSender: addressSenderSchema,
  document: documentSchema.required().messages({
    "any.required": '"document" é um campo obrigatório',
  }),
  documentType: Joi.string()
    .valid("Diploma", "Certificate", "Transcript")
    .required()
    .messages({
      "string.base": '"documentType" deve ser um texto',
      "any.only":
        '"documentType" deve ser um dos seguintes valores: Diploma, Certificate, Transcript',
      "any.required": '"documentType" é um campo obrigatório',
    }),
});

export const getDocumentsSchema = Joi.object({
  addressSender: addressSenderSchema,
});

export const verifyDocumentSchema = Joi.object({
  addressSender: addressSenderSchema,
  documentHash: Joi.string()
    .pattern(/^[a-fA-F0-9]{64}$/)
    .required()
    .messages({
      "string.base": '"documentHash" deve ser uma string',
      "string.pattern.base":
        '"documentHash" deve ser um hash hexadecimal válido de 64 caracteres',
      "string.empty": '"documentHash" não pode estar vazio',
      "any.required": '"documentHash" é um campo obrigatório',
    }),
});
