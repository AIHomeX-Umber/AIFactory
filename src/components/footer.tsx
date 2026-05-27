export default function Footer() {
  return (
    <footer className="border-t border-[#1f2228] py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6b7280]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
          <span className="font-medium text-white">FactoryRouter</span>
          <span>— AI-native opportunity network</span>
        </div>
        <p className="text-xs">© 2025 FactoryRouter. All rights reserved.</p>
      </div>
    </footer>
  );
}
