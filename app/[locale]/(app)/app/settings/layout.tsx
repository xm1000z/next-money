import { SecondaryMenu } from "@/components/secondary-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[800px]">
      <SecondaryMenu
        items={[
          { path: "/app/settings", label: "General" },
          { path: "/app/settings/subscription", label: "Suscripción" },
          { path: "/app/settings/notifications", label: "Notificaciones" },
        ]}
      />

      <main className="mt-8">{children}</main>
    </div>
  );
}