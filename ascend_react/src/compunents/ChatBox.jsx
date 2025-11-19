export default function ChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#128C7E",
        color: "white",
        fontSize: 26,
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }}
    >
      💬
    </button>
  );
}
