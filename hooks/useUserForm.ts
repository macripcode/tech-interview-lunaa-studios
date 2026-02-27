"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

// Order mirrors the User interface: name, username, email, address, phone, website, company
const EMPTY_FORM = {
  name: "",
  username: "",
  email: "",
  address: { street: "", suite: "", city: "", zipcode: "" },
  phone: "",
  website: "",
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
  const [isAdvanced, setIsAdvanced] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setTouched(EMPTY_TOUCHED);
      setIsAdvanced(false);
    }
  }, [isOpen]);

  const allErrors = useMemo(() => computeErrors(form), [form]);

  const errors = {
    name: touched.name ? allErrors.name : "",
    email: touched.email ? allErrors.email : "",
    company: touched.company ? allErrors.company : "",
  };

  const isFormValid = !allErrors.name && !allErrors.email && !allErrors.company;

  const validate = useCallback(() => {
    setTouched({ name: true, email: true, company: true });
    return isFormValid;
  }, [isFormValid]);

  const activateAdvanced = useCallback(() => {
    setIsAdvanced(true);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "company") {
      setForm((prev) => ({ ...prev, company: { ...prev.company, name: value } }));
      setTouched((prev) => ({ ...prev, company: true }));
    } else if (name.startsWith("address.")) {
      const key = name.slice("address.".length) as keyof typeof EMPTY_FORM.address;
      setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.startsWith("company.")) {
      const key = name.slice("company.".length) as keyof typeof EMPTY_FORM.company;
      setForm((prev) => ({ ...prev, company: { ...prev.company, [key]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name in EMPTY_TOUCHED) {
        setTouched((prev) => ({ ...prev, [name]: true }));
      }
    }
  }, []);

  return { form, errors, isFormValid, isAdvanced, validate, activateAdvanced, handleChange };
}
