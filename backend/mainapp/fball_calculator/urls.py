from django.urls import path, include
from .views import calculate, TeamViewSet, PlayerViewSet,AvrCompViewSet, roster, allRosters,PositionsViewSet,playersByPosition,addplayer,removeFromTeam,ratings
from rest_framework import routers
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'api/team', TeamViewSet, basename='team')
router.register(r'api/player', PlayerViewSet, basename='player')
router.register(r'api/positions', PositionsViewSet, basename='positions')
router.register(r'api/avrcomp', AvrCompViewSet, basename='avrcomp')


urlpatterns = [
    path(r'', include(router.urls)),
    path('calculate/', calculate, name = 'api_calculate'),
    path('team/<int:teamid>', roster, name = 'api_teamroster'),
    path('teams/', allRosters, name = 'api_rosters'),
    path('pbp/<int:avail>', playersByPosition, name = 'api_pbp'),
    path('addplayer/', addplayer, name = 'api_addplayer'),
    path('removeplayer/', removeFromTeam, name = 'remove_player'),
    path('ratings/', ratings, name = 'ratings'),
]