from django.db import models

# Create your models here.

class Positions(models.Model):
    Position = models.CharField(max_length=1, unique=True)

class Player(models.Model):
    PLAYER_ID = models.IntegerField()
    Player_Name = models.CharField(max_length=255)
    Team_ID = models.IntegerField()
    Team_Name = models.CharField(max_length=255)
    GP = models.IntegerField()
    MIN = models.FloatField()
    FGM = models.FloatField()
    FGA = models.FloatField()
    FG_PCT = models.FloatField()
    FG3M = models.FloatField()
    FG3A = models.FloatField()
    FG3_PCT = models.FloatField()
    FTM = models.FloatField()
    FTA = models.FloatField()
    FT_PCT = models.FloatField()
    OREB = models.FloatField()
    DREB = models.FloatField()
    REB = models.FloatField()
    AST = models.FloatField()
    STL = models.FloatField()
    BLK = models.FloatField()
    TOV = models.FloatField()
    PF = models.FloatField()
    PTS = models.FloatField()
    FTeam = models.ForeignKey("Team",null=True,on_delete=models.SET_NULL)
    Pos = models.ManyToManyField(Positions)
    PosStr = models.CharField(max_length=3,default="")
    FTeamPos = models.CharField(max_length=3,default="")

class Team(models.Model):
    name = models.CharField(max_length=255)