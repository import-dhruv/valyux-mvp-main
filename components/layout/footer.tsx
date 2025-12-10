import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20 pt-12 pb-24 lg:pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Valyux</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted platform for comparing prices and finding the best deals across all categories in India.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/electronics" className="text-muted-foreground hover:text-primary transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/clothing" className="text-muted-foreground hover:text-primary transition">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/flights" className="text-muted-foreground hover:text-primary transition">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-muted-foreground hover:text-primary transition">
                  Hotels
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 items-start text-muted-foreground hover:text-primary transition cursor-pointer">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>support@valyux.in</span>
              </div>
              <div className="flex gap-2 items-start text-muted-foreground hover:text-primary transition cursor-pointer">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+91 1234 567 890</span>
              </div>
              <div className="flex gap-2 items-start text-muted-foreground hover:text-primary transition cursor-pointer">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 Valyux. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
