import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

function AddressForm() {
  return (
    <form>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
          }
        }}
      />
    </form>
  );
}

export default AddressForm;
