import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
const Footer = () => {
  const quickLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "About Us",
    path: "/about"
  }, {
    name: "Vision & Mission",
    path: "/vision-mission"
  }, {
    name: "Leadership",
    path: "/leadership"
  }, {
    name: "Contact Us",
    path: "/contact"
  }];
  const socialIcons = [{
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }, {
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }, {
    icon: Youtube,
    href: "#",
    label: "YouTube"
  }, {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn"
  }];
  return <footer className="bg-[#7d0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-2 rounded-full">
                <GraduationCap className="h-8 w-8 text-[#7d0a0a]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">St. G. D. Convent School</h3>
                <p className="text-red-200">Excellence in Education</p>
              </div>
            </div>
            <p className="text-red-100 mb-4 max-w-md">
              Nurturing young minds with quality education, values, and character development. 
              Building tomorrow's leaders through innovative teaching and holistic development.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(social => {
              const Icon = social.icon;
              return <a key={social.label} href={social.href} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors" aria-label={social.label}>
                    <Icon className="h-5 w-5" />
                  </a>;
            })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => <li key={link.name}>
                  <Link to={link.path} className="text-red-200 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-red-200">
              <p>
                <strong className="text-white">Address:</strong><br />
                123 Education Street<br />
                Academic City, AC 12345
              </p>
              <p>
                <strong className="text-white">Phone:</strong><br />
                +1 (555) 123-4567
              </p>
              <p>
                <strong className="text-white">Email:</strong><br />
                info@stgdconvent.edu
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-red-800 mt-8 pt-8 text-center text-red-200">
          <p>© 2025 St. G. D. Convent School. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;