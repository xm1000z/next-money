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
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const { reward } = useReward("newsletter-rewards", "emoji", {
    position: "absolute",
    emoji: ["🤓", "😊", "🥳", "🤩", "🤪", "🤯", "🥰", "😎", "🤑", "🤗", "😇"],
    elementCount: 32,
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
          reward();
          setIsSubscribed(true);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isSubmitting, reset, reward],
  );

  React.useEffect(() => {
    if (isSubscribed) {
      setTimeout(() => setIsSubscribed(false), 60000);
    }
  }, [isSubscribed]);

  return (
    <form
      className={cn(
        "w-full relative transition-opacity",
        isSubmitting && "pointer-events-none opacity-70",
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" className="hidden" {...register("formId")} />
      
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <TiltedSendIcon className="h-4 w-4 flex-none" />
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t("title")}
          </span>
        </div>
        
        <div className="flex gap-2">
          <input
            type="email"
            placeholder={t("form.placeholder")}
            aria-label={t("form.aria_label")}
            required
            className="flex-1 min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register("email")}
          />
          <Button 
            type="submit" 
            size="sm"
            disabled={isSubmitting}
            className="px-3"
          >
            {t("form.button")}
          </Button>
        </div>
      </div>

      {errors.email && (
        <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
          {errors.email.message}
        </p>
      )}
      <span id="newsletter-rewards" className="relative h-0 w-0" />
    </form>
  );
}
