const { gql } = require('apollo-server');

module.exports = gql`
    type Listing {
        favoriteCount: Int
        privateRemarks: String
        showingContactName: String
        mlsId: Int
        showingContactPhone: String
        terms: String
        showingInstructions: String
        leaseTerm: String
        disclaimer: String
        originalListPrice: String
        agreement: String
        listDate: String
        modified: String
        listPrice: Int
        internetAddressDisplay: String
        listingId: String
        internetEntireListingDisplay: String
        leaseType: String
        virtualTourUrl: String
        remarks: String
        association: Association
        sales: Sales
        coAgent: CoAgent
        tax: Tax
        geo: Geo
        mls: Mls
        photos: [String]
        school: School
        agent: Agent
        address: Address
        office: Office
        property: Property
    }

    type Association {
        frequency: String
        fee: Int
        name: String
        amenities: String
    }

    type Agent {
        lastName: String
        contact: String
        address: String
        firstName: String
        id: String
    }

    type Office {
        contact: String
        name: String
        servingName: String
        brokerid: String
    }

    type Sales {
        closeDate: String
        closePrice: Int
        contractDate: String
        agent: Agent
        office: Office
    }

    type CoAgent {
        lastName: String
        contact: String
        address: String
        firstName: String
        id: String
    }

    type Tax {
        taxYear: Int
        taxAnnualAmount: Int
        id: String
    }

    type Geo {
        county: String
        lat: Float
        lng: Float
        marketArea: String
        directions: String
    }

    type Mls {
        status: String
        area: String
        daysOnMarket: Int
        originalEntryTimestamp: String
        originatingSystemName: String
        statusText: String
        areaMinor: String
    }

    type School {
        middleSchool: String
        highSchool: String
        elementarySchool: String
        district: String
    }

    type Address {
        crossStreet: String
        state: String
        country: String
        postalCode: String
        streetName: String
        streetNumberText: String
        city: String
        streetNumber: Int
        full: String
        unit: String
    }

    type Parking {
        leased: String
        spaces: Int
        description: String
    }

    type Property {
        roof: String
        cooling: String
        style: String
        area: Int
        bathsFull: Int
        bathsHalf: Int
        stories: Int
        fireplaces: Int
        flooring: String
        heating: String
        bathrooms: String
        foundation: String
        laundryFeatures: String
        occupantName: String
        ownerName: String
        lotDescription: String
        pool: String
        subType: String
        bedrooms: Int
        interiorFeatures: String
        lotSize: String
        areaSource: String
        maintenanceExpense: String
        additionalRooms: String
        exteriorFeatures: String
        water: String
        view: String
        lotSizeArea: String
        subdivision: String
        construction: String
        lotSizeAreaUnits: String
        type: String
        garageSpaces: Float
        bathsThreeQuarter: String
        accessibility: String
        acres: String
        occupantType: String
        subTypeText: String
        yearBuilt: Int
        parking: Parking
    }
`;
