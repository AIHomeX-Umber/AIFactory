"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile, ContactMethods } from "@/lib/types";

const contactKeys: (keyof ContactMethods)[] = ["wechat", "whatsapp", "email", "telegram", "x"];

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState<ContactMethods>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        const p = data as unknown as Profile;
        setProfile(p);
        setName(p.name ?? "");
        setBio(p.bio ?? "");
        setContact((p.contact_methods ?? {}) as ContactMethods);
      }
    };
    init();
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.from("profiles").update({
      name,
      bio,
      contact_methods: contact,
      updated_at: new Date().toISOString(),
    }).eq("id", profile.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center text-[#4b5563]">
        加载中…
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-8">账户设置</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 space-y-5">
          <h2 className="text-sm font-medium text-[#a1a1aa]">基本信息</h2>
          <div>
            <label className="block text-sm text-[#6b7280] mb-1.5">姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="你的名字"
              className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#6b7280] mb-1.5">个人简介</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="一句话介绍你自己…"
              rows={3}
              className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 space-y-4">
          <h2 className="text-sm font-medium text-[#a1a1aa]">联系方式</h2>
          {contactKeys.map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-[#6b7280] w-24 shrink-0">{key === "x" ? "X (Twitter)" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <input
                type="text"
                value={contact[key] ?? ""}
                onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                placeholder={key === "email" ? "you@example.com" : key === "wechat" ? "微信号" : `@username`}
                className="flex-1 rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-3 py-2 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2.5 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors disabled:opacity-40"
        >
          {saved ? "已保存 ✓" : saving ? "保存中…" : "保存设置"}
        </button>
      </form>
    </div>
  );
}
