import { useState } from "react";

const useField = (type, placeholder) => {
    const [value, setValue] = useState("");

    const className = 'input'

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
        className,
        placeholder,
        setValue,
    };
};


export default useField;