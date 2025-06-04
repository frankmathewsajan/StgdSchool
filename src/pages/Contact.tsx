
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Education Street", "Academic City, AC 12345", "United States"]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568", "Emergency: +1 (555) 123-4569"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@stgdconvent.edu", "admissions@stgdconvent.edu", "principal@stgdconvent.edu"]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 4:00 PM", "Saturday: 8:00 AM - 12:00 PM", "Sunday: Closed"]
    }
  ];

  const departments = [
    { name: "Admissions Office", phone: "+1 (555) 123-4567", email: "admissions@stgdconvent.edu" },
    { name: "Academic Office", phone: "+1 (555) 123-4568", email: "academic@stgdconvent.edu" },
    { name: "Student Affairs", phone: "+1 (555) 123-4569", email: "student.affairs@stgdconvent.edu" },
    { name: "Finance Department", phone: "+1 (555) 123-4570", email: "finance@stgdconvent.edu" },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Get in touch with us for admissions, inquiries, or any assistance you need
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="bg-[#7d0a0a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#7d0a0a]">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="Enter your email address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="Enter your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input placeholder="Enter message subject" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Enter your message here..." 
                    rows={5}
                    className="resize-none"
                  />
                </div>
                <Button className="w-full bg-[#7d0a0a] hover:bg-[#5d0808]">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Map and Departments */}
            <div className="space-y-8">
              {/* Google Map Placeholder */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-[#7d0a0a]">Find Us</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gray-200 h-64 rounded-b-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive Map</p>
                      <p className="text-sm">123 Education Street, Academic City</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Contacts */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-[#7d0a0a]">Department Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-b-0 pb-3 last:pb-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{dept.name}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>{dept.phone}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>{dept.email}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Additional Info */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
          <div className="flex justify-center space-x-6 mb-8">
            {[
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Youtube, href: "#", label: "YouTube" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-[#7d0a0a] p-3 rounded-full text-white hover:bg-[#5d0808] transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Quick Response Promise</h3>
              <p className="text-gray-600">
                We strive to respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call our main office number.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
