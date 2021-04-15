import csv
from nba_api.stats.endpoints import leaguedashplayerstats
from fball_calculator.models import Team,Player,Positions
import pandas as pd

def run():
    #players = leaguedashplayerstats.LeagueDashPlayerStats(season='2020-21',per_mode_detailed="PerGame",season_type_all_star="Regular Season")
    players = Player.objects.all()



    for i in players:

        print(i.Player_Name)


        temp = list(i.Pos.all().values())
        b = ''.join(val['Position'] for val in temp)

        i.PosStr = b

        i.save()


        
