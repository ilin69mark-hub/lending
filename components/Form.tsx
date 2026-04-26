// components/Form.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { User, MapPin, Phone, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";

type FormProps = {
  selectedCity?: string;
  onClose?: () => void;
};

const BAD_WORDS = ['мат1', 'мат2', 'мат3'];

const isOnlyLetters = (str: string): boolean => {
  return /^[а-яёА-Яёa-zA-Z\s-]+$/.test(str);
};

const containsBadWords = (str: string): boolean => {
  const lower = str.toLowerCase();
  return BAD_WORDS.some(word => lower.includes(word));
};

const formatPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length === 1) return '+' + digits;
  return '+' + digits.slice(0, 1) + ' (' + digits.slice(1, 4) + ') ' + digits.slice(4, 7) + '-' + digits.slice(7, 9) + '-' + digits.slice(9, 11);
};

const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11;
};

export default function Form({ selectedCity = "", onClose }: FormProps) {
  const [form, setForm] = useState({
    name: "",
    city: selectedCity,
    phone: "",
    reason: "",
    reasonOther: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [showOther, setShowOther] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      setForm((prev) => ({ ...prev, city: selectedCity }));
    }
  }, [selectedCity]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Введите имя";
    } else if (!isOnlyLetters(form.name)) {
      newErrors.name = "Имя должно содержать только буквы";
    } else if (form.name.length < 2) {
      newErrors.name = "Имя слишком короткое";
    } else if (containsBadWords(form.name)) {
      newErrors.name = "Имя содержит недопустимые слова";
    }

    if (!form.phone) {
      newErrors.phone = "Введите телефон";
    } else if (!isValidPhone(form.phone)) {
      newErrors.phone = "Введите 11 цифр номера";
    }

    if (!form.reason && !form.reasonOther.trim()) {
      newErrors.reason = "Выберите причину";
    } else if (form.reason === "other" && !form.reasonOther.trim()) {
      newErrors.reason = "Напишите свой вариант";
    } else if (form.reason === "other" && containsBadWords(form.reasonOther)) {
      newErrors.reason = "Текст содержит недопустимые слова";
    }

    if (!form.city.trim()) {
      newErrors.city = "Введите город";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    const payload = {
      name: form.name.trim(),
      city: form.city.trim(),
      phone: form.phone,
      reason: form.reason === "other" ? form.reasonOther.trim() : form.reason,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Ошибка отправк��");
      }

      setSuccess(true);
      setTimeout(() => onClose?.(), 3000);
    } catch (err) {
      setErrors({ submit: "Не удалось отправить заявку. Попробуйте ещё раз." });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow typing any characters but format display
    if (value.length <= form.phone.length) {
      // Backspace - just allow it
      setForm({ ...form, phone: value });
    } else {
      // New character - format it
      setForm({ ...form, phone: formatPhoneInput(value) });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isOnlyLetters(value)) {
      setForm({ ...form, name: value });
    } else if (value === '') {
      setForm({ ...form, name: value });
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Заявка отправлена!</h3>
        <p className="text-slate-600">Мы свяжемся с вами в ближайшее время</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          placeholder="Ваше имя"
          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all`}
          value={form.name}
          onChange={handleNameChange}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          placeholder="Город"
          className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-500' : 'border-slate-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all`}
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
      </div>

      <div>
        <input
          type="tel"
          placeholder="+7 (999) 999-99-99"
          className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-slate-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all`}
          value={form.phone}
          onChange={handlePhoneChange}
          maxLength={18}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <select
          className={`w-full px-4 py-3 rounded-xl border ${errors.reason ? 'border-red-500' : 'border-slate-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none bg-white`}
          value={form.reason}
          onChange={(e) => {
            setForm({ ...form, reason: e.target.value });
            setShowOther(e.target.value === "other");
          }}
        >
          <option value="">Почему хотите открыть бизнес?</option>
          <option value="income">Хочу увеличить доход</option>
          <option value="business">Хочу свой бизнес</option>
          <option value="invest">Ищу выгодную инвестицию</option>
          <option value="other">Свой вариант</option>
        </select>
        {showOther && (
          <input
            placeholder="Напишите свой в��риант..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 mt-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            value={form.reasonOther}
            onChange={(e) => setForm({ ...form, reasonOther: e.target.value })}
          />
        )}
        {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
      </div>

      {errors.submit && (
        <p className="text-red-600 text-sm">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Отправить заявку
          </>
        )}
      </button>
    </form>
  );
}