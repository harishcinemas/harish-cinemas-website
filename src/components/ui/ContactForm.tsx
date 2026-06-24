import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, mobile: false, message: false });

  // Calculate errors reactively on each render cycle
  const getValidationErrors = () => {
    const errs = { name: "", email: "", mobile: "", message: "" };
    
    // Name validation
    const trimmedName = formData.name.trim();
    if (trimmedName.length === 0) {
      errs.name = "Legal or Professional Name is required.";
    } else if (trimmedName.length < 2) {
      errs.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 70) {
      errs.name = "Name must not exceed 70 characters.";
    } else if (!/^[a-zA-Z\s.·'-]+$/.test(trimmedName)) {
      errs.name = "Allowed characters: letters, spaces, periods, apostrophes, and hyphens.";
    }

    // Email validation
    const trimmedEmail = formData.email.trim();
    if (trimmedEmail.length === 0) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = "Please enter a valid email address (e.g. name@domain.com).";
    }

    // Mobile validation
    const trimmedMobile = formData.mobile.trim();
    if (trimmedMobile.length === 0) {
      errs.mobile = "Mobile number is required.";
    } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(trimmedMobile)) {
      errs.mobile = "Please enter a valid mobile number (e.g. +91 9876543210, minimum 10 digits).";
    }

    // Message validation
    const trimmedMessage = formData.message.trim();
    if (trimmedMessage.length === 0) {
      errs.message = "Message context is required.";
    } else if (formData.message.length < 15) {
      errs.message = `Please provide more details (minimum 15 characters, current: ${formData.message.length}).`;
    } else if (formData.message.length > 5000) {
      errs.message = `Message is too long (maximum 5000 characters, current: ${formData.message.length}).`;
    }

    return errs;
  };

  const validationErrors = getValidationErrors();
  const isFormValid = !validationErrors.name && !validationErrors.email && !validationErrors.mobile && !validationErrors.message;

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Force touch all fields on submission attempt
    setTouched({ name: true, email: true, mobile: true, message: true });

    if (!isFormValid) {
      setStatus("error");
      setErrorMessage("Please resolve the marked validation problems before transmitting. All fields are required.");
      return;
    }

    setStatus("success");
    setErrorMessage("");

    try {
      const subject = encodeURIComponent(`Inquiry from ${formData.name} - Harish Cinemas`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\n\nMessage:\n${formData.message}`);
      
      // Triggering mailto action directly
      window.location.href = `mailto:harishcinemas1977@gmail.com?subject=${subject}&body=${body}`;
      
      // Reset form states
      setFormData({ name: "", email: "", mobile: "", message: "" });
      setTouched({ name: false, email: false, mobile: false, message: false });
    } catch (err) {
      console.error("[CONTACT TRANSMISSION ERROR]", err);
      setStatus("error");
      setErrorMessage("An error occurred trying to launch your mail client. Please send email directly manually to harishcinemas1977@gmail.com.");
    }
  };

  // Helper styles to inject into fields
  const getInputStyles = (field: keyof typeof touched) => {
    const base = "w-full bg-white/5 border rounded-2xl px-4 py-3.5 text-white text-xs focus:outline-none transition-all";
    if (!touched[field]) {
      return `${base} border-white/10 focus:border-indigo-400 focus:bg-white/10`;
    }
    if (validationErrors[field]) {
      return `${base} border-rose-500/40 bg-rose-500/5 focus:border-rose-400 focus:bg-rose-950/10 focus:ring-1 focus:ring-rose-500/20`;
    }
    return `${base} border-emerald-500/30 bg-emerald-500/5 focus:border-emerald-400 focus:bg-emerald-950/10 focus:ring-1 focus:ring-emerald-500/20`;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative overflow-hidden" id="dispatch-form-element">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Name Input Row */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 font-mono">
            Legal or Professional Name
          </label>
          {touched.name && !validationErrors.name && (
            <span className="text-[9px] text-emerald-400 font-medium font-mono">✓ Verified format</span>
          )}
        </div>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          className={getInputStyles("name")} 
          placeholder="e.g. Harish Kumar"
          id="contact-form-name-input"
        />
        {touched.name && validationErrors.name && (
          <p className="mt-1.5 text-[10px] text-rose-400 leading-snug animate-fade-in font-mono">
            ⚠ {validationErrors.name}
          </p>
        )}
      </div>

      {/* Email Input Row */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 font-mono">
            Email Address
          </label>
          {touched.email && !validationErrors.email && (
            <span className="text-[9px] text-emerald-400 font-medium font-mono">✓ Verified format</span>
          )}
        </div>
        <input 
          type="email" 
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className={getInputStyles("email")} 
          placeholder="you@example.com"
          id="contact-form-email-input"
        />
        {touched.email && validationErrors.email && (
          <p className="mt-1.5 text-[10px] text-rose-400 leading-snug animate-fade-in font-mono">
            ⚠ {validationErrors.email}
          </p>
        )}
      </div>

      {/* Mobile Number Input Row */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 font-mono">
            Mobile Number
          </label>
          {touched.mobile && !validationErrors.mobile && (
            <span className="text-[9px] text-emerald-400 font-medium font-mono">✓ Verified format</span>
          )}
        </div>
        <input 
          type="tel" 
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          onBlur={() => handleBlur("mobile")}
          className={getInputStyles("mobile")} 
          placeholder="e.g. +91 9876543210"
          id="contact-form-mobile-input"
        />
        {touched.mobile && validationErrors.mobile && (
          <p className="mt-1.5 text-[10px] text-rose-400 leading-snug animate-fade-in font-mono">
            ⚠ {validationErrors.mobile}
          </p>
        )}
      </div>

      {/* Message Context Textarea Row */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 font-mono">
            Message Context
          </label>
          <span className={`text-[10px] font-mono ${
            formData.message.length < 15 
              ? "text-slate-500" 
              : formData.message.length > 5000 
                ? "text-rose-400 font-bold" 
                : "text-indigo-300"
          }`}>
            {formData.message.length}/5000
          </span>
        </div>
        <textarea 
          rows={5} 
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          className={`${getInputStyles("message")} resize-none`}
          placeholder="Specify message regarding script pitch, co-productions or media distributions..."
          id="contact-form-message-input"
        />
        {touched.message && validationErrors.message && (
          <p className="mt-1.5 text-[10px] text-rose-400 leading-snug animate-fade-in font-mono">
            ⚠ {validationErrors.message}
          </p>
        )}
      </div>

      <button 
        type="submit" 
        disabled={status === "sending"} 
        className="w-full py-4 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 text-[10px] font-extrabold uppercase tracking-widest rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
        id="submit-dispatch-btn"
      >
        {status === "idle" && "Transmit Message"}
        {status === "sending" && "Processing Transmission..."}
        {status === "success" && "Message Dispatched Successfully!"}
        {status === "error" && "Retry Transmission"}
      </button>

      {status === "success" && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-emerald-300 text-xs text-center font-medium animate-fade-in space-y-1" id="success-feedback-box">
          <div>Your email client has been summoned successfully!</div>
          <div className="text-[10px] text-emerald-400/80 font-normal italic">Please click 'Send' in your local mail client to dispatch your message to harishcinemas1977@gmail.com</div>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/25 rounded-2xl text-rose-300 text-xs text-center font-medium animate-fade-in" id="error-feedback-box">
          {errorMessage}
        </div>
      )}
    </form>
  );
}

