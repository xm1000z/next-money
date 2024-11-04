"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import va from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";

const formId = "5108903";

export const newsletterFormSchema = z.object({
  email: z.string().email({ message: "email invalid" }).nonempty(),
  formId: z.string().nonempty(),
});
export type NewsletterForm = z.infer<typeof newsletterFormSchema>;

export default function Newsletter({ subCount }: { subCount?: string }) {
  const t = useTranslations("NewsLetter");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterForm>({
    defaultValues: { formId },
    resolver: zodResolver(newsletterFormSchema),
  });

  const onSubmit = React.useCallback(
    async (data: NewsletterForm) => {
      try {
        if (isSubmitting) return;

        va.track("Newsletter:Subscribe");

        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });
        if (response.ok) {
          reset();
        }
      } catch (error) {
        console.error("Error submitting newsletter form:", error);
      }
    },
    [isSubmitting, reset]
  );

  return (
    <form
      className="relative w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" {...register("formId")} />
      <AnimatePresence mode="wait">
        {!isSubscribed ? (
          <motion.div
            className="relative flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit="initial"
          >
            <input
              type="email"
              placeholder={t("form.placeholder")}
              aria-label={t("form.aria_label")}
              required
              className="w-full border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("email")}
            />
            <Button 
              type="submit" 
              size="xs"
              variant="ghost"
              disabled={isSubmitting}
              className="absolute bg-black dark:bg-white right-0 px-3 p-1"
            >
              {t("form.button")}
            </Button>
          </motion.div>
        ) : (
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit="initial"
          >
            {t("form.confirm")} 🥳
          </motion.p>
        )}
      </AnimatePresence>
      
      <span id="newsletter-rewards" className="relative h-0 w-0" />
      {errors.email && (
        <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
