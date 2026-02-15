import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  remember: Joi.boolean().optional()
});

export const itemSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  category: Joi.string().min(2).max(80).required(),
  description: Joi.string().allow("").max(280),
  imageUrl: Joi.string().uri().allow(""),
  stock: Joi.number().integer().min(0).required(),
  smallPacketsPerBox: Joi.number().integer().min(1).required(),
  sellingPricePerSmallPacket: Joi.number().min(0).default(0),
  unit: Joi.string().max(20).default("box")
});

const purchaseLineItemSchema = Joi.object({
  itemId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  totalCost: Joi.number().min(0).required()
});

export const purchaseSchema = Joi.alternatives().try(
  Joi.object({
    lineItems: Joi.array().items(purchaseLineItemSchema).min(1).required(),
    date: Joi.date().optional(),
    notes: Joi.string().allow("").max(280).optional()
  }),
  Joi.object({
    itemId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    totalCost: Joi.number().min(0).required(),
    date: Joi.date().optional(),
    notes: Joi.string().allow("").max(280).optional()
  })
);

export const categorySchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  description: Joi.string().allow("").max(160).optional()
});

export const sellingPriceSchema = Joi.object({
  itemId: Joi.string().required(),
  sellingPrice: Joi.number().min(0).required(),
  bulkPrice: Joi.number().min(0).optional()
});

export const sellingPriceUpdateSchema = Joi.object({
  itemId: Joi.string().required(),
  sellingPricePerSmallPacket: Joi.number().min(0).required(),
  notes: Joi.string().allow("").max(280).optional()
});

export function validatePayload(schema, payload) {
  const { error, value } = schema.validate(payload, { abortEarly: false, stripUnknown: true });
  if (error) {
    return { error: error.details.map((detail) => detail.message).join(", ") };
  }
  return { value };
}
