import PublishForm from "@/components/publish-form";

export default function NewWorkflowPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-1">发布工作流</h1>
        <p className="text-sm text-[#6b7280]">分享你的 AI 流程，复用他人的最佳实践</p>
      </div>
      <PublishForm type="workflow" />
    </div>
  );
}
