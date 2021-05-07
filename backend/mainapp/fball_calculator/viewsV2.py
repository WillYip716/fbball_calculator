import pandas as pd
import numpy as np
import json
from rest_framework.decorators import api_view
from rest_framework import serializers, viewsets, status
from django.http import HttpResponse
from fball_calculator.models import Player,Team,Positions, AvrComp



@api_view(['POST'])
def compile(request):
    data = json.loads(request.body)["teams"]
    #print(data)
    allarr = []


    for i in data:
        allarr = allarr + i["players"]
    
    players = Player.objects.filter(Player_Name__in=allarr)


    avrF = avrFrames(players)
    #print(avrF.to_dict("records"))
    
    
    g = raterHelper(avrF[avrF.Pos.eq("G")],"G")
    f = raterHelper(avrF[avrF.Pos.eq("F")],"F")
    c = raterHelper(avrF[avrF.Pos.eq("C")],"C")
    a = raterHelper(avrF[avrF.Pos.eq("A")],"A")

    g = g.sort_values(by=['TotalRating'],ascending=False)
    f = f.sort_values(by=['TotalRating'],ascending=False)
    c = c.sort_values(by=['TotalRating'],ascending=False)
    a = a.sort_values(by=['TotalRating'],ascending=False)

    ratings = {
        "guards": g.to_dict('records'),
        "forwards": f.to_dict('records'),
        "centers": c.to_dict('records'),
        "all": a.to_dict('records'),
    }

    rankings = rankingsHelper(data)
    data = {
        #"ratings": ratings,
        #"avr": avrF.to_dict("records"),
        "rankings": rankings
    }
    dump = json.dumps(data)

    return HttpResponse(dump, content_type='application/json')
    #return HttpResponse(status=200)
    

def avrFrames(teamsdf):
    t = pd.DataFrame(teamsdf.values())

    g = t[t['PosStr'].str.contains('G')]
    f = t[t['PosStr'].str.contains('F')]
    c = t[t['PosStr'].str.contains('C')]

    avf = pd.DataFrame(columns = t.columns, index = ['G', 'F', 'C','A'])

    avf.loc['G'] = g.mean()
    avf.loc['F'] = f.mean()
    avf.loc['C'] = c.mean()
    avf.loc['A'] = t.mean()

    avf = avf[["FGM","FGA","FG_PCT","FG3M","FTM","FTA","FT_PCT","REB","AST","STL","BLK","TOV","PTS"]]
    avf["FG_PCT"] = avf["FGM"]/avf["FGA"]
    avf["FT_PCT"] = avf["FTM"]/avf["FTA"]
    avf = avf.astype(float).round(2)
    avf["Pos"] = ["G","F","C","A"] 

    return avf

def raterHelper(a,p):

    avr = a
    if p=="A":
        outF = pd.DataFrame(Player.objects.all().values())
    else:
        outF = pd.DataFrame(Player.objects.filter(Pos__Position=p).values())

    outF['FTeam_id'] = outF['FTeam_id'].fillna(0)
    traverser = ["FGM","FGA","FG3M","FTM","FTA","REB","AST","STL","BLK","TOV","PTS"]

    for i in traverser:

        if i=="FGA" or i=="FTA" or i=="TOV":
            outF[i + "rt"] = (((outF[i]/avr[i])-1)*(-10)).round(2)
        else:
            outF[i + "rt"] = (((outF[i]/avr[i])-1)*10).round(2)
    
    outF["FG_PCTrt"] = (outF["FGMrt"]+outF["FGArt"]).round(2)
    outF["FT_PCTrt"] = (outF["FTMrt"]+outF["FTArt"]).round(2)
    outF["TotalRating"] = (outF["FG_PCTrt"]+outF["FG3Mrt"]+outF["FT_PCTrt"]+outF["REBrt"]+outF["ASTrt"]+outF["STLrt"]+outF["BLKrt"]+outF["TOVrt"]+outF["PTSrt"]).round(2)

    return outF


def rankingsHelper(d):

    avgroster = []
    totalroster = []
    traverser = ["GP","FGM","FGA","FG3M","FTM","FTA","REB","AST","STL","BLK","TOV","PTS"]
    for i in d:
        tname = i["teamName"]
        p =  i["players"][0:13]

        players = Player.objects.filter(Player_Name__in=p)
    
        p_df = pd.DataFrame(list(Player.objects.filter(Player_Name__in=p).values("GP","FGM","FGA","FG3M","FTM","FTA","REB","AST","STL","BLK","TOV","PTS")))

        sum_column = p_df.sum(axis=0)


        avgdata = {
            'team': tname,
            'FG_PCT': "{:.2f}".format(sum_column.FGM / sum_column.FGA),
            'FG3M':  "{:.2f}".format(sum_column.FG3M),
            'FT_PCT': "{:.2f}".format(sum_column.FTM / sum_column.FTA),
            'REB': "{:.2f}".format(sum_column.REB),
            'AST': "{:.2f}".format(sum_column.AST),
            'STL': "{:.2f}".format(sum_column.STL),
            'BLK': round(sum_column.BLK, 2), #"{:.2f}".format(sum_column.BLK),
            'TOV': "{:.2f}".format(sum_column.TOV),
            'PTS': "{:.2f}".format(sum_column.PTS),
        }
        avgroster.append(avgdata)

        for i in traverser:
                    p_df[i] = (14) * p_df[i]
        
        sum_column = p_df.sum(axis=0)


        totdata = {
            'team': tname,
            'FG_PCT': "{:.2f}".format(sum_column.FGM / sum_column.FGA),
            'FG3M':  "{:.2f}".format(sum_column.FG3M),
            'FT_PCT': "{:.2f}".format(sum_column.FTM / sum_column.FTA),
            'REB': "{:.2f}".format(sum_column.REB),
            'AST': "{:.2f}".format(sum_column.AST),
            'STL': "{:.2f}".format(sum_column.STL),
            'BLK': round(sum_column.BLK, 2),#"{:.2f}".format(sum_column.BLK),
            'TOV': "{:.2f}".format(sum_column.TOV),
            'PTS': "{:.2f}".format(sum_column.PTS),
        }
        totalroster.append(totdata)
    
    rankavg = pd.DataFrame(avgroster)
    ranktot = pd.DataFrame(totalroster)
    traverser2 = ["FG_PCT","FG3M","FT_PCT","REB","AST","STL","BLK","TOV","PTS"]
    
    for j in traverser2:
        if j == "TOV":
            rankavg[j] = rankavg[j].rank(method='max',ascending=False)
            ranktot[j] = ranktot[j].rank(method='max',ascending=False)
        else:
            rankavg[j] = rankavg[j].rank(method='max')
            ranktot[j] = ranktot[j].rank(method='max')
    
    rankavg["rottotal"] = rankavg.sum(axis=1)
    ranktot["rottotal"] = ranktot.sum(axis=1)


    rosters = {
        "avg": avgroster,
        "tot": totalroster,
        "rankavg": rankavg.to_dict('records'),
        "ranktot": ranktot.to_dict('records'),
    }


    return rosters



