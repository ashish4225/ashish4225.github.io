const BACKGROUND_IMAGE = '/assets/backgrounds/background.jpg';

export default function BackgroundLayer() {
  return (
    <>
      <div
        className="bg-layer"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      />
      <div className="bg-overlay" />
    </>
  );
}
