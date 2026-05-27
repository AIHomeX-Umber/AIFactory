import PublishForm from "@/components/publish-form";

export default function NewOfferPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-1">发布供给</h1>
        <p className="text-sm text-[#6b7280]">展示你的产品、资源或服务能力</p>
      </div>
      <PublishForm type="offer" />
    </div>
  );
}
