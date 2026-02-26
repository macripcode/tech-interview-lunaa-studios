"use client";

import { useState, useEffect, useCallback } from "react";

const EMPTY_FORM = { name: "", email: "", company: "" };

export function useUserForm(isOpen: boolean) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setErrors(EMPTY_FORM);
    }
  }, [isOpen]);

  const validate = useCallback(() => {
    const next = { name: "", email: "", company: "" };
    if (!form.name.trim()) next.name = "El nombre es obligatorio.";
    if (!form.email.trim()) {
      next.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "El email no tiene un formato válido.";
    }
    if (!form.company.trim()) next.company = "La empresa es obligatoria.";
    setErrors(next);
    return !next.name && !next.email && !next.company;
  }, [form]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  return { form, errors, validate, handleChange };
}
