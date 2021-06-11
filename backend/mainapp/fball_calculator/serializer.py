from rest_framework import serializers
from .models import Team, Player,Positions,AvrComp


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class PositionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Positions
        fields = '__all__'

class AvrCompSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvrComp
        fields = '__all__'

class CompiledTeamSerializer(serializers.Serializer):
    teamName = serializers.CharField(required=True)
    players = serializers.ListField(child=serializers.CharField(),required=True)

class LeagueSerializer(serializers.Serializer):
    teams = serializers.ListField(child=CompiledTeamSerializer(),required=True)
