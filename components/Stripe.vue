<template>
  <div class="mt-6 bg-orange-300 bg-opacity-75 p-4 rounded">
    <span class="block mb-4 text-xl">Card Details</span>
    <div>
      <div id="payment-element"></div>
    </div>
    <button @click="submitElements">Pay Now</button>
  </div>
</template>

<script setup lang="ts">
  // import useStripe from "stripe";
  const props = defineProps({
    total: {
      type: Number,
      required: true,
    },
  });
  const submitElements = ref();
  onMounted(() => {
    const stripe = Stripe("pk_test_Ri2JyD3poWvt6YvpznA1nVpR0083v3iGTW");

    const appearance = {
      /* appearance */
      theme: "stripe",
      variables: {
        colorPrimary: "orange",
        colorBackground: "#ffffff",
        colorText: "#30313d",
        colorDanger: "#df1b41",
        fontFamily: "'Questrial', system-ui, sans-serif",
        spacingUnit: ".25rem",
        borderRadius: "4px",
        // See all possible variables below
      },
    };
    const options = {
      /* options */
      business: {
        name: "REZ",
      },
      fields: {
        billingDetails: "never",
      },
    };
    const elements = stripe.elements({
      mode: "payment",
      currency: "gbp",
      amount: props.total, // Needs to include shipping
      fonts: [
        {
          cssSrc: "https://fonts.googleapis.com/css2?family=Questrial:400,600",
        },
      ],
      paymentMethodCreation: "manual",
      appearance,
    });
    const paymentElement = elements.create("payment", options);
    // Delay mount to ensure that DOM element exists
    setTimeout(() => {
      paymentElement.mount("#payment-element");
    }, 1000);
    submitElements.value = async () => {
      const result = await elements.submit();
      console.log(result); // handle Errors
      const { paymentMethod } = await stripe.createPaymentMethod({
        elements,
        params: {
          billing_details: {
            name: "Jenny Rosen", //TODO pass billing information captured in the payment form
            email: "jenny@ronson.com",
            phone: "08897789827",
            address: {
              city: null,
              country: "UK",
              postal_code: "EH6 4LB",
              line1: null,
              line2: null,
              state: null,
            },
          },
        },
      });
      console.log(paymentMethod); // Pass payment method to CommerceJS
    };
  });
</script>

<style lang="scss" scoped></style>
