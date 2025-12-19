import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout

export default function SessionTimeout() {
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const timeoutRef = useRef(null);
    const warningRef = useRef(null);
    const warningShownRef = useRef(false);

    const resetTimer = useCallback(() => {
        // Clear existing timers
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (warningRef.current) clearTimeout(warningRef.current);
        warningShownRef.current = false;

        if (!user) return;

        // Set warning timer
        warningRef.current = setTimeout(() => {
            if (!warningShownRef.current) {
                toast.warning("You will be logged out in 5 minutes due to inactivity");
                warningShownRef.current = true;
            }
        }, SESSION_TIMEOUT - WARNING_TIME);

        // Set logout timer
        timeoutRef.current = setTimeout(() => {
            toast.info("You have been logged out due to inactivity");
            logout();
            window.location.href = "/login";
        }, SESSION_TIMEOUT);
    }, [user, logout, toast]);

    useEffect(() => {
        if (!user) return;

        // Events that reset the timer
        const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];

        const handleActivity = () => {
            resetTimer();
        };

        // Add event listeners
        events.forEach((event) => {
            document.addEventListener(event, handleActivity);
        });

        // Initial timer
        resetTimer();

        // Cleanup
        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, handleActivity);
            });
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (warningRef.current) clearTimeout(warningRef.current);
        };
    }, [user, resetTimer]);

    return null; // This is a utility component, renders nothing
}
