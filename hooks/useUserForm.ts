"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { type User } from "@/types/user";

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

export type UserFormValues = typeof EMPTY_FORM;

export function userToFormValues(user: User): UserFormValues {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    address: {
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
      zipcode: user.address.zipcode,
    },
    phone: user.phone,
    website: user.website,
    company: {
      name: user.company.name,
      catchPhrase: user.company.catchPhrase,
      bs: user.company.bs,
    },
  };
}

function computeErrors(form: UserFormValues) {
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

export function useUserForm(isOpen: boolean, initialValues?: UserFormValues) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(EMPTY_TOUCHED);
  const [isAdvanced, setIsAdvanced] = useState(false);

  // Use a ref so the effect always reads the latest initialValues
  // without re-running when the reference changes between renders
  const initialValuesRef = useRef(initialValues);
  initialValuesRef.current = initialValues;

  useEffect(() => {
    if (isOpen && initialValuesRef.current) {
      setForm(initialValuesRef.current);
      setIsAdvanced(true);
    } else if (!isOpen) {
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
      const key = name.slice("address.".length) as keyof UserFormValues["address"];
      setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.startsWith("company.")) {
      const key = name.slice("company.".length) as keyof UserFormValues["company"];
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
