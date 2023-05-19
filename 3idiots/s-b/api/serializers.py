from rest_framework import serializers
from .models import Office, Department, Position, Profile, Image, Experience, Social
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User


class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = [
            "id", "department_name"
        ]


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = [
            "id", "position_name", "department_id"
        ]

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "name", "gender", "age", "department", 
            "position", "office", "description", "contact", "address"
        ]

class SocailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        fields = [
            "id", "name", "url"
        ]

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = [
            "id", "photo"
        ]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id", "company", "role", "joined", "left", "details"
        ]

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField()
    class Meta:
        model = User
        fields = ('username', 'password', 'confirm_password')

class OTPVerificationSerializer(serializers.ModelSerializer):
    otp = serializers.IntegerField()
    class Meta:
        model = User
        fields = ('user', 'email', 'otp')

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
            model = User
            fields = ('username', 'email')


