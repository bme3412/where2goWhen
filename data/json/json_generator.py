import json

# Define the bucket list items with scores
france_bucket_list = {
    "items": [
        {
            "name": "Sipping Champagne in the Champagne Region",
            "category": "Gastronomy",
            "score": 5,
            "description": "Experience the exclusivity of tasting authentic Champagne in the picturesque region where it is produced."
        },
        {
            "name": "Exploring the Lavender Fields of Provence",
            "category": "Nature",
            "score": 5,
            "description": "Walk through the stunningly vibrant lavender fields that offer a once-in-a-lifetime photo opportunity."
        },
        {
            "name": "Mont Blanc Adventure in Chamonix",
            "category": "Adventure",
            "score": 5,
            "description": "Conquer the highest peak in Western Europe for an adrenaline rush and unforgettable views."
        },
        {
            "name": "Louvre Museum, Paris",
            "category": "Culture",
            "score": 4,
            "description": "Marvel at the world-renowned art collections, including the Mona Lisa and the Venus de Milo."
        },
        {
            "name": "Palace of Versailles",
            "category": "Culture",
            "score": 4,
            "description": "Immerse yourself in the grandeur of French royalty and the intricate gardens of Versailles."
        },
        {
            "name": "D-Day Beaches of Normandy",
            "category": "History",
            "score": 4,
            "description": "Pay respects and learn about the monumental World War II events that took place on these beaches."
        },
        {
            "name": "Sailing Around the Calanques in Marseille",
            "category": "Adventure",
            "score": 3,
            "description": "Experience the Mediterranean beauty by sailing the turquoise waters of the Calanques."
        },
        {
            "name": "Wine Tasting in Bordeaux",
            "category": "Gastronomy",
            "score": 3,
            "description": "Sample some of the most prestigious wines in the world in the beautiful vineyards of Bordeaux."
        },
        {
            "name": "Exploring the Castles of the Loire Valley",
            "category": "Culture",
            "score": 3,
            "description": "Visit the fairy-tale castles and gardens that span the Loire Valley."
        },
        {
            "name": "Skiing the French Alps",
            "category": "Adventure",
            "score": 3,
            "description": "Hit the slopes in some of the world's most famous ski resorts."
        },
        {
            "name": "Sipping Coffee in a Parisian Café",
            "category": "Relaxation",
            "score": 2,
            "description": "Enjoy the simple pleasure of coffee in the city that perfected café culture."
        },
        {
            "name": "Shopping on the Champs-Elysées",
            "category": "Urban",
            "score": 2,
            "description": "Indulge in retail therapy on one of the most famous shopping streets in the world."
        },
        {
            "name": "Visiting Disneyland Paris",
            "category": "Entertainment",
            "score": 2,
            "description": "Bring out your inner child at Europe’s most visited theme park."
        },
        {
            "name": "Sunbathing on the Beaches of Nice",
            "category": "Relaxation",
            "score": 1,
            "description": "Relax on the pebble beaches of the French Riviera and enjoy the Mediterranean sun."
        },
        {
            "name": "Eating a Croissant in a Local Boulangerie",
            "category": "Gastronomy",
            "score": 1,
            "description": "Taste authentic French croissants straight from a local bakery."
        }
    ]
}

# Sort the list by score
france_bucket_list['items'] = sorted(france_bucket_list['items'], key=lambda x: x['score'], reverse=True)

# Create and write the JSON file
with open('france.json', 'w', encoding='utf-8') as f:
    json.dump(france_bucket_list, f, ensure_ascii=False, indent=4)

print('france.json has been created with the bucket-list items.')


'''Define clear guidelines for each score. For instance:
Score 5: Unique, once-in-a-lifetime experiences with global recognition.
Score 4: Exceptional experiences that are not easily replicated elsewhere.
Score 3: Noteworthy activities that provide a deeper understanding or appreciation of a location.
Score 2: Common tourist activities that are pleasant but not extraordinary.
Score 1: Activities that might be of interest to some but don't have wide appeal.'''