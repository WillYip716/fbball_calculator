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



#@api_view(['POST'])
#def addplayers(request)
#    if request.method == 'POST':

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer