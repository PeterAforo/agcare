import PageEditor from "../PageEditor";

export default function NewPagePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Create Page</h1>
      <PageEditor mode="create" />
    </div>
  );
}
