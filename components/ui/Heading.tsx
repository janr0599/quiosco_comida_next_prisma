function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-2xl lg:text-3xl mt-5 mb-10 font-bold">
            {children}
        </h1>
    );
}

export default Heading;
