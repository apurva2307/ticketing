import mongoose from "mongoose";

interface PaymentAttrs {
  orderId: string;
  paymentId: string;
}
// An interface that describes the properties that a user model has
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}
// An interface that describes that properties that a User document has
interface PaymentDoc extends mongoose.Document {
  orderId: string;
  paymentId: string;
}
const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);
PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  PaymentSchema
);

export { Payment };
