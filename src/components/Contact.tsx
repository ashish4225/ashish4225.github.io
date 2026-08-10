import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/supabaseClient';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      if (!supabase) throw new Error('Contact form is not configured yet.');
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const fieldClass = (name: string) =>
    `w-full glass rounded-2xl px-4 py-3 text-ink-800 placeholder:text-ink-400 outline-none transition-all duration-300 focus:border-white/70 focus:bg-white/35 ${
      errors[name] ? 'border-red-400/60' : 'border-white/40'
    }`;

  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-4xl p-8 md:p-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-ink-400 mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-3 tracking-tight">
            Let's Build Something
          </h2>
          <p className="text-ink-500 mb-8">
            Have a project, collaboration, or idea? I'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={fieldClass('name')}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={fieldClass('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={fieldClass('subject')}
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${fieldClass('message')} resize-none`}
              />
              {errors.message && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="glass-strong hover-lift rounded-full px-7 py-3.5 flex items-center gap-2 font-semibold text-ink-900 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' && (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle size={18} className="text-emerald-600" /> Sent!
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle size={18} className="text-red-500" /> Failed — try again
                </>
              )}
              {status === 'idle' && (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>

          {status === 'success' && (
            <p className="text-sm text-emerald-700 mt-4">
              Thanks for reaching out! I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-600 mt-4">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
