import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendReuest = async () => {
      try {
        const response = await fetch(
          "https://http-react-50688-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({
              items: cart.items,
              totalQuantity: cart.totalQuantity,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send cart data");
        }

        dispatch(
          uiActions.setNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfully",
          })
        );
      } catch (error) {
        dispatch(
          uiActions.setNotification({
            status: "error",
            title: "Failed",
            message: error.message,
          })
        );
      }
    };
    sendReuest();
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(
        "https://http-react-50688-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }

      const cartData = await response.json();

      return cartData;
    };

    try {
      const cartData = await fetchRequest();
      dispatch(
        cartActions.replaceCartItems({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Failed",
          message: error.message,
        })
      );
    }
  };
};
