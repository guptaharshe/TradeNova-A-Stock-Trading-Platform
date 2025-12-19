import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useTheme } from "../context/ThemeContext";

// Professional SVG Icons
const Icons = {
    user: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    mail: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    lock: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    bell: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    palette: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    shield: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    keyboard: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
    trash: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    check: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    x: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
};

// Toggle Switch Component
const ToggleSwitch = ({ checked, onChange }) => (
    <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors ${checked ? "bg-cyan-600" : "bg-gray-600"
            }`}
    >
        <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : ""
                }`}
        />
    </button>
);

const Settings = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const { theme, setDarkTheme, setLightTheme } = useTheme();

    // Editable profile state
    const [editingField, setEditingField] = useState(null);
    const [editValues, setEditValues] = useState({
        name: user?.name || "John Doe",
        email: user?.email || "john@example.com",
    });
    const [tempValue, setTempValue] = useState("");

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: false,
        marketAlerts: true,
        weeklyReport: true,
        priceAlerts: true,
        orderUpdates: true,
    });

    const handleToggle = (key) => {
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
        toast.success("Preferences updated");
    };

    const startEditing = (field) => {
        setEditingField(field);
        setTempValue(editValues[field]);
    };

    const saveEdit = () => {
        if (tempValue.trim()) {
            setEditValues((prev) => ({ ...prev, [editingField]: tempValue }));
            toast.success(`${editingField === 'name' ? 'Name' : 'Email'} updated successfully`);
        }
        setEditingField(null);
    };

    const cancelEdit = () => {
        setEditingField(null);
        setTempValue("");
    };

    const premiumCard = "relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300";

    return (
        <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[900px] mx-auto">
            {/* Header */}
            <h1
                className="text-4xl md:text-5xl font-black tracking-tight mb-8"
                style={{
                    background: 'linear-gradient(135deg, #22d3ee 0%, #67e8f9 50%, #a5f3fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                Settings
            </h1>

            <div className="space-y-6">

                {/* Profile Section */}
                <div className={premiumCard}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                            {Icons.user}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Profile</h3>
                            <p className="text-sm text-gray-500">Manage your account details</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Avatar */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                                {editValues.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-white">{editValues.name}</p>
                                <p className="text-sm text-gray-500">{editValues.email}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                Active
                            </span>
                        </div>

                        {/* Display Name */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="text-gray-400">{Icons.user}</div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-1">Display Name</p>
                                    {editingField === 'name' ? (
                                        <input
                                            type="text"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            className="w-full bg-[#0A0F1C] border border-cyan-500/50 rounded-lg px-3 py-1.5 text-white focus:outline-none"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="font-medium text-white">{editValues.name}</p>
                                    )}
                                </div>
                            </div>
                            {editingField === 'name' ? (
                                <div className="flex gap-2">
                                    <button onClick={saveEdit} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition">
                                        {Icons.check}
                                    </button>
                                    <button onClick={cancelEdit} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                                        {Icons.x}
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => startEditing('name')} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                                    Edit
                                </button>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="text-gray-400">{Icons.mail}</div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                                    {editingField === 'email' ? (
                                        <input
                                            type="email"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            className="w-full bg-[#0A0F1C] border border-cyan-500/50 rounded-lg px-3 py-1.5 text-white focus:outline-none"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="font-medium text-white">{editValues.email}</p>
                                    )}
                                </div>
                            </div>
                            {editingField === 'email' ? (
                                <div className="flex gap-2">
                                    <button onClick={saveEdit} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition">
                                        {Icons.check}
                                    </button>
                                    <button onClick={cancelEdit} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                                        {Icons.x}
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => startEditing('email')} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                                    Change
                                </button>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="text-gray-400">{Icons.lock}</div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Password</p>
                                    <p className="font-medium text-white">••••••••••••</p>
                                </div>
                            </div>
                            <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                                Update
                            </button>
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className={premiumCard}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                            {Icons.palette}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Appearance</h3>
                            <p className="text-sm text-gray-500">Customize your experience</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                            <p className="font-medium text-white">Theme</p>
                            <p className="text-sm text-gray-500">Choose your preferred theme</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={setLightTheme}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${theme === "light"
                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                ☀️ Light
                            </button>
                            <button
                                onClick={setDarkTheme}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${theme === "dark"
                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                🌙 Dark
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className={premiumCard}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                            {Icons.bell}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Notifications</h3>
                            <p className="text-sm text-gray-500">Configure alert preferences</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                            { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications" },
                            { key: "marketAlerts", label: "Market Alerts", desc: "Price movement alerts" },
                            { key: "priceAlerts", label: "Price Alerts", desc: "Notify when stock hits target price" },
                            { key: "orderUpdates", label: "Order Updates", desc: "Order execution notifications" },
                            { key: "weeklyReport", label: "Weekly Report", desc: "Portfolio summary every week" },
                        ].map(({ key, label, desc }) => (
                            <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div>
                                    <p className="font-medium text-white">{label}</p>
                                    <p className="text-sm text-gray-500">{desc}</p>
                                </div>
                                <ToggleSwitch
                                    checked={preferences[key]}
                                    onChange={() => handleToggle(key)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security */}
                <div className={premiumCard}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            {Icons.shield}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Security</h3>
                            <p className="text-sm text-gray-500">Protect your account</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div>
                                <p className="font-medium text-white">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500">Add an extra layer of security</p>
                            </div>
                            <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition">
                                Enable
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div>
                                <p className="font-medium text-white">Login History</p>
                                <p className="text-sm text-gray-500">View recent account activity</p>
                            </div>
                            <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                                View
                            </button>
                        </div>
                    </div>
                </div>

                {/* Keyboard Shortcuts */}
                <div className={premiumCard}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                            {Icons.keyboard}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Keyboard Shortcuts</h3>
                            <p className="text-sm text-gray-500">Quick navigation tips</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { action: "Open Search", keys: "Ctrl + K" },
                            { action: "Close Modal", keys: "Esc" },
                            { action: "Quick Buy", keys: "B" },
                            { action: "Quick Sell", keys: "S" },
                        ].map(({ action, keys }) => (
                            <div key={action} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                <span className="text-gray-400 text-sm">{action}</span>
                                <kbd className="px-2 py-1 bg-[#0A0F1C] rounded-lg text-gray-300 text-xs font-mono">{keys}</kbd>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className={`${premiumCard} border-red-500/20`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
                            {Icons.trash}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
                            <p className="text-sm text-gray-500">Irreversible actions</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <div>
                            <p className="font-medium text-white">Delete Account</p>
                            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                        </div>
                        <button className="px-4 py-2 rounded-xl text-sm font-semibold border border-red-500/50 text-red-400 hover:bg-red-500/10 transition">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
