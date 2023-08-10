interface PropertyType  {
accommodation_type?: number
accommodation_type_name?: "Hotel" | 'Apartment' | 'Holiday home' | 'Guest house'
address?: string
address_trans?: string
badges?: []
block_ids?: string[]
bwallet?: unknown
cant_book?: 0
cc1?: string
cc_required?: number
checkin?: {until: string, from: string}
checkout?: {until: string, from: string}
children_not_allowed?: number
city?: string
city_in_trans?: string
city_name_en?: string
city_trans?: string
class?: number
class_is_estimated?: 0
composite_price_breakdown?: unknown
country_trans?: string
countrycode?: string
currency_code?: string
currencycode?: string
default_language?: string
default_wishlist_name?: string
distance?: string
distance_to_cc?: string
distance_to_cc_formatted?:string
distances?: []
district?: string
district_id?: number
districts?: string
extended?: number
genius_discount_percentage?: number
hotel_facilities?: string
hotel_has_vb_boost?: number
hotel_id?: number | string
hotel_include_breakfast?: number
hotel_name?: string
hotel_name_trans?:string
id?: string
in_best_district?: number
is_beach_front?: number
is_city_center?: number
is_free_cancellable?: number
is_genius_deal?: number
is_geo_rate?: string
is_mobile_deal?: number
is_no_prepayment_block?: number
is_smart_deal?: number
latitude?: number
longitude?: number
main_photo_id?: number
main_photo_url?: string
matching_units_configuration?: unknown
max_1440_photo_url?: string
max_photo_url?: string
min_total_price?: number
mobile_discount_percentage?: number
native_ad_id?:string
native_ads_cpc?: number
native_ads_tracking?: string
preferred?: number
preferred_plus?: number
price_breakdown?: unknown
price_is_final?: number
review_nr?: number
review_recommendation?: string
review_score?: number
review_score_word?: string
selected_review_topic?: null
soldout?: number
timezone?: string
type?: string
ufi?: number
unit_configuration_label?: string
updated_checkin?: null
updated_checkout?: null
url?: string
wishlist_count?: number
zip?: string

}

export default PropertyType