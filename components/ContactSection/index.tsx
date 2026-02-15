"use client";

import Link from "next/link";
import { FaEnvelope, FaPaperPlane, FaPhone } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import donutImage from "@/public/assets/donuts.png";
export default function ContactSection({ dictionary }: { dictionary?: any }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const t = {
    namePlaceholder: dictionary?.HomePage?.contactNamePlaceholder ?? "Name",
    emailPlaceholder: dictionary?.HomePage?.contactEmailPlaceholder ?? "Email",
    messagePlaceholder:
      dictionary?.HomePage?.contactMessagePlaceholder ?? "Message",
    send: dictionary?.HomePage?.contactSend ?? "Send message",
    sending: dictionary?.HomePage?.contactSending ?? "Sending…",
    success:
      dictionary?.HomePage?.contactSuccess ??
      "Thanks! Your message has been sent.",
    errorGeneric:
      dictionary?.HomePage?.contactErrorGeneric ??
      "Something went wrong. Please try again.",
    errorMissing:
      dictionary?.HomePage?.contactErrorMissingFields ??
      "Please fill in all fields.",
    errorInvalidEmail:
      dictionary?.HomePage?.contactErrorInvalidEmail ??
      "Please provide a valid email address.",
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setStatusMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim(); // honeypot

    if (!name || !email || !message) {
      setStatus("error");
      setStatusMessage(t.errorMissing);
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("error");
      setStatusMessage(t.errorInvalidEmail);
      return;
    }

    const response = await sendEmail(name, email, message, website);
    if (response.success) {
      setStatus("success");
      setStatusMessage(t.success);
      form.reset();
    } else {
      setStatus("error");
      setStatusMessage(response.message || t.errorGeneric);
    }
  };

  const sendEmail = async (
    name: string,
    email: string,
    message: string,
    website: string
  ) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.success) return { success: true, message: "" };
      return {
        success: false,
        message: data?.message || t.errorGeneric,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: t.errorGeneric };
    }
  };
  return (
    <div className="font-dosis rounded-t-3xl mx-4 lg:mx-12 px-4 bg-black/75 pt-4 lg:pt-12 pb-36 lg:pb-12 text-xl flex flex-col items-center justify-center z-[600] relative">
      <div className="max-w-[768px] font-cocosharp bg-slate-800 w-full rounded-xl p-4 lg:p-6">
        <h2 className="text-2xl font-bold text-white">
          {dictionary?.HomePage?.contact}
        </h2>
        <p className="text-sm text-white">
          {dictionary?.HomePage?.contactDescription}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-stretch">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white" htmlFor="contact-name">
                  {t.namePlaceholder}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder={t.namePlaceholder}
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-base text-black outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-white" htmlFor="contact-email">
                  {t.emailPlaceholder}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-base text-black outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>

            <div className="flex h-full flex-col gap-2">
              <label className="text-sm text-white" htmlFor="contact-message">
                {t.messagePlaceholder}
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={t.messagePlaceholder}
                required
                rows={6}
                className="w-full flex-1 resize-y rounded-lg border border-black/15 bg-white px-3 py-2 text-base text-black outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10 md:min-h-[8.5rem]"
              />
            </div>
          </div>

          {/* Honeypot (bots tend to fill this). */}
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-base font-medium text-white disabled:opacity-60 md:w-max"
          >
            <FaPaperPlane className="h-5 w-5" />
            <span>{status === "sending" ? t.sending : t.send}</span>
          </button>

          {statusMessage ? (
            <p
              className={
                status === "success"
                  ? "text-sm text-green-700"
                  : "text-sm text-red-600"
              }
              role={status === "error" ? "alert" : "status"}
            >
              {statusMessage}
            </p>
          ) : null}
        </form>
      </div>
      <div className="mt-12 flex items-center justify-center rounded-b-xl">
        <Image
          src={donutImage}
          alt="Zamów stronę internetową"
          width={1024}
          height={1024}
          className="px-4 lg:px-0 max-w-[500px]"
        />
      </div>
      <div className="h-max w-max mt-12">
        <span className="font-light text-white italic">
          wesselpawel.com 2026
        </span>
        <div className="gap-4 mt-4 flex flex-row items-center w-full justify-evenly text-white">
          <Link title="Send me an email" href="mailto:wesiudev@gmail.com">
            <FaEnvelope className="opacity-50 h-8 w-8" />
          </Link>
          <Link title="Call me" href="tel:+48721417154">
            <FaPhone className="opacity-50 h-8 w-8" />
          </Link>
        </div>
      </div>
    </div>
  );
}
