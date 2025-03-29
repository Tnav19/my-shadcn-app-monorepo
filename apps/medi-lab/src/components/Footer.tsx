export function Footer() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full">
      <div className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} MediLab. All rights reserved.
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-sm text-muted-foreground hover:text-primary">
          Privacy Policy
        </a>
        <a href="#" className="text-sm text-muted-foreground hover:text-primary">
          Terms of Service
        </a>
        <a href="#" className="text-sm text-muted-foreground hover:text-primary">
          Contact
        </a>
      </div>
    </div>
  );
} 