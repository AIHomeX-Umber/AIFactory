import PublishForm from "@/components/publish-form";

export default function NewRequestPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-1">发布需求</h1>
        <p className="text-sm text-[#6b7280]">描述你在寻找什么，让合适的人主动找你</p>
      </div>
      <PublishForm type="request" />
    </div>
  );
}
