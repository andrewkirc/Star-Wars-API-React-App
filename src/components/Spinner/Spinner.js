//Modules
import React from "react";

//CSS
import "bootstrap/dist/css/bootstrap.css";

const Spinner = (props) => {
    if (props.display) {
        return (
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        )
    } else {
        return null;
    }
};

export default Spinner;