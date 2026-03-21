import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "../Redux/authSlice";

// Simple toast-style pop-up that shows a message for a few seconds.
export default function ErrorToast() {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const lastShownRef = useRef(null);
    const hideTimerRef = useRef(null);

    useEffect(() => {
        // whenever error changes we may show a toast
        if (error && error !== lastShownRef.current) {
            lastShownRef.current = error;
            setMessage(error);
            setVisible(true);

            // clear error from store when the toast actually hides
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
            }
            hideTimerRef.current = setTimeout(() => {
                setVisible(false);
                dispatch(clearError());
                hideTimerRef.current = null;
            }, 3000);
        }
    }, [error, dispatch]);

    // reset the last-shown value when toast is hidden so same message can show later
    useEffect(() => {
        if (!visible) lastShownRef.current = null;
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 right-4 max-w-xs p-4 bg-red-500 text-white rounded shadow-lg animate-fade-in">
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button
                    className="ml-2 font-bold"
                    onClick={() => setVisible(false)}
                >
                    ×
                </button>
            </div>
        </div>
    );
}
