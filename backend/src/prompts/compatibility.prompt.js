export const buildCompatibilityPrompt = (
    property,
    profile
) => {

    return `
You are an AI compatibility engine.

Compare the following room listing with the tenant preferences.

ROOM LISTING

Location: ${property.city}, ${property.locality}

Rent: ${property.rent}

BHK: ${property.bhk}

Furnished: ${property.furnished}

Available From:
${property.availableFrom || "Not Provided"}

TENANT PROFILE

Preferred Location:
${profile.preferredLocation}

Budget:
${profile.minBudget} - ${profile.maxBudget}

Move In Date:
${profile.moveInDate}

Evaluate compatibility considering:

1. Budget Match
2. Preferred Location
3. Move-in Date
4. Furnishing
5. Overall suitability

Return ONLY valid JSON.

{
"score": number,
"explanation":"short explanation"
}

Do not return markdown.
Do not return code blocks.
`;
};