import pandas as pd
import numpy as np
import json
from rest_framework import serializers, viewsets
from django.http import HttpResponse
from fball_calculator.models import Player,Team
from .serializer import PlayerSerializer, TeamSerializer
#from fball_calculator.models import Game



def calculate(request):

    games = pd.DataFrame(list(Player.objects.filter(BLK__gt = 2).values()))

    output = games.to_json(orient="table")
    parsed = json.loads(output)

    dump = json.dumps(parsed["data"])


    return HttpResponse(dump, content_type='application/json')


def roster(request,teamid):

    t = Team.objects.get(id=teamid)
    roster = list(t.player_set.all().values())

    data = {
        "team": t.name,
        "teamid": t.id,
        "players": roster,
    }
    dump = json.dumps(data)

    return HttpResponse(dump, content_type='application/json')


def allRosters(request):

    teams = Team.objects.all()
    rosters = []
    for t in teams:
        players = t.player_set.all().values_list('Player_Name', flat=True)
        players = list(players)
        data = {
            "team": t.name,
            "teamid": t.id,
            "players": players,
        }
        rosters.append(data)

    dump = json.dumps(rosters)

    return HttpResponse(dump, content_type='application/json')
    


#@api_view(['POST'])
#def addplayers(request)
#    if request.method == 'POST':

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

