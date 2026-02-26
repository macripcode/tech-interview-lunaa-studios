"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

const EMPTY_FORM = {
  name: "",
  email: "",
  company: { name: "", catchPhrase: "", bs: "" },
};

const EMPTY_TOUCHED = { name: false, email: false, company: false };

function computeErrors(form: typeof EMPTY_FORM) {
  const next = { name: "", email: "", company: "" };
  if (!form.name.trim()) next.name = "El nombre es obligatorio.";
  if (!form.email.trim()) {
    next.email = "El email es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    next.email = "El email no tiene un formato válido.";
  }
  if (!form.company.name.trim()) next.company = "La empresa es obligatoria.";
  return next;
}

export function useUserForm(isOpen: boolean) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(EMPTY_TOUCHED);

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setTouched(EMPTY_TOUCHED);
    }
  }, [isOpen]);

  const allErrors = useMemo(() => computeErrors(form), [form]);

  const errors = {
    name: touched.name ? allErrors.name : "",
    email: touched.email ? allErrors.email : "",
    company: touched.company ? allErrors.company : "",
  };

  const isFormValid = !allErrors.name && !allErrors.email && !allErrors.company;

  // Called on submit — marks all fields as touched so all errors become visible
  const validate = useCallback(() => {
    setTouched({ name: true, email: true, company: true });
    return isFormValid;
  }, [isFormValid]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "company") {
      setForm((prev) => ({ ...prev, company: { ...prev.company, name: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  return { form, errors, isFormValid, validate, handleChange };
}
