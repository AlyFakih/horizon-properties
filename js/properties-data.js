/**
 * Horizon Properties - Property dataset
 *
 * Single source of truth for every listing on the site. The listing grid, the
 * homepage "featured" grid and the detail page all read from here, so a change
 * to a price or a photo only has to be made once.
 *
 * Exposed as window.HORIZON.properties / window.HORIZON.agents.
 */
(function (global) {
    'use strict';

    var agents = {
        sarah: {
            name: 'Sarah Johnson',
            title: 'Luxury Property Specialist',
            photo: 'assets/images/agent1.webp',
            email: 'sarah@horizonproperties.com',
            phone: '5551234567',
            phoneDisplay: '(555) 123-4567'
        },
        michael: {
            name: 'Michael Lee',
            title: 'Downtown Specialist',
            photo: 'assets/images/agent3.webp',
            email: 'michael@horizonproperties.com',
            phone: '5559876543',
            phoneDisplay: '(555) 987-6543'
        },
        priya: {
            name: 'Priya Patel',
            title: 'Family Homes Advisor',
            photo: 'assets/images/agent7.webp',
            email: 'priya@horizonproperties.com',
            phone: '5552468101',
            phoneDisplay: '(555) 246-8101'
        },
        carlos: {
            name: 'Carlos Martinez',
            title: 'Investment Consultant',
            photo: 'assets/images/agent2.webp',
            email: 'carlos@horizonproperties.com',
            phone: '5551357913',
            phoneDisplay: '(555) 135-7913'
        },
        emily: {
            name: 'Emily Chen',
            title: 'Luxury Rentals Expert',
            photo: 'assets/images/agent5.webp',
            email: 'emily@horizonproperties.com',
            phone: '5558642098',
            phoneDisplay: '(555) 864-2098'
        },
        daniel: {
            name: 'Daniel Kim',
            title: 'New Developments Lead',
            photo: 'assets/images/agent6.webp',
            email: 'daniel@horizonproperties.com',
            phone: '5553216549',
            phoneDisplay: '(555) 321-6549'
        }
    };

    /**
     * `location` and `type` values match the <option value> attributes used by
     * the search and filter forms, so filtering is an exact comparison rather
     * than a text search.
     *
     * `features` values match the filter checkbox values.
     */
    var properties = [
        {
            id: 'luxury-beachfront-villa',
            title: 'Luxury Beachfront Villa',
            address: '123 Oceanview Dr, Malibu, CA',
            city: 'Malibu',
            state: 'CA',
            price: 4500000,
            beds: 5,
            baths: 6,
            sqft: 4500,
            type: 'villa',
            location: 'beachfront',
            status: 'For Sale',
            badge: 'Featured',
            featured: true,
            listed: '2025-06-18',
            yearBuilt: 2022,
            lotSize: '0.75 acres',
            garage: '3-car',
            flooring: 'Imported Marble',
            agent: 'sarah',
            description: 'Experience the pinnacle of luxury living in this stunning beachfront villa with panoramic ocean views, exquisite interiors, and world-class amenities. Floor-to-ceiling glass opens the main living space onto a wraparound terrace, and the primary suite occupies its own floor with a private balcony above the water.',
            features: ['pool', 'waterfront', 'garage', 'garden'],
            amenities: [
                { icon: 'fa-school', label: 'Malibu High School (2.1 mi)' },
                { icon: 'fa-tree', label: 'Zuma Beach Park (1.4 mi)' },
                { icon: 'fa-utensils', label: 'Nobu Malibu (0.9 mi)' },
                { icon: 'fa-cart-shopping', label: 'Malibu Country Mart (1.7 mi)' }
            ],
            images: [
                { src: 'assets/images/Luxury-Beachfront-Villa.webp', alt: 'Beachfront villa seen from the shoreline at dusk' },
                { src: 'assets/images/propert1-a.webp', alt: 'Open-plan living room with ocean views' },
                { src: 'assets/images/property1-b.webp', alt: 'Terrace overlooking the Pacific' },
                { src: 'assets/images/property1-c.webp', alt: 'Primary suite with floor-to-ceiling glass' },
                { src: 'assets/images/property1-d.webp', alt: 'Outdoor pool and lounge deck' }
            ]
        },
        {
            id: 'modern-downtown-penthouse',
            title: 'Modern Downtown Penthouse',
            address: '789 Skyline Ave, New York, NY',
            city: 'New York',
            state: 'NY',
            price: 2850000,
            beds: 3,
            baths: 3.5,
            sqft: 2200,
            type: 'apartment',
            location: 'downtown',
            status: 'For Sale',
            badge: 'New',
            featured: true,
            listed: '2025-08-02',
            yearBuilt: 2021,
            lotSize: 'N/A',
            garage: '2 reserved spaces',
            flooring: 'Wide-plank Oak',
            agent: 'michael',
            description: 'A full-floor penthouse above the city with wraparound skyline views, a chef\'s kitchen, and a private roof terrace. Building amenities include a 24-hour doorman, residents\' gym, and direct lift access into the apartment.',
            features: ['gym', 'balcony', 'garage'],
            amenities: [
                { icon: 'fa-train-subway', label: 'Subway (0.2 mi)' },
                { icon: 'fa-tree', label: 'Bryant Park (0.6 mi)' },
                { icon: 'fa-utensils', label: 'Restaurant district (0.3 mi)' },
                { icon: 'fa-cart-shopping', label: 'Fifth Avenue shopping (0.5 mi)' }
            ],
            images: [
                { src: 'assets/images/Modern-Downtown-Penthouse.webp', alt: 'Penthouse living space with skyline views' },
                { src: 'assets/images/property2-a.webp', alt: 'Open kitchen and dining area' },
                { src: 'assets/images/property2-b.webp', alt: 'Principal bedroom' },
                { src: 'assets/images/property2-c.webp', alt: 'Private roof terrace' },
                { src: 'assets/images/property2-d.webp', alt: 'Bathroom with double vanity' }
            ]
        },
        {
            id: 'classic-suburban-estate',
            title: 'Classic Suburban Estate',
            address: '456 Maple Lane, Greenwich, CT',
            city: 'Greenwich',
            state: 'CT',
            price: 3200000,
            beds: 6,
            baths: 5,
            sqft: 5800,
            type: 'house',
            location: 'suburbs',
            status: 'For Sale',
            badge: '',
            featured: true,
            listed: '2025-05-27',
            yearBuilt: 2009,
            lotSize: '1.4 acres',
            garage: '3-car',
            flooring: 'Solid Hardwood',
            agent: 'priya',
            description: 'A gracious six-bedroom estate on a mature landscaped lot, with formal and informal living areas, a panelled study, and a large kitchen opening onto the garden. Quiet cul-de-sac position within a short drive of the town centre and rail station.',
            features: ['garden', 'garage', 'pool'],
            amenities: [
                { icon: 'fa-school', label: 'Greenwich High School (1.8 mi)' },
                { icon: 'fa-tree', label: 'Binney Park (1.1 mi)' },
                { icon: 'fa-train', label: 'Metro-North station (2.3 mi)' },
                { icon: 'fa-cart-shopping', label: 'Greenwich Avenue (2.0 mi)' }
            ],
            images: [
                { src: 'assets/images/Classic-Suburban-Estate.webp', alt: 'Estate frontage with mature planting' },
                { src: 'assets/images/propert3-a.webp', alt: 'Formal reception room' },
                { src: 'assets/images/property3-b.webp', alt: 'Kitchen and breakfast area' },
                { src: 'assets/images/property3-c.webp', alt: 'Rear garden and terrace' }
            ]
        },
        {
            id: 'mountain-view-retreat',
            title: 'Mountain View Retreat',
            address: '890 Highland Rd, Aspen, CO',
            city: 'Aspen',
            state: 'CO',
            price: 5750000,
            beds: 4,
            baths: 4.5,
            sqft: 3900,
            type: 'house',
            location: 'countryside',
            status: 'For Sale',
            badge: '',
            featured: true,
            listed: '2025-07-09',
            yearBuilt: 2018,
            lotSize: '2.1 acres',
            garage: '2-car heated',
            flooring: 'Reclaimed Timber',
            agent: 'daniel',
            description: 'A contemporary mountain house framing uninterrupted views of the range, built with local stone and reclaimed timber. Double-height living room with a central fireplace, ski storage, and a sheltered hot tub terrace.',
            features: ['garden', 'garage', 'balcony'],
            amenities: [
                { icon: 'fa-person-skiing', label: 'Aspen Highlands (3.4 mi)' },
                { icon: 'fa-tree', label: 'White River National Forest (1.2 mi)' },
                { icon: 'fa-utensils', label: 'Aspen town centre (4.0 mi)' },
                { icon: 'fa-school', label: 'Aspen Elementary (3.8 mi)' }
            ],
            images: [
                { src: 'assets/images/Mountain-View-Retreat.webp', alt: 'Mountain house with panoramic range views' },
                { src: 'assets/images/property4.webp', alt: 'Double-height living room with fireplace' },
                { src: 'assets/images/property10.webp', alt: 'Bedroom with mountain outlook' }
            ]
        },
        {
            id: 'urban-loft-apartment',
            title: 'Urban Loft Apartment',
            address: '567 Brick Lane, Chicago, IL',
            city: 'Chicago',
            state: 'IL',
            price: 1295000,
            beds: 2,
            baths: 2,
            sqft: 1800,
            type: 'condo',
            location: 'downtown',
            status: 'For Sale',
            badge: 'Hot',
            featured: true,
            listed: '2025-07-30',
            yearBuilt: 1998,
            lotSize: 'N/A',
            garage: '1 reserved space',
            flooring: 'Polished Concrete',
            agent: 'emily',
            description: 'A converted warehouse loft with exposed brick, steel columns and eleven-foot ceilings. Open living and dining space, a mezzanine study, and secure parking in a well-run building with a residents\' gym.',
            features: ['gym', 'balcony', 'garage'],
            amenities: [
                { icon: 'fa-train-subway', label: 'CTA Blue Line (0.3 mi)' },
                { icon: 'fa-tree', label: 'Eckhart Park (0.5 mi)' },
                { icon: 'fa-utensils', label: 'West Loop dining (0.8 mi)' },
                { icon: 'fa-cart-shopping', label: 'Local grocers (0.2 mi)' }
            ],
            images: [
                { src: 'assets/images/Urban-Loft-Apartment.webp', alt: 'Loft interior with exposed brick and steel' },
                { src: 'assets/images/property5.webp', alt: 'Living area beneath the mezzanine' },
                { src: 'assets/images/property11.webp', alt: 'Bedroom with warehouse windows' }
            ]
        },
        {
            id: 'waterfront-contemporary-home',
            title: 'Waterfront Contemporary Home',
            address: '234 Harbor Dr, Miami, FL',
            city: 'Miami',
            state: 'FL',
            price: 3875000,
            beds: 5,
            baths: 5.5,
            sqft: 4100,
            type: 'house',
            location: 'beachfront',
            status: 'For Sale',
            badge: '',
            featured: true,
            listed: '2025-06-04',
            yearBuilt: 2020,
            lotSize: '0.5 acres',
            garage: '2-car',
            flooring: 'Porcelain Tile',
            agent: 'carlos',
            description: 'A crisp contemporary house on a protected stretch of waterfront, with a private dock, infinity pool, and full-height sliding glass across the rear elevation. Designed for indoor-outdoor living year round.',
            features: ['pool', 'waterfront', 'garage', 'garden'],
            amenities: [
                { icon: 'fa-water', label: 'Private dock on site' },
                { icon: 'fa-tree', label: 'Morningside Park (1.0 mi)' },
                { icon: 'fa-utensils', label: 'Design District (2.4 mi)' },
                { icon: 'fa-school', label: 'Miami Country Day (1.6 mi)' }
            ],
            images: [
                { src: 'assets/images/Waterfront-Contemporary-Home.webp', alt: 'Waterfront house viewed from the dock' },
                { src: 'assets/images/property6.webp', alt: 'Infinity pool and terrace' }
            ]
        },
        {
            id: 'elegant-city-townhouse',
            title: 'Elegant City Townhouse',
            address: '781 Park Avenue, Boston, MA',
            city: 'Boston',
            state: 'MA',
            price: 2450000,
            beds: 4,
            baths: 3.5,
            sqft: 3200,
            type: 'house',
            location: 'downtown',
            status: 'For Sale',
            badge: '',
            featured: false,
            listed: '2025-04-21',
            yearBuilt: 1904,
            lotSize: '0.1 acres',
            garage: '1-car',
            flooring: 'Original Hardwood',
            agent: 'michael',
            description: 'A restored period townhouse over four floors, retaining original cornicing and fireplaces alongside a fully rebuilt kitchen and bathrooms. South-facing walled garden and off-street parking, rare for the street.',
            features: ['garden', 'garage'],
            amenities: [
                { icon: 'fa-train-subway', label: 'Back Bay station (0.7 mi)' },
                { icon: 'fa-tree', label: 'Boston Common (0.9 mi)' },
                { icon: 'fa-utensils', label: 'Newbury Street (0.4 mi)' },
                { icon: 'fa-school', label: 'Boston Latin (1.9 mi)' }
            ],
            images: [
                { src: 'assets/images/property7.webp', alt: 'Townhouse frontage on a tree-lined street' }
            ]
        },
        {
            id: 'modernist-desert-home',
            title: 'Modernist Desert Home',
            address: '442 Canyon View, Palm Springs, CA',
            city: 'Palm Springs',
            state: 'CA',
            price: 3950000,
            beds: 3,
            baths: 4,
            sqft: 3600,
            type: 'house',
            location: 'countryside',
            status: 'For Sale',
            badge: 'New',
            featured: false,
            listed: '2025-08-08',
            yearBuilt: 2023,
            lotSize: '0.9 acres',
            garage: '2-car',
            flooring: 'Terrazzo',
            agent: 'daniel',
            description: 'A single-storey modernist house set against the canyon wall, organised around a central courtyard and a long lap pool. Deep overhangs, clerestory glazing and a fully shaded outdoor kitchen.',
            features: ['pool', 'garage', 'garden'],
            amenities: [
                { icon: 'fa-mountain', label: 'Indian Canyons trailhead (1.3 mi)' },
                { icon: 'fa-utensils', label: 'Palm Canyon Drive (2.7 mi)' },
                { icon: 'fa-golf-ball-tee', label: 'Golf club (1.5 mi)' },
                { icon: 'fa-cart-shopping', label: 'Uptown Design District (3.1 mi)' }
            ],
            images: [
                { src: 'assets/images/property8.webp', alt: 'Modernist desert house with lap pool' }
            ]
        },
        {
            id: 'lakeside-family-home',
            title: 'Lakeside Family Home',
            address: '156 Shoreline Dr, Lake Tahoe, NV',
            city: 'Lake Tahoe',
            state: 'NV',
            price: 2890000,
            beds: 5,
            baths: 4,
            sqft: 4200,
            type: 'house',
            location: 'countryside',
            status: 'For Sale',
            badge: '',
            featured: false,
            listed: '2025-05-12',
            yearBuilt: 2015,
            lotSize: '1.0 acres',
            garage: '2-car',
            flooring: 'Engineered Oak',
            agent: 'priya',
            description: 'A generous family house a short walk from the shoreline, with an open living level, a bunk room for guests, and a mud room built for ski season. Level garden and mature pines to the rear.',
            features: ['waterfront', 'garden', 'garage'],
            amenities: [
                { icon: 'fa-water', label: 'Lake access (0.3 mi)' },
                { icon: 'fa-person-skiing', label: 'Heavenly Resort (4.2 mi)' },
                { icon: 'fa-school', label: 'Zephyr Cove Elementary (1.7 mi)' },
                { icon: 'fa-utensils', label: 'Village dining (1.1 mi)' }
            ],
            images: [
                { src: 'assets/images/property9.webp', alt: 'Lakeside family home among pines' }
            ]
        }
    ];

    function formatPrice(value) {
        return '$' + value.toLocaleString('en-US');
    }

    function getById(id) {
        for (var i = 0; i < properties.length; i++) {
            if (properties[i].id === id) return properties[i];
        }
        return null;
    }

    global.HORIZON = global.HORIZON || {};
    global.HORIZON.properties = properties;
    global.HORIZON.agents = agents;
    global.HORIZON.getPropertyById = getById;
    global.HORIZON.formatPrice = formatPrice;
})(window);
