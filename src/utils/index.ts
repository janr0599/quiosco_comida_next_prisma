export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};

export const getImagePath = (imagePath: string) => {
    const cloudinaryBaseUrl = "https://res.cloudinary.com";
    if (imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath;
    } else {
        return `/products/${imagePath}.jpg`;
    }
};
