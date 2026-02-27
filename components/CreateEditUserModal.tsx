"use client";

import { useCallback, memo, useRef, useId } from "react";
import { type CreateUserInput } from "@/types/user";
import { useUserForm, type UserFormValues } from "@/hooks/useUserForm";
import { useToast } from "@/components/ToastProvider";
import { useModalFocus } from "@/hooks/useModalFocus";

interface CreateEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateUserInput) => void;
  initialValues?: UserFormValues;
  title?: string;
  submitLabel?: string;
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500";

function CreateEditUserModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  title = "Nuevo Usuario",
  submitLabel = "Crear Usuario",
}: CreateEditUserModalProps) {
  const uid = useId();
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useModalFocus(isOpen, onClose, firstInputRef);

  const { form, errors, isFormValid, isAdvanced, validate, activateAdvanced, handleChange } =
    useUserForm(isOpen, initialValues);
  const { showToast } = useToast();

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (!validate()) {
        showToast("Por favor, completa todos los campos correctamente.", "error");
        return;
      }
      onSubmit(form);
      onClose();
    },
    [form, validate, onSubmit, onClose, showToast]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        className="relative mx-4 w-full max-w-md rounded-xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 id={`${uid}-title`} className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="max-h-[65vh] overflow-y-auto px-6 space-y-4">

            {/* name */}
            <div>
              <label htmlFor={`${uid}-name`} className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
              <input
                ref={firstInputRef}
                id={`${uid}-name`}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Nombre completo"
                aria-describedby={errors.name ? `${uid}-name-error` : undefined}
              />
              {errors.name && <p id={`${uid}-name-error`} role="alert" className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* username — visible only in advanced mode */}
            {isAdvanced && (
              <div>
                <label htmlFor={`${uid}-username`} className="mb-1 block text-sm font-medium text-gray-700">Username</label>
                <input
                  id={`${uid}-username`}
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="nombre_usuario"
                />
              </div>
            )}

            {/* email */}
            <div>
              <label htmlFor={`${uid}-email`} className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                id={`${uid}-email`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="correo@ejemplo.com"
                aria-describedby={errors.email ? `${uid}-email-error` : undefined}
              />
              {errors.email && <p id={`${uid}-email-error`} role="alert" className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* address — visible only in advanced mode */}
            {isAdvanced && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${uid}-street`} className="mb-1 block text-sm font-medium text-gray-700">Calle</label>
                    <input
                      id={`${uid}-street`}
                      type="text"
                      name="address.street"
                      value={form.address.street}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-suite`} className="mb-1 block text-sm font-medium text-gray-700">Suite</label>
                    <input
                      id={`${uid}-suite`}
                      type="text"
                      name="address.suite"
                      value={form.address.suite}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Apt. 100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${uid}-city`} className="mb-1 block text-sm font-medium text-gray-700">Ciudad</label>
                    <input
                      id={`${uid}-city`}
                      type="text"
                      name="address.city"
                      value={form.address.city}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Ciudad"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-zipcode`} className="mb-1 block text-sm font-medium text-gray-700">Código postal</label>
                    <input
                      id={`${uid}-zipcode`}
                      type="text"
                      name="address.zipcode"
                      value={form.address.zipcode}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="00000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* phone — visible only in advanced mode */}
            {isAdvanced && (
              <div>
                <label htmlFor={`${uid}-phone`} className="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  id={`${uid}-phone`}
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+1-000-000-0000"
                />
              </div>
            )}

            {/* website — visible only in advanced mode */}
            {isAdvanced && (
              <div>
                <label htmlFor={`${uid}-website`} className="mb-1 block text-sm font-medium text-gray-700">Sitio web</label>
                <input
                  id={`${uid}-website`}
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="empresa.com"
                />
              </div>
            )}

            {/* company.name */}
            <div>
              <label htmlFor={`${uid}-company`} className="mb-1 block text-sm font-medium text-gray-700">Empresa</label>
              <input
                id={`${uid}-company`}
                type="text"
                name="company"
                value={form.company.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Nombre de la empresa"
                aria-describedby={errors.company ? `${uid}-company-error` : undefined}
              />
              {errors.company && <p id={`${uid}-company-error`} role="alert" className="mt-1 text-xs text-red-500">{errors.company}</p>}
            </div>

            {/* company.catchPhrase + company.bs — visible only in advanced mode */}
            {isAdvanced && (
              <>
                <div>
                  <label htmlFor={`${uid}-catchphrase`} className="mb-1 block text-sm font-medium text-gray-700">Slogan</label>
                  <input
                    id={`${uid}-catchphrase`}
                    type="text"
                    name="company.catchPhrase"
                    value={form.company.catchPhrase}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Innovación sin límites"
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-bs`} className="mb-1 block text-sm font-medium text-gray-700">Sector</label>
                  <input
                    id={`${uid}-bs`}
                    type="text"
                    name="company.bs"
                    value={form.company.bs}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="synergize scalable supply-chains"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancelar
            </button>
            {!isAdvanced && (
              <button
                type="button"
                disabled={!isFormValid}
                onClick={activateAdvanced}
                className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Advanced
              </button>
            )}
            <button
              type="submit"
              disabled={!isFormValid}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(CreateEditUserModal);
