"use client";

import SettingsPanel from "@/components/settings/settings-panel";

export default function SettingsPage() {
    return (
        <div className="py-10">
            <h1 className="text-3xl font-semibold mb-6">Settings</h1>
            <SettingsPanel />
        </div>
    );
}