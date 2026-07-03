export const compatibilityFallback = (
    property,
    profile
) => {

    let score = 0;

    // ----------------------
    // Budget Match (40)
    // ----------------------
    if (
        property.rent >= profile.minBudget &&
        property.rent <= profile.maxBudget
    ) {
        score += 40;
    }

    // ----------------------
    // Location Match (40)
    // ----------------------
    if (
        property.city.toLowerCase() ===
        profile.preferredLocation.toLowerCase()
    ) {
        score += 40;
    }

    // ----------------------
    // Furnished Match (10)
    // ----------------------
    if (
        property.furnished &&
        property.furnished !== "Unfurnished"
    ) {
        score += 10;
    }

    // ----------------------
    // Move-in Date (10)
    // ----------------------
    if (property.availableFrom) {

        const propertyDate = new Date(property.availableFrom);
        const tenantDate = new Date(profile.moveInDate);

        const diffDays =
            Math.abs(propertyDate - tenantDate) /
            (1000 * 60 * 60 * 24);

        if (diffDays <= 30) {
            score += 10;
        }

    }

    return {

        score,

        explanation:
            "Generated using rule-based fallback because the AI service was unavailable.",

    };

};