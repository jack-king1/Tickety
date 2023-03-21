import getStripe from "../Lib/getStripe";

export default function StripeCart(props) {
  let email = "";
  const CreateLineItemArray = async () => {
    let lineItems = [];
    for (let i = 0; i < props.props.length; i++) {
      //create new line item.
      lineItems.push({
        price: props.props[i].data.stripeID,
        quantity: props.props[i].cart.quantity,
      });
    }
    email = localStorage.getItem("email");
    console.log("Line Items", lineItems);
    return lineItems;
  };

  async function handleCheckout() {
    let lineItems = await CreateLineItemArray();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems,
      mode: "payment",
      successUrl: `http://localhost:3000/products`,
      cancelUrl: `http://localhost:3000/cart`,
    });
    console.log(props);
    console.warn(error.message);
  }

  return <button onClick={() => handleCheckout()}>Checkout</button>;
}
