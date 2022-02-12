import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@apurva2307/error-handler";
export { OrderStatus };

interface OrderAttrs {
  id: string;
  version: number;
  userId: string;
  status: OrderStatus;
  price: number;
}
// An interface that describes the properties that a order model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}
// An interface that describes that properties that a order document has
interface OrderDoc extends mongoose.Document {
  userId: string;
  version: number;
  status: OrderStatus;
  price: number;
}
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Cancelled,
        OrderStatus.Completed,
      ],
    },
    price: {
      type: Number,
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
      },
    },
  }
);
OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin);
OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
