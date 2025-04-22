type Activity = {
    id: string | undefine
    title: string
    date: Date
    description: string
    category: string
    isCancelled: boolean
    city: string
    venue: string
    latitude: number
    longitude: number

    attendees: Profile[]
    isGoing: boolean,
    isHost: boolean,
    hostId: string,
    hostDisplayName: string
}

type Profile = {
    id: string,
    displayName?: string,
    bio?: string,
    imageUrl?: string
}   

type User = {
    id: string
    email: string
    displayName: string
    imageUrl?: string
}

type LocationIQSuggestion = {
    place_id: string
    osm_id: string
    osm_type: string
    licence: string
    lat: string
    lon: string
    boundingbox: string[]
    class: string
    type: string
    display_name: string
    display_place: string
    display_address: string
    address: Address
}

type LocationIQAddress = {
    name: string
    house_number: string
    road: string
    city?: string
    town?: string
    village?: string
    state: string
    postcode: string
    country: string
}