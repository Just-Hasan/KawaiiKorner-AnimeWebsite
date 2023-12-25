import "../../Styles/SpinningRing.css";

export default function SpinningRing({ message }) {
  return (
    <div
      className={`w-full h-[300px] bg-tailwindColorGray rounded-xl spinning-ring grid place-content-center`}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
