<template>
  <div
    class="mt-6 bg-gradient-to-b from-slate-100 to-gray-50 border border-slate-200 bg-opacity-75 p-4 rounded"
  >
    <div class="faux-form">
      <span class="form-section-header block mb-4 text-xl">Card Details</span>
    </div>
    <div>
      <div id="payment-element"></div>
    </div>
    <div class="mt-4">
      <button
        @click="submitElements"
        class="block w-full"
        :class="[{ loading: submittingOrder }]"
      >
        Complete Order -
        {{
          (total / 100).toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
          })
        }}
      </button>
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import useStripe from "stripe";
  const props = defineProps({
    total: {
      type: Number,
      required: true,
    },
    billing_details: {
      type: Object,
      required: false,
    },
    customer: {
      type: Object,
      required: false,
    },
    handlePayment: {
      type: Function,
      required: true,
    },
    submittingOrder: {
      type: Boolean,
      required: true,
    },
  });
  const submitElements = ref();
  const error = ref("");
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
          cssSrc: "https://fonts.googleapis.com/css2?family=Questrial:400",
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

    paymentElement.on("change", (event: any) => {
      console.log(event);

      if (event.complete) {
        console.log("complete");
      }
    });

    submitElements.value = async () => {
      console.log("click", props.billing_details);

      if (!props.billing_details) {
        error.value = "Please complete the cardholder details above";
        return;
      }
      const result = await elements.submit();
      console.log(result); // handle Errors
      const { paymentMethod } = await stripe.createPaymentMethod({
        elements,
        params: {
          billing_details: {
            name: props.billing_details.name, //TODO pass billing information captured in the payment form
            email: props.customer?.email,
            phone: props.customer?.phone_number,
            address: {
              city: props.billing_details.town_city,
              country: "UK",
              postal_code: props.billing_details.postal_zip_code,
              line1: props.billing_details.street,
              line2: null,
              state: props.billing_details.county_state,
            },
          },
        },
      });
      console.log(paymentMethod); // Pass payment method to CommerceJS
      props.handlePayment(paymentMethod.id);
    };
  });
</script>

<style lang="scss" scoped></style>
