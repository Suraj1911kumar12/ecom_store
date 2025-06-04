"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navItems: { label: string; href: string }[];
}

const MobileNav = ({ navItems }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "text-base font-medium transition-colors p-2 rounded-md",
              pathname === item.href
                ? "bg-secondary text-primary"
                : "hover:bg-secondary/50 text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t pt-4 space-y-4">
        <Link 
          href="/account/login" 
          className="flex items-center p-2 text-base font-medium text-muted-foreground hover:bg-secondary/50 rounded-md"
        >
          Sign In
        </Link>
        <Link 
          href="/account/register" 
          className="flex items-center p-2 text-base font-medium text-muted-foreground hover:bg-secondary/50 rounded-md"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;