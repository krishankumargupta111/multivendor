


// MUI Icons
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CreditCardIcon from '@mui/icons-material/CreditCard';

function Footer() {
  return (
    <footer className="bg-teal-50 text-slate-700 border-t border-teal-200 pt-10 pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-teal-200/80 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <LocalShippingOutlinedIcon className="text-teal-600" />
            <div>
              <p className="font-semibold text-teal-950 text-xs sm:text-sm">Global Shipping</p>
              <p className="text-xs text-slate-500">From verified sellers</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <VerifiedUserOutlinedIcon className="text-teal-600" />
            <div>
              <p className="font-semibold text-teal-950 text-xs sm:text-sm">Buyer Protection</p>
              <p className="text-xs text-slate-500">Money-back guarantee</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <StorefrontIcon className="text-teal-600" />
            <div>
              <p className="font-semibold text-teal-950 text-xs sm:text-sm">Vetted Merchants</p>
              <p className="text-xs text-slate-500">100% genuine shops</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <SupportAgentOutlinedIcon className="text-teal-600" />
            <div>
              <p className="font-semibold text-teal-950 text-xs sm:text-sm">Dispute Support</p>
              <p className="text-xs text-slate-500">24/7 bazaar help</p>
            </div>
          </div>
        </div>

        {/* Main Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-teal-200/80">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-md bg-teal-600 flex items-center justify-center font-bold text-white text-base">
                B
              </div>
              <span className="text-lg font-bold text-teal-950 tracking-tight">
                Bazaar
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your trusted multi-vendor marketplace connecting independent sellers and global buyers.
            </p>
          </div>

          {/* Shoppers Column */}
          <div>
            <h4 className="font-semibold text-teal-950 text-xs uppercase tracking-wider mb-3">Shop</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#" className="hover:text-teal-700 transition-colors">All Categories</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Daily Deals</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Top Sellers</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Featured Brands</a></li>
            </ul>
          </div>

          {/* Sellers Column */}
          <div>
            <h4 className="font-semibold text-teal-950 text-xs uppercase tracking-wider mb-3">Sellers</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#" className="hover:text-teal-700 transition-colors">Vendor Portal</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Open a Store</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Seller Policies</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Commission Rates</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-teal-950 text-xs uppercase tracking-wider mb-3">Support</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#" className="hover:text-teal-700 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Track Orders</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-teal-700 transition-colors">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Payments, & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <p>© {new Date().getFullYear()} Bazaar. All rights reserved.</p>

          {/* Static Payment Icons */}
          <div className="flex items-center space-x-2 text-slate-600">
            <span className="text-[11px] text-slate-500">Accepted Payments:</span>
            <CreditCardIcon fontSize="small" className="text-teal-700" />
            <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-semibold border border-teal-200">VISA</span>
            <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-semibold border border-teal-200">MC</span>
            <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-semibold border border-teal-200">PayPal</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3 text-teal-700">
            <a href="#" className="hover:text-teal-950 transition-colors"><TwitterIcon fontSize="small" /></a>
            <a href="#" className="hover:text-teal-950 transition-colors"><FacebookIcon fontSize="small" /></a>
            <a href="#" className="hover:text-teal-950 transition-colors"><InstagramIcon fontSize="small" /></a>
            <a href="#" className="hover:text-teal-950 transition-colors"><LinkedInIcon fontSize="small" /></a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;