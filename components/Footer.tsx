import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

                    {/* Column 1 */}
                    <div className="flex flex-col space-y-4">
                        <span className="text-white text-lg font-bold tracking-tighter">GENUINE OPTIMUM</span>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Where technology meets real business : results
                        </p>

                    </div>

                    {/* Column 2 - Services */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-white text-sm font-semibold uppercase tracking-wider">Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/services/web-development" className="text-sm hover:text-white transition-colors">Web Development</Link></li>
                            <li><Link href="/services/seo" className="text-sm hover:text-white transition-colors">SEO</Link></li>
                            <li><Link href="/services/custom-applications" className="text-sm hover:text-white transition-colors">Custom Applications</Link></li>
                            <li><Link href="/services/ai-data-systems" className="text-sm hover:text-white transition-colors">AI & Data Systems</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 - Resources */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-white text-sm font-semibold uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-sm hover:text-white transition-colors">Documentation</Link></li>
                            <li><Link href="/blog" className="text-sm hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-white text-sm font-semibold uppercase tracking-wider">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Genuine Optimum. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
