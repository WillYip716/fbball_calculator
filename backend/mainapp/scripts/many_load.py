import csv
from nba_api.stats.endpoints import leaguedashplayerstats
from fball_calculator.models import Team,Player
import pandas as pd

def run():
    players = leaguedashplayerstats.LeagueDashPlayerStats(season='2020-21',per_mode_detailed="PerGame",season_type_all_star="Regular Season")
    players = players.get_data_frames()[0]



    for i, j in players.iterrows():
        print(j.PLAYER_NAME)

        #g = Game(week = row[0], vteam = row[1], hteam = row[2], temp = row[7], wind_mph = row[8], vdflg = row[9], hdflg = row[10], divgame = row[11], nsite = row[12], hospread = row[14], ouopen = row[15], hcspread = row[17], ouclose= row[18], vTOTALDVOA= row[19], vTOTALRNK= row[20], vOFFRNK= row[21], vOFFDVOA= row[22], vDEFRNK= row[23], vDEFDVOA= row[24], vSTRNK= row[25], vSTDVOA= row[26], hTOTALDVOA= row[27], hTOTALRNK= row[28], hOFFRNK= row[29], hOFFDVOA= row[30], hDEFRNK= row[31], hDEFDVOA= row[32], hSTRNK= row[33], hSTDVOA= row[34], vtsw= row[35], vtsl= row[36], vtst= row[37], htsw= row[38], htsl= row[39], htst= row[40], vtw= row[41], vtl= row[42], vtt= row[43], vts= row[44], htw= row[45], htl= row[46], htt= row[47], hts= row[48])

        #g.save()

        p = Player(PLAYER_ID = j.PLAYER_ID,Player_Name=j.PLAYER_NAME, Team_ID=j.TEAM_ID, Team_Name=j.TEAM_ABBREVIATION, GP=j.GP, MIN=j.MIN, FGM=j.FGM, FGA=j.FGA, FG_PCT=j.FG_PCT, FG3M=j.FG3M, FG3A=j.FG3A, FG3_PCT=j.FG3_PCT, FTM=j.FTM, FTA=j.FTA, FT_PCT=j.FT_PCT, OREB=j.OREB, DREB=j.DREB, REB=j.REB, AST=j.AST, STL=j.STL, BLK=j.BLK, TOV=j.TOV, PF=j.PF, PTS=j.PTS)

        p.save()
