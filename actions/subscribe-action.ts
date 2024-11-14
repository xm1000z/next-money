"use server";

import { getCountryCode } from "@midday/location";

export async function subscribeAction(formData: FormData, userGroup: string) {
  const email = formData.get("email") as string;
  const country = await getCountryCode();

  const res = await fetch(
    "https://app.loops.so/api/newsletter-form/cm37ai1gr04otdx731xfw69tj",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        userGroup,
        country,
      }),
    },
  );

  const json = await res.json();

  return json;
}