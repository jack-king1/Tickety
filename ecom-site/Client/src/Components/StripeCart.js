import getStripe from "../Lib/getStripe";

export default function StripeCart(props) {
  let email = "";
  const CreateLineItemArray = async () => {
    const stripe = await getStripe();
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
    const stripe = await getStripe();
    let lineItems = await CreateLineItemArray();

    const { error } = await stripe.redirectToCheckout({
      lineItems,
      mode: "payment",
      successUrl: `http://localhost:3000/order/success`,
      // other options...,
      cancelUrl: `http://localhost:3000/error`,
    });
    console.log(props);
    console.warn(error.message);
  }

  return (
    <button
      className={
        "btn btn-success " + (props.props.length > 0 ? "" : "disabled")
      }
      onClick={() => handleCheckout()}
    >
      Checkout
    </button>
  );
}
