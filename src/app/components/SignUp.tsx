import { useState, useEffect } from "react";
import { GraduationCap, Building2, CheckCircle2, Mail } from "lucide-react";

type UserType = "teacher" | "company";

interface SignUpProps {
  initialUserType?: UserType;
}

export function SignUp({ initialUserType = "teacher" }: SignUpProps) {
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [showContactSales, setShowContactSales] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    keycode: "",
  });
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Update userType when initialUserType prop changes
  useEffect(() => {
    setUserType(initialUserType);
  }, [initialUserType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${userType} registration:`, formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        organization: "",
        keycode: "",
      });
    }, 3000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact sales request:", contactData);
    setContactSubmitted(true);

    setTimeout(() => {
      setContactSubmitted(false);
      setShowContactSales(false);
      setContactData({
        name: "",
        email: "",
        organization: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  if (showContactSales) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-border p-8">
        {!contactSubmitted ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl text-foreground">Contact Sales</h2>
                <p className="text-sm text-muted-foreground">
                  We'll get you a keycode
                </p>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm mb-2 text-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={contactData.name}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm mb-2 text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-organization"
                  className="block text-sm mb-2 text-foreground"
                >
                  {userType === "teacher" ? "University" : "Company"}
                </label>
                <input
                  type="text"
                  id="contact-organization"
                  name="organization"
                  value={contactData.organization}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={
                    userType === "teacher" ? "University name" : "Company name"
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm mb-2 text-foreground"
                >
                  Message (optional)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowContactSales(false)}
                  className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg text-foreground">Request sent!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Our sales team will contact you shortly.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-border overflow-hidden transition-shadow hover:shadow-md">
      {/* User Type Toggle */}
      <div className="grid grid-cols-2 gap-0 p-2 bg-muted">
        <button
          type="button"
          onClick={() => setUserType("teacher")}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all ${
            userType === "teacher"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm">University</span>
        </button>
        <button
          type="button"
          onClick={() => setUserType("company")}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all ${
            userType === "company"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span className="text-sm">Company</span>
        </button>
      </div>

      {/* Form Content */}
      <div className="p-8">
        {!submitted ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl mb-2 text-foreground">
                {userType === "teacher"
                  ? "Create University Account"
                  : "Create Company Account"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {userType === "teacher"
                  ? "Use your university keycode to join and publish courses."
                  : "Use your company keycode to access courses and explore collaborations."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm mb-2 text-foreground"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 text-foreground"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm mb-2 text-foreground"
                >
                  {userType === "teacher" ? "University" : "Company Name"}
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder={
                    userType === "teacher" ? "University name" : "Company name"
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="keycode"
                  className="block text-sm mb-2 text-foreground"
                >
                  Keycode
                </label>
                <input
                  type="text"
                  id="keycode"
                  name="keycode"
                  value={formData.keycode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="Enter your keycode"
                />
              </div>

              {userType === "company" && (
                <p className="text-xs text-muted-foreground">
                  * Annual subscription fee applies after trial period
                </p>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md mt-6"
              >
                Create Account
              </button>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactSales(true)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Don't have a keycode? <span className="underline">Contact Sales</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg text-foreground">Account created!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check your email for verification and next steps.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}