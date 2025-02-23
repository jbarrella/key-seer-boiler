export const MICRO_TO_USD: number = 1 / 1_000_000;

export const GLOBAL_LABEL = 'Global 🌐';
export const COUNTRIES: { [key: string]: string | null } = {
  'Afghanistan': '2004',
  'Albania': '2008',
  'Algeria': '2012',
  'American Samoa': '2016',
  'Andorra': '2020',
  'Angola': '2024',
  'Antarctica': '2010',
  'Antigua and Barbuda': '2028',
  'Argentina': '2032',
  'Armenia': '2051',
  'Australia': '2036',
  'Austria': '2040',
  'Azerbaijan': '2031',
  'Bahrain': '2048',
  'Bangladesh': '2050',
  'Barbados': '2052',
  'Belarus': '2112',
  'Belgium': '2056',
  'Belize': '2084',
  'Benin': '2204',
  'Bhutan': '2064',
  'Bolivia': '2068',
  'Bosnia and Herzegovina': '2070',
  'Botswana': '2072',
  'Brazil': '2076',
  'Brunei': '2096',
  'Bulgaria': '2100',
  'Burkina Faso': '2854',
  'Burundi': '2108',
  'Cape Verde': '2132',
  'Cambodia': '2116',
  'Cameroon': '2120',
  'Canada': '2124',
  'Caribbean Netherlands': '2535',
  'Central African Republic': '2140',
  'Chad': '2148',
  'Chile': '2152',
  'China': '2156',
  'Christmas Island': '2162',
  'Cocos (Keeling) Islands': '2166',
  'Colombia': '2170',
  'Comoros': '2174',
  'Cook Islands': '2184',
  'Costa Rica': '2188',
  'Cote d\'Ivoire': '2384',
  'Croatia': '2191',
  'Curacao': '2531',
  'Cyprus': '2196',
  'Czech Republic': '2203',
  'Democratic Republic of the Congo': '2180',
  'Denmark': '2208',
  'Djibouti': '2262',
  'Dominica': '2212',
  'Dominican Republic': '2214',
  'Ecuador': '2218',
  'Egypt': '2818',
  'El Salvador': '2222',
  'Equatorial Guinea': '2226',
  'Eritrea': '2232',
  'Estonia': '2233',
  'Eswatini': '2748',
  'Ethiopia': '2231',
  'Fiji': '2242',
  'Finland': '2246',
  'France': '2250',
  'French Polynesia': '2258',
  'French Southern and Antarctic Lands': '2260',
  'Gabon': '2266',
  'Georgia': '2268',
  'Germany': '2276',
  'Ghana': '2288',
  'Greece': '2300',
  'Grenada': '2308',
  'Guam': '2316',
  'Guatemala': '2320',
  'Guernsey': '2831',
  'Guinea': '2324',
  'Guinea-Bissau': '2624',
  'Guyana': '2328',
  'Haiti': '2332',
  'Heard Island and McDonald Islands': '2334',
  'Honduras': '2340',
  'Hungary': '2348',
  'Iceland': '2352',
  'India': '2356',
  'Indonesia': '2360',
  'Iraq': '2368',
  'Ireland': '2372',
  'Isle of Man': '2833',
  'Israel': '2376',
  'Italy': '2380',
  'Jamaica': '2388',
  'Japan': '2392',
  'Jersey': '2832',
  'Jordan': '2400',
  'Kazakhstan': '2398',
  'Kenya': '2404',
  'Kiribati': '2296',
  'Kuwait': '2414',
  'Kyrgyzstan': '2417',
  'Laos': '2418',
  'Latvia': '2428',
  'Lebanon': '2422',
  'Lesotho': '2426',
  'Liberia': '2430',
  'Libya': '2434',
  'Liechtenstein': '2438',
  'Lithuania': '2440',
  'Luxembourg': '2442',
  'Madagascar': '2450',
  'Malawi': '2454',
  'Malaysia': '2458',
  'Maldives': '2462',
  'Mali': '2466',
  'Malta': '2470',
  'Marshall Islands': '2584',
  'Mauritania': '2478',
  'Mauritius': '2480',
  'Mexico': '2484',
  'Micronesia': '2583',
  'Moldova': '2498',
  'Monaco': '2492',
  'Mongolia': '2496',
  'Montenegro': '2499',
  'Morocco': '2504',
  'Mozambique': '2508',
  'Myanmar (Burma)': '2104',
  'Namibia': '2516',
  'Nauru': '2520',
  'Nepal': '2524',
  'Netherlands': '2528',
  'New Caledonia': '2540',
  'New Zealand': '2554',
  'Nicaragua': '2558',
  'Niger': '2562',
  'Nigeria': '2566',
  'Niue': '2570',
  'Norfolk Island': '2574',
  'North Macedonia': '2807',
  'Northern Mariana Islands': '2580',
  'Norway': '2578',
  'Oman': '2512',
  'Pakistan': '2586',
  'Palau': '2585',
  'Panama': '2591',
  'Papua New Guinea': '2598',
  'Paraguay': '2600',
  'Peru': '2604',
  'Philippines': '2608',
  'Pitcairn Islands': '2612',
  'Poland': '2616',
  'Portugal': '2620',
  'Qatar': '2634',
  'Congo': '2178',
  'Romania': '2642',
  'Rwanda': '2646',
  'Saint Barthelemy': '2652',
  '"Saint Helena, Ascension and Tristan da Cunha"': '2654',
  'Saint Kitts and Nevis': '2659',
  'Saint Lucia': '2662',
  'Saint Martin': '2663',
  'Saint Pierre and Miquelon': '2666',
  'Saint Vincent and the Grenadines': '2670',
  'Samoa': '2882',
  'San Marino': '2674',
  'Sao Tome and Principe': '2678',
  'Saudi Arabia': '2682',
  'Senegal': '2686',
  'Serbia': '2688',
  'Seychelles': '2690',
  'Sierra Leone': '2694',
  'Singapore': '2702',
  'Sint Maarten': '2534',
  'Slovakia': '2703',
  'Slovenia': '2705',
  'Solomon Islands': '2090',
  'Somalia': '2706',
  'South Africa': '2710',
  'South Georgia and the South Sandwich Islands': '2239',
  'South Korea': '2410',
  'South Sudan': '2728',
  'Spain': '2724',
  'Sri Lanka': '2144',
  'Sudan': '2736',
  'Suriname': '2740',
  'Sweden': '2752',
  'Switzerland': '2756',
  'Tajikistan': '2762',
  'Tanzania': '2834',
  'Thailand': '2764',
  'The Bahamas': '2044',
  'Gambia': '2270',
  'Timor-Leste': '2626',
  'Togo': '2768',
  'Tokelau': '2772',
  'Tonga': '2776',
  'Trinidad and Tobago': '2780',
  'Tunisia': '2788',
  'Turkey': '2792',
  'Turkmenistan': '2795',
  'Tuvalu': '2798',
  'Uganda': '2800',
  'Ukraine': '2804',
  'United Arab Emirates': '2784',
  'United Kingdom': '2826',
  'United States': '2840',
  'United States Minor Outlying Islands': '2581',
  'Uruguay': '2858',
  'Uzbekistan': '2860',
  'Vanuatu': '2548',
  'Vatican City': '2336',
  'Venezuela': '2862',
  'Vietnam': '2704',
  'Wallis and Futuna': '2876',
  'Yemen': '2887',
  'Zambia': '2894',
  'Zimbabwe': '2716',
};
