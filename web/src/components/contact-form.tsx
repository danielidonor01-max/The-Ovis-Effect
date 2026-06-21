"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { houses, waLink } from "@/data/site";

const interests = [...houses.map((h) => h.name), "General enquiry"];

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  interest: z.string().min(1, "Pick one"),
  message: z.string().min(5, "Tell us a little more"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: houses[0].name },
  });

  const interest = watch("interest");

  function onSubmit(values: FormValues) {
    const text =
      `Hi The Ovis Effect! I'm ${values.name} (${values.email}` +
      `${values.phone ? `, ${values.phone}` : ""}).\n` +
      `Interested in: ${values.interest}.\n\n${values.message}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-brand/10 text-brand">
          <Check className="size-6" />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-semibold">Message ready</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We&apos;ve opened WhatsApp with your details pre-filled — just hit send and
          we&apos;ll get back to you shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6 h-10 rounded-lg px-5"
          onClick={() => setSent(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Your name" autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input {...register("email")} type="email" placeholder="you@email.com" autoComplete="email" />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <Input {...register("phone")} type="tel" placeholder="+234 …" autoComplete="tel" />
        </Field>
      </div>

      <div className="mt-6">
        <Label className="text-sm">Which house?</Label>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {interests.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setValue("interest", opt, { shouldValidate: true })}
              className={cn(
                "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                interest === opt
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Field label="Message" error={errors.message?.message}>
          <Textarea {...register("message")} rows={4} placeholder="How can we help?" />
        </Field>
      </div>

      <Button type="submit" className="mt-7 h-11 w-full gap-2 rounded-lg sm:w-auto sm:px-7">
        Send via WhatsApp <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-sm">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
