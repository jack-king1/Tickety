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
    let baseURL = window.location.href;
    console.log("Base URL:", baseURL);
    const { error } = await stripe.redirectToCheckout({
      lineItems,
      mode: "payment",
      successUrl: `https://ticketyapp-client.azurewebsites.net/order/success`,
      // other options...,
      cancelUrl: `https://ticketyapp-client.azurewebsites.net/error`,
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
