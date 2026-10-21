import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, ArrowRight } from 'lucide-react';

interface WhatsAppEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanName?: string;
}

export const WhatsAppEnquiryModal: React.FC<WhatsAppEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialPlanName,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [persons, setPersons] = useState<number | ''>(1);
  const [cabins, setCabins] = useState<number | ''>(0);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Reset form state when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPersons(1);
      setCabins(0);
      setMessage(initialPlanName ? `Enquiring about: ${initialPlanName}` : '');
      setErrors({});

      // Focus first field after animation
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialPlanName]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (persons === '' || isNaN(Number(persons)) || Number(persons) < 1) {
      newErrors.persons = 'Minimum 1 person is required.';
    }

    if (cabins === '' || isNaN(Number(cabins)) || Number(cabins) < 0) {
      newErrors.cabins = 'Cabins cannot be less than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const formattedMessage = [
      'Hello Spacedesk Team! I would like to enquire about your coworking space.',
      '',
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Number of Persons: ${persons}`,
      `Required Cabins: ${cabins}`,
      `Message: ${message.trim() || 'None'}`,
      '',
      'Please contact me regarding availability and pricing.',
    ].join('\n');

    const whatsappNumber = '919232942092';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp pre-filled chat in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      open
      aria-modal="true"
      aria-labelledby="whatsapp-enquiry-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(31,32,34,0.8)] backdrop-blur-sm w-full h-full border-none font-[var(--font-sans)] m-0 max-w-none max-h-none"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-lg bg-[var(--color-white)] text-[var(--color-charcoal)] rounded-[28px] border border-[var(--color-border)] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-between">
          <div>
            <span className="section-label text-[11px] block text-[var(--color-gold)] font-semibold uppercase tracking-wider mb-0.5">
              Spacedesk Co-Working
            </span>
            <h3 id="whatsapp-enquiry-title" className="font-heading text-xl sm:text-2xl font-normal text-[var(--color-white)]">
              Coworking Space Enquiry
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-5 text-left font-[var(--font-sans)]">
          {/* Name Field */}
          <div>
            <label htmlFor="enquiry-name" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameInputRef}
              id="enquiry-name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="e.g. Rahul Sharma"
              className={`w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border text-sm text-[var(--color-charcoal)] focus:outline-none focus:ring-2 transition-all ${
                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:ring-[var(--color-primary)]/30'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="enquiry-email" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="enquiry-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="e.g. rahul@example.com"
              className={`w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border text-sm text-[var(--color-charcoal)] focus:outline-none focus:ring-2 transition-all ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:ring-[var(--color-primary)]/30'
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* Persons & Cabins 2-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Number of Persons */}
            <div>
              <label htmlFor="enquiry-persons" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                Number of Persons <span className="text-red-500">*</span>
              </label>
              <input
                id="enquiry-persons"
                type="number"
                min={1}
                required
                value={persons}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                  setPersons(val);
                  if (errors.persons) setErrors((prev) => ({ ...prev, persons: '' }));
                }}
                placeholder="1"
                className={`w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border text-sm text-[var(--color-charcoal)] focus:outline-none focus:ring-2 transition-all ${
                  errors.persons ? 'border-red-500 focus:ring-red-200' : 'border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:ring-[var(--color-primary)]/30'
                }`}
              />
              {errors.persons && <p className="text-xs text-red-500 mt-1 font-medium">{errors.persons}</p>}
            </div>

            {/* Required Cabins */}
            <div>
              <label htmlFor="enquiry-cabins" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                Required Cabins <span className="text-red-500">*</span>
              </label>
              <input
                id="enquiry-cabins"
                type="number"
                min={0}
                required
                value={cabins}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                  setCabins(val);
                  if (errors.cabins) setErrors((prev) => ({ ...prev, cabins: '' }));
                }}
                placeholder="0"
                className={`w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border text-sm text-[var(--color-charcoal)] focus:outline-none focus:ring-2 transition-all ${
                  errors.cabins ? 'border-red-500 focus:ring-red-200' : 'border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:ring-[var(--color-primary)]/30'
                }`}
              />
              {errors.cabins && <p className="text-xs text-red-500 mt-1 font-medium">{errors.cabins}</p>}
            </div>
          </div>

          {/* Your Message Field */}
          <div>
            <label htmlFor="enquiry-message" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
              Your Message
            </label>
            <textarea
              id="enquiry-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your requirements, preferred start date, or any questions..."
              className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[var(--color-border)] text-sm text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-charcoal)] focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[var(--color-charcoal)] fill-current" />
              <span>Continue to WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-[var(--color-charcoal)]" />
            </button>
            <p className="text-[11px] text-[var(--color-muted)] text-center mt-2.5">
              Opens WhatsApp chat with pre-filled details to review and send.
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default WhatsAppEnquiryModal;
