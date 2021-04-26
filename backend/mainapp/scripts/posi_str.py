import csv
from nba_api.stats.endpoints import leaguedashplayerstats
from fball_calculator.models import Team,Player,Positions,AvrComp
import pandas as pd

def run():
    #players = leaguedashplayerstats.LeagueDashPlayerStats(season='2020-21',per_mode_detailed="PerGame",season_type_all_star="Regular Season")
    #players = Player.objects.all()



    #for i in players:

        """print(i.Player_Name)


        #temp = list(i.Pos.all().values())
        #b = ''.join(val['Position'] for val in temp)

        i.FTeamPos = ""
        i.FTeam = None

        i.save()"""
        p = Player.objects.exclude(FTeam__isnull=True)

        g = pd.DataFrame(p.filter(Pos__Position='G').values())
        f = pd.DataFrame(p.filter(Pos__Position='F').values())
        c = pd.DataFrame(p.filter(Pos__Position='C').values())
        a = pd.DataFrame(p.values())

        avf = pd.DataFrame(columns = a.columns, index = ['G', 'F', 'C','A'])

        avf.loc['G'] = g.mean()
        avf.loc['F'] = f.mean()
        avf.loc['C'] = c.mean()
        avf.loc['A'] = a.mean()

        avf = avf[["FGM","FGA","FG_PCT","FG3M","FTM","FTA","FT_PCT","REB","AST","STL","BLK","TOV","PTS"]]
        avf["FG_PCT"] = avf["FGM"]/avf["FGA"]
        avf["FT_PCT"] = avf["FTM"]/avf["FTA"]
        avf = avf.astype(float).round(2)

        for i,j in avf.iterrows():
            print(i)
            obj, created = AvrComp.objects.update_or_create(
                Pos = i,
                defaults={"FGM":j.FGM,"FGA":j.FGA,"FG_PCT":j.FG_PCT,"FG3M":j.FG3M,"FTM":j.FTM,"FTA":j.FTA,"FT_PCT":j.FT_PCT,"REB":j.REB,"AST":j.AST,"STL":j.STL,"BLK":j.BLK,"TOV":j.TOV,"PTS":j.PTS},
            )


        
