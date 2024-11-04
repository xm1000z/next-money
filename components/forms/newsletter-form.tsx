"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import va from "@vercel/analytics";
import { TiltedSendIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useReward } from "react-rewards";
import { z } from "zod";

const formId = "5108903";

export const newsletterFormSchema = z.object({
  email: z.string().email({ message: "email invalid" }).nonempty(),
  formId: z.string().nonempty(),
});
export type NewsletterForm = z.infer<typeof newsletterFormSchema>;

export default function Newsletter() {
  const t = useTranslations("NewsLetter");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterForm>({
    defaultValues: { formId },
    resolver: zodResolver(newsletterFormSchema),
  });

  return (
    <form
      className="relative w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" {...register("formId")} />
      <div className="relative flex items-center">
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
          size="sm"
          variant="ghost"
          disabled={isSubmitting}
          className="absolute right-0 px-3"
        >
          {t("form.button")}
        </Button>
      </div>
      {errors.email && (
        <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
