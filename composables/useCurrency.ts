export default function () {
  return (value: number) =>
    value
      ? (value / 100).toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        })
      : "£0.00";
}
