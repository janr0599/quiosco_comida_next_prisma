import Image from "next/image";
import React from "react";

function Logo() {
    return (
        <div className="flex justify-center mt-5">
            <div className="relative size-36">
                <Image fill alt="Logo de la aplicación" src={`/logo.svg`} />
            </div>
        </div>
    );
}

export default Logo;
