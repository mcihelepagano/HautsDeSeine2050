export default function MarkerPanel({ title, body, image, onClose }) {
  return (
    <aside className="marker-panel" role="region" aria-label={title}>
      <div className="marker-panel__header">
        <div>
          <p className="marker-panel__eyebrow">Hauts-de-Seine 2050</p>
          <h2 className="marker-panel__title">{title}</h2>
        </div>
        <button
          onClick={onClose}
          className="marker-panel__close"
          aria-label="Close"
        >
          x
        </button>
      </div>

      {image && (
        <div className="marker-panel__image-wrap">
          <img src={image} alt={title} />
        </div>
      )}

      <p className="marker-panel__body">{body}</p>
      <div className="marker-panel__footer">Sustainable mobility + energy</div>
    </aside>
  );
}
