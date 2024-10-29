import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SignInForm from '@/components/ui/sign-in-form';

interface Props {
  params: {
    locale: string;
  };
}

export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  
  return <SignInForm />;
}