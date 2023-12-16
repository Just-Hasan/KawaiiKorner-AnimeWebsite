import "../Styles/LoadingAnimation.css";

export default function LoadingAnimation({ children }) {
  return (
    <div className="loading-message">
      {children}
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
