"use client";

import { subscribeAction } from "@/actions/subscribe-action";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="absolute top-1 right-0">
        <Loader2 className="absolute w-4 h-4 mr-3 text-gray-600 dark:text-white animate-spin top-2.5 right-2" />
      </div>
    );
  }

  return (
    <button
      type="submit"
      className="absolute right-2 h-7 bg-black hover:bg-gray-900 dark:bg-primary dark:hover:bg-primary/90 top-2 px-4 font-medium text-sm z-10 text-white dark:text-black"
    >
      Suscribirse
    </button>
  );
}

export function SubscribeInput({ group }: { group: string }) {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
        {isSubmitted ? (
          <div className="border border-gray-200 dark:border-[#2C2C2C] font-sm text-gray-600 dark:text-primary h-11 w-[330px] flex items-center py-1 px-3 justify-between">
            <p>Subscrito</p>

            <svg
              width="17"
              height="17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Verificar</title>
              <path
                d="m14.546 4.724-8 8-3.667-3.667.94-.94 2.727 2.72 7.06-7.053.94.94Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ) : (
          <form
            action={async (formData) => {
              setSubmitted(true);
              await subscribeAction(formData, group);
              setTimeout(() => setSubmitted(false), 5000);
            }}
          >
            <fieldset className="relative">
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                aria-label="Email"
                required
                className="bg-transparent font-xs text-gray-600 dark:text-primary outline-none py-1 px-3 w-[360px] placeholder-gray-400 dark:placeholder-[#606060] h-11 border border-gray-200 dark:border-border"
              />
              <SubmitButton />
            </fieldset>
          </form>
        )}
      </div>
    </div>
  );
}