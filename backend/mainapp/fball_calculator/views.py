import pandas as pd
import numpy as np
import json
from django.http import HttpResponse
from fball_calculator.models import Player
#from fball_calculator.models import Game



def calculate(request):

    games = pd.DataFrame(list(Player.objects.filter(BLK__gt = 2).values()))

    output = games.to_json(orient="table")
    parsed = json.loads(output)

    dump = json.dumps(parsed["data"])


    return HttpResponse(dump, content_type='application/json')