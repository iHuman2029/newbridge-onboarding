import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

/**
 * Mock address data for demonstration
 * In production, this would integrate with Google Places API, Mapbox, or similar
 */
const mockAddresses = [
  {
    streetAddress: "910 Veterans Drive",
    city: "Florence",
    state: "AL",
    zipCode: "35630",
    fullAddress: "910 Veterans Drive, Florence, AL 35630",
  },
  {
    streetAddress: "123 Main Street",
    city: "Birmingham",
    state: "AL",
    zipCode: "35203",
    fullAddress: "123 Main Street, Birmingham, AL 35203",
  },
  {
    streetAddress: "456 Oak Avenue",
    city: "Montgomery",
    state: "AL",
    zipCode: "36104",
    fullAddress: "456 Oak Avenue, Montgomery, AL 36104",
  },
  {
    streetAddress: "789 Pine Road",
    city: "Mobile",
    state: "AL",
    zipCode: "36602",
    fullAddress: "789 Pine Road, Mobile, AL 36602",
  },
  {
    streetAddress: "321 Elm Street",
    city: "Huntsville",
    state: "AL",
    zipCode: "35801",
    fullAddress: "321 Elm Street, Huntsville, AL 35801",
  },
];

/**
 * GET /api/address-lookup
 * Address autocomplete API endpoint
 * 
 * Query params:
 * - query: Address search string
 * 
 * Returns:
 * - suggestions: Array of address suggestions
 * 
 * TODO: Replace mock implementation with real API integration
 * Options:
 * 1. Google Places API: https://developers.google.com/maps/documentation/places/web-service/autocomplete
 * 2. Mapbox Geocoding API: https://docs.mapbox.com/api/search/geocoding/
 * 3. Smarty Streets API: https://www.smartystreets.com/docs/cloud/us-street-api
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query || query.length < 3) {
      return NextResponse.json({
        suggestions: [],
        message: "Query must be at least 3 characters",
      });
    }

    // Mock implementation: Filter mock addresses
    const filteredSuggestions = mockAddresses.filter((address) =>
      address.fullAddress.toLowerCase().includes(query.toLowerCase())
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      suggestions: filteredSuggestions,
      count: filteredSuggestions.length,
    });

    /**
     * PRODUCTION IMPLEMENTATION EXAMPLE (Google Places API):
     * 
     * const apiKey = process.env.GOOGLE_PLACES_API_KEY;
     * const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=address&key=${apiKey}`;
     * 
     * const response = await fetch(url);
     * const data = await response.json();
     * 
     * // Parse predictions and get place details
     * const suggestions = await Promise.all(
     *   data.predictions.slice(0, 5).map(async (prediction) => {
     *     const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=address_components&key=${apiKey}`;
     *     const detailsResponse = await fetch(detailsUrl);
     *     const detailsData = await detailsResponse.json();
     *     
     *     // Extract address components
     *     const components = detailsData.result.address_components;
     *     const streetNumber = components.find(c => c.types.includes('street_number'))?.long_name || '';
     *     const route = components.find(c => c.types.includes('route'))?.long_name || '';
     *     const city = components.find(c => c.types.includes('locality'))?.long_name || '';
     *     const state = components.find(c => c.types.includes('administrative_area_level_1'))?.short_name || '';
     *     const zipCode = components.find(c => c.types.includes('postal_code'))?.long_name || '';
     *     
     *     return {
     *       streetAddress: `${streetNumber} ${route}`.trim(),
     *       city,
     *       state,
     *       zipCode,
     *       fullAddress: prediction.description,
     *     };
     *   })
     * );
     * 
     * return NextResponse.json({ suggestions });
     */
  } catch (error) {
    console.error("Address lookup error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch address suggestions",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

