import crypto from "crypto";

const order_id = "order_QpjlWUO74WHYvv"; 
const payment_id = "pay_NZbqf1o0TbzVpF"; 
const secret = "DunaYRO92NDsRemapvyFdmpL";

const body = `${order_id}|${payment_id}`;
const signature = crypto
  .createHmac("sha256", secret)
  .update(body)
  .digest("hex");

console.log("Simulated signature:", signature);
