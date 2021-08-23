import { CSSProperties } from "react";

const linkStyle: CSSProperties = {
    margin: 6,
    color: "white",
}

export default function Footer() {
    return (
        <div style={{
            marginTop: "150px",
        }}>
            <a style={linkStyle} href="https://www.carryou.dev/"> Back to Carryou</a>
            <a style={linkStyle} href="https://github.com/kangbojk/HanguLego" target="_blank" rel="noreferrer">Help improve HanguLego</a>
        </div>
    )

}