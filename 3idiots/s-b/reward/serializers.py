from rest_framework import serializers
from .models import RewardHistory, RewardProfile
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User


class RewardHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardHistory
        fields = "__all__"

class RewardProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardProfile
        fields = "__all__"
