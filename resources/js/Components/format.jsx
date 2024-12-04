export const formatRUT = (value) => {
    let cleaned = value.replace(/[^0-9kK]/g, "").toUpperCase();
    if (cleaned.length > 9) cleaned = cleaned.slice(0, 9);
    const body = cleaned.slice(0, -1);
    const verifier = cleaned.slice(-1);
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return body.length ? `${formattedBody}-${verifier}` : verifier;
};
