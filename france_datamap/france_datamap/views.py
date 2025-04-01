from django.shortcuts import render
from django.http import JsonResponse


def index(request):
    return render(request, "index.html")

def get_dashboard_data(request):
    data = {
        "barData": [
            {"name": "Jan", "value": 400},
            {"name": "Fév", "value": 300},
            {"name": "Mar", "value": 600},
            {"name": "Avr", "value": 800},
            {"name": "Mai", "value": 500},
            {"name": "Jun", "value": 700},
        ],
        "pieData": [
            {"name": "Groupe A", "value": 800},
            {"name": "Groupe B", "value": 300},
            {"name": "Groupe C", "value": 300},
            {"name": "Groupe D", "value": 200},
        ],
        "lineData": [
            {"name": "Lun", "value": 20},
            {"name": "Mar", "value": 30},
            {"name": "Mer", "value": 25},
            {"name": "Jeu", "value": 40},
            {"name": "Ven", "value": 35},
            {"name": "Sam", "value": 50},
            {"name": "Dim", "value": 45},
        ],
        "markers": [
            {"position": [48.8566, 2.3522], "name": "Paris", "users": 1254},
            {"position": [45.7640, 4.8357], "name": "Lyon", "users": 876},
            {"position": [43.2965, 5.3698], "name": "Marseille", "users": 943},
            {"position": [43.6047, 1.4442], "name": "Toulouse", "users": 621},
            {"position": [49.1829, -0.3707], "name": "Caen", "users": 540},
            {"position": [49.6333, -1.6221], "name": "Cherbourg", "users": 410},
        ],
        "stats": [
            {"id": 1, "title": "Utilisateurs non actifs", "value": "3,694", "change": "+12%", "status": "positive"},
            {"id": 2, "title": "Sessions", "value": "8,451", "change": "+5.2%", "status": "positive"},
            {"id": 3, "title": "Taux de rebond", "value": "32.8%", "change": "-3.1%", "status": "positive"},
            {"id": 4, "title": "Temps moyen", "value": "4m 12s", "change": "+0.5%", "status": "neutral"},
        ],
    }
    return JsonResponse(data)

def get_trends_data(request):
    data = {
        "barData": [
            { "name": "Jan", "value": 1200 },
            { "name": "Fév", "value": 1500 },
            { "name": "Mar", "value": 1800 },
            { "name": "Avr", "value": 2100 },
            { "name": "Mai", "value": 2400 },
            { "name": "Juin", "value": 2700 }
        ],
        "lineData": [
            { "name": "Lun", "value": 150 },
            { "name": "Mar", "value": 200 },
            { "name": "Mer", "value": 180 },
            { "name": "Jeu", "value": 220 },
            { "name": "Ven", "value": 250 },
            { "name": "Sam", "value": 300 },
            { "name": "Dim", "value": 270 }
        ],
        "markers": [
            { "position": [48.8566, 2.3522], "name": "Paris", "mentions": 3200 },
            { "position": [45.7640, 4.8357], "name": "Lyon", "mentions": 2100 },
            { "position": [43.2965, 5.3698], "name": "Marseille", "mentions": 1900 },
            { "position": [43.6047, 1.4442], "name": "Toulouse", "mentions": 1700 },
            { "position": [49.1829, -0.3700], "name": "Caen", "mentions": 1300 },
            { "position": [49.6333, -1.6167], "name": "Cherbourg", "mentions": 1100 }
        ],
        "stats": [
            { "id": 1, "title": "Mentions totales", "value": "12,800", "change": "+8%", "status": "positive" },
            { "id": 2, "title": "Nouveaux abonnés", "value": "3,450", "change": "+12%", "status": "positive" },
            { "id": 3, "title": "Engagement moyen", "value": "65%", "change": "-2%", "status": "negative" },
            { "id": 4, "title": "Viralité", "value": "7.2x", "change": "+5%", "status": "positive" }
        ]
    }
    return JsonResponse(data)