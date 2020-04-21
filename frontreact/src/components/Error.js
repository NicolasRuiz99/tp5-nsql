import React from "react"

const Error = ({mensaje}) => {
    return (
        <div class="alert alert-danger" role="alert">
            {mensaje}
        </div>
    );
};

export default Error;