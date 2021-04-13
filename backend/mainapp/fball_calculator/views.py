import pandas as pd
import numpy as np
import json
from rest_framework import serializers, viewsets
from django.http import HttpResponse
from fball_calculator.models import Player,Team,Positions
from .serializer import PlayerSerializer, TeamSerializer, PositionsSerializer
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


def playersByPosition(request,avail):

    g = list(Positions.objects.get(Position='G').player_set.all().values())
    f = list(Positions.objects.get(Position='F').player_set.all().values())
    c = list(Positions.objects.get(Position='C').player_set.all().values())

    pos = Positions.objects.get(Position='F').player_set.filter(FTeam_id = None).values()

    if avail:
        g = [p for p in g if p['FTeam_id'] == None]
        f = [p for p in f if p['FTeam_id'] == None]
        c = [p for p in c if p['FTeam_id'] == None]

    data = {
        "guards": g,
        "forwards": f,
        "centers": c,
    }
    dump = json.dumps(data)

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

class PositionsViewSet(viewsets.ModelViewSet):
    queryset = Positions.objects.all()
    serializer_class = PositionsSerializer
