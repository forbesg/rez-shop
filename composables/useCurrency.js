export default function () {
  return (value) =>
    value
      ? (value / 100).toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        })
      : "£0.00";
}
