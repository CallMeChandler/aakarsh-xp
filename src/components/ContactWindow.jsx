import XPExplorerWindow from "./XPExplorerWindow";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactWindow({ onClose }) {
  const [formData, setFormData] = useState({
    from_name: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_g8ov3w2", // ✅ Replace with your actual ID
        "template_sro1aas",
        {
          to_email: "Aakarsh0324@gmail.com",
          from_name: formData.from_name,
          subject: formData.subject,
          message: formData.message,
        },
        "BdEn1Y7yDMEUiKO5R" // ✅ Replace with your actual Public Key
      )
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({ from_name: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 4000);
      })
      .catch(() => {
        setStatus("Failed to send message. Try again.");
        setTimeout(() => setStatus(null), 4000);
      });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const contactForm = (
    <form
      onSubmit={sendEmail}
      className="p-4 font-[Tahoma] text-sm space-y-3 bg-[#ece9d8]"
    >
      {/* To Field (Fixed) */}
      <div className="grid grid-cols-[max-content,1fr] items-center gap-2">
        <label className="text-black">To:</label>
        <input
          type="email"
          value="Aakarsh0324@gmail.com"
          disabled
          className="border border-gray-400 bg-gray-100 text-gray-600 px-2 py-[2px] w-full text-sm"
        />
      </div>

      {/* From Field */}
      <div className="grid grid-cols-[max-content,1fr] items-center gap-2">
        <label className="text-black">Your Email:</label>
        <input
          type="email"
          name="from_name"
          required
          placeholder="you@example.com"
          value={formData.from_name}
          onChange={handleChange}
          className="border border-gray-400 px-2 py-[2px] w-full text-sm bg-white"
        />
      </div>

      {/* Subject Field */}
      <div className="grid grid-cols-[max-content,1fr] items-center gap-2">
        <label className="text-black">Subject:</label>
        <input
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="border border-gray-400 px-2 py-[2px] w-full text-sm bg-white"
        />
      </div>

      {/* Message Box */}
      <textarea
        name="message"
        required
        placeholder="Message here..."
        value={formData.message}
        onChange={handleChange}
        className="border border-gray-400 px-2 py-1 w-full h-40 resize-none text-sm bg-white"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-[#d4d0c8] border border-gray-500 px-4 py-[2px] shadow-[inset_-1px_-1px_0px_rgba(255,255,255,0.6)] hover:bg-[#c0bebe]"
      >
        Send
      </button>

      {/* Status Message */}
      {status && (
        <p className="text-xs italic text-black bg-yellow-100 px-2 py-1 border border-yellow-400 rounded">
          {status}
        </p>
      )}
    </form>
  );

  return (
    <XPExplorerWindow
      title="Contact me"
      onClose={onClose}
      customContent={contactForm}
    />
  );
}
