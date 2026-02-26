"use client";

import { useEffect } from "react";
import Layout from "@/components/Layout";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-800">
            Algo salió mal
          </h2>
          <p className="mt-2 text-sm text-red-600">
            {error.message || "Ocurrió un error inesperado."}
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </Layout>
  );
}
