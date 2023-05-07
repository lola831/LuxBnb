import React,  {useState} from "react";
import "./ToolTip.css"

export const ToolTip = ({text, children}) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="tooltip-container"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={()=> setIsVisible(false)}
        >
            {children}
            {isVisible && <div className="tooltip">{text}</div>}
        </div>
    )
}
