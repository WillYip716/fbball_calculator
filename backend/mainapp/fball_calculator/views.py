import pandas as pd
import numpy as np
import json
from rest_framework.decorators import api_view
from rest_framework import serializers, viewsets, status
from django.http import HttpResponse
from fball_calculator.models import Player,Team,Positions
from .serializer import PlayerSerializer, TeamSerializer, PositionsSerializer
#from fball_calculator.models import Game



def calculate(request,aot):

    teams = Team.objects.all()
    rosters = []
    traverser = ["GP","FGM","FGA","FG3M","FTM","FTA","REB","AST","STL","BLK","TOV","PTS"]
    for t in teams:

        p_df = pd.DataFrame(list(t.player_set.all().values("GP","FGM","FGA","FG3M","FTM","FTA","REB","AST","STL","BLK","TOV","PTS")))
        
        if aot == "total":
            for i in traverser:
                if i != "GP":
                    p_df[i] = (72 - p_df.GP) * p_df[i]
        

        sum_column = p_df.sum(axis=0)


        data = {
            "id": t.id,
            'team': t.name,
            'FG_PCT': "{:.2f}".format(sum_column.FGM / sum_column.FGA),
            'FG3M':  "{:.2f}".format(sum_column.FG3M),
            'FT_PCT': "{:.2f}".format(sum_column.FTM / sum_column.FTA),
            'REB': "{:.2f}".format(sum_column.REB),
            'AST': "{:.2f}".format(sum_column.AST),
            'STL': "{:.2f}".format(sum_column.STL),
            'BLK': "{:.2f}".format(sum_column.BLK),
            'TOV': "{:.2f}".format(sum_column.TOV),
            'PTS': "{:.2f}".format(sum_column.PTS),
        }
        rosters.append(data)

    dump = json.dumps(rosters)

    return HttpResponse(dump, content_type='application/json')


def roster(request,teamid):

    t = Team.objects.get(id=teamid)
    #roster = list(t.player_set.all().values())
    #p = Player.objects.filter(FTeam=t)

    g = list(t.player_set.filter(FTeamPos='G').values())
    f = list(t.player_set.filter(FTeamPos='F').values())
    c = list(t.player_set.filter(FTeamPos='C').values())
    u = list(t.player_set.filter(FTeamPos='U').values())

    data = {
        "team": t.name,
        "teamid": t.id,
        "guards": g,
        "forwards": f,
        "centers": c,
        "utils":u,
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

    data = playersByPositionHelper(avail)

    return HttpResponse(data, content_type='application/json')


def playersByPositionHelper(avail):
    g = list(Positions.objects.get(Position='G').player_set.all().values())
    f = list(Positions.objects.get(Position='F').player_set.all().values())
    c = list(Positions.objects.get(Position='C').player_set.all().values())

    #pos = Positions.objects.get(Position='F').player_set.filter(FTeam_id = None).values()

    if avail:
        g = [p for p in g if p['FTeam_id'] == None]
        f = [p for p in f if p['FTeam_id'] == None]
        c = [p for p in c if p['FTeam_id'] == None]

    temp = g + f + c
    temp = [dict(t) for t in {tuple(d.items()) for d in temp}]
    a = sorted(temp, key=lambda k: k['Player_Name']) 
    data = {
        "guards": g,
        "forwards": f,
        "centers": c,
        "all": a,
    }
    dump = json.dumps(data)

    return dump

@api_view(['PUT'])
def removeFromTeam(request):
    if request.method == 'PUT':
        
        data = json.loads(request.body)
        try:
            player = Player.objects.get(Player_Name = data['playerid'])
        except Player.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        player.FTeamPos = ""
        player.FTeam = None

        player.save()

        dump = playersByPositionHelper("1")

        return HttpResponse(dump, content_type='application/json')


@api_view(['PUT'])
def addplayer(request):
    if request.method == 'PUT':

        data = json.loads(request.body)
        try:
            player = Player.objects.get(Player_Name = data['name'])
        except Player.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        team = Team.objects.get(id = data['teamid'])
        player.FTeam = team

        if data['pos'] == "guard": 
            player.FTeamPos = "G"
        elif data['pos'] == "forward": 
            player.FTeamPos = "F"
        elif data['pos'] == "center": 
            player.FTeamPos = "C"
        elif data['pos'] == "util": 
            player.FTeamPos = "U"

        player.save()

        dump = playersByPositionHelper("1")
        #dump = json.dumps(list(player.values()))
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
