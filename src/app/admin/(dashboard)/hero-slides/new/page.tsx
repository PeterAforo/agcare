import HeroSlideForm from "../HeroSlideForm";

export default function NewHeroSlidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>
        Add Hero Slide
      </h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <HeroSlideForm mode="create" />
      </div>
    </div>
  );
}
