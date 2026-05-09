"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSaveSettings = () => {
    setSaveMessage("Settings updated successfully.");
    window.setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Update your admin account preferences and security settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <p className="mt-2 text-sm text-slate-500">
            Keep your admin contact details current.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Notifications
              </label>
              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => setNotificationsEnabled(true)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    notificationsEnabled
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Enabled
                </button>
                <button
                  onClick={() => setNotificationsEnabled(false)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    !notificationsEnabled
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Security</h2>
          <p className="mt-2 text-sm text-slate-500">
            Change your password and secure your admin account.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Save Settings</h2>
            <p className="mt-2 text-sm text-slate-500">
              Click save to preserve your admin preferences.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSaveSettings}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Save Settings
          </button>
        </div>
        {saveMessage ? (
          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            {saveMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}
