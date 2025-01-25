"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

function ImageUpload() {
    const [imageURL, setImageURL] = useState("");

    return (
        <CldUploadWidget
            uploadPreset="k6fifk5j"
            options={{
                maxFiles: 1,
                multiple: false,
            }}
            onSuccess={(result, { widget }) => {
                if (result.event === "success") {
                    // @ts-ignore
                    setImageURL(result.info.secure_url);
                    widget.close();
                }
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imagen:</label>
                        <div
                            className="relative cursor-pointer hover:opacity-70 transition-opacity p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus size={50} />
                            <p className="text-lg font-semibold">
                                Agregar Imagen
                            </p>
                            {imageURL && (
                                <div className="absolute inset-0 w-full h-full flex ">
                                    <Image
                                        fill
                                        style={{ objectFit: "contain" }}
                                        src={imageURL}
                                        alt="Imagen de Producto"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <input type="hidden" name="image" value={imageURL} />
                </>
            )}
        </CldUploadWidget>
    );
}

export default ImageUpload;
