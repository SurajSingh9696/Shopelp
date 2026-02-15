export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 text-sm text-muted md:px-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span>© 2026 Shopkeeper Helper. All rights reserved.</span>
        <div className="flex gap-6">
          <span>Privacy</span>
          <span>Support</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
}
