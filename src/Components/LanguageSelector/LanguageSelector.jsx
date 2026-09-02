import React from "react";

function LanguageSelector() {
    return (
        <select
            style={{
                background:'#000000',
                color: "#ffffff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                outline: "none"
            }}
        >
            <option value="en" style={{ background: "#222222", color: "#ffffff" }}>English</option>
            <option value="ar" style={{ background: "#222222", color: "#ffffff" }}>العربية</option>
        </select>
    );
}

export default LanguageSelector;