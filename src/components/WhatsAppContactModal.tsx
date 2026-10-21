import React, { useState, useEffect, useRef } from 'react';
import { X, Send, AlertCircle, MessageSquare } from 'lucide-react';

interface WhatsAppContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppContactModal: React.FC<WhatsAppContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [persons, setPersons] = useState<number | ''>(1);
  const [cabins, setCabins] = useState<number | ''>(0);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openError, setOpenError] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');

  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPersons(1);
      setCabins(0);
      setMessage('');
      setErrors({});
      setOpenError(false);
      setGeneratedUrl('');
    }
  }, [isOpen]);

  // Accessibility: Focus trap, body scroll lock, Escape key
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (persons === '' || isNaN(Number(persons)) || Number(persons) < 1) {
      newErrors.persons = 'Number of persons must be at least 1.';
    }

    if (cabins === '' || isNaN(Number(cabins)) || Number(cabins) < 0) {
      newErrors.cabins = 'Required cabins cannot be negative.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenError(false);

    if (!validate()) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const numPersons = Number(persons);
    const numCabins = Number(cabins);
    const trimmedMsg = message.trim();

    const formattedMessage = `Hello Spacedesk Team! I would like to enquire about your coworking space.\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nNumber of Persons: ${numPersons}\nRequired Cabins: ${numCabins}\nMessage: ${trimmedMsg || 'N/A'}\n\nPlease contact me regarding availability and pricing.`;

    const whatsappNumber = '919232942092';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
    setGeneratedUrl(whatsappUrl);

    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        // Popup blocked or failed to open automatically
        setOpenError(true);
      }
    } catch {
      setOpenError(true);
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(31,32,34,0.8)] backdrop-blur-sm w-full h-full font-[var(--font-sans)] m-0 modal-backdrop-animate"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-lg bg-[var(--color-white)] text-[var(--color-charcoal)] rounded-[28px] border border-[var(--color-border)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col modal-content-animate"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)] block">
                Quick Enquiry
              </span>
              <h3 id="whatsapp-modal-title" className="font-heading text-xl font-medium text-[var(--color-white)] leading-tight">
                Connect via WhatsApp
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-4">
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            Fill in your details below. Clicking <strong>Continue to WhatsApp</strong> will prepare a pre-filled message for our team at <strong>+91 92329 42092</strong>.
          </p>

          {/* Field 1: Name */}
          <div>
            <label htmlFor="wa-name" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="wa-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Field 2: Email */}
          <div>
            <label htmlFor="wa-email" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="wa-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@example.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Grid for Numbers: Persons & Cabins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 3: Number of Persons */}
            <div>
              <label htmlFor="wa-persons" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1">
                Number of Persons <span className="text-red-500">*</span>
              </label>
              <input
                id="wa-persons"
                type="number"
                min={1}
                value={persons}
                onChange={(e) => {
                  const val = e.target.value;
                  setPersons(val === '' ? '' : parseInt(val, 10));
                }}
                placeholder="e.g. 5"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.persons
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
                }`}
              />
              {errors.persons && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.persons}
                </p>
              )}
            </div>

            {/* Field 4: Required Cabins */}
            <div>
              <label htmlFor="wa-cabins" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1">
                Required Cabins <span className="text-red-500">*</span>
              </label>
              <input
                id="wa-cabins"
                type="number"
                min={0}
                value={cabins}
                onChange={(e) => {
                  const val = e.target.value;
                  setCabins(val === '' ? '' : parseInt(val, 10));
                }}
                placeholder="e.g. 2"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.cabins
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
                }`}
              />
              {errors.cabins && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.cabins}
                </p>
              )}
            </div>
          </div>

          {/* Field 5: Your Message */}
          <div>
            <label htmlFor="wa-message" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1">
              Your Message
            </label>
            <textarea
              id="wa-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your specific workspace needs, move-in date, or questions..."
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all resize-none"
            />
          </div>

          {/* Popup Error / Fallback Retry Banner */}
          {openError && generatedUrl && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
              <p className="font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                Browser blocked opening WhatsApp automatically.
              </p>
              <p>Please click the button below to launch WhatsApp manually:</p>
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-semibold text-xs hover:bg-[#20bd5a] transition-colors"
              >
                Open in WhatsApp Now
              </a>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Continue to WhatsApp
            </button>
            <p className="text-[11px] text-gray-500 text-center mt-2">
              WhatsApp will open with your pre-filled details so you can review and send directly to <strong>+91 92329 42092</strong>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppContactModal;
